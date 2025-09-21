import { DocumentTextIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const skills = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "title",
      title: "Skill Name",
      type: "string",
      description: "Name of the skill",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "progress",
      title: "Proficiency",
      type: "number",
      description: "Skill proficiency (0-100)",
      validation: (Rule) => Rule.required().min(0).max(100),
    },
    {
      name: "image",
      title: "Skill Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
});
