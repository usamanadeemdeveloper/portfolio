import { DocumentTextIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const socials = defineType({
  name: "social",
  title: "Social Link",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "title",
      title: "Platform Name",
      description: "Name of the social media platform",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "Profile URL",
      description: "URL of the social media profile or page",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https"] }),
    },
  ],
});
