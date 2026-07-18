import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const isMockAuth =
  !process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID;

let _client: Auth0Client | null = null;

function getClient(): Auth0Client {
  if (_client) return _client;
  _client = new Auth0Client({
    signInReturnToPath: "/dashboard",
    authorizationParameters: {
      scope: "openid profile email",
    },
  });
  return _client;
}

export function getAuth0() {
  return getClient();
}

export async function getSafeSession() {
  if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID) {
    return null;
  }
  try {
    const client = getClient();
    return await client.getSession();
  } catch {
    return null;
  }
}
