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
  category_id: number;
  notes?: string;
}

export interface ProjectedIncome {
  id: number;
  amount: number;
  date: string; // ISO date string
  source: string;
  notes?: string;
  recurrence: 'once' | 'weekly' | 'fortnightly' | 'monthly' | 'annually'
}

export interface ProjectedExpense {
  id: number;
  amount: number;
  expected_date: string; // ISO date string
  category_id: number;
  notes?: string;
  recurrence: 'once' | 'weekly' | 'fortnightly' | 'monthly' | 'annually'
}

export interface Category {
  id: number;
  name: string;
}

export interface Money {
  id: number;
  amount: number;
  category_id?: number; // if undefined = "free money"
}

export interface BudgetData {
  starting_balance: number; // the amount already in the bank at the time you start tracking
  income: Income[];
  expenses: Expense[];
  projected_income: ProjectedIncome[];
  projected_expenses: ProjectedExpense[];
  categories: Category[];
  money: Money[];
}
