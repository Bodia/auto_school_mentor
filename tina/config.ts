import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  "dev";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "mentor-panel",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Блог",
        path: "posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Заголовок",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Дата",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Опис",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Текст статті",
            isBody: true,
          },
        ],
      },
      {
        name: "pricing",
        label: "Тарифні плани",
        path: "pricing",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Назва тарифу",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "price",
            label: "Ціна",
            required: true,
          },
          {
            type: "string",
            name: "duration",
            label: "Тривалість (напр. '/ 60 хв')",
          },
          {
            type: "string",
            name: "description",
            label: "Опис",
          },
          {
            type: "string",
            name: "features",
            label: "Переваги",
            list: true,
          },
          {
            type: "string",
            name: "badge",
            label: "Бейдж (напр. 'Найкращий старт')",
          },
          {
            type: "string",
            name: "buttonText",
            label: "Текст кнопки",
            required: true,
          },
          {
            type: "string",
            name: "buttonLink",
            label: "Посилання кнопки",
          },
          {
            type: "string",
            name: "buttonVariant",
            label: "Стиль кнопки",
            options: ["primary", "outline"],
          },
          {
            type: "boolean",
            name: "disabled",
            label: "Кнопка неактивна?",
          },
          {
            type: "number",
            name: "order",
            label: "Порядок відображення",
            required: true,
          },
        ],
      },
      {
        name: "clients",
        label: "Клієнтська база",
        path: "clients",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Ім'я",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "email",
            label: "Email",
          },
          {
            type: "string",
            name: "phone",
            label: "Номер телефону",
          },
          {
            type: "string",
            name: "event_type",
            label: "Тариф / Урок (Тривалість)",
          },
          {
            type: "datetime",
            name: "booking_date",
            label: "Дата бронювання",
          },
          {
            type: "string",
            name: "notes",
            label: "Нотатки",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "reviews",
        label: "Відгуки учнів",
        path: "reviews",
        format: "md",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Ім'я учня",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Дата / Період (напр. 'Серпень 2024')",
            required: true,
          },
          {
            type: "number",
            name: "rating",
            label: "Оцінка (від 1 до 5)",
            required: true,
          },
          {
            type: "string",
            name: "text",
            label: "Текст відгуку",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "image",
            name: "avatar",
            label: "Фото учня (необов'язково)",
          },
          {
            type: "number",
            name: "order",
            label: "Порядок відображення",
            required: true,
          },
        ],
      },
      {
        name: "settings",
        label: "Контакти та соцмережі",
        path: "settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "phone",
            label: "Основний номер телефону (напр. +38 (097) 123-45-67)",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "phoneSecondary",
            label: "Додатковий номер телефону (необов'язково)",
          },
          {
            type: "string",
            name: "email",
            label: "Контактний Email (електронна пошта)",
            description: "Електронна пошта для зв'язку (відображається в підвалі, шапці та мікророзмітці)",
          },
          {
            type: "string",
            name: "address",
            label: "Місто / Формат (напр. Онлайн по всій Україні / м. Київ)",
          },
          {
            type: "string",
            name: "workingHours",
            label: "Години консультацій (напр. Пн-Нд: 08:00 — 21:00)",
          },
          {
            type: "object",
            name: "socials",
            label: "Соціальні мережі та месенджери",
            fields: [
              {
                type: "string",
                name: "telegram",
                label: "Telegram (посилання або @username)",
              },
              {
                type: "string",
                name: "viber",
                label: "Viber (номер телефону або посилання)",
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram (посилання або @username)",
              },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp (номер телефону або посилання)",
              },
              {
                type: "string",
                name: "youtube",
                label: "YouTube (посилання на канал)",
              },
              {
                type: "string",
                name: "tiktok",
                label: "TikTok (посилання або @username)",
              },
              {
                type: "string",
                name: "facebook",
                label: "Facebook (посилання)",
              },
            ],
          },
        ],
      },
    ],
  },
});
// Trigger re-index
