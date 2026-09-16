import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  STAFF_ACCESS_COOKIE,
  STAFF_REFRESH_COOKIE,
} from "@/lib/admin/staff-session-cookies";

function hasStaffSession(request: NextRequest): boolean {
  return Boolean(
    request.cookies.get(STAFF_ACCESS_COOKIE)?.value ||
      request.cookies.get(STAFF_REFRESH_COOKIE)?.value,
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const session = hasStaffSession(request);

  if (isLogin) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
