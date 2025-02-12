"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Quantity from "./Quantity";

import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { useContextElement } from "@/context/Context";

export default function DetailsOuterZoom({ productId }) {
  const [item, setItem] = useState(null);
  const {
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    addToWishlist,
    isAddedtoWishlist,
    addToRecent,
    recentProducts
  } = useContextElement();

  useEffect(() => {

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => console.error("Error fetching product:", error));
  }, [productId, recentProducts]);


  useEffect(() => {
    addToRecent(productId);
  }, [productId, recentProducts]);

  return (
    <section
      className="flat-spacing-4 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div
        className="tf-main-product section-image-zoom"
        style={{ maxWidth: "100vw", overflow: "clip" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <Slider1ZoomOuter productId={item?.id} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-title">
                    <h5>
                      {item?.name ?? "Cotton jersey top"}
                    </h5>
                  </div>
                  {/* <div className="tf-product-info-badges">
                    {
                      item?.marketPrice > item?.price ? (
                        <div className="badges">Giảm giá: {(((item.marketPrice - item.price) / item.marketPrice) * 100).toFixed(0)}%</div>
                      ) : (
                        <></>
                      )
                    }
                    <div className="product-status-content">
                      <i className="icon-lightning" />
                    </div>
                  </div> */}
                  <div className="tf-product-info-price">
                    <div className="price-on-sale">
                      {item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </div>
                    {/* {item?.marketPrice && (
                      <div className="compare-at-price">
                        {item?.marketPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </div>
                    )} */}
                  </div>
                  <div className="tf-product-info-quantity">
                    <div className="quantity-title fw-6">Số lượng: <span>{item?.stock == 0 ? "Tạm hết hàng" : item?.stock}</span></div>
                    {
                      item?.stock > 0 && (
                        <Quantity maxStock={item?.stock} />
                      )
                    }
                  </div>
                  <div className="tf-product-info-quantity">
                    <div className="quantity-title fw-6">Chi tiết sản phẩm: </div>
                    <p>{item?.description ?? "Serum La Roche-Posay Mela B3 Serum Giảm Thâm Nám & Dưỡng Sáng Da 30ml là sản phẩm tinh chất đến từ thương hiệu La Roche-Posay - Pháp. Sản phẩm giúp giảm thâm nám & ngăn ngừa đốm nâu sâu từng nanomet tế bào da Mela B3 với 18 năm nghiên cứu và phát triển từ các chuyên gia da liễu hàng đầu trên thế giới. Với thành phần Melasyl TM độc quyền cùng 10% Niacinamide giúp hiệu quả rõ rệt sau 1 tuần sử dụng."}</p>
                  </div>
                  {
                    item?.productAttribute.map((attribute) => {
                      // Kiểm tra nếu giá trị là mã màu hợp lệ (hex)
                      const isColor = /^#([0-9A-Fa-f]{3}){1,2}$/.test(attribute.attributeValue);

                      return isColor ? (
                        <div key={attribute.attributeName} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "14px", color: "#333" }}>{attribute.attributeName}</span>
                          <span>{": "}</span>
                          <span
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              display: "inline-block",
                              backgroundColor: attribute.attributeValue,
                              border: "2px solid #ccc"
                            }}
                          ></span>
                        </div>
                      ) : (
                        <div key={attribute.attributeName}>
                          <p>
                            {attribute.attributeName} <span>{": "}</span> {attribute.attributeValue}
                          </p>
                        </div>
                      );
                    })
                  }
                  <div className="tf-product-info-buy-button">
                    <form onSubmit={(e) => e.preventDefault()} className="">
                      {
                        item?.stock > 0 && (
                          <a
                            onClick={() => addProductToCart(item?.id)}
                            className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                          >
                            <span>
                              {isAddedToCartProducts(item?.id)
                                ? "Đã thêm vào giỏ hàng"
                                : "Thêm vào giỏ hàng"}{" "}
                              -
                            </span>
                            <span className="tf-qty-price">
                              {item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                          </a>
                        )
                      }
                      <a
                        onClick={() => addToWishlist(item?.id)}
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action"
                      >
                        <span
                          className={`icon icon-heart ${isAddedtoWishlist(item?.id) ? "added" : ""
                            }`}
                        />
                        <span className="tooltip">
                          {" "}
                          {isAddedtoWishlist(item?.id)
                            ? "Already Wishlisted"
                            : "Add to Wishlist"}
                        </span>
                        <span className="icon icon-delete" />
                      </a>
                      <a
                        href="#compare"
                        data-bs-toggle="offcanvas"
                        onClick={() => addToCompareItem(item?.id)}
                        aria-controls="offcanvasLeft"
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white compare btn-icon-action"
                      >
                        <span
                          className={`icon icon-compare ${isAddedtoCompareItem(item?.id) ? "added" : ""
                            }`}
                        />
                        <span className="tooltip">
                          {isAddedtoCompareItem(item?.id)
                            ? "Already Compared"
                            : "Add to Compare"}
                        </span>
                        <span className="icon icon-check" />
                      </a>
                      {
                        item?.stock > 0 && (
                          <div className="w-100">
                            <a href="#" className="btns-full">
                              Mua ngay
                            </a>
                          </div>
                        )
                      }
                    </form>
                  </div>
                  <div className="tf-product-info-extra-link">
                    <a
                      href="#compare_color"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <Image
                          alt=""
                          src="/images/item/compare.svg"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="text fw-6">So sánh</div>
                    </a>
                    <a
                      href="#ask_question"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <i className="icon-question" />
                      </div>
                      <div className="text fw-6">Đặt câu hỏi</div>
                    </a>
                    <a
                      href="#delivery_return"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <svg
                          className="d-inline-block"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={18}
                          viewBox="0 0 22 18"
                          fill="currentColor"
                        >
                          <path d="M21.7872 10.4724C21.7872 9.73685 21.5432 9.00864 21.1002 8.4217L18.7221 5.27043C18.2421 4.63481 17.4804 4.25532 16.684 4.25532H14.9787V2.54885C14.9787 1.14111 13.8334 0 12.4255 0H9.95745V1.69779H12.4255C12.8948 1.69779 13.2766 2.07962 13.2766 2.54885V14.5957H8.15145C7.80021 13.6052 6.85421 12.8936 5.74468 12.8936C4.63515 12.8936 3.68915 13.6052 3.33792 14.5957H2.55319C2.08396 14.5957 1.70213 14.2139 1.70213 13.7447V2.54885C1.70213 2.07962 2.08396 1.69779 2.55319 1.69779H9.95745V0H2.55319C1.14528 0 0 1.14111 0 2.54885V13.7447C0 15.1526 1.14528 16.2979 2.55319 16.2979H3.33792C3.68915 17.2884 4.63515 18 5.74468 18C6.85421 18 7.80021 17.2884 8.15145 16.2979H13.423C13.7742 17.2884 14.7202 18 15.8297 18C16.9393 18 17.8853 17.2884 18.2365 16.2979H21.7872V10.4724ZM16.684 5.95745C16.9494 5.95745 17.2034 6.08396 17.3634 6.29574L19.5166 9.14894H14.9787V5.95745H16.684ZM5.74468 16.2979C5.27545 16.2979 4.89362 15.916 4.89362 15.4468C4.89362 14.9776 5.27545 14.5957 5.74468 14.5957C6.21392 14.5957 6.59575 14.9776 6.59575 15.4468C6.59575 15.916 6.21392 16.2979 5.74468 16.2979ZM15.8298 16.2979C15.3606 16.2979 14.9787 15.916 14.9787 15.4468C14.9787 14.9776 15.3606 14.5957 15.8298 14.5957C16.299 14.5957 16.6809 14.9776 16.6809 15.4468C16.6809 15.916 16.299 16.2979 15.8298 16.2979ZM18.2366 14.5957C17.8853 13.6052 16.9393 12.8936 15.8298 12.8936C15.5398 12.8935 15.252 12.943 14.9787 13.04V10.8511H20.0851V14.5957H18.2366Z" />
                        </svg>
                      </div>
                      <div className="text fw-6">Đổi &amp; Trả</div>
                    </a>
                    <a
                      href="#share_social"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <i className="icon-share" />
                      </div>
                      <div className="text fw-6">Share</div>
                    </a>
                  </div>
                  <div className="tf-product-info-delivery-return">
                    <div className="row">
                      <div className="col-xl-6 col-12">
                        <div className="tf-product-delivery">
                          <div className="icon">
                            <i className="icon-delivery-time" />
                          </div>
                          <p>
                            Thời gian giao hàng:
                            <span className="fw-7">12-26 days</span>
                            (Quốc tế),
                            <span className="fw-7">3-6 days</span> (trong nước).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
