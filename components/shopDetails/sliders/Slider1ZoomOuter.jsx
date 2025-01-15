"use client";
import Drift from "drift-zoom";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperSlidesThumbs10 = [
  {
    imgSrc: "https://d3t32hsnjxo7q6.cloudfront.net/i/0d31f41c37fd18dfc02daa1671719378_ra,w158,h184_pa,w158,h184.png",
    alt: "",
    width: 713,
    height: 1070,
  },
  {
    imgSrc: "https://i5.walmartimages.com/seo/Maybelline-Color-Sensational-Vivids-Lipcolor_ac512fca-8c81-48c1-b5ee-1d0b24fcc30c.cbeb168906803461e01456a39cff110b.jpeg",
    alt: "img-compare",
    width: 713,
    height: 1070,
  },
  {
    imgSrc: "https://i.ebayimg.com/images/g/Yl4AAOSwmfNgCbd0/s-l1200.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
  },
  {
    imgSrc: "https://m.media-amazon.com/images/I/719PkD-ScBL._AC_UF1000,1000_QL80_.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
  },
]


const swiperSlides10 = [
  {
    imgSrc: "https://d3t32hsnjxo7q6.cloudfront.net/i/0d31f41c37fd18dfc02daa1671719378_ra,w158,h184_pa,w158,h184.png",
    href: "https://d3t32hsnjxo7q6.cloudfront.net/i/0d31f41c37fd18dfc02daa1671719378_ra,w158,h184_pa,w158,h184.png",
    width: 385,
    height: 535,
    dataZoom: "https://d3t32hsnjxo7q6.cloudfront.net/i/0d31f41c37fd18dfc02daa1671719378_ra,w158,h184_pa,w158,h184.png",
  },
  {
    imgSrc: "https://i5.walmartimages.com/seo/Maybelline-Color-Sensational-Vivids-Lipcolor_ac512fca-8c81-48c1-b5ee-1d0b24fcc30c.cbeb168906803461e01456a39cff110b.jpeg",
    href: "https://i5.walmartimages.com/seo/Maybelline-Color-Sensational-Vivids-Lipcolor_ac512fca-8c81-48c1-b5ee-1d0b24fcc30c.cbeb168906803461e01456a39cff110b.jpeg",
    width: 713,
    height: 1070,
    dataZoom: "https://i5.walmartimages.com/seo/Maybelline-Color-Sensational-Vivids-Lipcolor_ac512fca-8c81-48c1-b5ee-1d0b24fcc30c.cbeb168906803461e01456a39cff110b.jpeg",
  },
  {
    imgSrc: "https://i.ebayimg.com/images/g/Yl4AAOSwmfNgCbd0/s-l1200.jpg",
    href: "https://i.ebayimg.com/images/g/Yl4AAOSwmfNgCbd0/s-l1200.jpg",
    width: 713,
    height: 1070,
    dataZoom: "https://i.ebayimg.com/images/g/Yl4AAOSwmfNgCbd0/s-l1200.jpg",
  },
  {
    imgSrc: "https://m.media-amazon.com/images/I/719PkD-ScBL._AC_UF1000,1000_QL80_.jpg",
    href: "https://m.media-amazon.com/images/I/719PkD-ScBL._AC_UF1000,1000_QL80_.jpg",
    width: 713,
    height: 1070,
    dataZoom: "https://m.media-amazon.com/images/I/719PkD-ScBL._AC_UF1000,1000_QL80_.jpg",
  },
];


const swiperSlidesThumb1 = [
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-1721198657_img_385x385_622873_fit_center.jpg",
    alt: "",
    width: 713,
    height: 1070,
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-3-1721198666_img_385x385_622873_fit_center.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-7-1721198690_img_385x385_622873_fit_center.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-2-1721198664_img_385x385_622873_fit_center.jpg",
    alt: "img-compare",
    width: 713,
    height: 1070,
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-5-1721198672_img_385x385_622873_fit_center.jpg",
    alt: "img-compare",
    width: 768,
    height: 1152,
  },
];

const swiperSlide1 = [
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-1721198657_img_385x385_622873_fit_center.jpg",
    href: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-1721198657_img_385x385_622873_fit_center.jpg",
    width: 385,
    height: 535,
    dataZoom: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-1721198657_img_385x385_622873_fit_center.jpg",
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-3-1721198666_img_385x385_622873_fit_center.jpg",
    href: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-3-1721198666_img_385x385_622873_fit_center.jpg",
    width: 713,
    height: 1070,
    dataZoom: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-3-1721198666_img_385x385_622873_fit_center.jpg",
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-7-1721198690_img_385x385_622873_fit_center.jpg",
    href: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-7-1721198690_img_385x385_622873_fit_center.jpg",
    width: 713,
    height: 1070,
    dataZoom: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-7-1721198690_img_385x385_622873_fit_center.jpg",
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-2-1721198664_img_385x385_622873_fit_center.jpg",
    href: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-2-1721198664_img_385x385_622873_fit_center.jpg",
    width: 713,
    height: 1070,
    dataZoom: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-2-1721198664_img_385x385_622873_fit_center.jpg",
  },
  {
    imgSrc: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-5-1721198672_img_385x385_622873_fit_center.jpg",
    href: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-5-1721198672_img_385x385_622873_fit_center.jpg",
    width: 768,
    height: 1152,
    dataZoom: "https://media.hcdn.vn/catalog/product/s/e/serum-la-roche-posay-giam-tham-nam-duong-sang-da-30ml-5-1721198672_img_385x385_622873_fit_center.jpg",
  },
];

export default function Slider1ZoomOuter( { product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperSlides = product.id == 10 ? swiperSlides10 : swiperSlide1; 
  const swiperSlidesThumbs = product.id == 10 ? swiperSlidesThumbs10 : swiperSlidesThumb1;

  // const [swiperSlidesThumbs, setSwiperSlidesThumbs] = useState([]);
  // const [swiperSlides, setSwiperSlides] = useState([]);

  useEffect(() => {
    // if (product.imgSrc) {
    //   console.log(product.imgSrc);
    //   setSwiperSlidesThumbs(Array.isArray(product.imgSrc) ? product.imgSrc : [product.imgSrc]);
    //   setSwiperSlides(Array.isArray(product.imgSrc) ? product.imgSrc : [product.imgSrc]);
    // }
    // Function to initialize Drift
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
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [product.imgSrc]); // Empty dependency array to run only once on mount

  return (
    <>
      <Swiper
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        className="tf-product-media-thumbs other-image-zoom"
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        breakpoints={{
          0: {
            direction: "horizontal",
          },
          1150: {
            direction: "vertical",
          },
        }}
      >
        {swiperSlidesThumbs.map((elm, index) => (
          <SwiperSlide key={index} className="stagger-item">
            <div className="item">
              <Image
                className="lazyload"
                data-src={elm.imgSrc}
                alt={""}
                src={elm.imgSrc} 
                width={713}
                height={1070}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
          {swiperSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Item
                original={slide.imgSrc}
                thumbnail={slide.imgSrc}
                width={slide.width}
                height={slide.height}
              >
                {({ ref, open }) => (
                  <a
                    className="item"
                    data-pswp-width={slide.width}
                    data-pswp-height={slide.height}
                    onClick={open}
                  >
                    <Image
                      className="tf-image-zoom lazyload"
                      data-zoom={slide.dataZoom}
                      data-src={slide.imgSrc}
                      ref={ref}
                      alt=""
                      width={slide.width}
                      height={slide.height}
                      src={slide.imgSrc} // Optional fallback for non-lazy loading
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}

          {/* Navigation buttons */}
          <div className="swiper-button-next button-style-arrow thumbs-next"></div>
          <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
        </Swiper>{" "}
      </Gallery>
    </>
  );
}
