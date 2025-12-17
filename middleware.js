import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["en", "ms", "zh-cn", "zh-hk"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const locale = segments[1];

  if (!locales.includes(locale)) {
    const url = req.nextUrl.clone();
    if (pathname === "/") {
      url.pathname = "/en/properties";
    } else {
      url.pathname = `/en${pathname}`;
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"]
};
