import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem(
        "access_token",
        res.data.access_token
      );
      localStorage.setItem(
        "token",
        res.data.access_token
      );
      localStorage.setItem(
        "user_id",
        res.data.user_id
      );
      localStorage.setItem(
        "username",
        res.data.username
      );

      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to continue
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 text-white mb-4"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 text-white mb-6"
          />

          <button
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-lg p-4 font-semibold text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?

          <Link
            to="/signup"
            className="text-purple-400 ml-2"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}