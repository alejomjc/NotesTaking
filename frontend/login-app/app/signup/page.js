"use client";

import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrfResponse = await fetch("http://127.0.0.1:8000/api/users/csrf/", {
        method: "GET",
        credentials: "include",
      });

      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User registered successfully!");
        window.location.href = "/";
      } else {
        console.log(response);
        const data = await response.json();
        alert(`Error: ${data.detail || "Unable to register user"}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF1E3" }}>
      <div className="text-center max-w-md mx-auto">
        <img
          src="/cactus.png"
          alt="Cactus"
          className="mx-auto mb-6"
          style={{ width: "188.14px", height: "134px" }}
        />

        <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "Inria Serif, serif", color: "#957139" }}>
          Yay, New Friend!
        </h1>

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 pr-10"
              style={{ border: "2px solid #957139", fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#000", backgroundColor: "transparent" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
              style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <button
            type="submit"
            className="mt-6 px-8 py-3 rounded-full"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "bold", fontSize: "16px", backgroundColor: "transparent", border: "2px solid #957139", color: "#957139", cursor: "pointer" }}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#957139" }}>
          <a href="/login" className="underline">
            We’re already friends!
          </a>
        </p>
      </div>
    </div>
  );
}
