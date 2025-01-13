import { useState, useEffect } from "react";


export default function ShippingFee({ selectedWard, selectedDistrict, onShippingFee }) {
    const shippingUrl = process.env.NEXT_PUBLIC_SHIPPING_URL;
    const shopId = process.env.NEXT_PUBLIC_STORE_CODE;
    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    const [total, setTotal] = useState(null);

  useEffect(() => {
    async function fetchShipping() {
      if (!selectedWard) {
        setTotal(null);
        return;
      }

      const url = new URL(shippingUrl);

      const raw = JSON.stringify({
        "service_type_id": 2,
        "to_district_id":Number(selectedDistrict),
        "to_ward_code":selectedWard,
        "weight": 3000,
        "coupon": null,
        "items": [
          {
            "name": "TEST1",
            "quantity": 1,
            "length": 200,
            "width": 200,
            "height": 200,
            "weight": 1000
          }
        ]
      });

      const myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("shop_id", shopId);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log(data.data.total);
        setTotal(data.data.total);
      } else {
        console.error("Failed to fetch shipping info", requestOptions.body);
        setTotal(null);
      }
    }

    fetchShipping();
    onShippingFee(total)
  }, [selectedWard, total]);

  return (
    <>
    </>
  );
}
