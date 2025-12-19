import { NextResponse } from "next/server";

export function proxy(req: Request) {
  const cookies = req.headers.get("cookie") || "";
  const isLoggedIn = cookies.includes("idToken=");

  const pathname = new URL(req.url).pathname;

  if (
    isLoggedIn &&
    (pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    !isLoggedIn &&
    (pathname === "/" ||
      pathname.startsWith("/matters") ||
      pathname.startsWith("/ai-consultant"))
  ) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/signin", "/auth/signup", "/", "/matters", "/ai-consultant"],
};
