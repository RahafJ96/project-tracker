import { useEffect, useState } from "react";
import type { Project, Status } from "../types/project";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import type { AxiosError } from "axios";

const BASE_URL =
  import.meta.env.API_URL ?? "https://project-tracker-tfie.onrender.com";

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

type ErrBody = { message?: string; error?: string };

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("planning");

  const [selected, setSelected] = useState<Project | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/projects`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => setProjects(res.data))
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/projects`,
        { title, description, status },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setProjects([res.data, ...projects]);
      setTitle("");
      setDescription("");
      setStatus("planning");
      setAddOpen(false);
    } catch {
      setError("Failed to create project");
    }
  };

  const handleOpenDetails = async (id: number) => {
    try {
      const res = await axios.get(`${BASE_URL}/projects/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSelected(res.data);
    } catch {
      setError("Failed to load project details");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/projects/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setSelected(null);
    } catch (err: unknown) {
      const e = err as AxiosError<ErrBody>;
      console.error("DELETE error:", e.response?.status, e.response?.data);
      const msg =
        e.response?.data?.message ??
        e.response?.data?.error ??
        "Failed to delete project";
      setError(msg);
      alert(msg);
    }
  };

  return (
    <section className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-gray-600">Live data from backend.</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow-md hover:shadow-lg transition"
        >
          + Add Project
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-600">Loading…</div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center bg-white">
          <div className="text-4xl mb-2">🗂️</div>
          <p className="text-gray-600">No projects yet. Click “Add Project”.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpen={() => handleOpenDetails(p.id)}
            />
          ))}
        </div>
      )}

      {/* Add Project */}
      <Modal
        open={addOpen}
        title="Create Project"
        onClose={() => setAddOpen(false)}
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                className="w-full border rounded-xl px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full border rounded-xl px-3 py-2 min-h-[100px] outline-none focus:ring-2 focus:ring-indigo-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="px-4 py-2 rounded-xl border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:opacity-90"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      {/* Details */}
      <Modal
        open={!!selected}
        title={selected?.title}
        onClose={() => setSelected(null)}
        maxWidthClass="max-w-2xl"
      >
        {selected ? (
          <div className="space-y-4">
            <div className="container mx-auto flex items-center justify-between">
              <span className={chip(selected.status)}>{selected.status}</span>
              {selected.created_at && (
                <span className="text-xs text-gray-500">
                  Created: {new Date(selected.created_at).toLocaleDateString()}
                </span>
              )}
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">
              {selected.description || "No description."}
            </p>
            <div className="pt-3 border-t flex gap-2 justify-end">
              <button
                onClick={() => handleDelete(selected.id)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:opacity-90"
              >
                Delete
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-xl border hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-600">Loading…</div>
        )}
      </Modal>
    </section>
  );
}
