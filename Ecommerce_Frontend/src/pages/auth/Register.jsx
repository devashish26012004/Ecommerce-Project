import { useState } from "react";
import { register } from "../../api/apis";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const registerData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      setLoading(true);
      const res = await register(registerData);
      // On success, redirect to login (or home if API returns token)
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Minimal, fast and secure signup
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm text-gray-600">First name</span>
              <input
                type="text"
                id="firstName"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Last name</span>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </label>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

            <label className="block">
              <span className="text-sm text-gray-600">Confirm</span>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-60 w-full"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <div className="pt-2 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          By creating an account you agree to our{" "}
          <span className="text-indigo-600 font-medium">Terms</span> and{" "}
          <span className="text-indigo-600 font-medium">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Register;
