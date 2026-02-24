"use client";

import { useSearchParams } from "next/navigation";
import Form from "@/components/form/Form";

export default function CreateCardClient() {
  const searchParams = useSearchParams();
  const editingCardId = searchParams.get("id");

  return <Form editingCardId={editingCardId} />;
}
