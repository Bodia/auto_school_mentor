import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Впевненість за кермом починається з <span>правильного наставника</span>
            </h1>
            <p className="hero-subtitle">
              Індивідуальні заняття з ПДР та практичного водіння. Подолайте страх дороги, підготуйтеся до іспитів та станьте безпечним водієм разом зі мною.
            </p>
            <div className="hero-cta">
              <Link href="/booking" className="btn btn-primary btn-large cta-pulse">
                Забронювати безкоштовний 30-хв урок
              </Link>
              <p className="cta-subtext">Познайомимось, оцінимо ваш рівень та складемо план навчання.</p>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-placeholder glass">
              <span className="placeholder-text">[ Фото викладача за кермом або біля авто ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title text-center">Чому обирають мої заняття?</h2>
          <div className="features-grid">
            <div className="feature-card glass">
              <h3>🚗 Індивідуальний підхід</h3>
              <p>Навчання адаптується під ваш рівень: від абсолютного нуля до вдосконалення навичок після довгої перерви.</p>
            </div>
            <div className="feature-card glass">
              <h3>🧘‍♂️ Без стресу та крику</h3>
              <p>Спокійна атмосфера на заняттях. Моя мета — зробити так, щоб ви відчували себе комфортно за кермом.</p>
            </div>
            <div className="feature-card glass">
              <h3>🎯 Підготовка до іспитів</h3>
              <p>Відпрацювання екзаменаційних маршрутів Сервісних центрів МВС. Аналіз типових помилок.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section final-cta-section">
        <div className="container text-center">
          <h2>Готові зробити перший крок?</h2>
          <p>Не відкладайте свою безпеку та свободу пересування на потім.</p>
          <Link href="/booking" className="btn btn-secondary btn-large">
            Спробувати безкоштовно
          </Link>
        </div>
      </section>
    </div>
  );
}
