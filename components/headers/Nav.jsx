"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { products1 } from "@/data/products";
import { ProductCard } from "../shopCards/ProductCard";
import { Navigation } from "swiper/modules";
import {
  allPagesLinks,
  blogLinks,
  demoItems,
  productDetailPages,
  productsPages,
} from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
  const pathname = usePathname();
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(
        (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem.length) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };
  return (
    <>
      {" "}
      <li className="menu-item">
        <a
          href={`/`}
          className={`item-link ${Linkfs} ${textColor} ${
            isMenuActive(demoItems) ? "activeMenu" : ""
          } `}
        >
          Trang chủ
        </a>
      </li>
      <li className="menu-item">
        <a
          href="/shop-filter-sidebar"
          className={`item-link ${Linkfs} ${textColor} ${
            isMenuActive(productsPages) ? "activeMenu" : ""
          } `}
        >
          Sản phẩm
        </a>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(productDetailPages) ? "activeMenu" : ""
          }`}
        >
          Best seller
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="menu-heading">Best seller</div>
                <div className="hover-sw-nav hover-sw-2">
                  <Swiper
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".snmpn1",
                      nextEl: ".snmnn1",
                    }}
                    slidesPerView={2}
                    spaceBetween={30}
                    className="swiper tf-product-header wrap-sw-over"
                  >
                    {[...products1]
                      .slice(0, 4)

                      .map((elm, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                          <ProductCard product={elm} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div className="nav-sw nav-next-slider nav-next-product-header box-icon w_46 round snmpn1">
                    <span className="icon icon-arrow-left" />
                  </div>
                  <div className="nav-sw nav-prev-slider nav-prev-product-header box-icon w_46 round snmnn1">
                    <span className="icon icon-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(allPagesLinks) ? "activeMenu" : ""
          }`}
        >
          Pages
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu links-default">
          <ul className="menu-list">
            {allPagesLinks.map((linkItem, index) => (
              <li key={index}>
                <Link
                  href={linkItem.href}
                  className={`menu-link-text link text_black-2 ${
                    linkItem.extra ? "position-relative" : ""
                  }  ${isMenuActive(linkItem) ? "activeMenu" : ""}`}
                >
                  {linkItem.text}
                  {linkItem.extra}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </>
  );
}
