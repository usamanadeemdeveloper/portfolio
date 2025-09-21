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
      title: "Title",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "skill" } })],
    },
    {
      name: "linkToBuild",
      title: "Link To Build",
      type: "url",
    },
  ],
});
