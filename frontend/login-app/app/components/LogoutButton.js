"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/logout/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      console.log("Logout successful");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAuthenticated");

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-2 right-2 text-gray-400 text-sm p-1 opacity-50 hover:opacity-100 transition"
    >
      ×
    </button>
  );
}
