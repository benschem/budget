import useLocalStorage from "./useLocalStorage";
import type { Income } from "../types";

export default function useIncomes() {
  const [incomes, setIncomes] = useLocalStorage<Income[]>(
    "incomes",
    [],
  );

  const addIncome = (
    amount: number,
    date: string,
    source: string,
    notes?: string,
  ) => {
    setIncomes((prev: Income[]) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        amount,
        date,
        source,
        ...(notes !== undefined && { notes }),
      },
    ]);
  };

  const updateIncome = (id: string, updates: Partial<Income>) => {
    setIncomes(prev =>
      prev.map(income => (income.id === id ? { ...income, ...updates } : income)),
    );
  };

  const deleteIncome = (id: string) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
  };

  return { incomes, setIncomes, addIncome, updateIncome, deleteIncome };
}
