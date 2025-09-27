import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Category } from '../types';

type Props = {
  categories: Category[];
  onAdd: (results: { categoryId: string; month: string; amount: number }[]) => void;
};

export default function CheckInForm({ categories, onAdd }: Props) {
  const [month, setMonth] = useState('2025-01');
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const results = categories
      .map((category) => {
        const raw = amounts[category.id];
        if (!raw) return null;

        const value = Number(raw);
        return Number.isNaN(value) ? null : { categoryId: category.id, month, amount: value };
      })
      .filter((result): result is NonNullable<typeof result> => result !== null);

    if (results.length > 0) {
      onAdd(results);
    }

    setAmounts({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="month-input">
        Month:
        <input
          id="month-input"
          type="month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        />
      </label>

      {categories.map((category) => (
        <div key={category.id}>
          <label htmlFor={`amount-${category.id}`}>{category.name}:</label>
          <input
            id={`amount-${category.id}`}
            type="number"
            value={amounts[category.id] ?? ''}
            onChange={(event) => {
              const { value } = event.target;
              setAmounts((prev) => ({
                ...prev,
                [category.id]: value,
              }));
            }}
          />
        </div>
      ))}

      <button type="submit">Save</button>
    </form>
  );
}
