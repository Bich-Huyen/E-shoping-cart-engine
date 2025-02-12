"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
export const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imageUrl);
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  useEffect(() => {
    setCurrentImage(product.imageUrl);
  }, [product]);

  return (
    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.imageUrl}
            src={currentImage}
            alt="image-product"
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={
              product.imageUrl ? product.imageUrl : product.imageUrl
            }
            src={product.imageUrl ? product.imageUrl : product.imageUrl}
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>
        <div className="list-product-btn">
          {
            product.stock > 0 && (
              <a
                href="#quick_add"
                onClick={() => setQuickAddItem(product.id)}
                data-bs-toggle="modal"
                className="box-icon bg_white quick-add tf-btn-loading"
              >
                <span className="icon icon-bag" />
                <span className="tooltip">Thêm vào giỏ hàng</span>
              </a>
            )
          }
          <a
            onClick={() => addToWishlist(product.id)}
            className="box-icon bg_white wishlist btn-icon-action"
          >
            <span
              className={`icon icon-heart ${
                isAddedtoWishlist(product.id) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {isAddedtoWishlist(product.id)
                ? "Đã Thích"
                : "Thêm vào yêu thích"  }
            </span>
            <span className="icon icon-delete" />
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon bg_white compare btn-icon-action"
          >
            <span
              className={`icon icon-compare ${
                isAddedtoCompareItem(product.id) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {" "}
              {isAddedtoCompareItem(product.id)
                ? "So sánh"
                : "Thêm so sánh"}
            </span>
            <span className="icon icon-check" />
          </a>
          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon bg_white quickview tf-btn-loading"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Xem nhanh</span>
          </a>
        </div>
        {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.name}
        </Link>
        { product.stock > 0 ? (
    // Hiển thị giá bình thường nếu sản phẩm còn hàng
    <span className="price">
      {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
    </span>
  ) : (
    // Hiển thị giá bị gạch ngang và thông báo hết hàng nếu sản phẩm không có sẵn
    <div className="out-of-stock">
      <span className="stock-status">Hết hàng</span> {" "}
      <span className="price-out">
        {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </span>
    </div>
  )}
        
        {product.sizes && (
          <div className="size-list">
            {product.sizes.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </div>
        )}
        {product.colors && (
          <ul className="list-color-product">
            {product.colors.map((color) => (
              <li
                className={`list-color-item color-swatch ${currentImage === color.imgSrc ? "active" : ""
                  }`}
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
        )}
      </div>
    </div>
  );
};
