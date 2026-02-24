"use client";

import { Link2, Mail, MapPin, Phone } from "lucide-react";
import { CardSchemaInput } from "../form/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { themesMapping } from "./themes";

const iconClass = "size-4 shrink-0 text-current opacity-70";

const cardBgWhite =
  "slate:bg-white secondary:bg-white tertiary:bg-white rose:bg-white indigo:bg-white emerald:bg-white amber:bg-white sky:bg-white navy:bg-white charcoal:bg-white steel:bg-white gold:bg-white platinum:bg-white obsidian:bg-white lavender:bg-white mint:bg-white sand:bg-white";

const Minimal = ({ card }: { card: CardSchemaInput }) => {
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
        "relative w-full max-w-xl overflow-hidden rounded-2xl shadow-xl transition-shadow hover:shadow-2xl hover:shadow-black/15",
        cardBgWhite,
      )}
      data-theme={theme}
    >
      {backgroundImage?.url ? (
        <>
          <Image src={backgroundImage?.url} fill alt="Background Image" />
          <div className="absolute inset-0 bg-black/70 bg-cover bg-center object-cover" />
        </>
      ) : null}
      {/* Accent bar */}
      <div className={cn("h-1 w-full", themesMapping.accent)} aria-hidden />

      <div className="p-6 sm:p-8 relative">
        {/* Header: avatar + name + title */}
        <header className="flex gap-5">
          {profileImage?.url ? (
            <Image
              width={120}
              height={120}
              src={profileImage.url}
              alt="Profile Image"
              className={cn(
                "shrink-0 rounded-lg object-cover shadow-md size-30 border-2",
                backgroundImage?.url
                  ? themesMapping.border.white
                  : themesMapping.border[100],
                profileImage.config?.rounded ? "rounded-full" : "rounded-lg",
              )}
            />
          ) : (
            <div
              className={cn(
                "flex size-20 shrink-0 items-center justify-center rounded-full text-2xl font-semibold text-white shadow-md sm:size-24 sm:text-3xl",
                themesMapping.bg[600],
              )}
            >
              {name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
          <div className="mt-4 sm:mt-0 flex flex-col justify-between">
            <div>
              <h1
                className={cn(
                  "text-xl font-bold tracking-tight sm:text-2xl",
                  backgroundImage?.url
                    ? themesMapping.text.white
                    : themesMapping.text[800],
                )}
              >
                {name}
              </h1>
              <p
                className={cn(
                  "mt-0.5 text-sm font-medium",
                  backgroundImage?.url
                    ? themesMapping.text.white
                    : themesMapping.text[800],
                )}
              >
                {title}
              </p>
              {company?.name && (
                <p
                  className={cn(
                    "mt-1 flex items-center justify-center gap-1.5 text-sm sm:justify-start",
                    backgroundImage?.url
                      ? themesMapping.text.white
                      : themesMapping.text[800],
                  )}
                >
                  {company.logo?.url ? (
                    <Image
                      width={20}
                      height={20}
                      src={company.logo.url}
                      alt=""
                    />
                  ) : null}
                  <span>{company.name}</span>
                </p>
              )}
            </div>
            {/* Card type badge */}
            {cardType && (
              <p
                className={cn(
                  "inline-block absolute top-3 right-3 w-fit rounded-full px-3 py-1 text-xs font-medium",
                  themesMapping.bg[100],
                  themesMapping.text[700],
                )}
              >
                {cardType.toUpperCase()} CARD
              </p>
            )}
          </div>
        </header>

        {/* Bio */}
        {bio && (
          <p
            className={cn(
              "mt-5 border-t pt-5 wrap-break-word text-sm leading-relaxed",
              themesMapping.border[100],
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            {bio}
          </p>
        )}

        {/* Contact: email & phone */}
        {emails && emails.length > 0 && (
          <ul
            className={cn(
              "mt-5 border-t flex flex-wrap gap-1",
              backgroundImage?.url
                ? themesMapping.border.white
                : themesMapping.border[100],
            )}
          >
            {emails.map((item, i) => {
              const Icon = Mail;
              const content = (
                <>
                  <Icon className={iconClass} />
                  <span>{item.email}</span>
                </>
              );
              return (
                <li key={i} className="font-semibold">
                  {item.email ? (
                    <a
                      href={`mailto:${item.email}`}
                      className={cn(
                        "flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm transition-colors wrap-anywhere",
                        backgroundImage?.url
                          ? themesMapping.text.white
                          : themesMapping.text[700],
                      )}
                    >
                      {content}
                    </a>
                  ) : (
                    <span
                      className={cn(
                        "flex items-center gap-3 py-2.5 px-3 text-sm wrap-anywhere",
                        backgroundImage?.url
                          ? themesMapping.text.white
                          : themesMapping.text[700],
                      )}
                    >
                      {content}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {phones && phones.length > 0 && (
          <ul
            className={cn(
              "mt-2 flex flex-wrap gap-1",
              backgroundImage?.url
                ? themesMapping.border.white
                : themesMapping.border[100],
            )}
          >
            {phones.map((item, i) => {
              const Icon = Phone;
              const content = (
                <>
                  <Icon className={iconClass} />
                  <span>{item.phone}</span>
                </>
              );
              return (
                <li key={i} className="font-semibold">
                  {item.phone ? (
                    <a
                      href={`tel:${item.phone.replace(/\s/g, "")}`}
                      className={cn(
                        "flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm transition-colors",
                        backgroundImage?.url
                          ? themesMapping.text.white
                          : themesMapping.text[700],
                      )}
                    >
                      {content}
                    </a>
                  ) : (
                    <span
                      className={cn(
                        "flex items-center gap-3 py-2.5 px-3 text-sm",
                        backgroundImage?.url
                          ? themesMapping.text.white
                          : themesMapping.text[700],
                      )}
                    >
                      {content}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Address */}
        {address && (
          <p
            className={cn(
              "mt-4 flex items-start wrap-break-word gap-3 rounded-lg py-2 px-3 text-sm",
              backgroundImage?.url
                ? themesMapping.text.white
                : themesMapping.text[800],
            )}
          >
            <MapPin className={iconClass} />
            <span className="wrap-anywhere">{address}</span>
          </p>
        )}

        {/* Social links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {socialLinks.map((link, i) =>
              link?.url ? (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    themesMapping.bg[100],
                    themesMapping.text[800],
                  )}
                  title={link.label ?? link.platform}
                >
                  <Link2 className="size-3.5" />
                  {link.label ?? link.platform}
                </a>
              ) : null,
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default Minimal;
