import React from 'react'
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, activeCategory }) => {
console.log(activeCategory)

  return (
    <div className="text-center">
      <div
        className={
          activeCategory === category
            ? "text-3xl p-6 bg-blue-400 border-2 border-white text-white rounded-full"
            : "text-3xl p-6 bg-red-500 rounded-full"
        }
      >
        <CiForkAndKnife />
      </div>
      <p className="font-bold capitalize"> {category}</p>
    </div>
  );
};

export default FilterProduct