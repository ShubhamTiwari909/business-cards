"use client";

import { Link2, Mail, MapPin, Phone } from "lucide-react";
import { CardSchemaInput } from "../form/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { themesMapping } from "./themes";

const iconClass = "size-4 shrink-0 text-current opacity-70";

const Marketing = ({ card }: { card: CardSchemaInput }) => {
  const {
    cardType,
    name,
    title,
    company,
    emails,
    phones,
    bio,
    profileImage,
    socialLinks,
    address,
    theme,
    backgroundImage,
  } = card;

  return (
    <article
      className={cn(
        "relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lg transition-shadow duration-200 hover:shadow-xl",
        themesMapping.cardBg.bg
      )}
      data-theme={theme}
    >
      {backgroundImage?.url ? (
        <>
          <Image
            src={backgroundImage.url}
            fill
            alt="Background Image"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </>
      ) : null}
      <div className={cn("h-1 w-full", themesMapping.accent)} aria-hidden />
      <div className="relative p-6 sm:p-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {profileImage?.url ? (
            <div className="flex flex-col gap-2 items-center justify-center">
              <Image
                width={88}
                height={88}
                src={profileImage.url}
                alt=""
                className={cn(
                  "shrink-0 rounded-xl object-cover shadow-md border size-18",
                  backgroundImage?.url ? themesMapping.border.white : themesMapping.border[100],
                  profileImage.config?.rounded ? "rounded-full" : "rounded-xl"
                )}
              />
              {cardType && (
                <span
                  className={cn(
                    "mt-2 inline-block rounded-full py-0.5 text-xs font-medium",
                    themesMapping.bg[100],
                    themesMapping.text[700]
                  )}
                >
                  {cardType}
                </span>
              )}
            </div>
          ) : (
            <div
              className={cn(
                "flex size-20 shrink-0 items-center justify-center rounded-xl text-2xl font-semibold text-white shadow-md sm:size-24",
                themesMapping.bg[600]
              )}
            >
              {name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1
              className={cn(
                "text-xl font-bold tracking-tight sm:text-2xl",
                backgroundImage?.url ? themesMapping.text.white : themesMapping.text[800]
              )}
            >
              {name}
            </h1>
            <p
              className={cn(
                "mt-1 text-sm font-semibold",
                backgroundImage?.url ? themesMapping.text.white : themesMapping.text[700]
              )}
            >
              {title}
            </p>
            {company?.name && (
              <div className="mt-2 flex items-center gap-2">
                {company.logo?.url ? (
                  <Image
                    width={18}
                    height={18}
                    src={company.logo.url}
                    alt=""
                    className="shrink-0"
                  />
                ) : null}
                <span
                  className={cn("text-sm font-medium", backgroundImage?.url ? themesMapping.text.white : themesMapping.text[700])}
                >
                  {company.name}
                </span>
              </div>
            )}

          </div>
        </header>

        {bio && (
          <p
            className={cn(
              "mt-6 border-t pt-6 text-sm leading-relaxed",
              backgroundImage?.url ? themesMapping.border.white : themesMapping.border[100],
              backgroundImage?.url ? themesMapping.text.white : themesMapping.text[800]
            )}
          >
            {bio}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {emails?.map(
            (item, i) =>
              item?.email && (
                <a
                  key={i}
                  href={`mailto:${item.email}`}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80",
                    backgroundImage?.url ? themesMapping.text.white : themesMapping.text[700]
                  )}
                >
                  <Mail className={iconClass} />
                  <span className="break-all">{item.email}</span>
                </a>
              )
          )}
          {phones?.map(
            (item, i) =>
              item?.phone && (
                <a
                  key={i}
                  href={`tel:${item.phone.replace(/\s/g, "")}`}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80",
                    backgroundImage?.url ? themesMapping.text.white : themesMapping.text[700]
                  )}
                >
                  <Phone className={iconClass} />
                  <span>{item.phone}</span>
                </a>
              )
          )}
        </div>

        {address && (
          <p
            className={cn(
              "mt-4 flex items-start gap-2 text-sm",
              backgroundImage?.url ? themesMapping.text.white : themesMapping.text[800]
            )}
          >
            <MapPin className={cn("shrink-0 mt-0.5", iconClass)} />
            <span className="wrap-break-word">{address}</span>
          </p>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map(
              (link, i) =>
                link?.url && (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:opacity-90",
                      backgroundImage?.url ? themesMapping.border.white : themesMapping.border[100],
                      backgroundImage?.url ? themesMapping.text.white : themesMapping.text[800]
                    )}
                    title={link.label ?? link.platform}
                  >
                    <Link2 className="size-3.5" />
                    {link.label ?? link.platform}
                  </a>
                )
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default Marketing;
