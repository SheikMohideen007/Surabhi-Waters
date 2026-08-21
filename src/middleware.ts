import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const signedIn = await isValidAdminSession(token);

  if (pathname.startsWith("/admin/login")) {
    if (signedIn) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (signedIn) return NextResponse.next();

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
