"use client";

import { useSearchParams } from "next/navigation";
import Form from "@/components/form/Form";
import { useSession } from "next-auth/react";
import UnAuthenticated from "@/components/sections/UnAuthenticated";

export default function CreateCardClient() {
  const searchParams = useSearchParams();
  const editingCardId = searchParams.get("id");
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center py-20"
        data-testid="create-card-loading"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <UnAuthenticated />;
  }

  return <Form editingCardId={editingCardId} />;
}
