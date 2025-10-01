// useCategories.ts
import { useState } from "react";

export interface Category {
  id: string;
  name: string;
}

export function useCategories(initial: Category[] = []) {
  const [categories, setCategories] = useState<Category[]>(initial);

  const addCategory = (name: string) => {
    const newCategory: Category = { id: crypto.randomUUID(), name };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, name: string) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, name } : cat)),
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return { categories, addCategory, updateCategory, deleteCategory };
}
