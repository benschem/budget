import { useState } from 'react';
import type { FormEvent } from 'react';

type Props = {
  onAdd: (name: string, annualBudget: number) => void;
};

export default function BudgetForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [annualBudget, setAnnualBudget] = useState<number>(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || annualBudget <= 0) return;
    onAdd(name, annualBudget);
    setName('');
    setAnnualBudget(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="categoryName"
        placeholder="Category name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Annual budget"
        value={annualBudget}
        onChange={(event) => setAnnualBudget(Number(event.target.value))}
      />
      <button type="submit">Add</button>
    </form>
  );
}
