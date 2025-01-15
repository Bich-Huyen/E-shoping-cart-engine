import axios from 'axios';

const color = [
    {
      name: "Orange",
      colorClass: "bg_orange-3",
      imgSrc: "/images/products/orange-1.jpg",
    },
    {
      name: "Black",
      colorClass: "bg_dark",
      imgSrc: "/images/products/black-1.jpg",
    },
    {
      name: "White",
      colorClass: "bg_white",
      imgSrc: "/images/products/white-1.jpg",
    },
  ];

const filterCategories = ["Best seller", "On Sale"];

// const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";

// Define the interface for a product
interface Product {
  id: number;
  imgSrc: string;
  imgHoverSrc: string;
  title: string;
  price: number;
  market_price: number;
  sizes: string[];
  filterCategories: string[];
  brand: string;
  isAvailable: boolean;
}

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/product/products`;

// Tạo một Promise để trực tiếp trả về dữ liệu
const productsPromise: Promise<Product[]> = axios.get(apiUrl)
  .then(response => {
    const data = response.data.reverse();
    // console.log(data);
    const products = data.map((item: any, index: number) => ({
      id: index + 1,
      imgSrc: item.image_link || "",
      imgHoverSrc: item.image_link || "",
      title: item.name || "Unknown Product",
      price: parseFloat(item.price) || 0,
      market_price: parseFloat(item.price) * 1.5 || 0, // Example markup
      sizes: ["Default"],
      filterCategories: [item.category || "Other"],
      brand: item.brand || "Unknown Brand",
      isAvailable: true,
    }));
    // Transform dữ liệu thành định dạng mong muốn
    return products;
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    throw new Error('Unable to fetch products');
  });

export default productsPromise;
