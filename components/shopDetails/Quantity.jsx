"use client";

import { useState } from "react";

export default function Quantity({ maxStock = 100 }) {
  const [count, setCount] = useState(1);

  const handleDecrease = () => {
    setCount((prev) => (prev === 1 ? maxStock : prev - 1));
  };

  const handleIncrease = () => {
    setCount((prev) => (prev < maxStock ? prev + 1 : 1)); // Limit to max stock
  };

  const handleChange = (e) => {
    const value = Math.max(1, Math.min(maxStock, e.target.value)); // Ensure it's between 1 and maxStock
    setCount(value);
  };

  return (
    <div className="wg-quantity">
      <span className="btn-quantity minus-btn" onClick={handleDecrease}>
        -
      </span>
      <input
        min={1}
        type="number"
        onChange={handleChange}
        name="number"
        value={count}
      />
      <span className="btn-quantity plus-btn" onClick={handleIncrease}>
        +
      </span>
    </div>
  );
}
