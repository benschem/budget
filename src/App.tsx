import { useState } from 'react';
import type { BudgetData, Category } from './types';
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
      actuals: {},
    };
    setData({ categories: [...data.categories, newCategory] });
  };

  const addActual = (categoryId: string, month: string, amount: number) => {
    setData({
      categories: data.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, actuals: { ...cat.actuals, [month]: amount } } : cat,
      ),
    });
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Budget App MVP</h1>

      <h2>Add Category</h2>
      <BudgetForm onAdd={addCategory} />

      <h2>Log Monthly Spending</h2>
      <CheckInForm categories={data.categories} onAddActual={addActual} />

      <h2>Overview</h2>
      <BudgetTable categories={data.categories} />

      <h2>Charts</h2>
      <Charts categories={data.categories} />
    </div>
  );
}
