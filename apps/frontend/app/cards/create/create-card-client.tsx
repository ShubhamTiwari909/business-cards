"use client";

import { useSearchParams } from "next/navigation";
import Form from "@/components/form/Form";
import { useSession } from "next-auth/react";
import { HeaderAuth } from "@/components/layout/header-auth";

export default function CreateCardClient() {
  const searchParams = useSearchParams();
  const editingCardId = searchParams.get("id");
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <div
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-slate-800/90 to-slate-900/90 px-8 py-12 shadow-[0_0_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm"
          data-testid="sign-in-card"
        >
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <svg
                className="size-8 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-100 md:text-2xl">
                Sign in to create a card
              </h2>
              <p className="text-sm text-zinc-400 md:text-base">
                Use your Google account to get started and save your business
                cards.
              </p>
            </div>
            <HeaderAuth buttonClassName="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    );
  }

  return <Form editingCardId={editingCardId} />;
}
