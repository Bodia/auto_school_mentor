import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Only apply basic auth to the /mentor-panel path
  if (req.nextUrl.pathname.startsWith("/mentor-panel")) {
    const basicAuth = req.headers.get("authorization");
    
    // Set your desired username and password here
    // Currently set to: admin / secret123
    const url = req.nextUrl;
    const user = process.env.ADMIN_USER || "admin";
    const pwd = process.env.ADMIN_PASSWORD || "secret123";

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [providedUser, providedPwd] = atob(authValue).split(":");

      if (providedUser === user && providedPwd === pwd) {
        return NextResponse.next();
      }
    }

    // Prompt for Basic Auth
    return new NextResponse("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mentor-panel/:path*"],
};
