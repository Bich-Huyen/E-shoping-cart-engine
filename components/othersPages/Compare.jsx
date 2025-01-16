"use client";
import { useContextElement } from "@/context/Context";
import { allProducts, products1 } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Compare() {
  const { setQuickViewItem } = useContextElement();
  const { setQuickAddItem } = useContextElement();

  const { removeFromCompareItem, compareItem, setCompareItem } =
    useContextElement();
  const [items, setItems] = useState([]);

  const removeItem = (id) => {
    removeFromCompareItem(id);
    setCompareItem((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  useEffect(() => {
    setItems([...allProducts.filter((elm) => compareItem.includes(elm.id))]);
  }, [compareItem]);

  return (
    <section className="flat-spacing-12">
      <div className="container">
        <div>
          <div className="tf-compare-table">
            <div className="tf-compare-row tf-compare-grid">
              <div className="tf-compare-col d-md-block d-none" />

              {items.map((elm, i) => (
                <div key={i} className="tf-compare-col">
                  <div className="tf-compare-item">
                    <div
                      className="tf-compare-remove link"
                      onClick={() => removeItem(elm.id)}
                    >
                      Xóa
                    </div>
                    <Link
                      className="tf-compare-image"
                      href={`/product-detail/${elm.id}`}
                    >
                      <Image
                        className="lazyload"
                        data-src={elm.imgSrc}
                        alt="img-compare"
                        width={713}
                        height={1070}
                        src={elm.imgSrc}
                      />
                    </Link>
                    <Link
                      className="tf-compare-title"
                      href={`/product-detail/${elm.id}`}
                    >
                      {elm.title}
                    </Link>
                    <div className="price">
                      <span className="price-on-sale">
                        {elm.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </span>
                    </div>
                    <div className="tf-compare-group-btns d-flex gap-10">
                      <a
                        href="#quick_view"
                        data-bs-toggle="modal"
                        className="tf-btn btn-outline-dark radius-3"
                        onClick={() => setQuickViewItem(elm)}
                      >
                        <i className="icon icon-view" />
                        <span>QUICK VIEW</span>
                      </a>
                      <a
                        href="#quick_add"
                        data-bs-toggle="modal"
                        className="tf-btn btn-outline-dark radius-3"
                        onClick={() => setQuickAddItem(elm.id)}
                      >
                        <i className="icon icon-bag" />
                        <span>QUICK ADD</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tf-compare-row tf-compare-grid">
              <div className="tf-compare-col tf-compare-field d-md-block d-none">
                <h6>Tồn kho</h6>
              </div>
              {items.map((elm, i) => (
                <div
                  className="tf-compare-col tf-compare-field tf-compare-stock"
                  style={{ flex: 1 }}
                >
                  <div className="icon">
                    <i className="icon-check" />
                  </div>
                  <span className="fw-5">{elm.isAvailable ? "Còn hàng" : "Hết hàng"}</span>
                </div>
              ))}
            </div>
            <div className="tf-compare-row">
              <div className="tf-compare-col tf-compare-field d-md-block d-none">
                <h6>Nhãn hiệu</h6>
              </div>
              {items.map((elm, i) => (
                <div
                  className="tf-compare-col tf-compare-value text-center"
                  style={{ flex: 1 }}
                >
                  {elm.brand}
                </div>
              ))}
            </div>
            <div className="tf-compare-row">
              <div className="tf-compare-col tf-compare-field d-md-block d-none">
                <h6>Màu</h6>
              </div>
              {items.map((elm, i) => (
                <div
                  className="tf-compare-col tf-compare-value text-center"
                  style={{ flex: 1 }}
                >
                  {
                    elm.colors && elm.colors.length > 0 ? (
                      <div className="tf-compare-col tf-compare-value text-center tf-compare-list">
                          <ul className="list-color-product">
                            {elm.colors.map((color) => (
                              <li
                                className={`list-color-item color-swatch }`}
                                key={color.name}
                              >
                                <span className="tooltip">{color.name}</span>
                                <span
                                  className="swatch-value"
                                  style={{ backgroundColor: color.hex_value }}
                                />
                              </li>
                            ))}
                          </ul>
                      </div>
                    ) : (
                      <p>Không tồn tại</p>
                    )
                  }
                </div>
              ))}
            </div>
            <div className="tf-compare-row">
              <div className="tf-compare-col tf-compare-field d-md-block d-none">
                <h6>Size</h6>
              </div>
              {items.map((elm, i) => (
                <div
                  className="tf-compare-col tf-compare-value text-center"
                  style={{ flex: 1 }}
                >
                  {elm.sizes && elm.sizes.length > 0 ? (
                    <div className="tf-compare-col tf-compare-value text-center tf-compare-list">
                      {elm.sizes.map((size, index) => (
                        <span key={index} className="size-item">{size}</span>
                      ))}
                    </div>
                  ) : (
                    <p>No sizes available</p>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
