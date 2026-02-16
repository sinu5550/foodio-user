"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        window.location.href = "http://localhost:3001";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Storing token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-[14px] font-medium text-brand-green font-brand-manrope block">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full h-[36px] bg-white px-[12px] py-[4px] rounded-[6px] border border-brand-green/10 focus:border-brand-green/30 focus:outline-none transition-all placeholder:text-brand-green/20 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-brand-green font-brand-manrope block">
            Email
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full h-[36px] bg-white px-[12px] py-[4px] rounded-[6px] border border-brand-green/10 focus:border-brand-green/30 focus:outline-none transition-all placeholder:text-brand-green/20 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-brand-green font-brand-manrope block">
            Address
          </label>
          <input
            type="text"
            placeholder="e.g. House:23, Road:23, Jamaica, USA"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full h-[36px] bg-white px-[12px] py-[4px] rounded-[6px] border border-brand-green/10 focus:border-brand-green/30 focus:outline-none transition-all placeholder:text-brand-green/20 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[14px] font-medium text-brand-green font-brand-manrope block">
            Password
          </label>
          <input
            type="password"
            placeholder=""
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full h-[36px] bg-white px-[12px] py-[4px] rounded-[6px] border border-brand-green/10 focus:border-brand-green/30 focus:outline-none transition-all text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-green text-white py-2 rounded-[40px] text-[16px] font-medium hover:bg-brand-green/95 transition-all shadow-[0_12px_24px_-8px_rgba(26,60,52,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
