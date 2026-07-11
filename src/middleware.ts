import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/property",
  "/expense",
  "/payment",
];

export function middleware(
  request: NextRequest
) {
  const session =
    request.cookies.get("rentpro_session");

  const { pathname } = request.nextUrl;

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (
    isProtected &&
    !session
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/property/:path*",
    "/expense/:path*",
    "/payment/:path*",
  ],
};