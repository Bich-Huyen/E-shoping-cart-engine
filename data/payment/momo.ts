import apiClient from "../apiClient";

interface PaymentResponse {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: number;
    responseTime: number;
    message: string;
    resultCode: number;
    payUrl: string;
    shortLink: string;
}

export const momo = async(amount: number): Promise<PaymentResponse> => {
    try {
        const response = await apiClient.post<PaymentResponse>(
            `order/payment/momo`, 
            {
                amount, // Đưa dữ liệu vào body
            }
        );
        return response.data;
    } catch (error) {
        console.error('Payment Momo API error: ', error);
        throw error;
    }
}