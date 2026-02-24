"use client";

import { Link2, Mail, MapPin, Phone } from "lucide-react";
import { CardSchemaInput } from "../form/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { themesMapping } from "./themes";

const iconClass = "size-4 shrink-0 text-current opacity-70";

const Engineer = ({ card }: { card: CardSchemaInput }) => {
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
        "relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-lg transition-shadow duration-200 hover:shadow-xl",
        themesMapping.cardBg.bg,
        themesMapping.border[100],
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
      <div className="relative p-6 sm:p-7">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="flex shrink-0 items-start gap-4">
            {profileImage?.url ? (
              <Image
                width={72}
                height={72}
                src={profileImage.url}
                alt=""
                className={cn(
                  "rounded-lg object-cover border shadow-sm size-18",
                  backgroundImage?.url
                    ? themesMapping.border.white
                    : themesMapping.border[100],
                  profileImage.config?.rounded ? "rounded-full" : "rounded-lg",
                )}
              />
            ) : (
              <div
                className={cn(
                  "flex size-[72px] shrink-0 items-center justify-center rounded-lg border text-xl font-medium",
                  themesMapping.bg[600],
                  backgroundImage?.url
                    ? themesMapping.border.white
                    : themesMapping.border[100],
                  "text-white",
                )}
              >
                {name?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1
                className={cn(
                  "font-semibold tracking-tight text-lg",
                  backgroundImage?.url
                    ? themesMapping.text.white
                    : themesMapping.text[800],
                )}
              >
                {name}
              </h1>
              <p
                className={cn(
                  "mt-0.5 font-mono text-xs",
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
                    "mt-1.5 inline-block rounded py-0.5 font-mono text-[10px]",
                    themesMapping.bg[100],
                    themesMapping.text[700],
                  )}
                >
                  {cardType}
                </span>
              )}
            </div>
          </div>
        </header>

        {company?.name && (
          <div
            className={cn(
              "flex items-center gap-2 border-b pb-4 mt-3",
              backgroundImage?.url
                ? themesMapping.border.white
                : themesMapping.border[100],
            )}
          >
            {company.logo?.url ? (
              <Image
                width={20}
                height={20}
                src={company.logo.url}
                alt=""
                className="shrink-0 rounded object-contain"
              />
            ) : null}
            <span
              className={cn(
                "text-sm font-medium",
                backgroundImage?.url
                  ? themesMapping.text.white
                  : themesMapping.text[800],
              )}
            >
              {company.name}
            </span>
          </div>
        )}

        {bio && (
          <p
            className={cn(
              "mt-4 text-sm leading-relaxed",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            {bio}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {emails?.map(
            (item, i) =>
              item?.email && (
                <a
                  key={i}
                  href={`mailto:${item.email}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded py-1.5 text-sm transition-colors hover:opacity-80 shrink-0",
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
                    "inline-flex items-center gap-2 rounded py-1.5 text-sm transition-colors hover:opacity-80 shrink-0",
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
              "mt-4 flex items-start gap-2 border-t pt-4 text-sm",
              backgroundImage?.url
                ? themesMapping.border.white
                : themesMapping.border[100],
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            <MapPin className={cn("shrink-0 mt-0.5", iconClass)} />
            <span className="wrap-break-word">{address}</span>
          </p>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
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

export default Engineer;
