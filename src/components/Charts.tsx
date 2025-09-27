import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { Category } from '../types';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

type Props = {
  categories: Category[];
};

export default function Charts({ categories }: Props) {
  const pieData = categories.map((cat) => ({
    name: cat.name,
    value: cat.annualBudget,
  }));

  const barData = categories.map((cat) => {
    const ytd = Object.values(cat.actuals).reduce((sum, val) => sum + val, 0);
    return {
      name: cat.name,
      budget: cat.annualBudget,
      actual: ytd,
    };
  });

  return (
    <div>
      <h3>Budget Allocation</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <h3>Budget vs Actual (YTD)</h3>
      <BarChart width={500} height={300} data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" />
        <Bar dataKey="actual" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
