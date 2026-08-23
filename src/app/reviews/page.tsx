import type { Metadata } from "next";
import Link from "next/link";
import "./reviews.css";

export const metadata: Metadata = {
  title: "Відгуки учнів | АвтоМентор",
  description: "Дізнайтеся, що кажуть мої учні про індивідуальні заняття з водіння та підготовку до іспитів.",
};

const reviews = [
  {
    id: 1,
    name: "Олена К.",
    date: "Серпень 2024",
    text: "Дуже вдячна за терпіння та професіоналізм! Раніше панічно боялася виїжджати в центр міста, але після кількох занять страх зник. Рекомендую всім, хто хоче їздити безпечно.",
    rating: 5,
  },
  {
    id: 2,
    name: "Максим В.",
    date: "Липень 2024",
    text: "Готувалися до практичного іспиту. Відпрацювали всі маршрути СЦ, розібрали складні перехрестя. Здав з першого разу! Дуже крутий підхід до навчання.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ірина М.",
    date: "Травень 2024",
    text: "Права лежали на полиці 5 років. Завдяки вашим заняттям я нарешті сіла за кермо свого авто. Жодного крику, все спокійно і зрозуміло. Дякую!",
    rating: 5,
  },
  {
    id: 4,
    name: "Олександр Д.",
    date: "Квітень 2024",
    text: "Відмінний інструктор. Пояснює так, що зрозуміє навіть дитина. Особливо сподобалося, що навчив правильно паркуватися в реальних умовах між машинами.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <div className="reviews-page section">
      <div className="container">
        <div className="text-center">
          <h1 className="section-title">Відгуки моїх учнів</h1>
          <p className="reviews-subtitle">
            Найкращий доказ моєї роботи — це впевнені водії на дорогах.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card glass">
              <div className="review-header">
                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>
                <div className="review-meta">
                  <h3 className="review-name">{review.name}</h3>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <div className="review-rating">
                {"★".repeat(review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>

        <div className="reviews-cta text-center">
          <h3>Хочете стати наступним впевненим водієм?</h3>
          <Link href="/booking" className="btn btn-primary btn-large">
            Забронювати безкоштовний урок
          </Link>
        </div>
      </div>
    </div>
  );
}
