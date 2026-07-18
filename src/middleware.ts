import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isMockAuth, getMockSessionFromRequest } from "@/lib/auth/mock-session";
import { getAuth0, getSafeSession } from "@/lib/api/auth0";

const protectedPaths = ["/dashboard", "/patient", "/alerts", "/routines", "/settings"];
const authPaths = ["/login"];

function isProtectedPath(pathname: string) {
  return protectedPaths.some((p) => pathname.startsWith(p));
}

function isAuthPath(pathname: string) {
  return authPaths.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isMockAuth) {
    const user = getMockSessionFromRequest(request as unknown as Request);

    if (isProtectedPath(pathname) && !user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAuthPath(pathname) && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  const auth0 = getAuth0();
  const authRes = await auth0.middleware(request);

  if (
    authRes.headers.get("location") &&
    authRes.status >= 300 &&
    authRes.status < 400
  ) {
    return authRes;
  }

  if (isProtectedPath(pathname)) {
    const session = await getSafeSession();
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return authRes;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons|api/auth).*)",
  ],
};
