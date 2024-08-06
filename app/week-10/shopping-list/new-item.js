"use client"; 

import React, { useState } from 'react';

const NewItem = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('produce');

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newItem = { id: generateId(), name, quantity, category };
    onAddItem(newItem);

    // Reset form fields
    setName('');
    setQuantity(1);
    setCategory('produce');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-pink-100 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-pink-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-pink-700 font-bold mb-2">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max="99"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-pink-700 font-bold mb-2">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen Foods</option>
          <option value="canned">Canned Goods</option>
          <option value="dry">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default NewItem;
