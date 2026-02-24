"use client";

import { Link2, Mail, MapPin, Phone } from "lucide-react";
import { CardSchemaInput } from "../form/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { themesMapping } from "./themes";

const iconClass = "size-4 shrink-0 text-current opacity-70";

const Modern = ({ card }: { card: CardSchemaInput }) => {
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
        "relative flex w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl transition-shadow hover:shadow-2xl hover:shadow-black/15",
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
      {/* Left sidebar: accent + profile + name/title */}
      <div
        className={cn(
          "relative z-10 flex w-36 shrink-0 flex-col justify-between items-center gap-4 rounded-l-2xl p-5 sm:w-40",
          themesMapping.accent,
        )}
      >
        <div>
          {cardType && (
            <span
              className={cn(
                "w-fit rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white/90",
              )}
            >
              {cardType.toUpperCase()}
            </span>
          )}
          {profileImage?.url ? (
            <Image
              width={80}
              height={80}
              src={profileImage.url}
              alt="Profile"
              className={cn(
                "rounded-lg object-cover shadow-md size-20 border-2 border-white/30",
                profileImage.config?.rounded ? "rounded-full" : "rounded-lg",
              )}
            />
          ) : (
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-2xl font-semibold text-white shadow-inner">
              {name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-base font-bold leading-tight text-white">
            {name}
          </h1>
          <p className="mt-0.5 text-xs font-medium text-white/90">{title}</p>
        </div>
      </div>

      {/* Right content */}
      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        {company?.name && (
          <p
            className={cn(
              "mb-3 flex items-center gap-2 text-sm",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            {company.logo?.url ? (
              <Image
                width={18}
                height={18}
                src={company.logo.url}
                alt=""
                className="shrink-0"
              />
            ) : null}
            <span>{company.name}</span>
          </p>
        )}

        {bio && (
          <p
            className={cn(
              "mb-4 border-b pb-4 text-sm leading-relaxed",
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

        {emails && emails.length > 0 && (
          <ul
            className={cn(
              "flex flex-wrap gap-5",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[700],
            )}
          >
            {emails.map((item, i) => (
              <li key={i}>
                {item.email ? (
                  <a
                    href={`mailto:${item.email}`}
                    className="flex items-center gap-2 rounded py-1.5 text-sm transition-colors hover:opacity-80"
                  >
                    <Mail className={iconClass} />
                    <span>{item.email}</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-2 py-1.5 text-sm">
                    <Mail className={iconClass} />
                    <span>{item?.email ?? ""}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {phones && phones.length > 0 && (
          <ul
            className={cn(
              "mt-1 flex flex-wrap gap-5",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[700],
            )}
          >
            {phones.map((item, i) => (
              <li key={i}>
                {item.phone ? (
                  <a
                    href={`tel:${item.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 rounded py-1.5 text-sm transition-colors hover:opacity-80"
                  >
                    <Phone className={iconClass} />
                    <span>{item.phone}</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-2 py-1.5 text-sm">
                    <Phone className={iconClass} />
                    <span>{item?.phone ?? ""}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {address && (
          <p
            className={cn(
              "mt-5 border-t pt-5 flex items-start gap-2 text-sm",
              backgroundImage?.url
                ? themesMapping.border.white
                : themesMapping.border[100],
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            <MapPin className={iconClass} />
            <span className="wrap-anywhere">{address}</span>
          </p>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map(
              (link, i) =>
                link?.url && (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors border border-gray-700",
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

export default Modern;
