import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16: Proxy reemplaza la convención `middleware.ts` deprecada.
 * @see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md
 *
 * D6: español SIN prefijo en la raíz, inglés bajo /en. El visitante nunca ve
 * /es en la barra de direcciones — se REESCRIBE (rewrite), nunca se redirige.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    requestHeaders.set("x-locale", "en");
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set("Content-Language", "en");
    return response;
  }

  requestHeaders.set("x-locale", "es");
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
  const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  response.headers.set("Content-Language", "es");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
