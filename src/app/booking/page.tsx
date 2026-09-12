import type { Metadata } from "next";
import "./booking.css";
import PrebookingForm from "@/components/Booking/PrebookingForm";

export const metadata: Metadata = {
  title: "Забронювати заняття",
  description: "Оберіть зручний час для вашого індивідуального заняття з ПДР. Перший 30-хвилинний урок — безкоштовно!",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

const eventConfig: Record<string, { slug: string; title: string }> = {
  "30min": {
    slug: "30min",
    title: "Безкоштовний 30-хв урок",
  },
  "60min": {
    slug: "new-meeting",
    title: "Індивідуальний урок (60 хв)",
  },
  "new-meeting": {
    slug: "new-meeting",
    title: "Індивідуальний урок (60 хв)",
  },
  "90min": {
    slug: "new-meeting-1",
    title: "Інтенсив (парні заняття, 90 хв)",
  },
  "pair": {
    slug: "new-meeting-1",
    title: "Інтенсив (парні заняття, 90 хв)",
  },
  "new-meeting-1": {
    slug: "new-meeting-1",
    title: "Інтенсив (парні заняття, 90 хв)",
  },
};

export default async function Booking({ searchParams }: Props) {
  const params = await searchParams;
  const rawType = (typeof params?.type === 'string' ? params.type : "30min") || "30min";
  
  const selectedEvent = eventConfig[rawType] || eventConfig["30min"];
  const eventSlug = selectedEvent.slug;
  const eventTitle = selectedEvent.title;

  return (
    <div className="booking-page section">
      <div className="container">
        <div className="text-center booking-header">
          <h1 className="section-title">Запис на заняття</h1>
          <p className="booking-subtitle">
            Обраний формат: <strong>{eventTitle}</strong>. Оберіть вільний час у календарі нижче.
          </p>
          {rawType === "30min" && (
            <div className="booking-notice glass">
              <strong>🎁 Нагадування:</strong> Перше 30-хвилинне заняття-знайомство абсолютно безкоштовне!
            </div>
          )}
        </div>

        <div className="calendly-wrapper">
          <PrebookingForm eventType={eventSlug} eventLabel={eventTitle} />
        </div>
        
        <div className="payment-notice text-center">
          <p><em>* На даному етапі оплата через сайт не здійснюється. Ви оплачуєте заняття безпосередньо перед або після уроку.</em></p>
        </div>
      </div>
    </div>
  );
}
