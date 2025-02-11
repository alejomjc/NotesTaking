export default function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: "70vh",
        textAlign: "center",
      }}
    >
      <img
        src="/empty.png"
        alt="Empty State"
        className="mb-4"
        style={{ width: "200px", height: "200px" }}
      />
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          color: "#957139",
          fontWeight: "bold",
        }}
      >
        I’m just here waiting for your charming notes...
      </p>
    </div>
  );
}
