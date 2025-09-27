export type Category = {
  id: string;
  name: string;
  annualBudget: number;
  actuals: { [month: string]: number }; // { "2025-01": 500, "2025-02": 420 }
};

export type BudgetData = {
  categories: Category[];
};
