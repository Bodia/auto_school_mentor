import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import HoverCard from "@/components/animations/HoverCard";
import { getSortedReviewsData } from "@/lib/reviews";
import "./reviews.css";

export const metadata: Metadata = {
  title: "Відгуки учнів",
  description: "Дізнайтеся, що кажуть мої учні про індивідуальні заняття з ПДР та підготовку до теоретичних іспитів.",
};

export default function Reviews() {
  const reviews = getSortedReviewsData();

  // Обчислення середнього рейтингу для SEO та ШІ
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  // Структуровані дані Schema.org для пошукових систем (Google, Bing) та ШІ (ChatGPT Search, Perplexity)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "АвтоМентор — Індивідуальні уроки ПДР",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name,
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": (r.rating || 5).toString(),
        "bestRating": "5",
      },
      "reviewBody": r.text,
    })),
  };

  return (
    <div className="reviews-page section">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                    {review.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={review.avatar} alt={review.name} />
                    ) : (
                      review.name.charAt(0)
                    )}
                  </div>
                  <div className="review-meta">
                    <h3 className="review-name">{review.name}</h3>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {"★".repeat(review.rating || 5)}
                </div>
                <p className="review-text">&ldquo;{review.text}&rdquo;</p>
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
