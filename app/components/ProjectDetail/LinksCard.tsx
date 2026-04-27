import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity.types";

type Props = {
  project: NonNullable<PROJECT_BY_SLUG_QUERYResult>;
};

export default function LinksCard({ project }: Props) {
  if (!project.linkToBuild) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
        Project Links
      </h3>

      <a
        href={project.linkToBuild}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-blue-600 px-8 py-5 rounded-2xl text-center text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-500 transition-all"
      >
        Visit Live Site
      </a>
    </div>
  );
}
