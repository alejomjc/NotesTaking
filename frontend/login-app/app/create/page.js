"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Random Thoughts");
  const [noteTitle, setNoteTitle] = useState("Note Title");
  const [lastEdited, setLastEdited] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const contentRef = useRef(null);

  const categories = [
    { name: "Random Thoughts", color: "#EF9C66" },
    { name: "School", color: "#FCDC94" },
    { name: "Personal", color: "#78ABA8" },
    { name: "Drama", color: "#C8CFA0" },
  ];

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (!authStatus) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);

    const now = new Date();
    setLastEdited(now.toLocaleString("en-US", {
      month: "long", day: "numeric", year: "numeric",
      hour: "numeric", minute: "numeric", hour12: true,
    }));

    if (contentRef.current && contentRef.current.innerText.trim() === "") {
      contentRef.current.innerText = "Pour your heart out...";
    }
  }, []);

  const selectedCategoryColor = categories.find(
    (cat) => cat.name === selectedCategory
  )?.color;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
    saveNote();
  };

  const saveNote = async () => {
    if (!noteTitle.trim() && contentRef.current.innerText === "Pour your heart out...") {
      return;
    }

    const noteData = {
      title: noteTitle,
      content: contentRef.current.innerText === "Pour your heart out..." ? "" : contentRef.current.innerText,
      category: selectedCategory,
    };

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId ? noteId + "/" : "create/"}`, {
        method: noteId ? "PUT" : "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (!noteId) {
        setNoteId(data.id);
      }

      const now = new Date();
      setLastEdited(now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }));
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
    saveNote();
  };

  const handleContentBlur = () => {
    if (contentRef.current.innerText.trim() === "") {
      contentRef.current.innerText = "Pour your heart out...";
    }
    saveNote();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF1E3", padding: "2rem" }}>
      <div className="w-full flex flex-col gap-6" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="flex justify-end">
          <button onClick={() => router.push("/")} style={{
            fontSize: "24px", fontWeight: "bold", backgroundColor: "transparent",
            border: "none", cursor: "pointer"
          }}>✖</button>
        </div>

        <div className="relative inline-block text-left w-64">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between p-3 rounded-md border w-full"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", border: `2px solid #957139`, color: "black",
              backgroundColor: "#FAF1E3", cursor: "pointer" }}>
            <div className="flex items-center gap-2">
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: selectedCategoryColor }}></span>
              {selectedCategory}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#957139" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {dropdownOpen && (
            <ul className="absolute left-0 bg-white shadow-md z-20 rounded-md" style={{ backgroundColor: "#FAF1E3", padding: "0.5rem 0", marginTop: "4px", listStyle: "none", width: "100%" }}>
              {categories.map((category) => (
                <li key={category.name} onClick={() => handleCategorySelect(category.name)}
                  className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "black" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: category.color }}></span>
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 rounded-lg shadow-md relative" style={{ backgroundColor: `${selectedCategoryColor}80`, border: `3px solid ${selectedCategoryColor}`, minHeight: "60vh" }}>
          <div className="absolute" style={{ top: "1.5rem", right: "1.5rem", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "black" }}>
            Last Edited: {lastEdited}
          </div>

          <input type="text" value={noteTitle} onChange={handleTitleChange}
            style={{ fontFamily: "Inria Serif, serif", fontWeight: "bold", fontSize: "24px", width: "100%", backgroundColor: "transparent",
              border: "none", outline: "none", marginBottom: "1rem", color: "black" }} />

          <div ref={contentRef} contentEditable className="w-full h-full p-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", border: "none",
              outline: "none", backgroundColor: "transparent", color: "black", overflow: "hidden" }} onBlur={handleContentBlur} />
        </div>
      </div>
    </div>
  );
}
