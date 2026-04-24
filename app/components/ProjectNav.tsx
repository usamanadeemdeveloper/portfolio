import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

interface ProjectNavProps {
  onPrev: () => void;
  onNext: () => void;
  className?: string; // Add this to allow custom positioning
}

function ProjectNav({ onPrev, onNext, className = "" }: ProjectNavProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-center justify-between z-30 ${className}`}
    >
      <button
        onClick={onPrev}
        aria-label="Previous item"
        className="p-2 sm:p-3 rounded-full cursor-pointer bg-black/60 hover:bg-blue-600 text-white transition pointer-events-auto ml-2 sm:ml-4 border border-white/10"
      >
        <ChevronLeftIcon
          className="w-5 h-5 sm:w-7 sm:h-7"
          aria-hidden="true"
        />
      </button>
      <button
        onClick={onNext}
        aria-label="Next item"
        className="p-2 sm:p-3 rounded-full cursor-pointer bg-black/60 hover:bg-blue-600 text-white transition pointer-events-auto mr-2 sm:mr-4 border border-white/10"
      >
        <ChevronRightIcon
          className="w-5 h-5 sm:w-7 sm:h-7"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

export default ProjectNav;
