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
          <th>YTD Actual</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => {
          const ytd = Object.values(cat.actuals).reduce((sum, val) => sum + val, 0);
          const monthlyBudget = (cat.annualBudget / 12).toFixed(2);
          return (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.annualBudget}</td>
              <td>{monthlyBudget}</td>
              <td>{ytd}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
