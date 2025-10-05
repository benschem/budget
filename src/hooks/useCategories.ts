import useLocalStorage from "./useLocalStorage";
import type { Category } from "../types";

export default function useCategories() {
  const [categories, setCategories] = useLocalStorage<Category[]>("categories", []);

  const addCategory = (name: string) => {
    setCategories(prev => [...prev, { id: crypto.randomUUID(), name }]);
  };
  const updateCategory = (id: string, name: string) => {
    setCategories(prev => prev.map(category => (category.id === id ? { ...category, name } : category)));
  };
  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  return { categories, setCategories, addCategory, updateCategory, deleteCategory };
}
