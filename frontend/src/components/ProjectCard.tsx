import type { Project } from "../types/project";

function chip(status: Project["status"]) {
  const base = "text-xs px-2 py-1 rounded-full border";
  switch (status) {
    case "active":
      return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
    case "planning":
      return `${base} bg-indigo-50 text-indigo-700 border-indigo-200`;
    case "paused":
      return `${base} bg-amber-50 text-amber-700 border-amber-200`;
    case "done":
      return `${base} bg-slate-100 text-slate-700 border-slate-200`;
    default:
      return `${base} bg-gray-100 text-gray-700 border-gray-200`;
  }
}

interface Props {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <button
      onClick={() => onOpen(project)}
      className="group text-left w-full rounded-2xl p-0.5 bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/40 to-rose-500/40 hover:from-indigo-500/60 hover:to-rose-500/60 transition"
    >
      <div className="h-full bg-white rounded-[14px] p-4 border border-white shadow-sm group-hover:shadow-lg group-hover:-translate-y-[1px] transition">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold tracking-tight">{project.title}</h3>
          <span className={chip(project.status)}>{project.status}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 text-[11px] text-gray-400">
          {new Date(project.createdAt).toLocaleDateString()}
        </div>
      </div>
    </button>
  );
}
