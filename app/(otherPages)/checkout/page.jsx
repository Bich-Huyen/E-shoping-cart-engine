import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Checkout from "@/components/othersPages/Checkout";
import React from "react";

export const metadata = {
  title: "Checkout || ",
  description: "",
};
export default function page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Thanh Toán</div>
        </div>
      </div>

      <Checkout />
      <Footer1 />
    </>
  );
}
