import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/dashboard", "/admin"];
const publicOnlyRoutes = ["/login", "/register"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicOnlyRoute = publicOnlyRoutes.includes(path);

  const session = await decrypt(req.cookies.get("session")?.value);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicOnlyRoute && session?.userId) {
    const destination = session.isAdmin ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(destination, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
