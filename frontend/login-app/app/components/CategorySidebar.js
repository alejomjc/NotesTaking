export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <aside className="w-1/4">
      <h2
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
        onClick={() => onSelectCategory("All Categories")}
        className="cursor-pointer"
      >
        All Categories
      </h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li
            key={category.name}
            className={`flex justify-between items-center cursor-pointer ${
              selectedCategory === category.name ? "font-bold" : ""
            }`}
            onClick={() => onSelectCategory(category.name)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "black",
            }}
          >
            <span className="flex items-center">
              <span
                className="w-4 h-4 rounded-full inline-block mr-3"
                style={{ backgroundColor: category.color }}
              ></span>
              {category.name}
            </span>
            {category.count > 0 && (
              <span style={{ fontWeight: "bold" }}>{category.count}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
