import { NextResponse } from "next/server";
import {
  createMockSessionCookie,
  validateMockCredentials,
} from "@/lib/auth/mock-session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { error: "Completá email y contraseña" },
      { status: 400 }
    );
  }

  const user = validateMockCredentials(body.email, body.password);
  if (!user) {
    return NextResponse.json(
      { error: "Email o contraseña incorrectos" },
      { status: 401 }
    );
  }

  const cookie = createMockSessionCookie(user);
  const res = NextResponse.json({ user });
  res.headers.append("Set-Cookie", cookie);
  return res;
}
