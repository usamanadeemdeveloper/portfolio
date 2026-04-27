import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity.types";

type Props = {
  project: NonNullable<PROJECT_BY_SLUG_QUERYResult>;
};

export default function SpecsCard({ project }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
        Project Specs
      </h3>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
        <div>
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-1">
            Core Tech
          </p>
          <p className="text-white/80 font-bold">{project.coreTech}</p>
        </div>

        <div>
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-1">
            Year
          </p>
          <p className="text-white/80 font-bold">{project.year}</p>
        </div>

        <div>
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-1">
            Platform
          </p>
          <p className="text-white/80 font-bold">{project.platform}</p>
        </div>
      </div>
    </div>
  );
}
