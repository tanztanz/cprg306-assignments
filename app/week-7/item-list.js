"use client";

import React, { useState } from 'react'; 
import Item from './item'; 

const ItemList = ({ items, onItemSelect }) => {
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
            onSelect={onItemSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
