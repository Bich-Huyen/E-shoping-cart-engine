import { products1 } from "@/data/products";
import React, { useState, useEffect } from "react";
import { ProductCard } from "../shopCards/ProductCard";

import productsPromise from "@/data/fetchProducts";

export default function ProductGrid({
  gridItems = 4,
  allproducts,
}) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsPromise
      .then(data => { setProducts(data)})
      .catch(err => setError('Failed to fetch products'));
  })

  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {allproducts.length} product(s) found
      </div>
      <div className="grid-layout wrapper-shop" data-grid={`grid-${gridItems}`}>
        {/* card product 1 */}
        {allproducts.map((elm, i) => (
          <ProductCard product={elm} key={i} />
        ))}
      </div>{" "}
    </>
  );
}
