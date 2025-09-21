import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

interface ProjectNavProps {
  onPrev: () => void;
  onNext: () => void;
}

function ProjectNav({ onPrev, onNext }: ProjectNavProps) {
  return (
    <>
      <button
        onClick={onPrev}
        aria-label="Previous project"
        className="absolute left-5 top-1/2 transform -translate-y-1/2 p-3 rounded-full cursor-pointer bg-black/50 hover:bg-blue-500/70 text-white z-30 transition"
      >
        <ChevronLeftIcon className="w-7 h-7" aria-hidden="true" />
      </button>
      <button
        onClick={onNext}
        aria-label="Next project"
        className="absolute right-5 top-1/2 transform -translate-y-1/2 p-3 rounded-full cursor-pointer bg-black/50 hover:bg-blue-500/70 text-white z-30 transition"
      >
        <ChevronRightIcon className="w-7 h-7" aria-hidden="true" />
      </button>
    </>
  );
}

export default ProjectNav;
