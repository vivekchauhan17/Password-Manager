export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/Oauth/google";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-sm rounded-xl bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="mb-8 text-gray-500">Sign in to continue</p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm transition hover:bg-gray-50"
        >
          <span className="mr-2 font-bold">G</span>
          Continue with Google
        </button>

        <div className="my-6 flex justify-center text-gray-400">
          <span>or</span>
        </div>

        <form>
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mb-5 mt-2 w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-gray-500"
          />

          <label className="block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="mb-5 mt-2 w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 px-3 py-3 text-sm text-white transition hover:bg-gray-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}