import { createContext, useState } from 'react';
import { loadBudgetFromLocalStorage, loadDummyData, saveBudgetToLocalStorage } from './lib/budget/repository';
import SaveDataButton from './components/saveDataButton';
import ExportDataButton from './components/exportDataButton';
import ClearDataButton from './components/clearDataButton';
import CategoryManager from './components/categoryManager';
import Overview from './components/overview';
import CategoryCard from './components/categoryCard';
import type { BudgetData } from './types';

export const BudgetContext = createContext<BudgetData | null>(null);

export default function App() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(() => loadBudgetFromLocalStorage('budgetData'));

  if (!budgetData) return (
    <div>
      <p>No local data.</p>
      <button
        type="button"
        onClick={async () => {
          const data = await loadDummyData();
          if (data) {
            setBudgetData(data);
            saveBudgetToLocalStorage('budgetData', data)
          }
        }}
      >
        Load Demo Data
      </button>
      <button
        type="button"
        onClick={() => {
          // Create a hidden file input
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'application/json';
          input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (!target.files || target.files.length === 0) return;

            const file = target.files[0];
            try {
              const text = await file.text();
              const data: BudgetData = JSON.parse(text);
              setBudgetData(data);
              saveBudgetToLocalStorage('budgetData', data);
            } catch (err) {
              console.error('Failed to parse uploaded JSON file', err);
            }
          };
          input.click(); // trigger file picker
        }}
      >
        Load From File
      </button>
    </div>
  )

  return (
    <BudgetContext.Provider value={budgetData}>
      <h1>Budget</h1>
      <SaveDataButton />
      <ExportDataButton />
      <ClearDataButton />
      <Overview />
      <CategoryManager />
      <h2>Categories</h2>
      <ul>
        {budgetData.categories.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ul>
    </BudgetContext.Provider>
  );
}
