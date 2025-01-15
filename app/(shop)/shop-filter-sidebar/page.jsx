import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import FilterSidebar from "@/components/shop/FilterSidebar";

import React from "react";

export const metadata = {
  title: "Beautique",
  description: "Beautique-cosmestics shop",
};
export default function page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Danh sách sản phẩm</div>
          <p className="text-center text-2 text_black-2 mt_5">
            
          </p>
        </div>
      </div>
      <FilterSidebar />
      <Footer1 />
    </>
  );
}
