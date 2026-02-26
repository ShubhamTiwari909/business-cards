"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { logoutUser } from "@/lib/users-api";
const buttonClassName =
  "bg-zinc-100 text-zinc-900 shadow-none transition-all duration-200 hover:scale-105 hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-100 cursor-pointer";

type HeaderAuthProps = {
  buttonClassName?: string;
  onAction?: () => void;
};

export function HeaderAuth({
  buttonClassName: extraButtonClass,
  onAction,
}: HeaderAuthProps) {
  const { status, data } = useSession();

  if (status === "loading") {
    return (
      <div
        className={cn(
          "h-9 rounded-md px-3 text-xs bg-white/10 animate-pulse min-w-[100px]",
          extraButtonClass,
        )}
        data-testid="header-auth-loading"
      />
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        variant="default"
        size="sm"
        className={cn(buttonClassName, extraButtonClass)}
        onClick={() => {
          onAction?.();
          signIn("google");
        }}
        data-testid="header-sign-in-button"
      >
        Sign in with Google
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      size="sm"
      className={cn(buttonClassName, extraButtonClass)}
      onClick={() => {
        onAction?.();
        const accessToken = data?.user?.accessToken;
        signOut().then(() => {
          if (accessToken) {
            logoutUser(accessToken);
          }
        });
      }}
      data-testid="header-logout-button"
    >
      <span>Logout</span>
      {data?.user?.image?.trim() ? (
        <Image
          src={data.user.image}
          alt={data.user.name ?? "User avatar"}
          className="rounded-full"
          width={20}
          height={20}
        />
      ) : (
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-300 text-xs font-medium text-zinc-600"
          aria-hidden
        >
          {(data?.user?.name ?? "?").charAt(0).toUpperCase()}
        </span>
      )}
    </Button>
  );
}
