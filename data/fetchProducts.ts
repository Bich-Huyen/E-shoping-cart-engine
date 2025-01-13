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

// Define the interface for a product
interface Product {
  id: number;
  imgSrc: string;
  imgHoverSrc: string;
  title: string;
  price: number;
  colors: {
    name: string;
    colorClass: string;
    imgSrc: string;
  }[];
  sizes: string[];
  filterCategories: string[];
  brand: string;
  isAvailable: boolean;
}

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/products`;

// Tạo một Promise để trực tiếp trả về dữ liệu
const productsPromise: Promise<Product[]> = axios.get(apiUrl)
  .then(response => {
    const data = response.data;

    // Transform dữ liệu thành định dạng mong muốn
    return data.map((item: any) => ({
      id: item.id,
      imgSrc: item.imageUrl,
      imgHoverSrc: item.imageUrl,
      title: item.name,
      price: item.price,
      colors: color,
      sizes: ["S", "M", "L", "XL"],
      filterCategories: filterCategories,
      brand: item.brand.name,
      isAvailable: "true"
    }));
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    throw new Error('Unable to fetch products');
  });

export default productsPromise;
