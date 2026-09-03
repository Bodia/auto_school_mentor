import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Extract the path after /tina-api
  const path = req.nextUrl.pathname.replace(/^\/tina-api/, "");
  const targetUrl = `https://content.tinajs.io${path}${req.nextUrl.search}`;

  try {
    const body = await req.text();
    
    const headers = new Headers();
    const contentType = req.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);
    
    const auth = req.headers.get("authorization");
    if (auth) headers.set("authorization", auth);
    
    const apiKey = req.headers.get("x-api-key");
    if (apiKey) headers.set("x-api-key", apiKey);

    const response = await fetch(targetUrl, {
      method: "POST",
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
