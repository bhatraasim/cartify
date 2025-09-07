"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    if (res?.ok) {
      router.push("/");
    }


  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100/70 backdrop-blur-lg border border-base-300 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-light text-center text-base-content mb-6">
          Welcome Back
        </h1>

        {error && (
          <p className="text-error text-center text-sm mb-4">{error}</p>
        )}

       
        <button
          onClick={() => signIn("google")}
          className="btn w-full border border-base-300 text-base-content hover:bg-[#1C836D] hover:text-white mb-4 flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn bg-[#1C836D] text-white w-full"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-base-content/70 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="link text-[#1C836D] font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
