"use client";
import { useState, useEffect } from "react";

export default function AddressSelector({ onWardSelect, onDistrictSelect }) {
  const addressUrl = process.env.NEXT_PUBLIC_ADDRESS_URL;
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(localStorage.getItem("selectedProvince") || "");
  const [selectedDistrict, setSelectedDistrict] = useState(localStorage.getItem("selectedDistrict") || "");
  const [selectedWard, setSelectedWard] = useState(localStorage.getItem("selectedWard") || "");

  async function fetchData(endpoint, params = {}) {
    const url = new URL(`${addressUrl}/${endpoint}`);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      console.error("Failed to fetch data", response);
      return [];
    }

    return response.json();
  }

  // Load danh sách tỉnh/thành phố
  useEffect(() => {
    async function loadProvinces() {
      const data = await fetchData("province");
      setProvinces(data.data.reverse());
    }

    loadProvinces();
  }, []);

  // Load danh sách quận/huyện khi tỉnh/thành phố thay đổi
  useEffect(() => {
    async function loadDistricts() {
      if (!selectedProvince) {
        setDistricts([]);
        setWards([]);
        return;
      }

      const data = await fetchData("district", { province_id: selectedProvince });
      setDistricts(data.data);
    }

    loadDistricts();
  }, [selectedProvince]);

  // Load danh sách xã/phường khi quận/huyện thay đổi
  useEffect(() => {
    async function loadWards() {
      if (!selectedDistrict) {
        setWards([]);
        return;
      }

      const data = await fetchData("ward", { district_id: selectedDistrict });
      setWards(data.data);
    }

    loadWards();
  }, [selectedDistrict]);

  // Lưu giá trị vào localStorage mỗi khi người dùng chọn một tỉnh/thành phố
  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setSelectedProvince(value);
    localStorage.setItem("selectedProvince", value);
    setSelectedDistrict(""); // Reset quận/huyện khi tỉnh thay đổi
    setSelectedWard(""); // Reset xã/phường khi tỉnh thay đổi
  };

  // Lưu giá trị vào localStorage mỗi khi người dùng chọn một quận/huyện
  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    localStorage.setItem("selectedDistrict", value);
    setSelectedWard(""); // Reset xã/phường khi quận thay đổi
  };

  // Lưu giá trị vào localStorage mỗi khi người dùng chọn một xã/phường
  const handleWardChange = (e) => {
    const value = e.target.value;
    setSelectedWard(value);
    localStorage.setItem("selectedWard", value);
  };

  useEffect(() => {
    onWardSelect(selectedWard);
    onDistrictSelect(selectedDistrict);
  }, [selectedWard]);

  return (
    <div>
      <fieldset className="box fieldset">
        <label htmlFor="province">Tỉnh/Thành phố</label>
        <div className="select-custom">
          <select
            required
            className="tf-select w-100"
            id="province"
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option key={province.ProvinceID} value={province.ProvinceID}>
                {province.ProvinceName}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="box fieldset">
        <label htmlFor="district">Quận/Huyện</label>
        <div className="select-custom">
          <select
            required
            className="tf-select w-100"
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.DistrictID} value={district.DistrictID}>
                {district.DistrictName}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="box fieldset">
        <label htmlFor="ward">Xã/Phường</label>
        <div className="select-custom">
          <select
            required
            className="tf-select w-100"
            id="ward"
            value={selectedWard}
            onChange={handleWardChange}
          >
            <option value="">Chọn xã/phường</option>
            {wards.map((ward) => (
              <option key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
}
