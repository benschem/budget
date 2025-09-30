import { useContext } from 'react';
import { BudgetContext } from '../App';
import type { Category } from '../types';
import {
  calculateTotalSpendPerCategory,
  calculateTotalPastBudgetedExpensesPerCategory,
  calculateFutureSpendPerCategoryPerMonth,
  calculateBudgetStatus,
} from '../lib/budget/calculators';
import moneyFormatter from './helpers/moneyFormatter';

type Props = { category: Category };

export default function CategoryCard({ category }: Props) {
  const budgetData = useContext(BudgetContext);
  if (!budgetData) {
    throw new Error('CategoryCard must be used within a BudgetContext.Provider');
  }

  const { name } = category;
  const pastBudget = calculateTotalPastBudgetedExpensesPerCategory(budgetData, category);
  const currentSpend = calculateTotalSpendPerCategory(budgetData, category);
  const futureSpendPerMonth = calculateFutureSpendPerCategoryPerMonth(budgetData, category);
  const status = `${calculateBudgetStatus(currentSpend, pastBudget)} budget`;

  return (
    <li>
      <h3>{name}</h3>
      <p>{status}</p>
      <p>
        Spent ${moneyFormatter(currentSpend)} out of budgeted ${moneyFormatter(pastBudget)} this
        financial year.
      </p>
      <h4>Budget</h4>
      <p>Period: Now - EOFY</p>
      <p>${moneyFormatter(futureSpendPerMonth)} per month</p>
    </li>
  );
}
