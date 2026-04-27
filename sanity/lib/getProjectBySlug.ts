import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "projects" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    linkToBuild,
    seoDescription,
    images,
    coreTech,
    year,
    platform,
    technologies[]->{
      _id,
      title,
      image
    }
  }
`);

async function getProjectBySlug(slug: string) {
  const result = await sanityFetch({ 
    query: PROJECT_BY_SLUG_QUERY, 
    params: { slug } 
  });
  return result.data;
}

export default getProjectBySlug;
