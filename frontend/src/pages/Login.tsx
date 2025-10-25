import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const BASE_URL = import.meta.env.API_URL ?? "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // ✅ save token
      navigate("/");
    } catch (err) {
      console.log(err);

      setError("Login failed");
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Log in</h1>
      <form
        onSubmit={handleLogin}
        className="space-y-4 bg-white/90 backdrop-blur-xl rounded-2xl border p-6"
      >
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full border rounded-xl px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full border rounded-xl px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-xl bg-gray-900 text-white hover:opacity-90 disabled:opacity-50"
        >
          Login
        </button>
        <p className="text-sm text-gray-600">
          Don’t have an account?
          <Link to="/register" className="underline">
            Create one
          </Link>
        </p>
      </form>
    </section>
  );
}
