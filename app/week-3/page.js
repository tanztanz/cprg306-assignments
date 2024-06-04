import React from 'react';
import ItemList from './item-list';

const Page = () => {
  return (
    <main className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-pink-800">Shopping List</h1>
      <ItemList />
    </main>
  );
};

export default Page;
