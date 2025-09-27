import type { BudgetData, Category, SpendingEntry } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import BudgetForm from './components/BudgetForm';
import CheckInForm from './components/CheckInForm';
import BudgetTable from './components/BudgetTable';
import Charts from './components/Charts';
import './App.css';

export default function App() {
  const [data, setData] = useLocalStorage<BudgetData>('budget-data', {
    categories: [],
  });

  const addCategory = (name: string, annualBudget: number) => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      annualBudget,
      monthlySpends: {},
    };
    setData({ categories: [...data.categories, newCategory] });
  };

  const addSpending = (spendingEntries: SpendingEntry[]) => {
    const entriesByCategory: Record<string, SpendingEntry[]> = {};
    spendingEntries.forEach((entry) => {
      entriesByCategory[entry.categoryId] = entriesByCategory[entry.categoryId] ?? [];
      entriesByCategory[entry.categoryId].push(entry);
    });

    setData((previous) => ({
      categories: previous.categories.map((category) => {
        const entriesForCategory = entriesByCategory[category.id];
        if (!entriesForCategory) return category;

        const updatedMonthlySpends: Record<string, number> = {
          ...category.monthlySpends,
        };
        entriesForCategory.forEach((entry) => {
          updatedMonthlySpends[entry.month] = entry.amount;
        });

        return { ...category, monthlySpends: updatedMonthlySpends };
      }),
    }));
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Budget</h1>

      <h2>Add Category</h2>
      <BudgetForm onAdd={addCategory} />

      <h2>Log Monthly Spending</h2>
      <CheckInForm categories={data.categories} onAdd={addSpending} />

      <h2>Overview</h2>
      <BudgetTable categories={data.categories} />

      <h2>Charts</h2>
      <Charts categories={data.categories} />
    </div>
  );
}
