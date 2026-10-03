// Verificação automática do catálogo de projetos
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const OLD_SLUGS = ["nordal", "alvorada", "pulse", "conecta", "vetra", "lume"];
const OLD_IMAGES = ["nordal.webp", "alvorada.webp", "pulse.webp", "conecta.webp", "vetra.webp", "lume.webp"];
const NEW_SLUGS = [
  "dra-aline-lopes",
  "giovanna-flamiano",
  "novo-conceito",
  "nixus-marketing",
  "convite-brenda",
  "menustart",
];

let errors = [];
let warnings = [];

function error(msg) {
  errors.push(msg);
  console.error(`❌ ${msg}`);
}

function warn(msg) {
  warnings.push(msg);
  console.warn(`⚠️  ${msg}`);
}

function ok(msg) {
  console.log(`✅ ${msg}`);
}

async function checkFileExists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

async function checkAllCoversExist() {
  console.log("\n=== Verificando covers ===");
  const projectsPath = path.join(ROOT, "src/data/projects.ts");
  const content = await readFile(projectsPath, "utf-8");
  
  // Extrair covers do arquivo
  const coverMatches = content.matchAll(/cover:\s*"([^"]+)"/g);
  for (const match of coverMatches) {
    const cover = match[1];
    // Converter /images/projects/xyz.webp para public/images/projects/xyz.webp
    const publicPath = path.join(ROOT, "public", cover.replace(/^\//, ""));
    if (await checkFileExists(publicPath)) {
      ok(`Cover existe: ${cover}`);
    } else {
      error(`Cover NÃO existe: ${cover} (esperado em ${publicPath})`);
    }
  }
}

async function checkSlugsUniqueAndKebabCase() {
  console.log("\n=== Verificando slugs únicos e kebab-case ===");
  const projectsPath = path.join(ROOT, "src/data/projects.ts");
  const content = await readFile(projectsPath, "utf-8");
  
  const slugMatches = content.matchAll(/slug:\s*"([^"]+)"/g);
  const slugs = [];
  for (const match of slugMatches) {
    const slug = match[1];
    slugs.push(slug);
    
    // kebab-case check
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      error(`Slug não é kebab-case válido: ${slug}`);
    } else {
      ok(`Slug kebab-case válido: ${slug}`);
    }
  }
  
  // únicos
  const uniqueSlugs = new Set(slugs);
  if (slugs.length !== uniqueSlugs.size) {
    error(`Slugs duplicados encontrados: ${slugs.filter((s, i) => slugs.indexOf(s) !== i).join(", ")}`);
  } else {
    ok(`Todos os ${slugs.length} slugs são únicos`);
  }
}

async function checkNoOldReferences() {
  console.log("\n=== Verificando referências antigas ===");
  
  const searchDirs = [
    "src",
    "public",
    "scripts",
    "index.html",
    "README.md",
    "vercel.json",
  ];
  
  const allFiles = [];
  for (const dir of searchDirs) {
    const fullPath = path.join(ROOT, dir);
    try {
      const files = await getAllFiles(fullPath);
      allFiles.push(...files);
    } catch (e) {
      // arquivo não existe ou erro
    }
  }
  
  // Falsos positivos conhecidos: arquivo (caminho relativo) -> [palavras a ignorar]
  const knownFalsePositives = {
    "src/pages/ProjectPage.tsx": ["pulse"], // "surface" contém "pulse"
    "src/sections/Process.tsx": ["conecta"], // "conecta os 4 steps" em comentário
    "src\\pages\\ProjectPage.tsx": ["pulse"],
    "src\\sections\\Process.tsx": ["conecta"],
  };
  
  for (const file of allFiles) {
    // Ignorar o próprio script de verificação
    if (file.includes("verify-catalog.mjs")) continue;
    if (file.includes("zink-raw-images-antigas")) continue;
    if (file.includes(".tsbuildinfo")) continue;
    
    const content = await readFile(file, "utf-8").catch(() => "");
    const falsePositives = knownFalsePositives[path.relative(ROOT, file)] || [];
    
    // Verificar slugs antigos (com word boundaries para evitar falsos positivos)
    for (const oldSlug of OLD_SLUGS) {
      if (falsePositives.includes(oldSlug)) continue;
      const regex = new RegExp(`\\b${oldSlug}\\b`);
      if (regex.test(content)) {
        error(`Referência a slug antigo "${oldSlug}" em: ${file}`);
      }
    }
    
    // Verificar imagens antigas
    for (const oldImg of OLD_IMAGES) {
      if (content.includes(oldImg)) {
        error(`Referência a imagem antiga "${oldImg}" em: ${file}`);
      }
    }
  }
  
  if (errors.length === 0 || errors.every(e => !e.includes("Referência"))) {
    ok("Nenhuma referência a slugs/imagens antigas encontrada");
  }
}

async function checkOgTwitterImage() {
  console.log("\n=== Verificando og:image e twitter:image ===");
  const indexPath = path.join(ROOT, "index.html");
  const content = await readFile(indexPath, "utf-8");
  
  const ogMatch = content.match(/property="og:image"\s+content="([^"]+)"/);
  const twitterMatch = content.match(/name="twitter:image"\s+content="([^"]+)"/);
  
  if (ogMatch) {
    const ogUrl = ogMatch[1];
    if (ogUrl.startsWith("http")) {
      ok(`og:image é URL absoluta: ${ogUrl}`);
    } else {
      error(`og:image NÃO é URL absoluta: ${ogUrl}`);
    }
    
    // Verificar se não aponta para arquivo removido
    for (const oldImg of OLD_IMAGES) {
      if (ogUrl.includes(oldImg)) {
        error(`og:image aponta para imagem antiga: ${oldImg}`);
      }
    }
  } else {
    error("og:image não encontrada");
  }
  
  if (twitterMatch) {
    const twitterUrl = twitterMatch[1];
    if (twitterUrl.startsWith("http")) {
      ok(`twitter:image é URL absoluta: ${twitterUrl}`);
    } else {
      error(`twitter:image NÃO é URL absoluta: ${twitterUrl}`);
    }
  } else {
    error("twitter:image não encontrada");
  }
}

async function getAllFiles(dir) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== "dist") {
          files.push(...await getAllFiles(fullPath));
        }
      } else {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // não é diretório, tentar como arquivo
    if (await checkFileExists(dir)) {
      files.push(dir);
    }
  }
  return files;
}

async function main() {
  console.log("🔍 Iniciando verificação do catálogo...\n");
  
  await checkAllCoversExist();
  await checkSlugsUniqueAndKebabCase();
  await checkNoOldReferences();
  await checkOgTwitterImage();
  
  console.log("\n=== RESUMO ===");
  console.log(`Erros: ${errors.length}`);
  console.log(`Avisos: ${warnings.length}`);
  
  if (errors.length > 0) {
    console.log("\n❌ VERIFICAÇÃO FALHOU");
    process.exit(1);
  } else {
    console.log("\n✅ TODAS AS VERIFICAÇÕES PASSARAM");
    process.exit(0);
  }
}

main().catch(e => {
  console.error("Erro fatal:", e);
  process.exit(1);
});