import React from 'react'
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category }) => {
  return (
    <div className='text-center'>
  
      <div className="text-3xl p-6 bg-red-500 rounded-full">
        <CiForkAndKnife />
      </div>
      <p className='font-bold capitalize'> {category}</p>
    </div>
  );
};

export default FilterProduct