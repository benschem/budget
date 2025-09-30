import type { BudgetData } from '../../types';

export function loadBudgetFromLocalStorage(key: string): BudgetData | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      console.warn('Nothing in localStorage');
      return null;
    }
    return JSON.parse(raw) as BudgetData;
  } catch (err) {
    console.error('Failed to parse budget from localStorage', err);
    return null;
  }
}

export function saveBudgetToLocalStorage(key: string, data: BudgetData): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save budget to localStorage', err);
  }
}

export async function loadDummyData(): Promise<BudgetData> | null {
  try {
    const response = await fetch('/data.json'); // Path relative to the public/dist folder
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Failed to parse budget from dummy file', err);
    return null;
  }
}
