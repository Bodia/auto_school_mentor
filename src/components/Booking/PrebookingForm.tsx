"use client";

import { useState } from "react";
import "./PrebookingForm.css"; // We'll create simple styles for it

type PrebookingFormProps = {
  eventType: string;
  eventLabel?: string;
};

export default function PrebookingForm({ eventType, eventLabel }: PrebookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Save client to Tina CMS via API
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventType: eventLabel || eventType }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        console.error("Failed to save client:", errJson);
      }
    } catch (err) {
      console.error("Failed to save client data", err);
    } finally {
      // Track conversion in Google Analytics
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
          event_category: "Booking",
          event_label: eventLabel || eventType,
        });
      }

      // Even if saving fails, we should let them book the lesson!
      setIsSubmitted(true);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    // Render Calendly iframe with pre-filled name and email
    const params = new URLSearchParams();
    if (formData.name) params.append("name", formData.name);
    if (formData.email) params.append("email", formData.email);
    const slugMap: Record<string, string> = {
      "60min": "new-meeting",
      "90min": "new-meeting-1",
      "pair": "new-meeting-1",
    };
    const slug = slugMap[eventType] || eventType;
    const calendlyUrl = `https://calendly.com/asusgrup24/${slug}?${params.toString()}`;

    return (
      <iframe
        src={calendlyUrl}
        width="100%"
        height="700"
        frameBorder="0"
        scrolling="no"
        title="Забронювати заняття через Calendly"
      ></iframe>
    );
  }

  return (
    <form className="prebooking-form" onSubmit={handleSubmit}>
      <h2>Крок 1: Ваші контактні дані</h2>
      <p>Будь ласка, заповніть форму нижче, щоб перейти до вибору часу в календарі.</p>

      <div className="form-group">
        <label htmlFor="name">Ім'я та Прізвище *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Іван Іваненко"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="ivan@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Номер телефону</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+38 (000) 000-00-00"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Завантаження..." : "Перейти до календаря"}
      </button>
    </form>
  );
}
