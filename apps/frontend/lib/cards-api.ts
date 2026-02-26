import { cardsApiBaseUrl, apiRequest } from "./api-client";
import type { BackendCard, CardSchemaInput } from "@/components/form/types";

export type CreateCardPayload = CardSchemaInput & {
  userId: string;
};

export async function getCardById(
  id: string,
  accessToken: string,
): Promise<BackendCard> {
  const { data } = await apiRequest<{ data: BackendCard }>(
    `${cardsApiBaseUrl()}/${encodeURIComponent(id)}`,
    { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!data?.data) {
    throw new Error("Card not found");
  }
  return data.data;
}

export async function createCard(
  payload: CreateCardPayload,
  accessToken: string,
): Promise<BackendCard> {
  const { data } = await apiRequest<{ data: BackendCard }>(
    `${cardsApiBaseUrl()}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );
  if (!data?.data) {
    throw new Error("Create response missing data");
  }
  return data.data;
}

export async function updateCard(
  id: string,
  payload: CreateCardPayload,
  accessToken: string,
): Promise<BackendCard> {
  const { data } = await apiRequest<{ data: BackendCard }>(
    `${cardsApiBaseUrl()}/update/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );
  if (!data?.data) {
    throw new Error("Update response missing data");
  }
  return data.data;
}
