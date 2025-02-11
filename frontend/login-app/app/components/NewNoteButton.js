"use client";

import { useRouter } from "next/navigation";

export default function NewNoteButton() {
  const router = useRouter();

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => router.push("/create")}
        className="px-6 py-3"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          fontWeight: "bold",
          border: "2px solid #957139",
          color: "#957139",
          borderRadius: "30px",
          backgroundColor: "transparent",
        }}
      >
        + New Note
      </button>
    </div>
  );
}
