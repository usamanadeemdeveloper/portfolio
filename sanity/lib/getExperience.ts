import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience"] {
    _id,
    jobTitle,
    companyName,
    companyImage,
    dateStarted,
    dateEnded,
    isCurrentlyWorkingHere,
    points,
    technologies[]->{
      _id,
      image,
      title,
      progress,
    }
  }
`);

async function getExperience() {
  const result = await sanityFetch({ query: EXPERIENCE_QUERY });
  return result.data;
}

export default getExperience;
