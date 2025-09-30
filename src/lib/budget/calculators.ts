import type {
  BudgetData,
  Category,
  Income,
  Expense,
  ProjectedIncome,
  BudgetedExpense,
} from '../../types';

export function calculateTotalSpent(expenses: Expense[]) {
  const total = expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0);
  return total;
}

export function calculateTotalIncomeReceived(incomes: Income[]) {
  const total = incomes.reduce((acc: number, income: Income) => acc + income.amount, 0);
  return total;
}

export function calculateCurrentBalance(data: BudgetData | null) {
  if (data == null) return 0;

  const totalSpent = calculateTotalSpent(data.expenses);
  const totalReceived = calculateTotalIncomeReceived(data.incomes);
  const balance = data.startingBalance - totalSpent + totalReceived;
  return balance;
}

export function calculateProjectedIncome(projectedIncomes: ProjectedIncome[]) {
  let total = 0;
  projectedIncomes.forEach((projected) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expectedDate = new Date(projected.date);
    const endOfFinancialYear = new Date('2026-07-01');
    if (expectedDate > today && expectedDate < endOfFinancialYear) {
      total += projected.amount;
    }
  });
  return total;
}

export function calculateBudgetedExpenses(budgetedExpenses: BudgetedExpense[]) {
  let total = 0;
  budgetedExpenses.forEach((projected) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expectedDate = new Date(projected.date);
    const endOfFinancialYear = new Date('2026-07-01');
    if (expectedDate > today && expectedDate < endOfFinancialYear) {
      total += projected.amount;
    }
  });
  return total;
}

export function calculateAvailableToSpend(data: BudgetData | null) {
  if (data == null) return 0;

  const current = calculateCurrentBalance(data);
  const comingIn = calculateProjectedIncome(data.projectedIncomes);
  const goingOut = calculateBudgetedExpenses(data.budgetedExpenses);
  const available = current + comingIn - goingOut;
  return available;
}

export function calculateTotalSpendPerCategory(data: BudgetData | null, category: Category) {
  if (data == null) return 0;

  let total = 0;
  data.expenses.forEach((expense) => {
    if (expense.categoryId === category.id) {
      total += expense.amount;
    }
  });
  return total;
}

export function calculateTotalPastBudgetedExpensesPerCategory(
  data: BudgetData | null,
  category: Category,
) {
  if (data == null) return 0;

  let total = 0;
  data.budgetedExpenses.forEach((budgetedExpense) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expectedDate = new Date(budgetedExpense.date);
    if (budgetedExpense.categoryId === category.id && expectedDate <= today) {
      total += budgetedExpense.amount;
    }
  });
  return total;
}

export function calculateFutureSpendPerCategoryPerMonth(
  data: BudgetData | null,
  category: Category,
) {
  if (data == null) return 0;

  let total = 0;
  data.budgetedExpenses.forEach((budgetedExpense) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfFinancialYear = new Date('2026-07-01');
    const expectedDate = new Date(budgetedExpense.date);
    if (
      budgetedExpense.categoryId === category.id &&
      expectedDate.getTime() > today.getTime() &&
      expectedDate.getTime() < endOfFinancialYear.getTime()
    ) {
      total += budgetedExpense.amount;
    }
  });
  const monthsBetweenNowAndEndOfFinancialYear = 9;
  return total / monthsBetweenNowAndEndOfFinancialYear;
}

export function calculateBudgetStatus(spent: number, budgeted: number) {
  let status;
  if (spent > budgeted) {
    status = 'Over';
  } else if (spent === budgeted) {
    status = 'On';
  } else {
    status = 'Under';
  }
  return status;
}
