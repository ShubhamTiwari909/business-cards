"use client";

import { Link2, Mail, MapPin, Phone } from "lucide-react";
import { CardSchemaInput } from "../form/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { themesMapping } from "./themes";

const iconClass = "size-4 shrink-0 text-current opacity-70";

const CEO = ({ card }: { card: CardSchemaInput }) => {
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
        "relative w-full max-w-lg overflow-hidden rounded-2xl shadow-md transition-shadow duration-200 hover:shadow-lg",
        themesMapping.cardBg.bg,
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
      <div className="relative p-5 sm:p-7">
        <div className="flex flex-col items-center text-center">
          {company?.name && (
            <div className="mb-3 flex items-center justify-center gap-2">
              {company.logo?.url ? (
                <Image
                  width={40}
                  height={40}
                  src={company.logo.url}
                  alt=""
                  className="shrink-0 object-contain"
                />
              ) : null}
              <span
                className={cn(
                  "text-sm font-medium tracking-wide",
                  backgroundImage?.url
                    ? themesMapping.text.white
                    : themesMapping.text[700],
                )}
              >
                {company.name}
              </span>
            </div>
          )}
          {profileImage?.url ? (
            <Image
              width={96}
              height={96}
              src={profileImage.url}
              alt=""
              className={cn(
                "rounded-full object-cover border-2 shadow-sm size-24",
                backgroundImage?.url
                  ? themesMapping.border.white
                  : themesMapping.border[100],
                profileImage.config?.rounded ? "rounded-full" : "rounded-xl",
              )}
            />
          ) : (
            <div
              className={cn(
                "flex size-20 shrink-0 items-center justify-center rounded-full text-2xl font-semibold text-white sm:size-24 sm:text-3xl",
                themesMapping.bg[600],
              )}
            >
              {name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
          <h1
            className={cn(
              "mt-6 text-2xl font-semibold tracking-tight sm:text-3xl",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            {name}
          </h1>
          <p
            className={cn(
              "mt-1 text-sm font-medium",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[700],
            )}
          >
            {title}
          </p>
          {cardType && (
            <span
              className={cn(
                "mt-2 inline-block rounded px-2 py-0.5 text-xs font-medium",
                themesMapping.bg[100],
                themesMapping.text[700],
              )}
            >
              {cardType}
            </span>
          )}
        </div>

        {bio && (
          <p
            className={cn(
              "mx-auto mt-5 max-w-md border-t pt-5 text-center text-sm leading-relaxed",
              backgroundImage?.url
                ? themesMapping.border.white
                : themesMapping.border[100],
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            {bio}
          </p>
        )}

        <div
          className={cn(
            "mt-5 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 border-t pt-5 text-sm",
            backgroundImage?.url
              ? themesMapping.border.white
              : themesMapping.border[100],
          )}
        >
          {emails?.map(
            (item, i) =>
              item?.email && (
                <a
                  key={i}
                  href={`mailto:${item.email}`}
                  className={cn(
                    "inline-flex items-center gap-2 transition-colors hover:opacity-80 shrink-0",
                    backgroundImage?.url
                      ? themesMapping.text.white
                      : themesMapping.text[700],
                  )}
                >
                  <Mail className={iconClass} />
                  <span className="break-all">{item.email}</span>
                </a>
              ),
          )}
          {phones?.map(
            (item, i) =>
              item?.phone && (
                <a
                  key={i}
                  href={`tel:${item.phone.replace(/\s/g, "")}`}
                  className={cn(
                    "inline-flex items-center gap-2 transition-colors hover:opacity-80 shrink-0",
                    backgroundImage?.url
                      ? themesMapping.text.white
                      : themesMapping.text[700],
                  )}
                >
                  <Phone className={iconClass} />
                  <span>{item.phone}</span>
                </a>
              ),
          )}
        </div>

        {address && (
          <p
            className={cn(
              "mt-4 flex items-center justify-center gap-2 text-sm",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            <MapPin className={iconClass} />
            <span className="wrap-break-word">{address}</span>
          </p>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map(
              (link, i) =>
                link?.url && (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors hover:opacity-80",
                      backgroundImage?.url
                        ? themesMapping.border.white
                        : themesMapping.border[100],
                      backgroundImage?.url
                        ? themesMapping.text.white
                        : themesMapping.text[800],
                    )}
                    title={link.label ?? link.platform}
                  >
                    <Link2 className="size-3" />
                    {link.label ?? link.platform}
                  </a>
                ),
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default CEO;
