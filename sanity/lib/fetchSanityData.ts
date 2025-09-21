import getExperience from "./getExperience";
import getProjects from "./getProjects";
import getPageInfo from "./getPageInfo";
import getSocials from "./getSocials";
import getSkills from "./getSkills";

export type SanityQueriesResult = {
  pageInfo: Awaited<ReturnType<typeof getPageInfo>>;
  experiences: Awaited<ReturnType<typeof getExperience>>;
  projects: Awaited<ReturnType<typeof getProjects>>;
  skills: Awaited<ReturnType<typeof getSkills>>;
  socials: Awaited<ReturnType<typeof getSocials>>;
};

export async function fetchSanityData(): Promise<SanityQueriesResult> {
  const [pageInfo, experiences, projects, skills, socials] = await Promise.all([
    getPageInfo(),
    getExperience(),
    getProjects(),
    getSkills(),
    getSocials(),
  ]);

  return { pageInfo, experiences, projects, skills, socials };
}
