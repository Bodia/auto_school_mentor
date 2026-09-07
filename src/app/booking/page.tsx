import type { Metadata } from "next";
import "./booking.css";
import PrebookingForm from "@/components/Booking/PrebookingForm";

export const metadata: Metadata = {
  title: "Забронювати заняття | АвтоМентор",
  description: "Оберіть зручний час для вашого індивідуального заняття з ПДР. Перший 30-хвилинний урок — безкоштовно!",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function Booking({ searchParams }: Props) {
  const params = await searchParams;
  const type = params?.type || "30min";
  
  const eventTypes: Record<string, string> = {
    "30min": "30min",
    "60min": "60min",
    "90min": "90min",
  };
  
  const eventType = typeof type === 'string' && eventTypes[type] ? eventTypes[type] : "30min";
  const calendlyUrl = `https://calendly.com/asusgrup24/${eventType}`;

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

        <div className="calendly-wrapper glass" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PrebookingForm eventType={eventType} />
        </div>
        
        <div className="payment-notice text-center">
          <p><em>* На даному етапі оплата через сайт не здійснюється. Ви оплачуєте заняття безпосередньо перед або після уроку.</em></p>
        </div>
      </div>
    </div>
  );
}
