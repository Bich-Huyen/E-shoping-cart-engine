"use client";

import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { ProductCardWishlist } from "../shopCards/ProductCardWishlist";
import Link from "next/link";
import axios from "axios";

export default function Wishlist() {
  const { wishList } = useContextElement();
  const [wishListItems, setWishListItems] = useState([]);
  const [items, setItem] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(response => {
        if (response.data && Array.isArray(response.data.productList)) {
          setItem(response.data.productList);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      })
      .catch(error => console.error("Error fetching product:", error));
  }, []);

  useEffect(() => {
    if (wishList) {
      setWishListItems(
        [...items].filter((el) => wishList.includes(el.id))
      );
    }
  }, [wishList, items]);

  return (
    <section className="flat-spacing-2">
      <div className="container">
        <div className="grid-layout wrapper-shop" data-grid="grid-4">
          {wishListItems.map((elm, i) => (
            <ProductCardWishlist key={i} product={elm} />
          ))}
        </div>
        {!wishListItems.length && (
          <>
            <div
              className="row align-items-center w-100"
              style={{ rowGap: "20px" }}
            >
              <div className="col-lg-3 col-md-6 fs-18">
                Trống
              </div>
              <div className="col-lg-3  col-md-6">
                <Link
                  href={`/shop-default`}
                  className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                >
                  Khám phá thêm sản phẩm
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
