
import React, { useState, useEffect } from "react";
import { ProductCard } from "../shopCards/ProductCard";

export default function ProductGrid({
  gridItems = 4,
  allproducts ,
}) {

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
        {allproducts.length} sản phẩm được tìm thấy
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
