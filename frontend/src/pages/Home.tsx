import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-indigo-50 to-rose-50" />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Track projects with a
          <span className="bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
            clean & modern
          </span>{" "}
          UI
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Add projects, see details in slick modals, and keep everything
          lightweight.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90 shadow-lg"
        >
          🚀 Get started
        </Link>
      </div>
    </section>
  );
}
