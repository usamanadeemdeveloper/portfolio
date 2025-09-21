import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export const pageInfo = defineType({
  name: "pageInfo",
  title: "Page Info",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "backgroundInformation",
      title: "Background Information",
      type: "text",
    },
    {
      name: "profilePic",
      title: "Profile Picture",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (Rule) =>
        Rule.min(7).max(15).error("Phone number must be valid length"),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email().required(),
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "social" } })],
    },
  ],
});
