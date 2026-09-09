# План та завдання на наступну сесію

## 🟢 Виконано в поточній сесії
- [x] **Варіант 3 — Динамічні відгуки в Tina CMS**:
  - Створено колекцію `reviews` у `tina/config.ts` (поля: ім'я, дата, оцінка 1-5, текст, фото/аватар, порядок відображення, підтримка додавання/видалення через адмінку).
  - Усі 6 стартових відгуків винесено в окремі `.md` файли в папку `reviews/`.
  - Створено бібліотеку `src/lib/reviews.ts` для типізованого парсингу.
  - Оновлено сторінку `src/app/reviews/page.tsx`: динамічне завантаження, підтримка фотографій учнів з авто-фолбеком на першу літеру, мікророзмітка Schema.org `AggregateRating` та `Review`.
- [x] **Повна інтеграція Calendly за форматами уроків**:
  - `30min`: безкоштовне знайомство (`https://calendly.com/asusgrup24/30min`).
  - `60min`: індивідуальний урок (`https://calendly.com/asusgrup24/new-meeting`).
  - `90min` / `pair`: парні заняття (`https://calendly.com/asusgrup24/new-meeting-1`).
  - Передача контактних даних учня (ім'я, email) у віджет та безпечне збереження лідів у Tina CMS.
- [x] **Технічне SEO та відкритість для ШІ**:
  - Налаштовано `public/robots.txt` з дозволом для ботів ШІ (`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`, `Bingbot`) та захистом службових шляхів.
  - Створено динамічну мапу сайту `src/app/sitemap.ts` (`/sitemap.xml`) для всіх сторінок і статей блогу.
  - Виправлено генерацію імен файлів клієнтів (запобігання помилкам кодування кирилиці).

---

## 📋 План на наступну сесію: SEO, ШІ-парсинг та реклама

1. **Оновлення домену сайту**:
   - Замінити тестовий домен `https://automenter.example.com` на реальну адресу (наприклад `https://auto-school-mentor.vercel.app` або власний домен) у `src/app/layout.tsx`, `src/app/about/page.tsx`, `src/app/sitemap.ts` та `public/robots.txt`.

2. **Розширення семантичної розмітки Schema.org**:
   - Додати мікророзмітку `BlogPosting` / `Article` для статей у блозі (`src/app/blog/[slug]/page.tsx`).
   - Створити блок **FAQ (Часті запитання)** з розміткою `FAQPage` (для швидких відповідей у Perplexity, Google AI Overviews та ChatGPT Search).

3. **Підключення інструментів вебмайстра (інструкція / налаштування)**:
   - Додавання сайту та `sitemap.xml` у **Google Search Console**.
   - Додавання сайту в **Bing Webmaster Tools** (критично для того, щоб сайт бачив ChatGPT Search і Copilot).

4. **Підготовка до запуску платної реклами (Google Ads / Facebook Ads)**:
   - Встановлення Google Tag / Google Analytics 4 (GA4).
   - Встановлення Meta Pixel (Facebook Pixel).
   - Налаштування відстеження конверсій (подія успішного заповнення форми попереднього запису та переходу в Calendly).
