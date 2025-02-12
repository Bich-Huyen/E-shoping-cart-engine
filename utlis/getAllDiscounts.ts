type Discount = {
    code: string;
    type: "percentage" | "fixed" | "shipping";
    discount: number;
    weight: number;
};

export const getAllDiscounts = async (): Promise<Discount[]> => {
    try {
        const response = await fetch(`https://dummyjson.com/c/526e-5550-43a3-bf89`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching discounts:", error);
        return [];
    }
};
