import type { BudgetData } from '../../types';

export async function loadDummyData(): Promise<BudgetData | null> {
  try {
    const response = await fetch('/dummyBudgetData.json'); // Path relative to the public/dist folder
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Failed to parse budget from dummy file', error);
    return null;
  }
}

export function exportBudgetToJson(budgetData: BudgetData): void {
  if (!budgetData) return;

  const jsonString = JSON.stringify(budgetData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'budgetData.json';
  a.click();
  URL.revokeObjectURL(url);
}
