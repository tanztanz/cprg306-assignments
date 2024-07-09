import React from 'react';

const Item = ({ name, quantity, category, onSelect }) => {
  return (
    <li
      className="flex justify-between items-center p-4 mb-2 bg-pink-100 rounded-lg shadow-lg cursor-pointer"
      onClick={() => onSelect(name)}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-lg text-pink-900">{name}</span>
        <span className="text-pink-600">{category}</span>
      </div>
      <span className="text-pink-700 font-bold">{quantity}</span>
    </li>
  );
};

export default Item;
