import { useState, type SubmitEvent } from 'react';

interface Item {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

/* const initialItems: Item[] = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
];
 */

function App() {
  const [items, setItems] = useState<Item[]>([]);

  function handleAddItems(item: Item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id: number) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id: number) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

interface FormProps {
  onAddItems: (item: Item) => void;
}

function Form({ onAddItems }: FormProps) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!description) return;

    const newItem: Item = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);
    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number.parseInt(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

interface PackingListProps {
  items: Item[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

function PackingList({ items, onDeleteItem, onToggleItem }: PackingListProps) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

interface ItemProps {
  item: Item;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

function Item({ item, onDeleteItem, onToggleItem }: ItemProps) {
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

export default App;
