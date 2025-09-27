import type { Category } from '../types';

type Props = {
  categories: Category[];
};

export default function BudgetTable({ categories }: Props) {
  return (
    <table border={1} cellPadding={5}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Annual Budget</th>
          <th>Monthly Budget</th>
          <th>YTD Spent</th>
          <th>Budget Remaining</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => {
          const ytd = Object.values(category.monthlySpends ?? {}).reduce(
            (sum, val) => sum + (val ?? 0),
            0,
          );
          const monthlyBudget = (category.annualBudget / 12).toFixed(2);
          return (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>${category.annualBudget.toLocaleString()}</td>
              <td>${monthlyBudget.toLocaleString()}</td>
              <td>${ytd.toLocaleString()}</td>
              <td>${(category.annualBudget - ytd).toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
