import useLocalStorage from "./useLocalStorage";
import type { BudgetedExpense } from "../types";


export default function useBudgetedExpenses() {
  const [budgetedExpenses, setBudgetedExpenses] = useLocalStorage<BudgetedExpense[]>(
    "budgetedExpenses",
    [],
  );

  const addBudgetedExpense = (
    amount: number,
    date: string,
    categoryId: string,
    notes?: string,
    recurrence_group_id?: number,
  ) => {
    setBudgetedExpenses((prev: BudgetedExpense[]) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        amount,
        date,
        categoryId,
        ...(notes !== undefined && { notes }),
        ...(recurrence_group_id !== undefined && { recurrence_group_id }),
      },
    ]);
  };

  const updateBudgetedExpense = (id: string, updates: Partial<BudgetedExpense>) => {
    setBudgetedExpenses(prev =>
      prev.map(expense => (expense.id === id ? { ...expense, ...updates } : expense)),
    );
  };

  const deleteBudgetedExpense = (id: string) => {
    setBudgetedExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return { budgetedExpenses, setBudgetedExpenses, addBudgetedExpense, updateBudgetedExpense, deleteBudgetedExpense };
}
