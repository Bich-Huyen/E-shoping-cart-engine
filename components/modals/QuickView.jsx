"use client";
import { useContextElement } from "@/context/Context";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Quantity from "../shopDetails/Quantity";
import { colors, sizeOptions } from "@/data/singleProductOptions";
import React, { useEffect, useState } from "react";

export default function QuickView() {
  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem
  } = useContextElement();

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizeOptions[0]);

  if (!quickViewItem) return null;

  return (
    <div className="modal fade modalDemo" id="quick_view">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>
          <div className="wrap">
            <div className="tf-product-media-wrap">
              <Swiper
                modules={[Navigation]}
                navigation={{ prevEl: ".snbqvp", nextEl: ".snbqvn" }}
                className="swiper tf-single-slide"
              >
                {[quickViewItem.imageUrl, quickViewItem.imageUrl || quickViewItem.imageUrl].map((product, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="item">
                      <Image alt="" src={product} width={720} height={1045} style={{ objectFit: "contain" }} />
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-button-next button-style-arrow single-slide-prev snbqvp" />
                <div className="swiper-button-prev button-style-arrow single-slide-next snbqvn" />
              </Swiper>
            </div>
            <div className="tf-product-info-wrap position-relative">
              <div className="tf-product-info-list">
                <div className="tf-product-info-title">
                  <h5>
                    <Link className="link" href={`/product-detail/${quickViewItem.id}`}>{quickViewItem.name}</Link>
                  </h5>
                </div>
                {/* <div className="tf-product-info-price">
                  <div className="market-price">{quickViewItem.marketPrice ? quickViewItem.marketPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "N/A"}</div>
                </div> */}
                <div className="tf-product-info-price">
                  <div className="price">{quickViewItem.price ? quickViewItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "N/A"}</div>
                </div>
                <div className="tf-product-description">
                  <p>{quickViewItem.description || "Không có mô tả"}</p>
                </div>
                <div className="tf-product-info-quantity">
                  <div className="quantity-title fw-6">Số lượng : <span className="quantity">{" "}{quickViewItem.stock}</span></div>
                  {
                    quickViewItem.stock > 0 && (
                      <Quantity maxStock={quickViewItem.stock} />
                    )
                  }
                </div>
                {
                  quickViewItem.stock > 0 && (
                    <div className="tf-product-info-buy-button">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <a className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn" onClick={() => addProductToCart(quickViewItem.id)}>
                          <span>{isAddedToCartProducts(quickViewItem.id) ? "Đã có trong giỏ hàng - " : "Thêm vào giỏ hàng - "}</span>
                          <span className="tf-qty-price">{quickViewItem.price ? quickViewItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "N/A"}</span>
                        </a>
                      </form>
                    </div>
                  )
                }
                <div>
                  <Link href={`/product-detail/${quickViewItem.id}`} className="tf-btn fw-6 btn-line">
                    Coi chi tiết
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
