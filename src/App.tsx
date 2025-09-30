import { createContext, useState } from 'react';
import { loadBudgetFromLocalStorage, loadDummyData } from './lib/budget/repository';
import SaveDataButton from './components/saveDataButton';
import Overview from './components/overview';
import CategoryCard from './components/categoryCard';
import type { BudgetData, Category } from './types';

export const BudgetContext = createContext<BudgetData | null>(null);

export default function App() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(() => loadBudgetFromLocalStorage('budgetData'));

  if (!budgetData) return <p>Loading...</p>;

  return (
    <BudgetContext.Provider value={budgetData}>
      <h1>Budget</h1>
      <button
        type="button"
        onClick={async () => {
          const data = await loadDummyData();
          if (data) {
            setBudgetData(data);
          }
        }}
      >
        Load Dummy Data From File
      </button>
      <SaveDataButton />
      <Overview />
      <h2>Categories</h2>
      <ul>
        {budgetData.categories.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ul>
    </BudgetContext.Provider>
  );
}
