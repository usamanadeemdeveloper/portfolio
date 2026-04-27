import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
    },

    {
      name: "images",
      title: "Project Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    },

    {
      name: "summary",
      title: "Project Summary",
      type: "text",
    },

    {
      name: "seoDescription",
      title: "SEO Description",
      type: "string",
      description: "Plain text only, no markdown. Used for Google and social previews. Keep it under 160 characters.",
    },

    {
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "skill" },
        }),
      ],
    },

    {
      name: "linkToBuild",
      title: "Link to Build",
      type: "url",
    },

    {
      name: "coreTech",
      title: "Core Tech",
      type: "string",
    },

    {
      name: "year",
      title: "Year",
      type: "number",
    },

    {
      name: "platform",
      title: "Platform",
      type: "string",
    },
  ]
});
