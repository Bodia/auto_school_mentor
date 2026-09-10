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

  // 1. 512x512 PNG
  const png512 = await sharp(src)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .png()
    .toBuffer();

  // 2. 192x192 PNG (кратне 48px — офіційний стандарт Google Search)
  const png192 = await sharp(src)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .png()
    .toBuffer();

  // 3. 180x180 PNG (Apple Touch Icon)
  const appleTouch = await sharp(src)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .png()
    .toBuffer();

  // 4. Створюємо універсальний класичний 32-bit ICO (BMP DIB) для public/favicon.ico
  // Цей формат не має проблем з декодуванням у Rust/Turbopack та підтримується всіма системами
  const raw48 = await sharp(src)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer();

  function createClassicBmpIco(rawRgba, width, height) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // 1 = ICO
    header.writeUInt16LE(1, 4); // count = 1

    const bmpHeaderSize = 40;
    const imageSize = width * height * 4;
    const andMaskRowSize = Math.floor((width + 31) / 32) * 4;
    const andMaskSize = andMaskRowSize * height;
    const totalDataSize = bmpHeaderSize + imageSize + andMaskSize;

    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(totalDataSize, 8); // size
    entry.writeUInt32LE(22, 12); // offset = 22

    const bih = Buffer.alloc(40);
    bih.writeUInt32LE(40, 0);
    bih.writeInt32LE(width, 4);
    bih.writeInt32LE(height * 2, 8); // height * 2 in ICO format
    bih.writeUInt16LE(1, 12);
    bih.writeUInt16LE(32, 14);
    bih.writeUInt32LE(0, 16);
    bih.writeUInt32LE(imageSize + andMaskSize, 20);
    bih.writeInt32LE(0, 24);
    bih.writeInt32LE(0, 28);
    bih.writeUInt32LE(0, 32);
    bih.writeUInt32LE(0, 36);

    const pixelData = Buffer.alloc(imageSize);
    for (let y = 0; y < height; y++) {
      const srcY = height - 1 - y;
      for (let x = 0; x < width; x++) {
        const srcIdx = (srcY * width + x) * 4;
        const dstIdx = (y * width + x) * 4;
        pixelData[dstIdx] = rawRgba[srcIdx + 2];     // B
        pixelData[dstIdx + 1] = rawRgba[srcIdx + 1]; // G
        pixelData[dstIdx + 2] = rawRgba[srcIdx];     // R
        pixelData[dstIdx + 3] = rawRgba[srcIdx + 3]; // A
      }
    }

    const andMask = Buffer.alloc(andMaskSize, 0);
    return Buffer.concat([header, entry, bih, pixelData, andMask]);
  }

  const classicIco = createClassicBmpIco(raw48, 48, 48);

  const outputs = [
    // Next.js App Router (src/app/) - використовуємо тільки валідний PNG, без ICO в app/
    { file: path.join(__dirname, 'src', 'app', 'icon.png'), data: png192 },
    { file: path.join(__dirname, 'src', 'app', 'apple-icon.png'), data: appleTouch },

    // Статична роздача (public/) - для прямого доступу за URL /favicon.ico та /icon.png
    { file: path.join(__dirname, 'public', 'favicon.ico'), data: classicIco },
    { file: path.join(__dirname, 'public', 'icon.png'), data: png192 },
    { file: path.join(__dirname, 'public', 'icon-512.png'), data: png512 },
    { file: path.join(__dirname, 'public', 'logo.png'), data: png512 },
    { file: path.join(__dirname, 'public', 'apple-touch-icon.png'), data: appleTouch },
  ];

  for (const item of outputs) {
    fs.writeFileSync(item.file, item.data);
    console.log(`✅ Збережено: ${path.relative(__dirname, item.file)} (${Math.round(item.data.length / 1024)} KB)`);
  }

  // Видаляємо src/app/favicon.ico, щоб Turbopack не намагався декодувати його під час білду
  const filesToRemove = [
    path.join(__dirname, 'src', 'app', 'favicon.ico'),
    path.join(__dirname, 'src', 'app', 'icon.jpg'),
    path.join(__dirname, 'src', 'app', 'apple-icon.jpg'),
  ];
  filesToRemove.forEach(f => {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`🗑️ Видалено: ${path.relative(__dirname, f)}`);
    }
  });

  console.log('✅ Фавіконки у форматах PNG та валідному класичному ICO успішно створено!');

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
