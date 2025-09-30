import { useContext } from 'react';
import { BudgetContext } from '../App';

import {
  calculateCurrentBalance,
  calculateProjectedIncome,
  calculateBudgetedExpenses,
  calculateAvailableToSpend,
} from '../lib/budget/calculators';

export default function Overview() {
  const budgetData = useContext(BudgetContext);
  if (!budgetData) {
    throw new Error('Overview must be used within a BudgetContext.Provider');
  }

  const balance = calculateCurrentBalance(budgetData).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const projectedIncome = calculateProjectedIncome(budgetData.projectedIncomes).toLocaleString(
    'en',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );
  const allocated = calculateBudgetedExpenses(budgetData.budgetedExpenses).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const free = calculateAvailableToSpend(budgetData).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const weeksUntilEofy = 39;
  const available = (calculateAvailableToSpend(budgetData) / weeksUntilEofy).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <p>You currently should have ${balance} in the bank</p>
      <h2>Until EOFY:</h2>
      <ul>
        <li>You should earn ${projectedIncome}</li>
        <li>You have allocated ${allocated}</li>
        <li>You have not allocated ${free}</li>
        <li>You could spend up to ${available} per week</li>
      </ul>
    </div>
  );
}
