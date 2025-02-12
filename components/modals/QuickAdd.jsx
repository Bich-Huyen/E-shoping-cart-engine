"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Quantity from "../shopDetails/Quantity";
import { useContextElement } from "@/context/Context";
import axios from "axios";
import { colors, sizeOptions } from "@/data/singleProductOptions";

export default function QuickAdd() {
  const {
    quickAddItem,
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  
  const [item, setItem] = useState(null);
  
  useEffect(() => {
    console.log("quick add");
    axios.get("http://localhost:8080/api/products")
      .then(response => {
        if (response.data.productList && Array.isArray(response.data.productList)) {
          const filtered = response.data.productList.find(el => el.id == quickAddItem);
          if (filtered) {
            setItem(filtered);
          }
        }
      })
      .catch(error => console.error("Error fetching product:", error));
  }, [quickAddItem]);
  
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizeOptions[0]);

  if (!item) return null;

  return (
    <div className="modal fade modalDemo" id="quick_add">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>
          <div className="wrap">
            <div className="tf-product-info-item">
              <div className="image">
                <Image alt="" style={{ objectFit: "contain" }} src={item.imageUrl} width={720} height={1005} />
              </div>
              <div className="content">
                <Link href={`/product-detail/${item.id}`}>{item.name}</Link>
                <div className="tf-product-info-price">
                  <div className="market-price">{item.marketPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                </div>
                <div className="tf-product-info-price">
                  <div className="price">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                </div>
              </div>
            </div>
            <div className="tf-product-info-variant-picker mb_15">
              {item.colors && item.colors.length > 0 && (
                <div className="variant-picker-item">
                  <div className="variant-picker-label">
                    Color: <span className="fw-6 variant-picker-label-value">{currentColor.value}</span>
                  </div>
                  <form className="variant-picker-values">
                    {item.colors.map((color) => (
                      <React.Fragment key={color.id}>
                        <input id={color.id} type="radio" name="color1" readOnly checked={currentColor === color.name} />
                        <label onClick={() => setCurrentColor(color.name)} className="hover-tooltip radius-60" htmlFor={color.id} data-value={color.name}>
                          <span className="btn-checkbox" style={{ backgroundColor: color.hex_value }} />
                          <span className="tooltip">{color.name}</span>
                        </label>
                      </React.Fragment>
                    ))}
                  </form>
                </div>
              )}
              {item.sizes && item.sizes.length > 0 && (
                <div className="variant-picker-item">
                  <div className="variant-picker-label">Size: <span className="fw-6 variant-picker-label-value">{item.sizes[0]}</span></div>
                  <form className="variant-picker-values">
                    {item.sizes.map((size) => (
                      <React.Fragment key={size}>
                        <input type="radio" name="size1" readOnly checked={currentSize == size} />
                        <label onClick={() => setCurrentSize(size)} className="style-text" data-value={size.value}><p>{size}</p></label>
                      </React.Fragment>
                    ))}
                  </form>
                </div>
              )}
            </div>
            <div className="tf-product-info-quantity mb_15">
              <div className="quantity-title fw-6">Số lượng:{" "}<span className="quantity">{item.stock}</span></div>
              <Quantity maxStock={item.stock} />
            </div>
            <div className="tf-product-info-buy-button">
              <form onSubmit={(e) => e.preventDefault()}>
                <a className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn" onClick={() => addProductToCart(item.id)}>
                  <span>{isAddedToCartProducts(item.id) ? "Đã có trong giỏ hàng - " : "Thêm vào giỏ hàng - "}</span>
                  <span className="tf-qty-price">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </a>
                <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft" onClick={() => addToCompareItem(item.id)} className="tf-product-btn-wishlist box-icon bg_white compare btn-icon-action">
                  <span className="icon icon-compare" />
                  <span className="icon icon-check" />
                </a>
                <div className="w-100">
                  <a href="#" className="btns-full">Mua ngay</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
