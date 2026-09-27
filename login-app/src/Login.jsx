import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google Login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/Oauth/google";
  };

  // Manual Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("http://localhost:3000/Oauth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", JSON.stringify(data.token));

      // Redirect to main PassSafe frontend
      window.location.href = "http://localhost:5173";
    } catch (error) {
      console.error("Login error:", error);
      alert("Try again after some time...");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 px-4 py-8 font-sans">


      {/* Login Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-emerald-100/80 to-teal-100 shadow-2xl">

        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-emerald-300/60 bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 px-8 pb-10 pt-10 shadow-2xl">

          {/* Logo */}
          <div className="mx-auto mb-5 flex h-14 w-full items-center justify-center rounded-2xl bg-slate-800 text-2xl font-bold text-green-500 shadow-lg">
            Pass-Safe
          </div>

          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mb-9 mt-2 text-center text-sm text-gray-500">
            Sign in to continue to your account
          </p>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-[0.99]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-lg font-bold">
              G
            </span>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-7 flex items-center">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="px-4 text-xs font-medium uppercase tracking-wider text-gray-400">
              or continue with email
            </span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-800 hover:shadow-lg active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          {/* Bottom Text */}
          <p className="mt-7 text-center text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <span className="cursor-pointer font-medium text-gray-700 hover:underline">
              Terms of Service
            </span>{"#"}
            and{" "}
            <span className="cursor-pointer font-medium text-gray-700 hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

