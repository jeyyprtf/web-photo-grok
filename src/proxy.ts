import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip admin, api, static, uploads
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    // Protect admin dashboard routes (not login)
    if (
      pathname.startsWith("/admin") &&
      !pathname.startsWith("/admin/login") &&
      pathname !== "/admin"
    ) {
      const session = request.cookies.get("juan_session");
      if (!session?.value) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const header = request.headers.get("accept-language") || "";
  const preferred = header.split(",")[0]?.split("-")[0]?.toLowerCase();
  const locale =
    (cookieLocale && isLocale(cookieLocale) && cookieLocale) ||
    (preferred && isLocale(preferred) && preferred) ||
    defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
