const fs = require('fs');

function fixFile(filePath, lineCount, appendStr) {
  const buf = fs.readFileSync(filePath);
  let newlines = 0;
  let cutIndex = buf.length;
  for(let i=0; i<buf.length; i++) {
    if(buf[i] === 10) { // \n
      newlines++;
      if(newlines === lineCount) {
        cutIndex = i + 1;
        break;
      }
    }
  }
  
  const goodBuf = buf.slice(0, cutIndex);
  const appendBuf = Buffer.from('\n' + appendStr, 'utf8');
  fs.writeFileSync(filePath, Buffer.concat([goodBuf, appendBuf]));
}

fixFile('src/app/globals.css', 165, `@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
`);

fixFile('src/app/blog/blog.css', 106, `@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
  .blog-subtitle {
    margin-bottom: 2rem;
  }
  .post-title {
    font-size: 1.75rem;
  }
  .post-content h2 {
    font-size: 1.5rem;
  }
  .post-content h3 {
    font-size: 1.25rem;
  }
}
`);

fixFile('src/app/booking/booking.css', 37, `@media (max-width: 768px) {
  .booking-subtitle {
    margin-bottom: 2rem;
  }
  .booking-notice {
    padding: 1rem;
    font-size: 0.9rem;
  }
  .calendly-wrapper iframe {
    height: 900px !important;
  }
}
`);
console.log('Fixed corrupted files.');
