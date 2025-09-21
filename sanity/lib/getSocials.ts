import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

async function getSocials() {
  const getSocials = defineQuery(`*[_type == "social"]`);
  const result = await sanityFetch({ query: getSocials });

  return result.data;
}

export default getSocials;
