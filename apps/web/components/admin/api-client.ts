"use client";

let csrfTokenCache: string | null = null;

export async function adminFetch(url: string, init: RequestInit = {}) {
  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);

  if (method !== "GET" && method !== "HEAD") {
    headers.set("x-csrf-token", await getCsrfToken());
  }

  return fetch(url, {
    ...init,
    headers
  });
}

async function getCsrfToken() {
  if (csrfTokenCache) {
    return csrfTokenCache;
  }

  const response = await fetch("/api/auth/session");
  if (!response.ok) {
    window.location.href = "/admin/login";
    throw new Error("Not authenticated");
  }

  const session = await response.json();
  csrfTokenCache = String(session.csrfToken);
  return csrfTokenCache;
}
