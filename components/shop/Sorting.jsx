"use client";
import { sortingOptions } from "@/data/shop";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Sorting({ setFinalSorted, allProducts }) {
  const [products, setProducts] = useState(allProducts || []);
  const [selectedOptions, setSelectedOptions] = useState(sortingOptions[0]);

  // Update products when allProducts changes
  useEffect(() => {
    if (allProducts && Array.isArray(allProducts)) {
      setProducts(allProducts);
      setFinalSorted([...allProducts]); // Ensure sorted products update
    }
  }, [allProducts]);
  useEffect(() => {
    if (selectedOptions.text == "Mặc định") {
      setFinalSorted([...products]);
    } else if (selectedOptions.text == "Tên, A-Z") {
      setFinalSorted(
        [...products].sort((a, b) => a.name.localeCompare(b.title))
      );
    } else if (selectedOptions.text == "Tên, Z-A") {
      setFinalSorted(
        [...products].sort((a, b) => b.name.localeCompare(a.title))
      );
    } else if (selectedOptions.text == "Giá, thấp - cao") {
      setFinalSorted([...products].sort((a, b) => a.price - b.price));
    } else if (selectedOptions.text == "Giá, cao - thấp") {
      setFinalSorted([...products].sort((a, b) => b.price - a.price));
    }
  }, [products, selectedOptions]);

  return (
    <>
      <div className="btn-select">
        <span className="text-sort-value">{selectedOptions.text}</span>
        <span className="icon icon-arrow-down" />
      </div>
      <div className="dropdown-menu">
        {sortingOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOptions(item)}
            className={`select-item ${item == selectedOptions ? "active" : ""}`}
          >
            <span className="text-value-item">{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
