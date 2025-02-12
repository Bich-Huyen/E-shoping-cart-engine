"use client";
import { useContextElement } from "@/context/Context";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import AddressSelector from "./address/AddressSelector";
import ShippingFee from "./address/ShippingFee";
import { vnpay } from "@/data/payment/vnpay";
import { momo } from "@/data/payment/momo";
import VoucherList from "./VoucherList";
import axios from "axios";
import { getAllDiscounts } from "@/utlis/getAllDiscounts";

const addressUrl = process.env.NEXT_PUBLIC_ADDRESS_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const findBestDiscountCombination = (orderTotal, discounts) => {
  let minFinalPrice = orderTotal;
  let bestCombo = [];

  const groupedDiscounts = discounts.reduce((acc, discount) => {
    if (!acc[discount.type]) acc[discount.type] = [];
    acc[discount.type].push(discount);
    return acc;
  }, {});

  const backtrack = (applied, currentTotal, remainingGroups) => {
    if (currentTotal < minFinalPrice) {
      minFinalPrice = currentTotal;
      bestCombo = [...applied];
    }

    Object.keys(remainingGroups).forEach((type) => {
      remainingGroups[type].forEach((discount) => {
        if (currentTotal >= discount.weight) {
          const newTotal =
            discount.type === "percentage"
              ? currentTotal * (1 - discount.discount / 100)
              : currentTotal - discount.discount;

          const newGroups = { ...remainingGroups };
          delete newGroups[type]; // Mỗi loại chỉ chọn 1 mã
          backtrack([...applied, discount], newTotal, newGroups);
        }
      });
    });
  };

  backtrack([], orderTotal, groupedDiscounts);
  return { bestCombo, minFinalPrice };
};

export default function Checkout() {
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();

  const [selectedPayment, setSelectedPayment] = useState('vnpay');

  const [district, setDistrict] = useState("");

  const [selectedWard, setSelectedWard] = useState("");

  const [shippingFee, setShippingFee] = useState(0);

  const [paymentUrl, setPaymentUrl] = useState('');

  const [discount, setDiscount] = useState(0);

  const [shippingDiscount, setShippingDiscount] = useState(0);

  const [discounts, setDiscounts] = useState([]);
  const [selectedVouchers, setSelectedVouchers] = useState([]);
  const [finalPrice, setFinalPrice] = useState(totalPrice);

  const [bestDiscount, setBestDiscount] = useState(0);

  const router = useRouter();

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
  };

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
      const response = await vnpay(totalPrice + shippingFee - discount - shippingDiscount, 'NCB');
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

  const handleMomo = async () => {
    try {
      const response = await momo(totalPrice + shippingFee - discount - shippingDiscount);
      setPaymentUrl(response.payUrl);
      if (paymentUrl) {
        router.push(paymentUrl);
      } else {
        console.error('Error creating payment:', error);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  }

  const handleCashOnDelivery = () => {
    console.log('Xử lý thanh toán khi nhận hàng');
    // Thêm logic xử lý thanh toán COD ở đây
    router.push("/payment-confirmation");
  };

  const createAddress = async (street, city, state, postalCode, country) => {
    try {
      const addressData = {
        street,
        city,
        state,
        postalCode,
        country,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      console.log("Creating address:", addressData);
  
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/addresses/add`, addressData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Address created:", response.data);
      return response.data.id; // Trả về ID của địa chỉ vừa tạo
    } catch (error) {
      console.error("Error creating address:", error.response ? error.response.data : error.message);
      return null;
    }
  };
  

  const createOrder = async (addressId) => {
    try {
      // Dữ liệu đơn hàng
      const orderData = {
        userId: "1", // Đổi thành userId thực tế từ context hoặc state
        addressId, // ID của địa chỉ vừa tạo
        totalAmount: finalPrice + shippingFee,
        status: "progress",
        orderDate: new Date().toISOString(),
      };
  
      console.log("Sending order data:", orderData);
  
      // Gửi request tạo đơn hàng
      const orderResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const orderId = orderResponse.data.id; // Lấy ID đơn hàng vừa tạo
      console.log("Order created with ID:", orderId);
  
      // Nếu có orderId, tiếp tục thêm sản phẩm vào đơn hàng
      if (orderId) {
        await addOrderItems(orderId);
      }
  
      return orderId;
    } catch (error) {
      console.error("Error creating order:", error.response ? error.response.data : error.message);
      return null;
    }
  };
  
  const addOrderItems = async (orderId) => {
    try {
      // Lặp qua từng sản phẩm trong giỏ hàng và thêm vào đơn hàng
      for (const product of cartProducts) {
        const itemData = {
          productId: product.id, // Lấy ID sản phẩm từ giỏ hàng
          quantity: product.quantity,
          price: product.price * product.quantity, // Tổng giá của sản phẩm
        };
  
        console.log(`Adding item to order ${orderId}:`, itemData);
  
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/items`, itemData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        console.log(`Product ${product.id} added to order ${orderId}`);
      }
    } catch (error) {
      console.error("Error adding items to order:", error.response ? error.response.data : error.message);
    }
  };

  const processPayment = async () => {
    // Lấy thông tin địa chỉ từ form
    const street = document.getElementById("address").value;
    const city = document.getElementById("province").selectedOptions[0]?.text || "";
    const state = document.getElementById("district").selectedOptions[0]?.text || "";
    const postalCode = "700000"; // Cần có logic lấy postalCode thực tế
    const country = "Vietnam"; // Có thể để mặc định
  
    if (!street || !city || !state) {
      alert("Vui lòng nhập đầy đủ thông tin địa chỉ!");
      return;
    }
  
    const addressId = await createAddress(street, city, state, postalCode, country);
    if (!addressId) {
      alert("Lỗi khi tạo địa chỉ! Vui lòng thử lại.");
      return;
    }

    const orderId = await createOrder(addressId);
    if (!orderId) {
      alert("Lỗi khi tạo đơn hàng! Vui lòng thử lại.");
      return;
    }

    setCartProducts([]);
  
    switch (selectedPayment) {
      case "vnpay":
        handleVnpay();
        break;
      case "momo":
        handleMomo();
        break;
      case "delivery":
        handleCashOnDelivery();
        break;
      default:
        alert("Vui lòng chọn phương thức thanh toán hợp lệ.");
    }
  };

  useEffect(() => {
    getAllDiscounts().then((discounts) => {
      setDiscounts(discounts);
      // 🟢 Tự động áp dụng mã giảm giá tối ưu khi trang load lần đầu
      const { bestCombo, minFinalPrice } = findBestDiscountCombination(totalPrice, discounts);
      const autoSelected = bestCombo.reduce((acc, voucher) => {
        acc[voucher.type] = voucher;
        return acc;
      }, {});
      setSelectedVouchers(autoSelected);
      setFinalPrice(minFinalPrice);
    });
  }, []);

  useEffect(() => {
    let newTotalPrice = totalPrice;
    Object.values(selectedVouchers).forEach((voucher) => {
      if (voucher.type === "percentage") {
        newTotalPrice *= 1 - voucher.discount / 100;
      } else {
        newTotalPrice -= voucher.discount;
      }
    });
    setFinalPrice(newTotalPrice); 
  }, [selectedVouchers, totalPrice, shippingFee]);

  const handleVoucherSelect = (voucher) => {
    setSelectedVouchers((prev) => {
      const newVouchers = { ...prev };

      // Nếu đã chọn thì bỏ chọn
      if (newVouchers[voucher.type]?.code === voucher.code) {
        delete newVouchers[voucher.type];
      } else {
        // Chọn mới (giữ lại loại khác, nhưng chỉ giữ 1 loại voucher mỗi `type`)
        newVouchers[voucher.type] = voucher;
      }

      return newVouchers;
    });
  };

  const isVoucherDisabled = (voucher) => {
    const isSelected = selectedVouchers[voucher.type]?.code === voucher.code;
    const otherTypeSelected = Object.values(selectedVouchers).some((v) => v.type !== voucher.type);
    const notEnoughPrice = finalPrice < voucher.weight;

    // Nếu đủ điều kiện, không cần làm mờ
    if (!notEnoughPrice) {
      return false;
    }

    // Nếu đã chọn voucher này thì không làm mờ
    return !isSelected && (otherTypeSelected || notEnoughPrice);
  };

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
            <div className="coupon-box">
            {/* 🟢 Danh sách voucher */}
            <div className="voucher-container mt-3 p-3 rounded">
              <h6 className="fw-bold mb-2">Danh sách mã giảm giá</h6>
              <div className="voucher-list">
                {discounts.length === 0 ? (
                  <p className="text-muted">Không có mã giảm giá nào.</p>
                ) : (
                  discounts.map((voucher) => {
                    const isSelected = selectedVouchers[voucher.type]?.code === voucher.code;
                    return (
                      <div
                        key={voucher.code}
                        className={`voucher-item p-2 rounded ${isSelected ? "highlight" : ""}`}
                        style={{
                          opacity: isVoucherDisabled(voucher) ? 0.5 : 1,
                          pointerEvents: isVoucherDisabled(voucher) ? "none" : "auto",
                        }}
                        onClick={() => handleVoucherSelect(voucher)}
                      >
                        <p className="fw-bold mb-1">{voucher.code}</p>
                        <p className="mb-1">{voucher.type === "percentage" ? `Giảm: ${voucher.discount}%` : `Giảm ${voucher.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}</p>
                        <p className=" small">
                          Điều kiện: {voucher.type === "fixed" || voucher.type === "percentage" ? `đơn hàng ≥ ${voucher.weight.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}` : `phí vận chuyển cho đơn hàng ≥ ${voucher.weight.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}
                        </p>
                        
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div>
            </div>
            {/* <h7 className="mt-3 fw-5" style={{ color: 'red' }}>{finalPrice > (bestDiscount) ? `Mã giảm giá chưa tối ưu ${bestDiscount}` : ``}</h7>
            <h6 className="mt-3">Tổng thanh toán: <span className="fw-bold">{finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></h6> */}
          </div>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Đơn hàng</h5>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="tf-page-cart-checkout widget-wrap-checkout"
              >
                <ul className="tf-page-cart-checkout">
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <Image
                          alt="product"
                          src={elm.imageUrl}
                          width={720}
                          height={1005}
                        />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.name}</p>
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
                <div className="d-flex justify-content-between line pb_20">
                      <h7 className="fw-5">Thành tiền</h7>
                      <h7 className="total fw-5">
                        {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </h7>
                    </div>
                {
                  shippingFee > 0 && (
                    <div className="d-flex justify-content-between line pb_20">
                      <h7 className="fw-4">Phí giao hàng</h7>
                      <h7 className="total fw-4">
                        {shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </h7>
                    </div>
                  )}
                  <>
                {/* {
                  discount > 0 && (
                    <div>
                        <div className="d-flex justify-content-between line pb_20">
                          <h7 className="fw-5">Giảm giá</h7>
                          <h7 className="total fw-5">
                            {discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </h7>
                        </div>
                        <div className="d-flex justify-content-between line pb_20">
                          <h7 className="fw-5">Giảm giá phí giao hàng</h7>
                          <h7 className="total fw-5">
                            {shippingDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </h7>
                        </div>
                    </div>
                  )} */}
                  {discounts.length === 0 ? (
                  <p className="text-muted">Không có mã giảm giá nào.</p>
                  ) : (
                    discounts.map((voucher) => {
                      const isSelected = selectedVouchers[voucher.type]?.code === voucher.code;
                      return (
                        (isSelected ? (
                          <div key={voucher.code}>
                            <div className="d-flex justify-content-between line pb_20">
                              <h7 className="fw-4" style={{ color: 'red' }}>Giảm giá</h7>
                              <h7 className="total fw-4" style={{ color: 'red' }}>
                                {voucher.type === "percentage" ? `- ${(voucher.discount * totalPrice / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}` : `- ${voucher.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}
                              </h7>
                            </div>
                          </div>
                        ) : (
                          <></>
                        ))
                      );
                    })
                  )}
                  </>
                <div className="d-flex justify-content-between line pb_20">
                  <h6 className="fw-5">Tổng tiền</h6>
                  <h6 className="total fw-5">{(finalPrice + shippingFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                </div>
                <div className="wd-check-payment">
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="vnpay"
                      className="tf-check"
                      defaultChecked={selectedPayment === 'vnpay'}
                      onChange={handlePaymentChange}
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
                      id="momo"
                      className="tf-check"
                      defaultChecked={selectedPayment === 'momo'}
                      onChange={handlePaymentChange}
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
                      defaultChecked={selectedPayment === 'delivery'}
                      onChange={handlePaymentChange}
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
                  onClick={processPayment}
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
