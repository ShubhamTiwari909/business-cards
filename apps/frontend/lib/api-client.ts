const getBaseUrl = (): string =>
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const cardsApiBaseUrl = (): string => `${getBaseUrl()}/api/cards`;

export const usersApiBaseUrl = (): string => `${getBaseUrl()}/api/users`;

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<{ data: T; status: number }> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
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
    let message: string;
    if (err && typeof err.message === "string") {
      message = err.message;
    } else if (err && typeof err.errors === "string") {
      message = err.errors;
    } else if (err && Array.isArray(err.errors)) {
      message = (err.errors as string[]).join(", ");
    } else {
      message = `Request failed (${res.status})`;
    }
    throw new Error(message);
  }
  return { data: data as T, status: res.status };
}
