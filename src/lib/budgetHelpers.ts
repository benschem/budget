import fetchJson from '../utils/fetchJson';
import type {
  BudgetData,
  Category,
  Income,
  Expense,
  ProjectedIncome,
  BudgetedExpense,
} from '../types';

export async function loadBudgetData(path: string): Promise<BudgetData> {
  return fetchJson<BudgetData>(path);
}

export function calculateTotalSpent(expenses: Expense[]) {
  const total = expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0);
  return total;
}

export function calculateTotalIncomeReceived(incomes: Income[]) {
  const total = incomes.reduce((acc: number, income: Income) => acc + income.amount, 0);
  return total;
}

export function calculateBalance(data: BudgetData) {
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

export function calculateAvailableToSpend(data: BudgetData) {
  const current = calculateBalance(data);
  const comingIn = calculateProjectedIncome(data.projectedIncomes);
  const goingOut = calculateBudgetedExpenses(data.budgetedExpenses);
  const available = current + comingIn - goingOut;
  return available;
}

export function calculateTotalSpendPerCategory(data: BudgetData, category: Category) {
  let total = 0;
  data.expenses.forEach((expense) => {
    if (expense.categoryId === category.id) {
      total += expense.amount;
    }
  });
  return total;
}

export function calculatePastProjectedSpendPerCategory(data: BudgetData, category: Category) {
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

export function calculateFutureProjectedSpendPerCategoryPerMonth(
  data: BudgetData,
  category: Category,
) {
  let total = 0;
  data.budgetedExpenses.forEach((budgetedExpense) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfFinancialYear = new Date('2026-07-01');
    const expectedDate = new Date(budgetedExpense.date);
    if (
      budgetedExpense.categoryId === category.id &&
      expectedDate > today &&
      expectedDate < endOfFinancialYear
    ) {
      total += budgetedExpense.amount;
    }
  });
  const monthsBetweenNowAndEndOfFinancialYear = 9;
  return total / monthsBetweenNowAndEndOfFinancialYear;
}
