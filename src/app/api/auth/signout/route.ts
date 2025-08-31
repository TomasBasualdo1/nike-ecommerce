import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Use Better Auth's sign out
    return await auth.handler(request);
  } catch (error) {
    console.error("Sign out error:", error);

    // Fallback: clear cookies manually
    const response = NextResponse.json({ success: true });
    response.cookies.delete("better-auth.session_token");
    response.cookies.delete("better-auth.csrf_token");

    return response;
  }
}
