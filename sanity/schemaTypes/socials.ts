import { DocumentTextIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const socials = defineType({
  name: "social",
  title: "Social",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title for social media",
      type: "string",
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
  ],
});
