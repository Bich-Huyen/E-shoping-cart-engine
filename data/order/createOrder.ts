import axios from 'axios';

interface CreateOrderItemRequest {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderRequest {
  userId: string;
  couponId: string | null;
  orderDate: string;
  paymentMethod: string;
  shippingCode: string;
  orderItemList: CreateOrderItemRequest[];
}

const createOrder = async (orderData: CreateOrderRequest): Promise<void> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_URL}/order`;

  try {
    const response = await axios.post(apiUrl, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Order created successfully:', response.data);
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Unable to create order');
  }
};

export default createOrder;
