export default function Card({ note, color, onDelete }) {
  const getStyles = (color) => ({
    backgroundColor: `${color}80`,
    border: `3px solid ${color}`,
  });

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notes/delete/${note.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="relative p-6 rounded-lg shadow-md" style={getStyles(color)}>
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-400 text-sm p-1 opacity-50 hover:opacity-100 transition"
      >
        ×
      </button>

      <p className="text-sm mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "black" }}>
        <span className="font-bold">{note.date}</span> <span>{note.category}</span>
      </p>
      <h2 className="mb-4" style={{ fontFamily: "Inria Serif, serif", fontWeight: "bold", fontSize: "24px" }}>
        {note.title}
      </h2>
      {Array.isArray(note.content) ? (
        <ul className="list-disc pl-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "black" }}>
          {note.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "black" }}>
          {note.content}
        </p>
      )}
    </div>
  );
}
