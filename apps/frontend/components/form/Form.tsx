"use client";

import { useEffect, useRef } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CardSchemaInput, cardSchema, defaultValues } from "./types";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import ArrayField from "./ArrayField";
import UploadField from "./UploadField";
import Checkbox from "./Checkbox";
import Minimal from "../cards/Minimal";
import Modern from "../cards/Modern";
import Engineer from "../cards/Engineer";
import Marketing from "../cards/Marketing";
import CEO from "../cards/CEO";
import Company from "../cards/Company";
import { MdClear } from "react-icons/md";
import {
  createCard,
  getCardById,
  updateCard,
  type CreateCardPayload,
} from "@/lib/cards-api";
import { backendCardToFormDefaults } from "@/lib/transform-card";
import { Button } from "@/components/ui/button";

const cardVisibilityOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const cardTypeOptions = [
  { value: "business", label: "Business" },
  { value: "developer", label: "Developer" },
  { value: "role", label: "Role" },
  { value: "portfolio", label: "Portfolio" },
  { value: "personal", label: "Personal" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "other", label: "Other" },
];

const themeColorOptions = [
  { value: "slate", label: "Slate" },
  { value: "secondary", label: "Violet" },
  { value: "tertiary", label: "Teal" },
  { value: "rose", label: "Rose" },
  { value: "indigo", label: "Indigo" },
  { value: "emerald", label: "Emerald" },
  { value: "amber", label: "Amber" },
  { value: "sky", label: "Sky" },
  { value: "navy", label: "Navy" },
  { value: "charcoal", label: "Charcoal" },
  { value: "steel", label: "Steel" },
  { value: "gold", label: "Gold" },
  { value: "platinum", label: "Platinum" },
  { value: "obsidian", label: "Obsidian" },
  { value: "lavender", label: "Lavender" },
  { value: "mint", label: "Mint" },
  { value: "sand", label: "Sand" },
];

const cardVariantOptions = [
  { value: "minimal", label: "Minimal" },
  { value: "modern", label: "Modern" },
  { value: "engineer", label: "Engineer" },
  { value: "marketing", label: "Marketing" },
  { value: "ceo", label: "CEO" },
  { value: "company", label: "Company" },
];

const DEFAULT_USER_ID =
  process.env.NEXT_PUBLIC_API_USER_ID ?? "abcdabcdabcdabcdabcdabcd";

type FormProps = {
  editingCardId?: string | null;
};

const Form = ({ editingCardId = null }: FormProps) => {
  const methods = useForm<CardSchemaInput>({
    mode: "all",
    resolver: zodResolver(cardSchema),
    defaultValues,
  });
  const isEditMode = Boolean(editingCardId);

  const {
    data: cardData,
    isSuccess: cardLoaded,
    isFetching: cardFetching,
    isError: cardFetchError,
  } = useQuery({
    queryKey: ["card", editingCardId],
    queryFn: () => getCardById(editingCardId!),
    enabled: isEditMode && Boolean(editingCardId),
  });

  useEffect(() => {
    if (cardLoaded && cardData) {
      methods.reset(backendCardToFormDefaults(cardData));
    }
  }, [cardLoaded, cardData, methods]);

  const createMutation = useMutation({
    mutationFn: (payload: CreateCardPayload) => createCard(payload),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateCardPayload }) =>
      updateCard(id, payload),
  });

  const isPending = createMutation.isPending || updateMutation.isPending;
  const submissionError = createMutation.error ?? updateMutation.error;
  const errorMessage =
    submissionError instanceof Error
      ? submissionError.message
      : typeof submissionError === "string"
        ? submissionError
        : "Something went wrong. Please try again.";

  const onSubmit = (values: CardSchemaInput) => {
    const {
      backgroundImage,
      visibility,
      variant,
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
    } = values;

    if (isEditMode && editingCardId) {
      updateMutation.mutate({
        id: editingCardId,
        payload: {
          userId: DEFAULT_USER_ID,
          backgroundImage,
          visibility,
          variant,
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
        },
      });
    } else {
      createMutation.mutate({
        userId: DEFAULT_USER_ID,
        visibility,
        variant,
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
      });
    }
  };

  const {
    append: appendEmail,
    fields: emailFields,
    remove: removeEmail,
  } = useFieldArray<CardSchemaInput>({
    control: methods.control,
    name: "emails",
  });

  const {
    append: appendPhone,
    fields: phoneFields,
    remove: removePhone,
  } = useFieldArray<CardSchemaInput>({
    control: methods.control,
    name: "phones",
  });

  const {
    append: appendSocialLink,
    fields: socialLinkFields,
    remove: removeSocialLink,
  } = useFieldArray<CardSchemaInput>({
    control: methods.control,
    name: "socialLinks",
  });
  const watchValues = methods.watch();
  const backgroundImageInputRef = useRef<HTMLInputElement>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const companyLogoInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      methods.setValue("profileImage.url", URL.createObjectURL(file));
      methods.setValue("profileImage.config.fileName", file.name);
      methods.setValue("profileImage.config.fileType", file.type);
      methods.setValue("profileImage.config.size", file.size);
    }
  };

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      methods.setValue("company.logo.url", URL.createObjectURL(file));
    }
  };

  const handleRoundedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rounded = e.target.checked;
    methods.setValue("profileImage.config.rounded", rounded);
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      methods.setValue("backgroundImage.url", URL.createObjectURL(file));
    }
  };

  const variant = {
    minimal: <Minimal card={watchValues} />,
    modern: <Modern card={watchValues} />,
    engineer: <Engineer card={watchValues} />,
    marketing: <Marketing card={watchValues} />,
    ceo: <CEO card={watchValues} />,
    company: <Company card={watchValues} />,
  };

  if (isEditMode && cardFetching) {
    return (
      <div className="grid grid-cols-1 justify-between gap-10 md:grid-cols-2 place-items-center min-h-[40vh]">
        <p className="text-white">Loading card…</p>
      </div>
    );
  }

  if (isEditMode && cardFetchError) {
    return (
      <div className="grid grid-cols-1 justify-between gap-10 md:grid-cols-2 place-items-center min-h-[40vh]">
        <div className="rounded-lg border border-red-500/50 bg-zinc-900 p-6 text-center">
          <p className="text-red-400">
            Failed to load card. It may not exist or the request failed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-between gap-10 md:grid-cols-2 relative">
      {(createMutation.isError || updateMutation.isError) &&
        submissionError && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="alert"
            aria-live="assertive"
          >
            <div className="max-w-md rounded-lg border border-red-500/50 bg-zinc-900 p-6 text-center shadow-xl">
              <p className="text-lg font-medium text-red-400">{errorMessage}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  createMutation.reset();
                  updateMutation.reset();
                }}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
      <div className="space-y-10 border border-gray-700 rounded-lg p-5 text-white">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-10"
            noValidate
          >
            <div className="flex items-center gap-2">
              <UploadField
                id="background-image-upload"
                handleUploadChange={handleBackgroundImageChange}
                label="Background"
                inputRef={backgroundImageInputRef}
              />
              {watchValues.backgroundImage?.url && (
                <button
                  type="button"
                  onClick={() => {
                    methods.setValue("backgroundImage.url", "");
                    if (backgroundImageInputRef.current) {
                      backgroundImageInputRef.current.value = "";
                    }
                  }}
                  aria-label="Clear background image"
                  className="cursor-pointer"
                >
                  <MdClear size={20} className="text-slate-100" />
                </button>
              )}
            </div>
            <SelectField<CardSchemaInput>
              name="visibility"
              label="Card Visibility"
              options={cardVisibilityOptions}
            />
            <SelectField<CardSchemaInput>
              name="cardType"
              label="Card Type"
              options={cardTypeOptions}
            />
            <TextField<CardSchemaInput>
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
            <TextField<CardSchemaInput>
              name="title"
              label="Title"
              placeholder="Enter your title"
            />
            <div className="p-5 border border-gray-700 rounded-lg space-y-10">
              <TextField<CardSchemaInput>
                name="company.name"
                label="Company"
                placeholder="Enter your company name"
              />
              <div className="flex items-center gap-2">
                <UploadField
                  id="company-logo-upload"
                  handleUploadChange={handleCompanyLogoChange}
                  label="Company Logo"
                  inputRef={companyLogoInputRef}
                />
                {watchValues.company?.logo?.url && (
                  <button
                    type="button"
                    onClick={() => {
                      methods.setValue("company.logo.url", "");
                      if (companyLogoInputRef.current) {
                        companyLogoInputRef.current.value = "";
                      }
                    }}
                    aria-label="Clear company logo"
                    className="cursor-pointer"
                  >
                    <MdClear size={20} className="text-slate-100" />
                  </button>
                )}
              </div>
            </div>
            <ArrayField
              fields={emailFields}
              append={() => appendEmail({ email: "" })}
              remove={removeEmail}
              name="emails"
              limit={3}
              input={[
                {
                  label: "Email",
                  placeholder: "Enter your email",
                  name: "email",
                },
              ]}
            />
            <ArrayField
              fields={phoneFields}
              append={() => appendPhone({ phone: "" })}
              remove={removePhone}
              name="phones"
              limit={3}
              input={[
                {
                  label: "Phone",
                  placeholder: "Enter your phone number",
                  name: "phone",
                },
              ]}
            />
            <TextField<CardSchemaInput>
              as="textarea"
              rows={4}
              name="bio"
              label="Bio"
              placeholder="Enter your bio"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadField
                  id="profile-image-upload"
                  handleUploadChange={handleProfileImageChange}
                  label="Profile Image"
                  inputRef={profileImageInputRef}
                />
                {watchValues.profileImage?.url && (
                  <button
                    type="button"
                    onClick={() => {
                      methods.setValue("profileImage.url", "");
                      if (profileImageInputRef.current) {
                        profileImageInputRef.current.value = "";
                      }
                    }}
                    aria-label="Clear profile image"
                    className="cursor-pointer"
                  >
                    <MdClear size={20} className="text-slate-100" />
                  </button>
                )}
              </div>
              <Checkbox
                label="Rounded Image"
                onChange={handleRoundedImageChange}
              />
            </div>
            <ArrayField
              fields={socialLinkFields}
              append={() =>
                appendSocialLink({ platform: "", label: "", url: "" })
              }
              remove={removeSocialLink}
              name="socialLinks"
              limit={3}
              input={[
                {
                  label: "Social Platform",
                  placeholder: "Enter your social platform name",
                  name: "platform",
                },
                {
                  label: "Label",
                  placeholder: "Enter your social link label",
                  name: "label",
                },
                {
                  label: "URL",
                  placeholder: "Enter your social link URL",
                  name: "url",
                },
              ]}
            />
            <TextField<CardSchemaInput>
              name="address"
              label="Address"
              placeholder="Enter your address"
            />
            <SelectField<CardSchemaInput>
              name="theme"
              options={themeColorOptions}
              className="fixed top-22 right-5"
            />
            <SelectField<CardSchemaInput>
              name="variant"
              options={cardVariantOptions}
              className="fixed top-40 right-5"
            />
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                data-testid={
                  isEditMode ? "update-card-button" : "save-card-button"
                }
              >
                {isPending ? "Saving…" : isEditMode ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="sticky top-20 h-[calc(80vh)] grid place-items-center pt-24">
        {variant[watchValues?.variant ?? "minimal"]}
      </div>
    </div>
  );
};

export default Form;
