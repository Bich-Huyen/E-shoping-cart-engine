"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentConfirmation() {
  const [orders, setOrders] = useState();
  const price = 837000;

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/6`)
      .then(response => {
        console.log(response.data)
        setOrders(response.data);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const formatOrderDate = (orderDateArray) => {
    if (!orderDateArray || orderDateArray.length < 3) return "Không có dữ liệu";

    const [year, month, day, hour, minute, second] = orderDateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);

    return date.toLocaleString("vi-VN", { 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  useEffect(() => {
    console.log("Updated orders:", orders);
  }, [orders]);
  
  return (
    <section className="flat-spacing-11">
      <div className="container">
        {
          orders ? (
            <div className="row justify-content-center">
          <div className="col-lg-6">
            <h5 className="fw-5 mb_20">Thông tin đơn hàng</h5>
            <div className="tf-page-cart-checkout">
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18"></div>
                <p>{orders ? formatOrderDate(orders.createdAt) : "Đang tải..."}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-22 fw-6">Phương thức thanh toán</div>
                <p>Thanh toán khi nhận hàng</p>
              </div>
              {/* <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Mã vận đơn</div>
                <p>5ENLKKHD</p>
              </div> */}
              {/* <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Cardholder name</div>
                <p>Themesflat</p>
              </div> */}
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-22 fw-6">Email liên hệ</div>
                <p>tranhuutoan511@gmail.com</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-22 fw-6">Số điện thoại</div>
                <p>0385 079 882</p>
              </div>

              <div className="d-flex align-items-center justify-content-between mb_15">
                    <table class="table mb_15">
                      <thead>
                        <tr>
                          <th class="fs-22 fw-6" colspan="1">Danh sách sản phẩm:</th>
                          <th class="fs-22 fw-6" colspan="1">Số lượng</th>
                          <th class="fs-22 fw-6" colspan="1">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orders.orderItems.map((elm, i) => (
                            <tr key={i}>
                              <td class="fs-18">{elm.productName}</td>
                              <td class="fs-18">{elm.quantity}</td>
                              <td class="fs-18">{elm.quantity * elm.price}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
              </div>

              <div className="d-flex align-items-center justify-content-between mb_24">
                <div className="fs-22 fw-6">Tổng tiền</div>
                <span className="total-value">{orders.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
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
          ) : (
            <></>
          )
        }
      </div>
    </section>
  );
}
