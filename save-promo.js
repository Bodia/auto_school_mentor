const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'promo');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const storiesSrc = 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\1748c633-1ee7-409d-bc31-71513ff57720\\stories_ad_photo_1789146642757.jpg';
const feedSrc = 'C:\\Users\\bohda\\.gemini\\antigravity-ide\\brain\\1748c633-1ee7-409d-bc31-71513ff57720\\feed_ad_photo_1789146656279.jpg';

const storiesDest = path.join(targetDir, 'stories-ad-9x16.jpg');
const feedDest = path.join(targetDir, 'feed-ad-1x1.jpg');

if (fs.existsSync(storiesSrc)) {
  fs.copyFileSync(storiesSrc, storiesDest);
  console.log('✅ Скопійовано Stories креатив:', storiesDest);
}

if (fs.existsSync(feedSrc)) {
  fs.copyFileSync(feedSrc, feedDest);
  console.log('✅ Скопійовано Feed креатив:', feedDest);
}
