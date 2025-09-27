import { useState } from 'react';
import type { Category } from '../types';

type Props = {
  categories: Category[];
  onAddActual: (categoryId: string, month: string, amount: number) => void;
};

export default function CheckInForm({ categories, onAddActual }: Props) {
  const [month, setMonth] = useState('2025-01');
  const [amounts, setAmounts] = useState<{ [id: string]: number }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    categories.forEach((cat) => {
      if (amounts[cat.id] != null) {
        onAddActual(cat.id, month, amounts[cat.id]);
      }
    });
    setAmounts({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Month:
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </label>
      {categories.map((cat) => (
        <div key={cat.id}>
          <label>
            {cat.name}
            :
            <input
              type="number"
              value={amounts[cat.id] || ''}
              onChange={(e) => setAmounts({ ...amounts, [cat.id]: Number(e.target.value) })}
            />
          </label>
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
}
