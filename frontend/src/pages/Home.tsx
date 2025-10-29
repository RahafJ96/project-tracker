import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="relative overflow-hidden ">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-indigo-50 to-rose-50" />
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          Welcome to your{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
            Project Traker{" "}
          </span>{" "}
          application
        </h2>
        <p className="mt-10 text-2xl text-gray-600 max-w-2xl mx-auto">
          Where you can Add projects, see details in slick modals, and keep
          everything lightweight.
        </p>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl">📝</p>
            <h4 className="mt-2 font-semibold">Add Projects</h4>
            <p className="text-sm text-gray-500">
              Start by entering a title and description.
            </p>
          </div>
          <div>
            <p className="text-3xl">📊</p>
            <h4 className="mt-2 font-semibold">
              Track Progress{" "}
              <span className="ml-1 text-xs py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                Coming Soon
              </span>
            </h4>
            <p className="text-sm text-gray-500">
              Update statuses to stay on top of your work.
            </p>
          </div>
          <div>
            <p className="text-3xl">✅</p>
            <h4 className="mt-2 font-semibold">Achieve Goals</h4>
            <p className="text-sm text-gray-500">
              Stay motivated and finish strong.
            </p>
          </div>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90 shadow-lg"
        >
          Let's get started 🚀
        </Link>

        <div className="mt-20 flex justify-center items-center gap-2 text-sm text-gray-500">
          <span>Designed & developed by</span>
          <a
            href="https://github.com/RahafJ96/project-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-purple-600 hover:no-underline"
          >
            Rahaf Al-Jazzazi
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.37 0 0 5.373 0 12c0 5.303 
        3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
        0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61
        -.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729
        1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 
        3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 
        0-1.31.468-2.38 1.236-3.22-.123-.303-.536-1.524.117-3.176 
        0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 
        1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23 
        .655 1.652.242 2.873.119 3.176.77.84 1.235 1.91 
        1.235 3.22 0 4.61-2.805 5.624-5.475 5.92.43.37.823 1.102.823 2.222 
        0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 21.796 
        24 17.3 24 12c0-6.627-5.373-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
