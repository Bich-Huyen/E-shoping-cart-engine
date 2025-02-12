"use client";
import Drift from "drift-zoom";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

export default function Slider1ZoomOuter({ productId }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [item, setItem] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch product data
  useEffect(() => {
    if (!productId) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
      .then((response) => {
        setItem(response.data);

        // Lưu trực tiếp imageUrl từ API
        if (response.data.imageUrl) {
          setImageUrl(response.data.imageUrl);
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  // Hiệu ứng zoom ảnh
  useEffect(() => {
    if (!imageUrl) return;

    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");

      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };

    imageZoom();

    const zoomElements = document.querySelectorAll(".tf-image-zoom");
    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) parent.classList.add("zoom-active");
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) parent.classList.remove("zoom-active");
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [imageUrl]);

  if (!item || !imageUrl) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <Swiper
        direction="vertical"
        spaceBetween={10}
        slidesPerView={1} // Chỉ hiển thị 1 ảnh thumbnail
        className="tf-product-media-thumbs other-image-zoom"
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        breakpoints={{
          0: { direction: "horizontal" },
          1150: { direction: "vertical" },
        }}
      >
        <SwiperSlide className="stagger-item">
          <div className="item">
            <Image
              className="lazyload"
              data-src={imageUrl}
              alt={item.name || "Product Image"}
              src={imageUrl}
              width={713}
              height={1070}
            />
          </div>
        </SwiperSlide>
      </Swiper> */}

      <Gallery>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="tf-product-media-main"
          id="gallery-swiper-started"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Navigation]}
        >
          <SwiperSlide>
            <Item original={imageUrl} thumbnail={imageUrl} width={713} height={1070}>
              {({ ref, open }) => (
                <a
                  className="item"
                  data-pswp-width={713}
                  data-pswp-height={1070}
                  onClick={open}
                >
                  <Image
                    className="tf-image-zoom lazyload"
                    data-zoom={imageUrl}
                    data-src={imageUrl}
                    ref={ref}
                    alt={item.name || "Product Image"}
                    width={713}
                    height={1070}
                    src={imageUrl}
                  />
                </a>
              )}
            </Item>
          </SwiperSlide>

          {/* Navigation buttons */}
          <div className="swiper-button-next button-style-arrow thumbs-next"></div>
          <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
        </Swiper>
      </Gallery>
    </>
  );
}
