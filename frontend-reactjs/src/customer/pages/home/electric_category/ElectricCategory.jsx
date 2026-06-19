import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";

const ElectricCategory = () => {
  return (
    <div className="py-5 lg:px-20 border-b border-gray-300">
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 justify-items-center">
        {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
          <ElectricCategoryCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ElectricCategory;
