import { cookies } from "next/headers";

export interface MockUser {
  name: string;
  email: string;
  picture?: string;
}

const SESSION_COOKIE = "aurora_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const MOCK_CREDENTIALS = {
  email: "admin@aurora.care",
  password: "admin",
  user: {
    name: "Admin",
    email: "admin@aurora.care",
    picture: undefined,
  },
};

export const isMockAuth = !process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID;

export async function getMockSession(): Promise<MockUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const user = JSON.parse(raw) as MockUser;
    if (!user.email) return null;
    return user;
  } catch {
    return null;
  }
}

export function createMockSessionCookie(user: MockUser): string {
  const value = encodeURIComponent(JSON.stringify(user));
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

export function clearMockSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function validateMockCredentials(
  email: string,
  password: string
): MockUser | null {
  if (
    email.toLowerCase() === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  ) {
    return MOCK_CREDENTIALS.user;
  }
  return null;
}

export function getMockSessionFromRequest(req: Request): MockUser | null {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  if (!match) return null;
  const raw = decodeURIComponent(match.split("=").slice(1).join("="));
  try {
    const user = JSON.parse(raw) as MockUser;
    if (!user.email) return null;
    return user;
  } catch {
    return null;
  }
}
