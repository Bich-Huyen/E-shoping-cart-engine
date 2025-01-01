import axios from 'axios';


const apiUrl = process.env.NEXT_PUBLIC_ADDRESS_URL;

const provinces = axios.get(apiUrl + "/province")
  .then(response => {
    const data = response.data;

    // Transform dữ liệu thành định dạng mong muốn
    return data.map((province) => ({
      id: province.ProvinceID,
      name: province.ProvinceName,
      isActive: true,
      link: `/${item.name}`
    }));
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
    throw new Error('Unable to fetch categories');
  });

export default provinces;