import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { can, loginInputSchema, type AuthenticatedUser, type TenantRole } from "@flamingo/cms-core";
import { showcaseTenant } from "./seed";

const sessionCookieName = "flamingo_session";
const csrfCookieName = "flamingo_csrf";
const sessionTtlMs = 1000 * 60 * 60 * 8;

type Session = {
  id: string;
  user: AuthenticatedUser;
  csrfToken: string;
  createdAt: Date;
  expiresAt: Date;
};

type SessionPayload = {
  id: string;
  user: AuthenticatedUser;
  csrfToken: string;
  createdAt: string;
  expiresAt: string;
};

const demoUsers: Array<AuthenticatedUser & { password: string }> = [
  {
    id: "user_agency_admin",
    email: "admin@flamingomedia.online",
    name: "Flamingo Admin",
    role: "agency_admin",
    tenantId: showcaseTenant.id,
    password: "admin123"
  },
  {
    id: "user_tenant_editor",
    email: "editor@flamingomedia.online",
    name: "Tenant Editor",
    role: "tenant_editor",
    tenantId: showcaseTenant.id,
    password: "editor123"
  }
];

export function getDemoUsers() {
  return demoUsers.map(({ password: _password, ...user }) => user);
}

export function createSession(input: unknown) {
  const parsed = loginInputSchema.parse(input);
  const demoUser = demoUsers.find(
    (user) => user.email === parsed.email && user.password === parsed.password
  );

  if (!demoUser) {
    throw new Error("Invalid credentials");
  }

  const { password: _password, ...user } = demoUser;
  return {
    id: randomToken("sess"),
    user,
    csrfToken: randomToken("csrf"),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + sessionTtlMs)
  };
}

export function applySessionCookies(response: NextResponse, session: Session) {
  response.cookies.set(sessionCookieName, signSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: session.expiresAt
  });
  response.cookies.set(csrfCookieName, session.csrfToken, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: session.expiresAt
  });
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set(sessionCookieName, "", { path: "/", maxAge: 0 });
  response.cookies.set(csrfCookieName, "", { path: "/", maxAge: 0 });
}

export function getSessionFromCookies() {
  const token = cookies().get(sessionCookieName)?.value;
  if (!token) {
    return null;
  }

  const session = verifySession(token);
  if (!session || session.expiresAt.getTime() < Date.now()) {
    return null;
  }

  return session;
}

export function requireAdminSession(permission?: string) {
  const session = getSessionFromCookies();
  if (!session) {
    throw new AuthError("Not authenticated", 401);
  }

  if (permission && !can(session.user.role, permission)) {
    throw new AuthError("Missing permission", 403);
  }

  return session;
}

export function requireAdminMutation(request: Request, permission: string) {
  const session = requireAdminSession(permission);
  const headerToken = request.headers.get("x-csrf-token");
  const cookieToken = cookies().get(csrfCookieName)?.value;

  if (
    !headerToken ||
    !cookieToken ||
    headerToken !== session.csrfToken ||
    cookieToken !== session.csrfToken
  ) {
    throw new AuthError("Invalid CSRF token", 403);
  }

  return session;
}

export function authErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json(
    { error: error instanceof Error ? error.message : "Unknown error" },
    { status: 400 }
  );
}

export function roleForSession(role: TenantRole) {
  return role;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

function signSession(session: Session) {
  const payload: SessionPayload = {
    id: session.id,
    user: session.user,
    csrfToken: session.csrfToken,
    createdAt: session.createdAt.toISOString(),
    expiresAt: session.expiresAt.toISOString()
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = createSignature(body);
  return `${body}.${signature}`;
}

function verifySession(token: string): Session | null {
  const [body, signature] = token.split(".");
  if (!body || !signature || !safeEqual(signature, createSignature(body))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    return {
      id: payload.id,
      user: payload.user,
      csrfToken: payload.csrfToken,
      createdAt: new Date(payload.createdAt),
      expiresAt: new Date(payload.expiresAt)
    };
  } catch {
    return null;
  }
}

function createSignature(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production");
  }

  return "development-only-session-secret-change-before-production";
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function randomToken(prefix: string) {
  return `${prefix}_${randomBytes(24).toString("base64url")}`;
}
