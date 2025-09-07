"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useNotification } from "@/components/ui/Notification";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="text-center text-base-content/70 text-sm py-6">
      © 2025 LoopIn. All rights reserved.
    </footer>
  );
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      showNotification("Registration successful! Please log in.", "success");
      router.push("/login");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Registration failed",
        "error"
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-light text-center mb-6 text-base-content">
            Create your account
          </h1>
          <button
                    onClick={() => signIn("google")}
                    className="btn w-full border border-base-300 text-base-content hover:bg-yellow-300  mb-4 flex items-center justify-center gap-2 p-2.5 rounded-2xl"
                  >
                    <FcGoogle className="text-xl" />
                    Sign in with Google
                  </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full p-2.5  rounded-2xl outline"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full p-2.5  rounded-2xl outline "
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input input-bordered w-full p-2.5  rounded-2xl outline "
            />
            <Button
              type="submit"
              variant="outline"
              className="btn bg-yellow-400  w-full p-2.5  rounded-2xl outline font-semibold text-base-content hover:bg-yellow-300 "
            >
              Register
            </Button>
            <p className="text-center text-sm text-base-content/70 mt-4 p-2.5  rounded-2xl outline ">
              Already have an account?{" "}
              <Link
                href="/login"
                className="link text-yellow-600 font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
