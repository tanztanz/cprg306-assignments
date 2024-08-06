"use client";

import React, { useEffect, useState } from 'react';

const fetchMealIdeas = async (ingredient) => {
  console.log(`Fetching meal ideas for: ${ingredient}`);
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  console.log('Fetched meal ideas:', data);
  return data.meals;
};

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);

  const loadMealIdeas = async () => {
    if (ingredient) {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      console.log('Setting meals:', fetchedMeals);
      setMeals(fetchedMeals || []);
    }
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Meal Ideas with {ingredient}</h2>
      <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
        {meals && meals.length > 0 ? meals.map((meal) => (
          <li key={meal.idMeal} className="p-4">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-16 h-16 rounded-full" />
            <span className="ml-4">{meal.strMeal}</span>
          </li>
        )) : <li className="p-4">No meal ideas found.</li>}
      </ul>
    </div>
  );
};

export default MealIdeas;
