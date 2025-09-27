export type Category = {
  id: string;
  name: string;
  annualBudget: number;
  monthlySpends: { [month: string]: number }; // { "2025-01": 500, "2025-02": 420 }
};

export type SpendingEntry = {
  categoryId: string;
  month: string;
  amount: number;
};

export type BudgetData = {
  categories: Category[];
};
