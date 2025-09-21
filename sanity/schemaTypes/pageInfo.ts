import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export const pageInfo = defineType({
  name: "pageInfo",
  title: "PageInfo",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "backgroundInformation",
      title: "Background Information",
      type: "text",
    },
    {
      name: "profilePic",
      title: "Profile Pic",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "socials",
      title: "Socials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "social" } })],
    },
  ],
});
