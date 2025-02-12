type Discount = {
    code: string;
    type: "percentage" | "fixed" | "shipping";
    discount: number;
    weight: number;
};

export const getAllDiscounts = async (): Promise<Discount[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching discounts:", error);
        return [];
    }
};
