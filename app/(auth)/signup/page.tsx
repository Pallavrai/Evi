"use client";

import React, { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SplitText from "@/components/SplitText";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (error) {
        setError(error.message || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header with SplitText animation */}
        <div className="text-center mb-8">
          <SplitText
            text="Create Account"
            className="text-4xl font-bold text-white mb-2"
            delay={50}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            tag="h1"
          />
          <p className="text-white/60 mt-4">Join us and start your journey</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Full Name"
                required
                className={`
                  w-full px-4 py-4 bg-white/5 rounded-xl
                  border transition-all duration-300 ease-out
                  text-white placeholder:text-white/40
                  focus:outline-none
                  ${focusedField === "name" 
                    ? "border-purple-500 bg-white/10 shadow-lg shadow-purple-500/20" 
                    : "border-white/10 hover:border-white/20"
                  }
                `}
              />
              <div className={`
                absolute inset-0 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${focusedField === "name" ? "opacity-100" : "opacity-0"}
                bg-gradient-to-r from-purple-500/10 to-blue-500/10
              `} />
            </div>

            {/* Email Field */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Email Address"
                required
                className={`
                  w-full px-4 py-4 bg-white/5 rounded-xl
                  border transition-all duration-300 ease-out
                  text-white placeholder:text-white/40
                  focus:outline-none
                  ${focusedField === "email" 
                    ? "border-purple-500 bg-white/10 shadow-lg shadow-purple-500/20" 
                    : "border-white/10 hover:border-white/20"
                  }
                `}
              />
              <div className={`
                absolute inset-0 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${focusedField === "email" ? "opacity-100" : "opacity-0"}
                bg-gradient-to-r from-purple-500/10 to-blue-500/10
              `} />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Password"
                required
                className={`
                  w-full px-4 py-4 bg-white/5 rounded-xl
                  border transition-all duration-300 ease-out
                  text-white placeholder:text-white/40
                  focus:outline-none
                  ${focusedField === "password" 
                    ? "border-purple-500 bg-white/10 shadow-lg shadow-purple-500/20" 
                    : "border-white/10 hover:border-white/20"
                  }
                `}
              />
              <div className={`
                absolute inset-0 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${focusedField === "password" ? "opacity-100" : "opacity-0"}
                bg-gradient-to-r from-purple-500/10 to-blue-500/10
              `} />
            </div>

            {/* Confirm Password Field */}
            <div className="relative group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                placeholder="Confirm Password"
                required
                className={`
                  w-full px-4 py-4 bg-white/5 rounded-xl
                  border transition-all duration-300 ease-out
                  text-white placeholder:text-white/40
                  focus:outline-none
                  ${focusedField === "confirmPassword" 
                    ? "border-purple-500 bg-white/10 shadow-lg shadow-purple-500/20" 
                    : "border-white/10 hover:border-white/20"
                  }
                `}
              />
              <div className={`
                absolute inset-0 rounded-xl pointer-events-none
                transition-opacity duration-300
                ${focusedField === "confirmPassword" ? "opacity-100" : "opacity-0"}
                bg-gradient-to-r from-purple-500/10 to-blue-500/10
              `} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-4 rounded-xl font-semibold
                transition-all duration-300 ease-out
                relative overflow-hidden group
                ${loading 
                  ? "bg-white/20 text-white/50 cursor-not-allowed" 
                  : "bg-white text-black hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
                }
              `}
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Sign In Link */}
          <p className="text-center text-white/60">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-white font-medium hover:text-purple-400 transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;