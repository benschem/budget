import { Fragment } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Category } from '../types';

function formatChartData(categories: Category[]) {
  // Collect all months across categories
  const allMonths = Array.from(
    new Set(categories.flatMap((cat) => Object.keys(cat.monthlySpends))),
  ).sort();

  // Build one object per month
  return allMonths.map((month) => {
    const monthData: { month: string; [key: string]: number | string } = { month };

    categories.forEach((cat) => {
      const monthlyBudget = cat.annualBudget / 12;
      monthData[`${cat.name} - Budgeted`] = monthlyBudget;
      monthData[`${cat.name} - YTD Spent`] = cat.monthlySpends[month] ?? 0;
    });

    return monthData;
  });
}

type Props = { categories: Category[] };

export default function BudgetLineChart({ categories }: Props) {
  const data = formatChartData(categories);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {categories.map((cat, index) => (
          <Fragment key={cat.id}>
            <Line
              type="monotone"
              dataKey={`${cat.name} - Budgeted`}
              stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey={`${cat.name} - YTD Spent`}
              stroke={`hsl(${(index * 60 + 30) % 360}, 70%, 50%)`}
            />
          </Fragment>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
