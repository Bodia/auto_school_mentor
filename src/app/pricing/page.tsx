import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import HoverCard from "@/components/animations/HoverCard";
import "./pricing.css";

export const metadata: Metadata = {
  title: "Послуги та ціни | АвтоМентор",
  description: "Ознайомтеся з форматами занять з ПДР. Перше заняття-знайомство (30 хв) — безкоштовно!",
};

export default function Pricing() {
  return (
    <div className="pricing-page section">
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
          {/* Free Trial Card */}
          <FadeUp delay={0.1}>
            <HoverCard className="pricing-card highlighted glass h-full">
              <div className="card-badge">Найкращий старт</div>
              <h3 className="card-title">Знайомство</h3>
              <div className="card-price">Безкоштовно<span>/ 30 хв</span></div>
              <p className="card-desc">Ідеально для того, щоб познайомитись та скласти план.</p>
              <ul className="card-features">
                <li>Оцінка вашого рівня</li>
                <li>Обговорення цілей (іспит, нерозуміння правил)</li>
                <li>Складання індивідуального плану</li>
                <li>Відповіді на ваші запитання</li>
              </ul>
              <Link href="/booking" className="btn btn-primary w-full mt-auto">
                Забронювати зараз
              </Link>
            </HoverCard>
          </FadeUp>

          {/* Standard Lesson */}
          <FadeUp delay={0.2}>
            <HoverCard className="pricing-card glass h-full">
              <h3 className="card-title">Індивідуальний урок з ПДР</h3>
              <div className="card-price">800 грн<span>/ 60 хв</span></div>
              <p className="card-desc">Повноцінне заняття з розбору правил та дорожніх ситуацій.</p>
              <ul className="card-features">
                <li>Онлайн або офлайн формат</li>
                <li>Розбір складних тем (регулювальник, перехрестя)</li>
                <li>Відповіді на ваші запитання</li>
                <li>Аналіз реальних схем</li>
              </ul>
              <Link href="/booking" className="btn btn-outline w-full mt-auto">
                Забронювати
              </Link>
            </HoverCard>
          </FadeUp>

          {/* Exam Prep */}
          <FadeUp delay={0.3}>
            <HoverCard className="pricing-card glass h-full">
              <h3 className="card-title">Інтенсив до теоретичного іспиту</h3>
              <div className="card-price">1200 грн<span>/ 90 хв</span></div>
              <p className="card-desc">Цільова підготовка до здачі теорії в СЦ МВС.</p>
              <ul className="card-features">
                <li>Розбір офіційних білетів</li>
                <li>Симуляція іспиту</li>
                <li>Лайфхаки для запам'ятовування</li>
                <li>Психологічна підготовка</li>
              </ul>
              <Link href="/booking" className="btn btn-outline w-full mt-auto">
                Забронювати
              </Link>
            </HoverCard>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
