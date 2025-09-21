import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

const PROJECTS_QUERY = defineQuery(`
  *[_type == "projects"] {
    _id,
    title,
    summary,
    linkToBuild,
    image,
    technologies[]->{
      _id,
      title,
      image
    }
  }
`);

async function getProjects() {
  const result = await sanityFetch({ query: PROJECTS_QUERY });
  return result.data;
}

export default getProjects;
