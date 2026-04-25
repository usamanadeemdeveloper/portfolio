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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.min(1).error("Add at least one image"),
    },
    {
      name: "summary",
      title: "Project Summary",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "skill" } })],
      validation: (Rule) => Rule.min(1).error("Select at least one technology"),
    },
    {
      name: "linkToBuild",
      title: "Link to Build",
      type: "url",
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    },
  ],
});
