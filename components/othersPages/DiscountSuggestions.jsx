"use client";
import { useEffect, useState } from "react";
import { getAllDiscounts } from "@/utlis/getAllDiscounts";

const findBestDiscountCombination = (orderTotal, discounts) => {
    let minFinalPrice = orderTotal;
    let bestCombo = [];

    const groupedDiscounts = discounts.reduce((acc, discount) => {
        if (!acc[discount.type]) acc[discount.type] = [];
        acc[discount.type].push(discount);
        return acc;
    }, {});

    const backtrack = (applied, currentTotal, remainingGroups) => {
        if (currentTotal < minFinalPrice) {
            minFinalPrice = currentTotal;
            bestCombo = [...applied];
        }

        Object.keys(remainingGroups).forEach((type) => {
            remainingGroups[type].forEach((discount) => {
                if (currentTotal >= discount.minOrderValue) {
                    const newTotal = discount.type === "percentage"
                        ? currentTotal * (1 - discount.discountValue / 100)
                        : currentTotal - discount.discountValue;

                    const newGroups = { ...remainingGroups };
                    delete newGroups[type]; // Mỗi loại chỉ chọn 1 mã
                    backtrack([...applied, discount], newTotal, newGroups);
                }
            });
        });
    };

    backtrack([], orderTotal, groupedDiscounts);
    return { bestCombo, minFinalPrice };
};


const DiscountSuggestions = ({ orderTotal }) => {
    const [discounts, setDiscounts] = useState([]);
    const [bestCombo, setBestCombo] = useState([]);
    const [finalPrice, setFinalPrice] = useState(orderTotal);

    useEffect(() => {
        getAllDiscounts().then((discounts) => {
            setDiscounts(discounts);
            const { bestCombo, minFinalPrice } = findBestDiscountCombination(orderTotal, discounts);
            setBestCombo(bestCombo);
            setFinalPrice(minFinalPrice);
        });
    }, [orderTotal]);

    return (
        <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Mã giảm giá được áp dụng</h3>
            {bestCombo.length === 0 ? (
                <p>Không có mã giảm giá nào phù hợp.</p>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {bestCombo.map((discount) => (
                        <div key={discount.code} className="border border-gray-300 p-4 rounded-lg shadow-md">
                            <p className="font-bold">{discount.code}</p>
                            <p>{discount.type === "percentage" ? `Giảm ${discount.discountValue}%` : `Giảm ${discount.discountValue}₫`}</p>
                            <p className="text-sm text-gray-500">Điều kiện: ≥ {discount.minOrderValue.toLocaleString()} VND</p>
                        </div>
                    ))}
                </div>
            )}
            <h3 className="mt-4">Tổng thanh toán: {finalPrice.toLocaleString()} VND</h3>
        </div>
    );
};

export default DiscountSuggestions;