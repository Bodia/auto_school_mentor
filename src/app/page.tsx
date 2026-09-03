import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import HoverCard from "@/components/animations/HoverCard";
import "./home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <FadeUp delay={0.1}>
              <h1 className="hero-title">
                Ідеальне знання ПДР починається з <span>правильного наставника</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="hero-subtitle">
                Індивідуальні заняття з Правил дорожнього руху. Зрозумійте логіку ПДР, підготуйтеся до теоретичного іспиту без зазубрювання та станьте експертом теорії разом зі мною.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <div className="hero-cta">
                <Link href="/booking" className="btn btn-primary btn-large cta-pulse inline-block">
                  Забронювати безкоштовний 30-хв урок
                </Link>
                <p className="cta-subtext">Познайомимось, оцінимо ваш рівень та складемо план навчання.</p>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.4}>
            <div className="hero-image-wrapper">
              <Image 
                src="/instructor.webp" 
                alt="Викладач теорії ПДР АвтоМентор біля навчальної дошки" 
                width={600} 
                height={750} 
                className="hero-image"
                priority
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <FadeUp>
            <h2 className="section-title text-center">Чому обирають мої заняття?</h2>
          </FadeUp>
          <div className="features-grid">
            <FadeUp delay={0.1}>
              <HoverCard className="feature-card glass h-full">
                <h3>🚗 Індивідуальний підхід</h3>
                <p>Навчання адаптується під ваш рівень: від абсолютного нуля до впевненого знання кожного знаку та правила.</p>
              </HoverCard>
            </FadeUp>
            <FadeUp delay={0.2}>
              <HoverCard className="feature-card glass h-full">
                <h3>🧘‍♂️ Без стресу та крику</h3>
                <p>Спокійна атмосфера на заняттях. Моя мета — зробити так, щоб ви відчували себе впевнено на теоретичному іспиті.</p>
              </HoverCard>
            </FadeUp>
            <FadeUp delay={0.3}>
              <HoverCard className="feature-card glass h-full">
                <h3>🎯 Підготовка до іспитів</h3>
                <p>Розбір екзаменаційних білетів Головного сервісного центру МВС. Аналіз складних перехресть на схемах та типових помилок.</p>
              </HoverCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section final-cta-section">
        <div className="container text-center">
          <FadeUp>
            <h2>Готові зробити перший крок?</h2>
            <p>Не відкладайте свою безпеку та свободу пересування на потім.</p>
            <Link href="/booking" className="btn btn-secondary btn-large mt-4 inline-block">
              Спробувати безкоштовно
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
