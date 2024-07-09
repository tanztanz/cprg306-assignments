"use client";

import React, { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

const cleanItemName = (text) => {
  console.log('Original text:', text);
  // this is to split the text by commas and take the first part only
  let cleanedText = text.split(",")[0].trim();

  // this is to remove emojis and other non-alphanumeric characters, got this from stackoverflow post 
  cleanedText = cleanedText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

  // this will return the cleaned text
  return cleanedText.trim();
};

const Page = () => {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleAddItem = (item) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setItems([...items, newItem]);
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = cleanItemName(itemName);
    setSelectedItemName(cleanedName);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col md:flex-row md:space-x-6">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-6 text-center text-pink-800">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <div className="md:w-1/2">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </div>
  );
};

export default Page;
