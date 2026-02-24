const getBaseUrl = (): string =>
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const cardsApiBaseUrl = (): string =>
  `${getBaseUrl()}/api/cards`;

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<{ data: T; status: number }> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    throw new Error(res.ok ? "Invalid JSON response" : text || res.statusText);
  }
  if (!res.ok) {
    const err = data as { message?: string; errors?: string | string[] } | null;
    const message =
      err && typeof err.message === "string"
        ? err.message
        : err && typeof err.errors === "string"
          ? err.errors
          : err && Array.isArray(err.errors)
            ? (err.errors as string[]).join(", ")
            : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return { data: data as T, status: res.status };
}
