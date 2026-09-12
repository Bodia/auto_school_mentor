import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContactsData, formatPhoneForTel, getActiveSocials } from "@/lib/contacts";
import { PhoneIcon } from "@/components/SocialIcons";
import "./about.css";

export const metadata: Metadata = {
  title: "Про мене",
  description: "Дізнайтеся більше про мій досвід, ліцензії та підхід до вивчення теорії ПДР.",
};

export default function About() {
  const contacts = getContactsData();
  const activeSocials = getActiveSocials(contacts.socials);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "АвтоМентор",
    "jobTitle": "Сертифікований викладач ПДР",
    "description": "Сертифікований викладач з індивідуального вивчення теорії ПДР. Понад 20 років досвіду.",
    "url": "https://www.avtomentor.com/about",
    "telephone": contacts.phone,
    "email": contacts.email,
    "sameAs": activeSocials.map((s) => s.url),
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
              {contacts.phone && (
                <a
                  href={`tel:${formatPhoneForTel(contacts.phone)}`}
                  className="btn btn-outline about-phone-btn"
                  title="Зателефонувати зараз"
                >
                  <PhoneIcon size={18} />
                  <span>{contacts.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
