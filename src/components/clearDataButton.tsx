import { useContext } from 'react';
import { BudgetContext } from '../App';

export default function ExportDataButton() {
  const budgetData = useContext(BudgetContext);

  if (!budgetData) {
    throw new Error('SaveDataButton must be used within a BudgetContext.Provider');
  }

  return(
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem('budgetData');
        location.reload();
      }}
    >
      Clear Data
    </button>
  )
}
