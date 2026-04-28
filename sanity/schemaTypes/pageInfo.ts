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
      name: "availability",
      title: "Availability Status",
      type: "string",
      description: "e.g. Open for Projects",
    },
    {
      name: "experienceYears",
      title: "Experience Years",
      type: "string",
      description: "e.g. 3+",
    },
    {
      name: "experienceLabel",
      title: "Experience Label",
      type: "string",
      description: "e.g. Years Experience",
    },
    {
      name: "contributionTitle",
      title: "Contribution Title",
      type: "string",
      description: "e.g. Web",
    },
    {
      name: "contributionLabel",
      title: "Contribution Label",
      type: "string",
      description: "e.g. Standards Contributor",
    },
    {
      name: "aboutQuote",
      title: "About Quote",
      type: "string",
      description: "e.g. Designing and building tomorrow's digital landscape.",
    },
    {
      name: "contactQuote",
      title: "Contact Quote",
      type: "string",
      description: "e.g. Driven by precision, built with passion.",
    },
    {
      name: "responseTime",
      title: "Response Time",
      type: "string",
      description: "e.g. Typically responds within 24 hours",
    },
    {
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "The base URL of the live site (e.g. https://yourname.vercel.app)",
    },
    {
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "social" } })],
    },
    {
      name: "heroTypewriterWords",
      title: "Hero Typewriter Words",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
});
