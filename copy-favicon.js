const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\fbfcdbe7-6a9f-4ff5-bf7f-137aa2c92926\\favicon_car_book_1788782086184.jpg';

try {
  if (fs.existsSync(src)) {
    const targets = [
      path.join(__dirname, 'src', 'app', 'icon.jpg'),
      path.join(__dirname, 'src', 'app', 'apple-icon.jpg'),
      path.join(__dirname, 'src', 'app', 'favicon.ico'),
      path.join(__dirname, 'public', 'favicon.ico'),
      path.join(__dirname, 'public', 'icon.jpg'),
      path.join(__dirname, 'public', 'apple-touch-icon.jpg'),
    ];

    targets.forEach(target => {
      fs.copyFileSync(src, target);
      console.log(`Copied favicon to: ${target}`);
    });
    console.log('✅ Фавіконку (Варіант 6) успішно встановлено!');

    // Встановлення банера для соцмереж (Варіант 4)
    const ogSrc = path.join(__dirname, 'public', 'og', 'variant-4.jpg');
    if (fs.existsSync(ogSrc)) {
      fs.copyFileSync(ogSrc, path.join(__dirname, 'public', 'og-image.jpg'));
      fs.copyFileSync(ogSrc, path.join(__dirname, 'src', 'app', 'opengraph-image.jpg'));
      console.log('✅ Встановлено Варіант 4 як превʼю для соцмереж (og-image.jpg)!');
    }
  } else {
    console.warn(`Source favicon not found at ${src}`);
  }
} catch (err) {
  console.error('Error copying favicon:', err);
}
