import type { Metadata } from "next";
import Link from "next/link";
import "./pricing.css";

export const metadata: Metadata = {
  title: "Послуги та ціни | АвтоМентор",
  description: "Ознайомтеся з форматами занять з ПДР та водіння. Перше заняття-знайомство (30 хв) — безкоштовно!",
};

export default function Pricing() {
  return (
    <div className="pricing-page section">
      <div className="container">
        <div className="pricing-header text-center">
          <h1 className="section-title">Формати навчання</h1>
          <p className="pricing-subtitle">
            Оберіть формат, який найкраще підходить для ваших цілей.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Free Trial Card */}
          <div className="pricing-card highlighted glass">
            <div className="card-badge">Найкращий старт</div>
            <h3 className="card-title">Знайомство</h3>
            <div className="card-price">Безкоштовно<span>/ 30 хв</span></div>
            <p className="card-desc">Ідеально для того, щоб познайомитись та скласти план.</p>
            <ul className="card-features">
              <li>Оцінка вашого рівня</li>
              <li>Обговорення цілей (іспит, страх міста)</li>
              <li>Складання індивідуального плану</li>
              <li>Відповіді на ваші запитання</li>
            </ul>
            <Link href="/booking" className="btn btn-primary w-full">
              Забронювати зараз
            </Link>
          </div>

          {/* Standard Lesson */}
          <div className="pricing-card glass">
            <h3 className="card-title">Практичне заняття</h3>
            <div className="card-price">800 грн<span>/ 60 хв</span></div>
            <p className="card-desc">Повноцінне заняття в місті або на майданчику.</p>
            <ul className="card-features">
              <li>Індивідуальний підхід</li>
              <li>Автомобіль на механіці або автоматі</li>
              <li>Відпрацювання паркування</li>
              <li>Складні перехрестя міста</li>
            </ul>
            <Link href="/booking" className="btn btn-outline w-full">
              Забронювати
            </Link>
          </div>

          {/* Exam Prep */}
          <div className="pricing-card glass">
            <h3 className="card-title">Підготовка до іспиту</h3>
            <div className="card-price">1200 грн<span>/ 90 хв</span></div>
            <p className="card-desc">Цільова підготовка до здачі практичного іспиту.</p>
            <ul className="card-features">
              <li>Екзаменаційні маршрути СЦ МВС</li>
              <li>Імітація реального іспиту</li>
              <li>Детальний розбір помилок</li>
              <li>Психологічна підготовка</li>
            </ul>
            <Link href="/booking" className="btn btn-outline w-full">
              Забронювати
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
