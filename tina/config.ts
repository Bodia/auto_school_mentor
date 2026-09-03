import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "",

  // Proxy content API requests through Vercel rewrites to bypass antivirus
  // HTTPS scanning that corrupts Content-Encoding headers on GraphQL responses.
  // See rewrites in next.config.ts: /tina-api/* → content.tinajs.io/*
  contentApiUrlOverride: typeof window === "undefined" 
    ? undefined 
    : `/tina-api/1.4/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ""}/github/${branch}`,
  tinaioConfig: {
    contentApiUrlOverride: typeof window === "undefined" ? undefined : "/tina-api",
  },

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
    ],
  },
});
