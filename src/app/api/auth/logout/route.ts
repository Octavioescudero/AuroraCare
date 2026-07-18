import { NextResponse } from "next/server";
import { clearMockSessionCookie } from "@/lib/auth/mock-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", clearMockSessionCookie());
  return res;
}
