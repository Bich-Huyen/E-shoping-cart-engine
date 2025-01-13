import apiClient from "../apiClient";

interface PaymentResponse {
    code: number;
    message: string;
    data: {
        code: string;
        message: string;
        paymentUrl: string;
    };
}

export const vnpay = async (amount: number, bankCode: string): Promise<PaymentResponse> => {
    try {
        const response = await apiClient.get<PaymentResponse>(`order/payment/vn-pay`, {
            params: { amount, bankCode },
        });
        return response.data;
    } catch (error) {
        console.error('Payment VNPay API error:', error);
        throw error;
    }
};
