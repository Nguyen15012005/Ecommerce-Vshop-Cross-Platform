import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { womenLevelTwo } from "./../../../data/category/level_two/womenLevelTwo";
import { menLevelTwo } from "./../../../data/category/level_two/menLevelTwo";
import { electronicsLevelTwo } from "./../../../data/category/level_two/electronicsLevelTwo";
import { furnitureLevelTwo } from "./../../../data/category/level_two/furnitureLevelTwo";

import { menLevelThree } from "./../../../data/category/level_three/menLevelThree";
import { womenLevelThree } from "./../../../data/category/level_three/womenLevelThree";
import { electronicsLevelThree } from "./../../../data/category/level_three/electronicsLevelThree";
import { furnitureLevelThree } from "./../../../data/category/level_three/furnitureLevelThree";

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furnitures: furnitureLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furnitures: furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory, setShowSheet }) => {
  const navigate = useNavigate();

  const childCategory = (category = [], parentCategoryId) => {
    return category.filter(
      (item) => item.parentCategoryId === parentCategoryId,
    );
  };

  const handleNavigate = (child) => {
    setShowSheet(false);

    navigate(
      `/product-list?category=${selectedCategory}&type=${child.categoryId}`,
    );
  };

  return (
    <Box
      sx={{ zIndex: 999 }}
      onMouseEnter={() => setShowSheet(true)}
      className="relative overflow-y-auto bg-white shadow-lg lg:h-[500px]"
    >
      <div className="flex flex-wrap text-sm">
        {categoryTwo[selectedCategory]?.map((item, index) => (
          <div
            key={item.categoryId}
            className={`p-8 lg:w-[20%] ${
              index % 2 === 0 ? "bg-slate-50" : "bg-white"
            }`}
          >
            <p className="mb-5 font-semibold text-yellow-700">{item.name}</p>

            <ul className="space-y-3">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId,
              ).map((child) => (
                <li
                  key={child.categoryId}
                  onClick={() => handleNavigate(child)}
                  className="cursor-pointer transition duration-200 hover:text-yellow-700"
                >
                  {child.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
