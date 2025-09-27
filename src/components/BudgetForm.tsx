import { useState } from 'react';

type Props = {
  onAdd: (name: string, annualBudget: number) => void;
};

export default function BudgetForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || budget <= 0) return;
    onAdd(name, budget);
    setName('');
    setBudget(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type="number"
        placeholder="Annual budget"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      <button type="submit">Add</button>
    </form>
  );
}
