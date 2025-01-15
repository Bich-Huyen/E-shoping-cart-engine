"use client"
import React, { useState } from "react";
import AddressSelector from "../address/AddressSelector";

export default function AccountAddress() {
  const [district, setDistrict] = useState("");
  
  const [selectedWard, setSelectedWard] = useState("");

  const [isDefault, setDefault] = useState(true);

  const handleEdit = () => {
    setDefault(!isDefault);
  };

  return (
    <div className="my-account-content account-address">
      <div className="">
        <div>
        <AddressSelector onWardSelect={setSelectedWard} onDistrictSelect={setDistrict} />
          <div className="d-flex gap-10">
            <a
              href="#"
              className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
              onClick={handleEdit}
            >
              <span>Edit</span>
            </a>
            <a
              href="#"
              className="tf-btn btn-outline animate-hover-btn rounded-0 justify-content-center"
              onClick={handleEdit}
            >
              <span>Save</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
