"use client";

import { useState } from "react";

interface PantryProps {
  onSearchWithPantry: (query: string[]) => void;
}

export default function Pantry({ onSearchWithPantry }: PantryProps) {
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() && !pantryItems.includes(newItem.trim())) {
      setPantryItems([...pantryItems, newItem.trim()]);
    }
    setNewItem("");
  };

  const removeItem = (itemToRemove: string) => {
    setPantryItems(pantryItems.filter((item) => item !== itemToRemove));
  };

  const handleSearch = () => {
    onSearchWithPantry(pantryItems);
  };

  return (
    <div>
      <h2>Pantry List</h2>
      <input
        type="text"
        name="pantryList"
        id="pantryList"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}></button>

      <ul>
        {pantryItems ? (
          pantryItems.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => removeItem(item)}>Remove</button>
            </li>
          ))
        ) : (
          <p>You have no items in your pantry</p>
        )}
      </ul>

      <button onClick={handleSearch}>Search recipes with your pantry</button>
    </div>
  );
}
