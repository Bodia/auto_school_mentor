import type { Metadata } from "next";
import "./booking.css";

export const metadata: Metadata = {
  title: "Забронювати заняття | АвтоМентор",
  description: "Оберіть зручний час для вашого індивідуального заняття з ПДР. Перший 30-хвилинний урок — безкоштовно!",
};

export default function Booking() {
  return (
    <div className="booking-page section">
      <div className="container">
        <div className="text-center booking-header">
          <h1 className="section-title">Запис на заняття</h1>
          <p className="booking-subtitle">
            Оберіть формат заняття та вільний час у календарі нижче.
          </p>
          <div className="booking-notice glass">
            <strong>🎁 Нагадування:</strong> Перше 30-хвилинне заняття-знайомство абсолютно безкоштовне!
          </div>
        </div>

        <div className="calendly-wrapper glass">
          {/* 
            Замініть URL нижче на ваше реальне посилання Calendly.
            Наприклад: https://calendly.com/ваше_імя/30min
          */}
          <iframe
            src="https://calendly.com"
            width="100%"
            height="700"
            frameBorder="0"
            scrolling="no"
            title="Забронювати заняття через Calendly"
          ></iframe>
        </div>
        
        <div className="payment-notice text-center">
          <p><em>* На даному етапі оплата через сайт не здійснюється. Ви оплачуєте заняття безпосередньо перед або після уроку.</em></p>
        </div>
      </div>
    </div>
  );
}
