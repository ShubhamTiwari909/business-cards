import type { BackendCard, CardSchemaInput } from "@/components/form/types";

export function backendCardToFormDefaults(card: BackendCard): CardSchemaInput {
  return {
    backgroundImage: card.backgroundImage
      ? { url: card.backgroundImage.url ?? "" }
      : { url: "" },
    visibility:
      (card.visibility === "public" || card.visibility === "private"
        ? card.visibility
        : "private") as "public" | "private",
    userId: undefined,
    cardType: card.cardType ?? "business",
    variant:
      (card.variant as CardSchemaInput["variant"]) ?? "minimal",
    name: card.name ?? "",
    title: card.title ?? "",
    company: card.company
      ? {
          name: card.company.name ?? "",
          logo: card.company.logo
            ? { url: card.company.logo.url ?? "" }
            : { url: "" },
        }
      : { name: "", logo: { url: "" } },
    emails:
      Array.isArray(card.emails) && card.emails.length > 0
        ? card.emails.map((e) => ({ email: e.email ?? "" }))
        : [{ email: "" }],
    phones:
      Array.isArray(card.phones) && card.phones.length > 0
        ? card.phones.map((p) => ({ phone: p.phone ?? "" }))
        : [{ phone: "" }],
    bio: card.bio ?? "",
    profileImage: card.profileImage
      ? {
          url: card.profileImage.url ?? "",
          config: card.profileImage.config
            ? {
                size: card.profileImage.config.size ?? 0,
                fileType: card.profileImage.config.fileType ?? "",
                fileName: card.profileImage.config.fileName ?? "",
                rounded: card.profileImage.config.rounded ?? false,
              }
            : {
                size: 0,
                fileType: "",
                fileName: "",
                rounded: false,
              },
        }
      : {
          url: "",
          config: {
            size: 0,
            fileType: "",
            fileName: "",
            rounded: false,
          },
        },
    socialLinks:
      Array.isArray(card.socialLinks) && card.socialLinks.length > 0
        ? card.socialLinks.map((s) => ({
            platform: s.platform ?? "",
            label: s.label ?? "",
            url: s.url ?? "",
          }))
        : [{ platform: "", label: "", url: "" }],
    address: card.address ?? "",
    theme: (card.theme as CardSchemaInput["theme"]) ?? "slate",
  };
}
