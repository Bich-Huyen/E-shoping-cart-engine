import axios from 'axios';

interface Category {
  id: number;
  name: string;
  isActive: boolean;
  link: string;
}

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/product/category`;

const categoriesPromise: Promise<Category[]> = axios.get(apiUrl)
  .then(response => {
    const data = response.data;

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      isActive: true,
      link: `/${item.name}`
    }));
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
    throw new Error('Unable to fetch categories');
  });

export default categoriesPromise;
