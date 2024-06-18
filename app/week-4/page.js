import React from 'react';
import NewItem from './new-item';

const Page = () => {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold text-pink-700 text-center mb-6">Shopping List</h1>
          <NewItem />
        </div>
      </div>
    );
  };
  
  export default Page;
