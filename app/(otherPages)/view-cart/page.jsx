import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Cart from "@/components/othersPages/Cart";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import React from "react";

export const metadata = {
  title: "Giỏ hàng || Beautique",
  description: "Beautique Shop || Giỏ hàng",
};
export default function page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Giỏ Hàng</div>
        </div>
      </div>

      <Cart />
      {/* <Testimonials /> */}
      <RecentProducts />
      <Footer1 />
    </>
  );
}
