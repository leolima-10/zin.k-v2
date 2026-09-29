// gera PNGs de ícone a partir de public/favicon.svg usando sharp (já é devDependency)
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile("public/favicon.svg");
const targets = [
  ["public/apple-touch-icon.png", 180],
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
];
for (const [file, size] of targets) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(file);
  console.log("ok", file, size);
}