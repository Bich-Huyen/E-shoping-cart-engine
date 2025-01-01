import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Collection() {
  return (
    <section className="flat-spacing-19">
      <div className="container">
        <div className="tf-grid-layout md-col-2 tf-img-with-text style-1">
          <div className="tf-image-wrap wow fadeInUp" data-wow-delay="0s">
            <Image
              className="lazyload"
              data-src="/images/collections/collection-58.jpg"
              alt="collection-img"
              src="https://media.hcdn.vn/hsk/1735121707poptdic2512_img_410x410_8c5088_fit_center.jpg"
              width={800}
              height={760}
            />
          </div>
          <div className="tf-content-wrap wow fadeInUp" data-wow-delay="0s">
            <div className="heading">
              Ưu đãi cuối năm <br />
              Giảm giá lên tới 50%
            </div>
            <p className="description">
              Chương trình ưu đãi cuối năm với nhiều mặt hàng, giảm giá lên tới 50%!
            </p>
            <Link
              href={`/shop-collection-list`}
              className="tf-btn style-2 btn-fill rounded-full animate-hover-btn"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
