import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import HoverCard from "@/components/animations/HoverCard";
import { getSortedPricingData } from "@/lib/pricing";
import "./pricing.css";

export const metadata: Metadata = {
  title: "Послуги та ціни | АвтоМентор",
  description: "Ознайомтеся з форматами занять з ПДР. Перше заняття-знайомство (30 хв) — безкоштовно!",
};

export default function Pricing() {
  const allPricingData = getSortedPricingData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Формати навчання ПДР",
    "description": "Ціни та пакети на індивідуальні заняття з ПДР",
    "itemListElement": allPricingData.map((plan, index) => ({
      "@type": "Offer",
      "position": index + 1,
      "name": plan.title,
      "price": plan.price.replace(/[^0-9]/g, '') || "0",
      "priceCurrency": "UAH",
      "description": plan.description
    }))
  };

  return (
    <div className="pricing-page section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <FadeUp>
          <div className="pricing-header text-center">
            <h1 className="section-title">Формати навчання</h1>
            <p className="pricing-subtitle">
              Оберіть формат, який найкраще підходить для ваших цілей.
            </p>
          </div>
        </FadeUp>

        <div className="pricing-grid">
          {allPricingData.map((plan, index) => {
            const isHighlighted = !!plan.badge;
            const delay = 0.1 * (index + 1);
            const isTextPrice = isNaN(parseInt(plan.price));
            const isSoon = plan.price.includes('Скоро');

            return (
              <FadeUp delay={delay} key={plan.id}>
                <HoverCard className={`pricing-card glass h-full ${isHighlighted ? 'highlighted' : ''}`}>
                  {plan.badge && <div className="card-badge">{plan.badge}</div>}
                  <h3 className="card-title">{plan.title}</h3>
                  <div className={`card-price ${isTextPrice ? 'text-price' : ''} ${isSoon ? 'soon-price' : ''}`}>
                    {plan.price}
                    {plan.duration && <span>{plan.duration}</span>}
                  </div>
                  {plan.description && <p className="card-desc">{plan.description}</p>}
                  
                  {plan.features && plan.features.length > 0 && (
                    <ul className="card-features">
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  
                  {plan.disabled ? (
                    <button className={`btn btn-${plan.buttonVariant || 'outline'} w-full mt-auto`} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                      {plan.buttonText}
                    </button>
                  ) : (
                    <Link href={plan.buttonLink || "/booking"} className={`btn btn-${plan.buttonVariant || 'outline'} w-full mt-auto`}>
                      {plan.buttonText}
                    </Link>
                  )}
                </HoverCard>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </div>
  );
}
