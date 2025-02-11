"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "./components/Card";
import CategorySidebar from "./components/CategorySidebar";
import NewNoteButton from "./components/NewNoteButton";
import EmptyState from "./components/EmptyState";
import LogoutButton from "./components/LogoutButton";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (!authStatus) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      fetchNotes();
    }
  }, []);

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete/${noteId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await fetch("http://127.0.0.1:8000/api/notes/all/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error fetching notes");
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: "Random Thoughts", color: "#EF9C66" },
    { name: "School", color: "#FCDC94" },
    { name: "Personal", color: "#78ABA8" },
    { name: "Drama", color: "#C8CFA0" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredNotes =
    selectedCategory === "All Categories"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  const categoryCounts = categories.map((category) => {
    const count = notes.filter((note) => note.category === category.name).length;
    return { ...category, count };
  });

  const getCategoryColor = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : "#D3D3D3"; // Color por defecto si la categoría no existe
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return null;
  if (error) return <div className="min-h-screen flex items-center justify-center">{error}</div>;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "#FAF1E3",
        padding: "2rem",
      }}
    >
      <LogoutButton />
      <div
        className="w-full flex flex-col gap-6"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <NewNoteButton />
        <div className="flex gap-6">
          <CategorySidebar
            categories={categoryCounts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1">
            {filteredNotes.length === 0 ? (
              <EmptyState />
            ) : (
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns:
                    filteredNotes.length < 3
                      ? "repeat(3, minmax(250px, 1fr))"
                      : "repeat(auto-fit, minmax(250px, 1fr))",
                }}
              >
                {filteredNotes.map((note) => (
                  <Card key={note.id} note={note} color={getCategoryColor(note.category)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
