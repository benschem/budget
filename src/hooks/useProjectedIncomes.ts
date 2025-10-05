import useLocalStorage from "./useLocalStorage";
import type { ProjectedIncome } from "../types";

export default function useProjectedIncomess() {
  const [projectedIncomes, setProjectedIncomes] = useLocalStorage<ProjectedIncome[]>(
    "projectedIncomes",
    [],
  );

  const addProjectedIncome = (
    amount: number,
    date: string,
    source: string,
    notes: string,
    recurrence_group_id: string,
  ) => {
    setProjectedIncomes((prev: ProjectedIncome[]) => [
      ...prev,
      { id: crypto.randomUUID(), amount, date, source, notes, recurrence_group_id },
    ]);
  };

  const updateProjectedIncome = (id: string, updates: Partial<ProjectedIncome>) => {
    setProjectedIncomes(prev =>
      prev.map(income => (income.id === id ? { ...income, ...updates } : income)),
    );
  };

  const deleteProjectedIncome = (id: string) => {
    setProjectedIncomes(prev => prev.filter(income => income.id !== id));
  };

  return { projectedIncomes, setProjectedIncomes, addProjectedIncome, updateProjectedIncome, deleteProjectedIncome };
}
