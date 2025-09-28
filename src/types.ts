export interface Income {
  id: number;
  amount: number;
  date: string; // ISO date string
  source: string;
  notes?: string;
}

export interface Expense {
  id: number;
  amount: number;
  date: string; // ISO date string
  categoryId: number;
  notes?: string;
}

export interface ProjectedIncome {
  id: number;
  amount: number;
  date: string; // ISO date string
  source: string;
  notes?: string;
  recurrence_group_id?: number;
}

export interface BudgetedExpense {
  id: number;
  amount: number;
  date: string; // ISO date string
  categoryId: number;
  notes?: string;
  recurrence_group_id?: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface BudgetData {
  startingBalance: number; // the amount already in the bank at the time you start tracking
  incomes: Income[];
  expenses: Expense[];
  projectedIncomes: ProjectedIncome[];
  budgetedExpenses: BudgetedExpense[];
  categories: Category[];
}
