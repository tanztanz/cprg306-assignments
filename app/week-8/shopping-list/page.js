"use client";

import React from 'react';
import { useUserAuth } from '../_utils/auth-context'; // Adjust path if needed
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';
import { useRouter } from 'next/navigation'; // Use Next.js router

const cleanItemName = (text) => {
  let cleanedText = text.split(",")[0].trim();
  cleanedText = cleanedText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  return cleanedText.trim();
};

const Page = () => {
  const { user } = useUserAuth(); // Get user from context
  const router = useRouter(); // Get Next.js router

  // Redirect to landing page if user is not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/'); // Redirect to the landing page
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>; //Show a loading message while checking authentication
  }

  const [items, setItems] = React.useState(itemsData);
  const [selectedItemName, setSelectedItemName] = React.useState('');

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
