import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [authed, setAuthed] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuthed(!!localStorage.getItem("token"));
  }, [location]);

  useEffect(() => {
    const onAuthChange = () => setAuthed(!!localStorage.getItem("token"));
    window.addEventListener("storage", onAuthChange);
    window.addEventListener("auth:changed", onAuthChange);
    return () => {
      window.removeEventListener("storage", onAuthChange);
      window.removeEventListener("auth:changed", onAuthChange);
    };
  }, []);

  const base = "px-3 py-2 rounded-lg transition";
  const cls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${base} bg-white/70 text-gray-900 shadow-sm`
      : `${base} text-gray-700 hover:bg-white/40 hover:text-gray-900`;

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear saved token
    window.dispatchEvent(new Event("auth:changed")); // notify listeners
    navigate("/login"); // redirect to login
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 backdrop-blur-xl">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-gray-900">
          <span className="bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
            ProjectTracker
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/30 rounded-xl p-1 border border-white/40 shadow-sm">
            <NavLink to="/" className={cls}>
              Home
            </NavLink>
            <NavLink to="/projects" className={cls}>
              Projects
            </NavLink>
          </div>

          {!authed ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-white/40 transition"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
