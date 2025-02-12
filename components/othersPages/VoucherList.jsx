import { useState, useEffect } from "react";
import axios from "axios";

export default function VoucherList({ orderValue, shippingValue, onSelect, onDiscount, onShippingDiscount }) {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVouchers, setSelectedVouchers] = useState({ order: null, shipping: null, fixed: null, percentage: null });
  const [error, setError] = useState(null);
  const [currentShippingValue, setCurrentShippingValue] = useState(shippingValue);

  useEffect(() => {
    axios.get("https://dummyjson.com/c/901f-9763-4b8f-a327")
      .then((response) => {
        if (response.data) {
          console.log(response)
          setVouchers(response.data);
        } else {
          throw new Error("Dữ liệu API không hợp lệ");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu voucher:", error);
        setError("Không thể lấy dữ liệu voucher. Vui lòng thử lại sau.");
      });
  }, []);

  const applyBestVouchers = () => {
    // Lọc chỉ những voucher hợp lệ
    const validOrderVouchers = vouchers.filter(v => v.type === "fixed" && orderValue >= v.weight);
    const validShippingVouchers = vouchers.filter(v => v.type === "shipping" && orderValue >= v.weight);

    // Sắp xếp giảm dần theo giá trị giảm giá
    validOrderVouchers.sort((a, b) => b.discount - a.discount);
    validShippingVouchers.sort((a, b) => b.discount - a.discount);

    // Chọn voucher tốt nhất cho mỗi loại
    const bestOrderVoucher = validOrderVouchers.length > 0 ? validOrderVouchers[0] : null;
    const bestShippingVoucher = validShippingVouchers.length > 0 ? validShippingVouchers[0] : null;

    setSelectedVouchers({ order: bestOrderVoucher, shipping: bestShippingVoucher });
    onSelect({ order: bestOrderVoucher, shipping: bestShippingVoucher });
    onDiscount((bestOrderVoucher?.discount || 0));
    onShippingDiscount(((bestShippingVoucher?.discount > currentShippingValue ? currentShippingValue  : bestShippingVoucher?.discount) || 0));
  };

  useEffect(() => {
    if (vouchers.length > 0) {
      applyBestVouchers();
    }
    setCurrentShippingValue(shippingValue);
  }, [vouchers, currentShippingValue]); // Chạy khi `vouchers` thay đổi

  const handleSelect = (voucher) => {
    setSelectedVouchers((prev) => {
      const updatedVouchers = { ...prev, [voucher.type]: prev[voucher.type]?.id === voucher.id ? null : voucher };
      onSelect(updatedVouchers);
      onDiscount((updatedVouchers.order?.discount || 0));
      onShippingDiscount((updatedVouchers.shipping?.discount > currentShippingValue ? currentShippingValue : updatedVouchers.shipping?.discount) || 0);
      return updatedVouchers;
    });
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-3">Chọn Voucher</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row">
          {vouchers.length > 0 ? (
            vouchers.filter(v => orderValue >= v.weight).map((voucher) => (
              <div className="col-md-4 mb-3" key={voucher.id}>
                <div
                  className={`card p-3 voucher-card ${selectedVouchers[voucher.type]?.id === voucher.id ? `selected-${voucher.type}` : voucher.type}`}
                  onClick={() => handleSelect(voucher)}
                >
                  <div className="fw-bold">Mã: {voucher.code}</div>
                  <div>Giảm: {voucher.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                  <div className="small text-muted">Áp dụng cho đơn hàng từ {voucher.weight.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">Đang tải voucher...</p>
          )}
        </div>
      )}
    </div>
  );
}
