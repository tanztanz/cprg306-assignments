"use client";

import React, { useEffect, useState } from 'react';
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from 'next/navigation';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import { getItems, addItem } from '../_services/shopping-list-service';

const cleanItemName = (text) => {
  let cleanedText = text.split(",")[0].trim();
  cleanedText = cleanedText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  return cleanedText.trim();
};

const Page = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirect to the landing page if user is not authenticated
    }
  }, [user, router]);

  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        try {
          const fetchedItems = await getItems(user.uid);
          setItems(fetchedItems);
        } catch (error) {
          console.error("Error fetching items: ", error);
        }
      }
    };

    loadItems();
  }, [user]);

  const handleAddItem = async (item) => {
    if (user) {
      try {
        const id = await addItem(user.uid, item);
        setItems([...items, { ...item, id }]);
      } catch (error) {
        console.error("Error adding item: ", error);
      }
    }
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = cleanItemName(itemName);
    setSelectedItemName(cleanedName);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

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
