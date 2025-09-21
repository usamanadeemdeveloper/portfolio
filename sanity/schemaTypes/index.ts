import { type SchemaTypeDefinition } from "sanity";
import { pageInfo } from "./pageInfo";
import { experience } from "./experience";
import { socials } from "./socials";
import { projects } from "./projects";
import { skills } from "./skills";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageInfo, experience, socials, projects, skills],
};
