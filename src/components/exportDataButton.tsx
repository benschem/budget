import { useContext } from 'react';
import { BudgetContext } from '../App';
import { exportBudgetToJson } from '../lib/budget/repository'

export default function ExportDataButton() {
  const budgetData = useContext(BudgetContext);

  if (!budgetData) {
    throw new Error('SaveDataButton must be used within a BudgetContext.Provider');
  }

  return(
    <button
      type="button"
      onClick={() => {
        exportBudgetToJson(budgetData);
      }}
    >
      Export Budget Data
    </button>
  )
}
