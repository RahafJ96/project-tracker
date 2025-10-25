import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
        404
      </h1>
      <p className="mt-2 text-gray-600">Page not found.</p>
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90 shadow-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
