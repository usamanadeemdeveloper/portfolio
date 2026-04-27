import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackToProjects() {
  return (
    <Link
      href="/#projects"
      className="group flex items-center gap-2 text-white/40 hover:text-blue-400 transition-colors mb-12 w-fit"
    >
      <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-all">
        <ArrowLeftIcon className="w-4 h-4" />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
        Back to Projects
      </span>
    </Link>
  );
}
