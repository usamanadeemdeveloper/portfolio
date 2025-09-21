import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "companyImage",
      title: "Company Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "dateStarted",
      title: "Date Started",
      type: "date",
      options: { dateFormat: "MM/YYYY", calendarTodayLabel: "Today" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dateEnded",
      title: "Date Ended",
      type: "date",
      options: { dateFormat: "MM/YYYY", calendarTodayLabel: "Today" },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isCurrentlyWorkingHere?: boolean };
          return parent.isCurrentlyWorkingHere || value
            ? true
            : "Date Ended is required if not currently working here";
        }),
    },
    {
      name: "isCurrentlyWorkingHere",
      title: "Is Currently Working Here",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "skill" } })],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: "points",
      title: "Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.min(1),
    },
  ],
});
