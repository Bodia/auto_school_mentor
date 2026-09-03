import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./about.css";

export const metadata: Metadata = {
  title: "Про мене | АвтоМентор",
  description: "Дізнайтеся більше про мій досвід, ліцензії та підхід до вивчення теорії ПДР.",
};

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "АвтоМентор",
    "jobTitle": "Сертифікований викладач ПДР",
    "description": "Сертифікований викладач з індивідуального вивчення теорії ПДР. Понад 20 років досвіду.",
    "url": "https://automenter.example.com/about",
    "sameAs": []
  };

  return (
    <div className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container about-container section">
        <h1 className="section-title text-center">Про викладача</h1>
        
        <div className="about-content">
          <div className="about-image-wrapper">
            <Image
              src="/instructor-about.webp"
              alt="Викладач теорії ПДР АвтоМентор за навчальним столом"
              width={600}
              height={800}
              className="about-image"
              priority
            />
          </div>
          
          <div className="about-text">
            <h2>Привіт, я ваш АвтоМентор!</h2>
            <p>
              Я — сертифікований викладач з індивідуального вивчення теорії ПДР. Моя місія — не просто допомогти вам скласти іспит, а навчити розуміти кожне правило та дорожню ситуацію.
            </p>
            <p>
              Багаторічний досвід викладання та глибоке знання ПДР доводять, що <strong>зрозуміти правила може кожен</strong>, якщо знайти правильний підхід.
            </p>

            <div className="stats-grid">
              <div className="stat-card glass">
                <div className="stat-number">20+</div>
                <div className="stat-label">Років викладання</div>
              </div>
              <div className="stat-card glass">
          <div className="stat-number">3000+</div>
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
