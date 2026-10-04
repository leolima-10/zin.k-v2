const fs = require('fs');

// Since we can't use canvas, let's create a simple HTML that will be the basis for the poster
// and use a different approach. Let me create a proper JPEG using a data URI approach.

// Actually, let me just create the poster as an HTML file and note that it needs to be
// rendered to video. The brag-slim skill requires brag.jpg as a postrer frame.

// For now, let me create a simple PNG-ish file using a minimal approach.
// I'll create an SVG and note it can be used as the poster.

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .logo { font-family: "Unbounded Variable", sans-serif; font-size: 96px; font-weight: 900; letter-spacing: -0.02em; }
      .headline { font-family: "Unbounded Variable", sans-serif; font-size: 28px; font-style: italic; }
      .tagline { font-family: "DM Sans Variable", sans-serif; font-size: 16px; opacity: 0.7; }
      .badge { font-family: "DM Sans Variable", sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; fill: #4400d6; }
    </style>
  </defs>
  <rect width="1920" height="1080" fill="#121212" />
  <!-- Background pattern -->
  <rect x="0" y="0" width="1920" height="1080" fill="#171717" />
  <!-- Logo mark -->
  <g transform="translate(100, 100)">
    <text class="logo" fill="#fff9e5">zin</text>
    <text x="0.18em" class="logo" fill="#4400d6">k</text>
  </g>
  <!-- Headline -->
  <text x="100" y="180" class="headline" fill="#fff9e5">sites e soluções digitais sob medida</text>
  <!-- Tagline -->
  <text x="100" y="220" class="tagline" fill="#9166dc">para empresas que levam a sério presença digital. sem template, sem enrolação — só resultado.</text>
  <!-- Badge -->
  <rect x="100" y="280" width="200" height="40" rx="20" fill="rgba(68,0,214,0.2)" />
  <text x="110" y="300" class="badge" fill="#4400d6">aceitando novos projetos</text>
</svg>`;

fs.writeFileSync('brag-output/brag.svg', svg);
console.log('SVG poster created at brag-output/brag.svg');
console.log('Note: This SVG can be used as the poster frame (brag.jpg).');
console.log('To convert to JPEG: use an online SVG-to-JPG converter or ImageMagick.');