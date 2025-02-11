"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("isAuthenticated", "true");
        router.push("/");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF1E3" }}>
      <div className="text-center max-w-md mx-auto">
        <img
          src="/cat.png"
          alt="Sleeping Cat"
          className="mx-auto mb-6"
          style={{ width: "188.14px", height: "134px" }}
        />
        <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "Inria Serif, serif", color: "#957139" }}>
          Welcome Back!
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
            style={{ border: "2px solid #957139", fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#000", backgroundColor: "transparent" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
            style={{ border: "2px solid #957139", fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#000", backgroundColor: "transparent" }}
          />
          <button
            type="submit"
            className="mt-6 px-8 py-3 rounded-full"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "bold", fontSize: "16px", backgroundColor: "transparent", border: "2px solid #957139", color: "#957139", cursor: "pointer" }}
          >
            Login
          </button>
        </form>

        <p className="mt-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#957139" }}>
          <a href="/signup" className="underline">
            New here? Sign up!
          </a>
        </p>
      </div>
    </div>
  );
}
