"use client";

import React, { useState } from 'react'; 
import Item from './item'; 

const items = [
  { id: 1, name: "milk, 4 L 🥛", quantity: 1, category: "dairy" },
  { id: 2, name: "bread 🍞", quantity: 2, category: "bakery" },
  { id: 3, name: "eggs, dozen 🥚", quantity: 2, category: "dairy" },
  { id: 4, name: "bananas 🍌", quantity: 6, category: "produce" },
  { id: 5, name: "broccoli 🥦", quantity: 3, category: "produce" },
  { id: 6, name: "chicken breasts, 1 kg 🍗", quantity: 1, category: "meat" },
  { id: 7, name: "pasta sauce 🍝", quantity: 3, category: "canned goods" },
  { id: 8, name: "spaghetti, 454 g 🍝", quantity: 2, category: "dry goods" },
  { id: 9, name: "toilet paper, 12 pack 🧻", quantity: 1, category: "household" },
  { id: 10, name: "paper towels, 6 pack", quantity: 1, category: "household" },
  { id: 11, name: "dish soap 🍽️", quantity: 1, category: "household" },
  { id: 12, name: "hand soap 🧼", quantity: 4, category: "household" }
];

const ItemList = () => {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    } else {
      return 0;
    }
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-6 py-3 rounded-full focus:outline-none ${sortBy === "name" ? "bg-pink-500 text-white shadow-lg" : "bg-pink-200 text-pink-700 hover:bg-pink-300 hover:text-white"}`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-6 py-3 rounded-full focus:outline-none ${sortBy === "category" ? "bg-purple-500 text-white shadow-lg" : "bg-purple-200 text-purple-700 hover:bg-purple-300 hover:text-white"}`}
        >
          Sort by Category
        </button>
      </div>

      <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
        {sortedItems.map(item => (
          <Item
            key={item.id} //unique key
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
