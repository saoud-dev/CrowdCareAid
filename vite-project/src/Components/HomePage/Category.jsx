import React from "react";
import "./Category.css";

import { useGetCategoriesQuery } from "../Redux/apiSlice";

function Category() {
  const { data, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error fetching categories!</p>;

  return (
    <div className="category-container">
      <h2 className="category-name">Category</h2>

      <div className="category-flex">
        {data?.data?.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.logo} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
