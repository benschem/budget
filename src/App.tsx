import {
  loadBudgetData,
  calculateBalance,
  calculateProjectedIncome,
  calculateBudgetedExpenses,
  calculateAvailableToSpend,
  calculateTotalSpendPerCategory,
  calculatePastProjectedSpendPerCategory,
  calculateFutureProjectedSpendPerCategoryPerMonth,
} from './lib/budgetHelpers';

const budgetData = await loadBudgetData('budgetData.json');
const balance = calculateBalance(budgetData).toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const projectedIncome = calculateProjectedIncome(budgetData.projectedIncomes).toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const allocated = calculateBudgetedExpenses(budgetData.budgetedExpenses).toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const unallocated = calculateAvailableToSpend(budgetData).toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const weeksUntilEofy = 39;
const weeklySpend = (calculateAvailableToSpend(budgetData) / weeksUntilEofy).toLocaleString('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function App() {
  return (
    <div>
      <h1>Budget</h1>
      <p>You currently should have ${balance} in the bank</p>
      <h2>Until EOFY:</h2>
      <ul>
        <li>You should earn ${projectedIncome}</li>
        <li>You have allocated ${allocated}</li>
        <li>You have not allocated ${unallocated}</li>
        <li>You could spend up to ${weeklySpend} per week</li>
      </ul>

      <h2>Categories</h2>
      <ul>
        {budgetData.categories.map((category) => {
          const pastProjectedSpend = calculatePastProjectedSpendPerCategory(budgetData, category);
          const totalSpend = calculateTotalSpendPerCategory(budgetData, category);
          const futureProjectedSpendPerMonth = calculateFutureProjectedSpendPerCategoryPerMonth(
            budgetData,
            category,
          );

          return (
            <li key={category.id}>
              <h3>{category.name}</h3>
              <p>{totalSpend > pastProjectedSpend ? 'Over' : 'Under'} budget</p>
              <p>
                Spent $
                {totalSpend.toLocaleString('en', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                out of $
                {pastProjectedSpend.toLocaleString('en', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                so far
              </p>
              <p>
                Budgeted $
                {futureProjectedSpendPerMonth.toLocaleString('en', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                per month until EOFY
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
