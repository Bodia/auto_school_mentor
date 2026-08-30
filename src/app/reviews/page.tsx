import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import HoverCard from "@/components/animations/HoverCard";
import "./reviews.css";

export const metadata: Metadata = {
  title: "Відгуки учнів | АвтоМентор",
  description: "Дізнайтеся, що кажуть мої учні про індивідуальні заняття з ПДР та підготовку до теоретичних іспитів.",
};

const reviews = [
  {
    id: 1,
    name: "Олена К.",
    date: "Серпень 2024",
    text: "Дуже вдячна за пояснення! Раніше тести здавалися набором незрозумілих правил, а тепер я розумію логіку кожного знаку. Здала теорію з першого разу!",
    rating: 5,
  },
  {
    id: 2,
    name: "Максим В.",
    date: "Липень 2024",
    text: "Готувалися до теоретичного іспиту. Розібрали всі складні перехрестя і жести регулювальника, які завжди плутав. Дуже крутий підхід до навчання.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ірина М.",
    date: "Травень 2024",
    text: "Завдяки вашим заняттям я нарешті вивчила ПДР. Жодного зазубрювання, все на живих прикладах і схемах. Дякую!",
    rating: 5,
  },
  {
    id: 4,
    name: "Олександр Д.",
    date: "Квітень 2024",
    text: "Відмінний викладач. Пояснює так, що зрозуміє навіть дитина. Особливо сподобалося, як легко ми розібрали тему проїзду перехресть.",
    rating: 5,
  },
    {
      id: 5,
      name: "Світлана П.",
      date: "Лютий 2024",
      text: "Нарешті зрозуміла, як застосовувати правила в реальних ситуаціях. Тести здавав без проблем.",
      rating: 5,
    },
    {
      id: 6,
      name: "Андрій Т.",
      date: "Січень 2024",
      text: "Ваш підхід до розбору ПДР робить процес навчання цікавим і легким. Ставка на практичні приклади була вірною.",
      rating: 5,
    },
];

export default function Reviews() {
  return (
    <div className="reviews-page section">
      <div className="container">
        <FadeUp>
          <div className="text-center">
            <h1 className="section-title">Відгуки моїх учнів</h1>
            <p className="reviews-subtitle">
              Найкращий доказ моєї роботи — це відмінні результати на теоретичних іспитах.
            </p>
          </div>
        </FadeUp>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <FadeUp key={review.id} delay={0.1 * index}>
              <HoverCard className="review-card glass h-full">
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
              </HoverCard>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <div className="reviews-cta text-center">
            <h3>Хочете стати експертом з ПДР?</h3>
            <Link href="/booking" className="btn btn-primary btn-large mt-4 inline-block">
              Забронювати безкоштовний урок
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
