"use client";

import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context'; // Adjust path if needed
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import { useRouter } from 'next/navigation'; // Use Next.js router

// Import Firestore service functions
import { getItems, addItem } from '../../week-10/_services/shopping-list-service'; // Correct path

const cleanItemName = (text) => {
  let cleanedText = text.split(",")[0].trim();
  cleanedText = cleanedText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  return cleanedText.trim();
};

const Page = () => {
  const { user } = useUserAuth(); // Get user from context
  const router = useRouter(); // Get Next.js router
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  // Redirect to landing page if user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirect to the landing page
    } else {
      // Load items from Firestore when user is authenticated
      const loadItems = async () => {
        try {
          const userItems = await getItems(user.uid);
          setItems(userItems);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
      loadItems();
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>; // Show a loading message while checking authentication
  }

  const handleAddItem = async (item) => {
    try {
      const newItemId = await addItem(user.uid, item);
      setItems([...items, { ...item, id: newItemId }]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
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
