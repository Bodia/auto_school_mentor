const fs = require('fs');
const path = require('path');

const variants = {
  1: 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\32bae850-438e-444d-8dfb-2b2c644824d3\\og_avtomentor_banner_1788976399558.jpg',
  2: 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\32bae850-438e-444d-8dfb-2b2c644824d3\\og_var2_logo_centered_1788976453242.jpg',
  3: 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\32bae850-438e-444d-8dfb-2b2c644824d3\\og_var3_homepage_preview_1788976470294.jpg',
  4: 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\32bae850-438e-444d-8dfb-2b2c644824d3\\og_var4_instructor_brand_1788976485476.jpg',
  5: 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\32bae850-438e-444d-8dfb-2b2c644824d3\\og_var5_dynamic_drive_1788976501027.jpg',
};

// Copy all variants into public/og/ for reference
const ogDir = path.join(__dirname, 'public', 'og');
if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}

Object.entries(variants).forEach(([num, src]) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(ogDir, `variant-${num}.jpg`));
  }
});

// Which variant to set as active (from argument or default 4)
const selected = process.argv[2] ? parseInt(process.argv[2], 10) : 4;
const targetSrc = variants[selected] || variants[4];

if (fs.existsSync(targetSrc)) {
  fs.copyFileSync(targetSrc, path.join(__dirname, 'public', 'og-image.jpg'));
  fs.copyFileSync(targetSrc, path.join(__dirname, 'src', 'app', 'opengraph-image.jpg'));
  console.log(`✅ Встановлено Варіант ${selected} як основне прев'ю соцмереж!`);
} else {
  console.warn(`Source not found: ${targetSrc}`);
}
