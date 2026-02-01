import { useState } from "react";
import { login } from "../../api/apis";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const loginData = {
      email,
      password,
    };

    try {
      const res = await login(loginData);
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/home");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">Email</span>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Password</span>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>

          <div className="flex items-center justify-between text-sm">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-60 w-full"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="pt-2 text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
