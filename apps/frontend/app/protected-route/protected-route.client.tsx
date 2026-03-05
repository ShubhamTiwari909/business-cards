"use client";
import { useSession } from "next-auth/react";
import UnAuthenticated from "@/components/sections/UnAuthenticated";

export default function CreateCardClient() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return <UnAuthenticated />;
  }

  return <div>Protected Route</div>;
}
