// Converte imagens brutas (raw-images/*.png|jpg|jpeg|webp) em WebP otimizado
// em public/images/projects/, com largura máxima de 1024px.
// Uso: coloque a captura de tela do projeto como raw-images/<slug>.png
// e rode `npm run images`.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const RAW_DIR = "raw-images";
const OUT_DIR = "public/images/projects";
const MAX_WIDTH = 1024;

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(RAW_DIR)).filter((f) =>
  /\.(png|jpe?g|webp)$/i.test(f),
);

if (files.length === 0) {
  console.log(`nenhuma imagem encontrada em ${RAW_DIR}/`);
  process.exit(0);
}

for (const file of files) {
  const slug = path.basename(file, path.extname(file));
  const output = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(path.join(RAW_DIR, file))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output);
  console.log(`${file} -> ${output}`);
}
