import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
    },
  });
}

export async function GET(req: NextRequest) {
  return handleProxy(req, "GET");
}

export async function POST(req: NextRequest) {
  return handleProxy(req, "POST");
}

async function handleProxy(req: NextRequest, method: string) {
  const path = req.nextUrl.pathname.replace(/^\/tina-api/, "");
  const targetUrl = `https://content.tinajs.io${path}${req.nextUrl.search}`;

  try {
    const headers = new Headers();
    const contentType = req.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);

    const auth = req.headers.get("authorization");
    if (auth) headers.set("authorization", auth);

    const apiKey = req.headers.get("x-api-key");
    if (apiKey) headers.set("x-api-key", apiKey);

    const body = method === "POST" ? await req.text() : undefined;

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error: any) {
    console.error("Tina Proxy Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
