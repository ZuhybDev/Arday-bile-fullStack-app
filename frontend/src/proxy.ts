// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/accounts/login", request.url));
  }

  try {
    const decoded = jwt.decode(token) as {
      userId: string;
      email: string;
      role: string;
      schoolId?: string | null;
    };

    if (!decoded?.schoolId) {
      return NextResponse.redirect(
        new URL("/accounts/school-register/", request.url),
      );
    }

    // ✅ Allow access
    return NextResponse.next();
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return NextResponse.redirect(new URL("/accounts/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/students/:path*", "/dashboard/:path*"], // protect only those routes
};
