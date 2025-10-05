import { useCategories } from "../hooks/useCategories";
import { Category } from "";

export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategory(name);
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {categories.map(cat => (
          <Category
            key={cat.id}
            category={cat}
            onEdit={id => console.log("Edit", id)}
            onDelete={deleteCategory}
          />
        ))}
      </ul>
    </div>
  );
}
