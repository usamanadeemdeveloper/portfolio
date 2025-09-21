import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "jobTitle",
      title: "JobTitle",
      type: "string",
    },
    {
      name: "companyImage",
      title: "Company Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "dateStarted",
      title: "Date Started",
      type: "date",
      options: {
        dateFormat: "MM/YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "dateEnded",
      title: "Date Ended",
      type: "date",
      options: {
        dateFormat: "MM/YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "isCurrentlyWorkingHere",
      title: "Is Currently Working Here",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "jobTitle",
      title: "Job Title",
      type: "string",
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "skill" } })],
    },
    {
      name: "points",
      title: "Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    },
  ],
});
