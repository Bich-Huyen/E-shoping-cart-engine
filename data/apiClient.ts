// apiClient.ts
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8888/api/v1', // Đường dẫn cơ bản cho API
    headers: {
        'Content-Type': 'application/json', // Định dạng dữ liệu gửi đi là JSON
    },
    timeout: 5000, // Thời gian chờ mặc định là 5 giây
});

apiClient.interceptors.response.use(
    (response) => response, // Xử lý phản hồi thành công
    (error) => {
        console.error('API error:', error); // Ghi log lỗi
        return Promise.reject(error); // Trả lỗi để xử lý ở nơi gọi
    }
);

export default apiClient;
