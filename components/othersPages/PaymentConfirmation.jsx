import React from "react";
import Link from "next/link";
export default function PaymentConfirmation() {
  const price = 837000;
  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h5 className="fw-5 mb_20">Thông tin đơn hàng</h5>
            <div className="tf-page-cart-checkout">
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18"></div>
                <p>16/01/2025</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Phương thức thanh toán</div>
                <p>Thanh toán khi nhận hàng</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Mã vận đơn</div>
                <p>5ENLKKHD</p>
              </div>
              {/* <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Cardholder name</div>
                <p>Themesflat</p>
              </div> */}
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Email liên hệ</div>
                <p>tranhuutoan511@gmail.com</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Số điện thoại</div>
                <p>0385 079 882</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_24">
                <div className="fs-22 fw-6">Tổng tiền</div>
                <span className="total-value">{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
              {/* <div className="d-flex gap-10">
                <Link
                  href={`/checkout`}
                  className="tf-btn w-100 btn-outline animate-hover-btn rounded-0 justify-content-center"
                >
                  <span>Cancel Payment</span>
                </Link>
                <a
                  href="#"
                  className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center"
                >
                  <span>Confirm Payment</span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
