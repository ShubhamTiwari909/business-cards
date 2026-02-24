import { cardsApiBaseUrl, apiRequest } from "./api-client";
import type { BackendCard, CardSchemaInput } from "@/components/form/types";

export type CreateCardPayload = Omit<CardSchemaInput, "backgroundImage"> & {
  userId: string;
  backgroundImage?: { url?: string };
};

export async function getCardById(id: string): Promise<BackendCard> {
  const { data } = await apiRequest<{ data: BackendCard }>(
    `${cardsApiBaseUrl()}/${encodeURIComponent(id)}`,
    { method: "GET" },
  );
  if (!data?.data) {
    throw new Error("Card not found");
  }
  return data.data;
}

export async function createCard(
  payload: CreateCardPayload,
): Promise<BackendCard> {
  const { data } = await apiRequest<{ data: BackendCard }>(
    `${cardsApiBaseUrl()}/create`,
    {
      method: "POST",
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
): Promise<BackendCard> {
  const { data } = await apiRequest<{ data: BackendCard }>(
    `${cardsApiBaseUrl()}/update/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
  if (!data?.data) {
    throw new Error("Update response missing data");
  }
  return data.data;
}
