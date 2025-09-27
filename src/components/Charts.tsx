import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Label,
} from 'recharts';
import type { Category } from '../types';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

// Utility to darken a hex color slightly
function darkenHexColor(hex: string, amount: number = 20) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);

  const rr = r.toString(16).padStart(2, '0');
  const gg = g.toString(16).padStart(2, '0');
  const bb = b.toString(16).padStart(2, '0');

  return `#${rr}${gg}${bb}`;
}

type Props = {
  categories: Category[];
};

export default function Charts({ categories }: Props) {
  // Map each category ID to a color to keep consistency
  const colorMap: Record<string, string> = {};
  categories.forEach((cat, idx) => {
    colorMap[cat.id] = COLORS[idx % COLORS.length];
  });

  // Pie chart data
  const pieData = categories.map((category) => ({
    id: category.id,
    name: category.name,
    value: category.annualBudget,
  }));

  const total = categories.reduce((sum, cat) => sum + cat.annualBudget, 0);

  // Bar chart data
  const barData = categories.map((category) => {
    const ytd = Object.values(category.monthlySpends ?? {}).reduce((sum, val) => sum + val, 0);
    return {
      id: category.id,
      name: category.name,
      budgeted: category.annualBudget,
      spent: ytd,
    };
  });

  return (
    <div>
      <h3>Budget Allocation</h3>

      <PieChart width={600} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          label={({ name, value }) => `${name}: $${(value as number).toLocaleString()}`}
        >
          {pieData.map((category) => (
            <Cell key={category.id} fill={colorMap[category.id]} />
          ))}
          <Label
            value={`$${total.toLocaleString()}`}
            position="center"
            style={{ fontWeight: 'bold', fontSize: 16 }}
          />
        </Pie>
        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
      </PieChart>

      <h3>Annual Budget vs YTD Spending</h3>

      <BarChart
        width={500}
        height={300}
        data={barData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 0,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value}`} />

        {/* Budgeted bars */}
        <Bar dataKey="budgeted" name="Budgeted">
          {barData.map((category) => (
            <Cell key={category.id} fill={colorMap[category.id]} />
          ))}
          <LabelList
            dataKey="budgeted"
            position="top"
            formatter={(val) => `$${(val ?? 0).toLocaleString()}`}
          />
        </Bar>

        {/* Spent bars (darker shade) */}
        <Bar dataKey="spent" name="Spent">
          {barData.map((category) => (
            <Cell key={category.id} fill={darkenHexColor(colorMap[category.id], 80)} />
          ))}
          <LabelList
            dataKey="spent"
            position="top"
            formatter={(val) => `$${(val ?? 0).toLocaleString()}`}
          />
        </Bar>
      </BarChart>
    </div>
  );
}
