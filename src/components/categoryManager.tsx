// CategoryManager.tsx
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";

export default function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    addCategory(name);
    setName("");
  };

  return (
    <div>
      <h2>Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category name"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {categories.map(c => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => deleteCategory(c.id)}>Delete</button>
            <button onClick={() => updateCategory(c.id, `${c.name} (edited)`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
