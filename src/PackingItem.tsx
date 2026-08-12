import type { Item } from './Item';

interface PackingItemProps {
  item: Item;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

function PackingItem({ item, onDeleteItem, onToggleItem }: PackingItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={_ => onToggleItem(item.id)}
      />
      <span className={item.packed ? 'packed' : ''}>
        {item.quantity}&nbsp;
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

export default PackingItem;
