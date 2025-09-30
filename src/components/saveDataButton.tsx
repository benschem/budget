import { useContext } from 'react';
import { BudgetContext } from '../App';
import { saveBudgetToLocalStorage } from '../lib/budget/repository';

export default function SaveDataButton() {
  const budgetData = useContext(BudgetContext);
  if (!budgetData) {
    throw new Error('SaveDataButton must be used within a BudgetContext.Provider');
  }

  return (
    <button
      type="button"
      onClick={() => {
        saveBudgetToLocalStorage('budgetData', budgetData);
      }}
    >
      Save Budget
    </button>
  );
}
