"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories2() {
  const [collections2, setCollections2] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then(response => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data)) {
          setCollections2(response.data);
        }
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <section className="flat-spacing-5 pb_0">
      <div className="container">
        <div className="flat-title">
          <span className="title wow fadeInUp" data-wow-delay="0s">
            Danh mục
          </span>
        </div>
        <div className="hover-sw-nav">
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            loop={false}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="tf-sw-collection"
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".snbp299",
              nextEl: ".snbn299",
            }}
            pagination={{ clickable: true, el: ".spd299" }}
          >
            {collections2.map((collection, index) => (
              <SwiperSlide key={index}>
                <div className="collection-item style-2 hover-img">
                  <div className="collection-inner">
                    <Link href={`/shop-filter-sidebar`} className="collection-image img-style">
                      <Image
                        className="lazyload"
                        alt={collection.imgAlt || "Category Image"}
                        src="https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JheSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                        width={360}
                        height={432}
                      />
                    </Link>
                    <div className="collection-content">
                      <Link href={`/shop-filter-sidebar`} className="tf-btn collection-title hover-icon fs-15 rounded-full">
                        <span>{collection.name}</span>
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-sw nav-next-slider nav-next-collection box-icon w_46 round snbp299">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-collection box-icon w_46 round snbn299">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-collection justify-content-center spd299" />
        </div>
      </div>
    </section>
  );
}
