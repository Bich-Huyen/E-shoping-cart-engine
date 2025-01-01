import { useState, useEffect } from "react";

export default function AddressSelector({ onWardSelect, onDistrictSelect }) {
  const addressUrl = process.env.NEXT_PUBLIC_ADDRESS_URL;
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

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

  useEffect(() => {
    async function loadProvinces() {
      const data = await fetchData("province");
      setProvinces(data.data.reverse());
    }

    loadProvinces();
  }, []);

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
            onChange={(e) => setSelectedProvince(e.target.value)}
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
            onChange={(e) => setSelectedDistrict(e.target.value)}
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
            onChange={(e) => setSelectedWard(e.target.value)}
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
