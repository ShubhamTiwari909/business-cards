import { apiRequest, usersApiBaseUrl } from "./api-client";

export type AddUserPayload = {
  name: string;
  email: string;
  image?: string;
  provider?: "google";
};

export async function addUser(payload: AddUserPayload, internalSecret: string) {
  const { status, data } = await apiRequest<{
    message: string;
    accessToken: string;
  }>(`${usersApiBaseUrl()}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": internalSecret,
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      image: payload.image,
      provider: payload.provider ?? "google",
    }),
  });
  return { status, data };
}

export async function logoutUser(accessToken: string) {
  const { status, data } = await apiRequest<{ ok: boolean }>(
    `${usersApiBaseUrl()}/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return { status, data };
}
