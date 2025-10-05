import type { BudgetData } from '../types';

import useBankBalance from "./useBankBalance";
import useBudgetedExpenses from "./useBudgetedExpenses";
import useCategories from "./useCategories";
import useExpenses from "./useExpenses";
import useIncomes from "./useIncomes";
import useProjectedIncomes from "./useProjectedIncomes";
import useSavingsBuckets from "./useSavingsBuckets";

export default function useBudgetData() {
  const { bankBalance, setBankBalance } = useBankBalance();
  const { categories, setCategories } = useCategories();
  const { incomes, setIncomes } = useIncomes();
  const { expenses, setExpenses } = useExpenses();
  const { projectedIncomes, setProjectedIncomes } = useProjectedIncomes();
  const { budgetedExpenses, setBudgetedExpenses } = useBudgetedExpenses();
  const { savingsBuckets, setSavingsBuckets } = useSavingsBuckets();

  const budgetData: BudgetData = {
    bankBalance,
    categories,
    incomes,
    expenses,
    projectedIncomes,
    budgetedExpenses,

    savingsBuckets,
  };

  const setBudgetData = (data: BudgetData) => {
    setBankBalance(data.bankBalance);
    setCategories(data.categories);
    setIncomes(data.incomes);
    setExpenses(data.expenses);
    setProjectedIncomes(data.projectedIncomes);
    setBudgetedExpenses(data.budgetedExpenses);
    setSavingsBuckets(data.savingsBuckets);
  }

  return { budgetData, setBudgetData };
}
