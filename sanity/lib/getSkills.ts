import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

async function getSkills() {
  const getSkills = defineQuery(`*[_type == "skill"]`);
  const result = await sanityFetch({ query: getSkills });

  return result.data;
}

export default getSkills;
