const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const primarySrc = 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\fbfcdbe7-6a9f-4ff5-bf7f-137aa2c92926\\favicon_car_book_1788782086184.jpg';
const fallbackSrc = path.join(__dirname, 'public', 'icon.jpg');

const src = fs.existsSync(primarySrc) ? primarySrc : (fs.existsSync(fallbackSrc) ? fallbackSrc : null);

async function generateFavicons() {
  if (!src) {
    console.error('❌ Вихідне зображення для фавіконки не знайдено!');
    return;
  }

  console.log(`🖼️ Обробка фавіконки з: ${src}`);

  // 1. 512x512 PNG (ідеально для PWA та сучасних браузерів)
  const png512 = await sharp(src)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 2. 192x192 PNG (кратне 48px — офіційна вимога Google Search)
  const png192 = await sharp(src)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 3. 48x48 PNG (базовий розмір Googlebot-Favicon)
  const png48 = await sharp(src)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 4. 180x180 PNG (Apple Touch Icon)
  const appleTouch = await sharp(src)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 5. Валідний .ico (формат ICO з PNG-payload 48x48)
  function createIco(pngBuf, width, height) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // 1 = ICO
    header.writeUInt16LE(1, 4); // count = 1

    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(pngBuf.length, 8); // size
    entry.writeUInt32LE(22, 12); // offset

    return Buffer.concat([header, entry, pngBuf]);
  }

  const icoBuffer = createIco(png48, 48, 48);

  const outputs = [
    // Next.js App Router (src/app/)
    { file: path.join(__dirname, 'src', 'app', 'icon.png'), data: png192 },
    { file: path.join(__dirname, 'src', 'app', 'apple-icon.png'), data: appleTouch },
    { file: path.join(__dirname, 'src', 'app', 'favicon.ico'), data: icoBuffer },

    // Static public folder (public/)
    { file: path.join(__dirname, 'public', 'icon.png'), data: png192 },
    { file: path.join(__dirname, 'public', 'icon-512.png'), data: png512 },
    { file: path.join(__dirname, 'public', 'apple-touch-icon.png'), data: appleTouch },
    { file: path.join(__dirname, 'public', 'favicon.ico'), data: icoBuffer },
  ];

  for (const item of outputs) {
    fs.writeFileSync(item.file, item.data);
    console.log(`✅ Збережено: ${path.relative(__dirname, item.file)} (${Math.round(item.data.length / 1024)} KB)`);
  }

  // Очищення застарілих .jpg іконок, щоб уникнути конфліктів у Next.js
  const obsoleteFiles = [
    path.join(__dirname, 'src', 'app', 'icon.jpg'),
    path.join(__dirname, 'src', 'app', 'apple-icon.jpg'),
  ];
  obsoleteFiles.forEach(f => {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`🗑️ Видалено застарілий файл: ${path.relative(__dirname, f)}`);
    }
  });

  console.log('✅ Фавіконки у форматах PNG та валідному ICO успішно створено!');

  // Встановлення банера для соцмереж (Варіант 4)
  const ogSrc = path.join(__dirname, 'public', 'og', 'variant-4.jpg');
  if (fs.existsSync(ogSrc)) {
    fs.copyFileSync(ogSrc, path.join(__dirname, 'public', 'og-image.jpg'));
    fs.copyFileSync(ogSrc, path.join(__dirname, 'src', 'app', 'opengraph-image.jpg'));
    console.log('✅ Встановлено Варіант 4 як превʼю для соцмереж (og-image.jpg)!');
  }
}

generateFavicons().catch(err => {
  console.error('Помилка створення фавіконок:', err);
});
