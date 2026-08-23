import type { Metadata } from "next";
import Link from "next/link";
import "./about.css";

export const metadata: Metadata = {
  title: "Про мене | АвтоМентор",
  description: "Дізнайтеся більше про мій досвід, ліцензії та підхід до навчання водінню.",
};

export default function About() {
  return (
    <div className="about-page">
      <div className="container about-container section">
        <h1 className="section-title text-center">Про викладача</h1>
        
        <div className="about-content">
          <div className="about-image-placeholder glass">
            <span className="placeholder-text">[ Професійне фото викладача ]</span>
          </div>
          
          <div className="about-text">
            <h2>Привіт, я ваш АвтоМентор!</h2>
            <p>
              Я — сертифікований інструктор з індивідуального навчання водінню. Моя місія — не просто допомогти вам скласти іспит, а зробити з вас впевненого, безпечного та спокійного водія.
            </p>
            <p>
              Понад 10 років за кермом та сотні вдячних учнів доводять, що <strong>навчитися безпечно керувати авто може кожен</strong>, якщо знайти правильний підхід.
            </p>

            <div className="stats-grid">
              <div className="stat-card glass">
                <div className="stat-number">5+</div>
                <div className="stat-label">Років викладання</div>
              </div>
              <div className="stat-card glass">
                <div className="stat-number">300+</div>
                <div className="stat-label">Успішних учнів</div>
              </div>
              <div className="stat-card glass">
                <div className="stat-number">100%</div>
                <div className="stat-label">Індивідуальний підхід</div>
              </div>
            </div>

            <div className="about-cta">
              <Link href="/booking" className="btn btn-primary">
                Познайомитись на безкоштовному уроці
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
