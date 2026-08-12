import type { Item } from './Item';

function Stats({ items }: { items: Item[] }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const numItems = items.length;
  const numPackedItems = items.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc),
    0,
  );
  const packedPercentage = Math.round((numPackedItems / numItems) * 100) || 0;

  return (
    <footer className="stats">
      <em>
        {packedPercentage >= 100
          ? `You got everything! Ready to go ✈️`
          : `💼You have ${numItems} items on your list, and you already packed
        ${numPackedItems} (${packedPercentage}%)`}
      </em>
    </footer>
  );
}

export default Stats;
