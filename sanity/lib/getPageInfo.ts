import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

async function getPageInfo() {
  const getPageInfo = defineQuery(`*[_type == "pageInfo"][0]`);
  const course = await sanityFetch({ query: getPageInfo });

  return course.data;
}

export default getPageInfo;
