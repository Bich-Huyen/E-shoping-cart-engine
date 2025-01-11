"use client";
import { useContextElement } from "@/context/Context";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import AddressSelector from "./address/AddressSelector";
import ShippingFee from "./address/ShippingFee";
import { vnpay } from "@/data/payment/vnpay";

const addressUrl = process.env.NEXT_PUBLIC_ADDRESS_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Checkout() {
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();
  const [district, setDistrict] = useState("");

  const [selectedWard, setSelectedWard] = useState("");

  const [shippingFee, setShippingFee] = useState("");

  const [paymentUrl, setPaymentUrl] = useState('');

  const router = useRouter();

  async function fetchData(endpoint, params = {}) {
    const url = new URL(`${addressUrl}/${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, {
      headers: {
        'token': `${token}`
      }
    });

    if (!response.ok) {
      console.error("Failed to fetch data", response);
      return [];
    }

    return response.json();
  }

  const handleVnpay = async () => {
    try {
      const response = await vnpay(totalPrice + shippingFee, 'NCB');
      setPaymentUrl(response.data.paymentUrl);
      if (paymentUrl) {
        router.push(paymentUrl); // Chuyển hướng đến trang thanh toán
      } else {
        console.error('Không nhận được URL thanh toán');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  }

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="tf-page-cart-wrap layout-2">
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Thông tin đơn hàng</h5>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="form-checkout"
            >
              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label htmlFor="first-name">Tên khách hàng</label>
                  <input
                    required
                    type="text"
                    id="first-name"
                    placeholder="Tên khách hàng"
                  />
                </fieldset>
              </div>

              <AddressSelector onWardSelect={setSelectedWard} onDistrictSelect={setDistrict} />
              <ShippingFee onShippingFee={setShippingFee} selectedWard={selectedWard} selectedDistrict={district} />

              <fieldset className="box fieldset">
                <label htmlFor="address">Địa chỉ</label>
                <input required type="text" id="address" />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="phone">Số điện thoại</label>
                <input required type="number" id="phone" />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  autoComplete="abc@xyz.com"
                  id="email"
                />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="note">Ghi chú (nếu có)</label>
                <textarea name="note" id="note" defaultValue={""} />
              </fieldset>
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Đơn hàng</h5>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="tf-page-cart-checkout widget-wrap-checkout"
              >
                <ul className="wrap-checkout-product">
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <Image
                          alt="product"
                          src={elm.imgSrc}
                          width={720}
                          height={1005}
                        />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.title}</p>
                          <span className="variant">M</span>
                        </div>
                        <span className="price">
                          {(elm.price * elm.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                {!cartProducts.length && (
                  <div className="container">
                    <div className="row align-items-center mt-5 mb-5">
                      <div className="col-12 fs-18">
                        Giỏ hàng của bạn đang trống
                      </div>
                      <div className="col-12 mt-3">
                        <Link
                          href={`/shop-default`}
                          className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                          style={{ width: "fit-content" }}
                        >
                          Khám phá thêm sản phẩm!
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div className="coupon-box">
                  <input type="text" placeholder="Mã giảm giá" />
                  <a
                    href="#"
                    className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                  >
                    Áp dụng
                  </a>
                </div>
                {
                  shippingFee > 0 && (
                    <div className="d-flex justify-content-between line pb_20">
                      <h7 className="fw-5">Phí giao hàng</h7>
                      <h7 className="total fw-5">
                        {shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </h7>
                    </div>
                  )}
                <div className="d-flex justify-content-between line pb_20">
                  <h6 className="fw-5">Tổng tiền</h6>
                  <h6 className="total fw-5">{(totalPrice + shippingFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                </div>
                <div className="wd-check-payment">
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="bank"
                      className="tf-check"
                      defaultChecked
                    />
                    <div style={{ width: '38px', height: '24px', position: 'relative' }}>
                      <Image
                        alt="vnpay"
                        title="VNPay"
                        src="/images/logo/vnpay.svg"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <label htmlFor="bank">VNPay</label>
                  </div>
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="bank"
                      className="tf-check"
                      defaultChecked
                    />
                    <div style={{ width: '38px', height: '24px', position: 'relative' }}>
                      <Image
                        alt="momo"
                        title="Momo"
                        src="/images/logo/momo.png"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <label htmlFor="bank">Momo</label>
                  </div>
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="delivery"
                      className="tf-check"
                    />
                    <label htmlFor="delivery">Thanh toán khi nhận hàng</label>
                  </div>
                  <p className="text_black-2 mb_20">
                    Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng của bạn,
                    hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này và cho các mục đích khác
                    được mô tả trong {" "}
                    <Link
                      href={`/privacy-policy`}
                      className="text-decoration-underline"
                    >
                      chính sách bảo mật
                    </Link>
                    {" "} của chúng tôi.
                  </p>
                  <div className="box-checkbox fieldset-radio mb_20">
                    <input
                      required
                      type="checkbox"
                      id="check-agree"
                      className="tf-check"
                    />
                    <label htmlFor="check-agree" className="text_black-2">
                      Tôi đã đọc và đồng ý với mọi {" "}
                      <Link
                        href={`/terms-conditions`}
                        className="text-decoration-underline"
                      >
                        điều khoản và dịch vụ.
                      </Link>
                      .
                    </label>
                  </div>
                </div>
                <button 
                  className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
                  onClick={handleVnpay}
                >
                  Đặt hàng
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
