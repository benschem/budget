import useLocalStorage from "./useLocalStorage";
import type { Expense } from "../types";

export default function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    "expenses",
    [],
  );

  const addExpense = (
    amount: number,
    date: string,
    categoryId: string,
    notes?: string,
  ) => {
    setExpenses((prev: Expense[]) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        amount,
        date,
        categoryId,
        ...(notes !== undefined && { notes }),
      },
    ]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev =>
      prev.map(expense => (expense.id === id ? { ...expense, ...updates } : expense)),
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return { expenses, setExpenses, addExpense, updateExpense, deleteExpense };
}
