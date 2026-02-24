"use client";
import { useRef } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const Form = () => {
  const methods = useForm<CardSchemaInput>({
    mode: "all",
    resolver: zodResolver(cardSchema),
    defaultValues,
  });
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

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="grid grid-cols-1 justify-between gap-10 md:grid-cols-2">
      <div className="space-y-10 border border-gray-700 rounded-lg p-5 text-white">
        <FormProvider {...methods}>
          <div className="flex items-center gap-2">
            <UploadField
              id="background-image-upload"
              handleUploadChange={handleBackgroundImageChange}
              label="Background"
              inputRef={backgroundImageInputRef}
            />
            {
              watchValues.backgroundImage?.url && (
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
              )
            }
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
              <UploadField id="company-logo-upload" handleUploadChange={handleCompanyLogoChange} label="Company Logo" inputRef={companyLogoInputRef} />
              {
                watchValues.company?.logo?.url && (
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
                )
              }
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
              <UploadField id="profile-image-upload" handleUploadChange={handleProfileImageChange} label="Profile Image" inputRef={profileImageInputRef} />
              {
                watchValues.profileImage?.url && (
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
                )
              }
            </div>
            <Checkbox label="Rounded Image" onChange={handleRoundedImageChange} />
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
        </FormProvider>
      </div>
      <div className="sticky top-20 h-[calc(80vh)] grid place-items-center pt-24">
        {variant[watchValues?.variant ?? "minimal"]}
      </div>
    </div>
  );
};

export default Form;
