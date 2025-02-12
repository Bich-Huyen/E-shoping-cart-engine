"use client";

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import { products1 } from "@/data/products";
import axios from "axios";

// const filterCategories = Array.from(
//   new Set(products1.flatMap(product => product.filterCategories))
// );

// const filterColors = Array.from(
//   products1.flatMap(product => product.colors || [])
//           .reduce((acc, color) => acc.set(color.name, color), new Map())
//           .values()
// );

// const brands = Array.from(new Set(products1.map(product => product.brand)));

const availabilities = [
  { id: 1, isAvailable: true, text: "Còn hàng", count: 14 },
  { id: 2, isAvailable: false, text: "Tạm hết", count: 2 },
];

export default function SidebarFilter({ setProducts }) {

  const [items, setItem] = useState([]);
  const [price, setPrice] = useState([0, 5000000]);
  const handlePrice = (value) => {
    setPrice(value);
  };
  // const [selectedColors, setSelectedColors] = useState([]);
  // const handleSelectColor = (color) => {
  //   if (selectedColors.includes(color)) {
  //     setSelectedColors((pre) => [...pre.filter((el) => el != color)]);
  //   } else {
  //     setSelectedColors((pre) => [...pre, color]);
  //   }
  // };
  const [selectedBrands, setSelectedBrands] = useState([]);
  const handleSelectBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands((pre) => [...pre.filter((el) => el != brand)]);
    } else {
      setSelectedBrands((pre) => [...pre, brand]);
    }
  };
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const handleSelectAvailabilities = (availability) => {
    if (selectedAvailabilities.includes(availability)) {
      setSelectedAvailabilities((pre) => [
        ...pre.filter((el) => availability.isAvailable ? el.stock > 0 : el.stock == 0),
      ]); 
    } else {
      setSelectedAvailabilities((pre) => [...pre, availability]);
    }
  };
  // const [selectedSizes, setSelectedSizes] = useState([]);
  // const handleSelectSizes = (size) => {
  //   if (selectedSizes.includes(size)) {
  //     setSelectedSizes((pre) => [...pre.filter((el) => el != size)]);
  //   } else {
  //     setSelectedSizes((pre) => [...pre, size]);
  //   }
  // };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleSelectedCategories = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((pre) => [...pre.filter((el) => el != category)]);
    } else {
      setSelectedCategories((pre) => [...pre, category])
    }
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(response => {
        if (response.data && Array.isArray(response.data.productList)) {
          setItem(response.data.productList);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      })
      .catch(error => console.error("Error fetching product:", error));
  }, []);

  useEffect(() => {

    let filteredArrays = [];

    filteredArrays = [
      ...filteredArrays,
      [
        ...items.filter(
          (elm) => elm.price >= price[0] && elm.price <= price[1]
        ),
      ],
    ];
    // console.log(filteredByPrice, "filteredByPrice");
    // if (selectedColors.length) {
    //   filteredArrays = [
    //     ...filteredArrays,
    //     [
    //       ...products1.filter((elm) =>
    //         elm.colors
    //           ?.map((el2) => el2.name)
    //           .some((el3) => selectedColors.includes(el3))
    //       ),
    //     ],
    //   ];
    // }

    // console.log(filteredByselectedColors, "filteredByselectedColors");
    if (selectedBrands.length) {
      filteredArrays = [
        ...filteredArrays,
        [...items.filter((elm) => selectedBrands.includes(elm.brand.name))],
      ];
    }

    // console.log(filteredByselectedBrands, "filteredByselectedBrands");
    // if (selectedSizes.length) {
    //   filteredArrays = [
    //     ...filteredArrays,
    //     [
    //       ...products1.filter((elm) =>
    //         elm.sizes?.some((elm2) => selectedSizes.includes(elm2))
    //       ),
    //     ],
    //   ];
    // }

    // if (selectedCategories.length) {
    //   filteredArrays = [
    //     ...filteredArrays,
    //     [
    //       ...products1.filter((elm) => 
    //         elm.some((elm2) => selectedCategories.includes(elm2))
    //       ),
    //     ]
    //   ]
    // }

    // console.log(filteredByselectedSizes);
    if (selectedAvailabilities.length) {
      filteredArrays = [
        ...filteredArrays,
        [
          ...items.filter((elm) =>
            selectedAvailabilities
              // .map((elm3) => elm3.stock)
              .some((elm4) => elm4.isAvailable ? elm.stock > 0 : elm.stock == 0)
          ),
        ],
      ];
    }

    const commonItems = items.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    setProducts(commonItems);
  }, [
    price,
    selectedCategories,
    items,
    // selectedColors,
    selectedBrands,
    selectedAvailabilities,
    // selectedSizes,
  ]);
  const clearFilter = () => {
    // setSelectedColors([]);
    // setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedAvailabilities([]);
    // setSelectedSizes([]);
    setPrice([0, 5000000]);
  };

  return (
    <div className="tf-shop-sidebar wrap-sidebar-mobile ">
      <div className="widget-facet wd-categories">
      </div>
      <form action="#" id="facet-filter-form" className="facet-filter-form">
      <div className="widget-facet">
          {/* <div
            className="facet-title"
            data-bs-target="#categories"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="categories"
          >
            <span>Danh mục sản phẩm</span>
            <span className="icon icon-arrow-up" />
          </div> */}
          {/* <div id="categories" className="collapse show">
            <ul className="tf-filter-group current-scrollbar mb_36">
            {item.map((categories) => (
                <li
                  key={categories}
                  className="list-item d-flex gap-12 align-items-center"
                  onClick={() => handleSelectedCategories(categories)}
                >
                  <input
                    type="radio"
                    className="tf-check"
                    readOnly
                    checked={selectedCategories.includes(categories)}
                  />
                  <label className="label">
                    <span>{categories}</span>&nbsp;
                    <span>
                      ({products1.filter((elm) => elm.filterCategories == categories).length})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        <div className="widget-facet">
          <div
            className="facet-title"
            data-bs-target="#availability"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="availability"
          >
            <span>Tồn kho</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="availability" className="collapse show">
            <ul className="tf-filter-group current-scrollbar mb_36">
              {availabilities.map((availability) => (
                <li
                  key={availability.id}
                  className="list-item d-flex gap-12 align-items-center"
                  onClick={() => {
                    console.log("first");
                    handleSelectAvailabilities(availability);
                  }}
                >
                  <input
                    type="radio"
                    className="tf-check"
                    readOnly
                    checked={selectedAvailabilities.includes(availability)}
                  />
                  <label className="label">
                    <span>{availability.text}</span>&nbsp;
                    <span>
                      (
                      {
                        items.filter(
                          (elm) => (availability.isAvailable ? elm.stock > 0 : elm.stock == 0)
                        ).length
                      }
                      )
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="widget-facet wrap-price">
          <div
            className="facet-title"
            data-bs-target="#price"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="price"
          >
            <span>Giá</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="price" className="collapse show">
            <div className="widget-price filter-price">
              <Slider
                formatLabel={() => ``}
                range
                max={5000000}
                min={0}
                defaultValue={price}
                onChange={(value) => handlePrice(value)}
                id="slider"
              />
              <div className="box-title-price">
                <span className="title-price">Price :</span>
                <div className="caption-price">
                  <div>
                    <span className="min-price">{price[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  </div>
                  <span>-</span>
                  <div>
                    <span className="max-price">{price[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-facet">
          <div
            className="facet-title"
            data-bs-target="#brand"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="brand"
          >
            <span>Nhãn hiệu</span>
            <span className="icon icon-arrow-up" />
          </div>
          <div id="brand" className="collapse show">
            <ul className="tf-filter-group current-scrollbar mb_36">
              {items.map((item) => (
                <li
                  key={item.brand.name}
                  className="list-item d-flex gap-12 align-items-center"
                  onClick={() => handleSelectBrand(item.brand.name)}
                >
                  <input
                    type="radio"
                    className="tf-check"
                    readOnly
                    checked={selectedBrands.includes(item.brand.name)}
                  />
                  <label className="label">
                    <span>{item.brand.name}</span>&nbsp;
                    <span>
                      ({items.filter((elm) => elm.brand.name == item.brand.name).length})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="widget-facet">
          {/* <div
            className="facet-title"
            data-bs-target="#color"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="color"
          >
            <span>Màu</span>
            <span className="icon icon-arrow-up" />
          </div> */}
          {/* <div id="color" className="collapse show">
            <ul className="tf-filter-group filter-color current-scrollbar mb_36">
              {filterColors.map((elm, i) => (
                <li
                  key={i}
                  className="list-item d-flex gap-12 align-items-center"
                  onClick={() => handleSelectColor(elm.name)}
                >
                  <input
                    type="checkbox"
                    name="color"
                    className="tf-check-color"
                    style={{ backgroundColor: elm.hex_value }}
                    readOnly
                    checked={selectedColors.includes(elm.name)}
                  />
                  <label className="label">
                    <span>{elm.name}</span>&nbsp;
                    <span>
                      (
                      {
                        products1.filter((el) =>
                          el.colors?.map((col) => col?.name)?.includes(elm.name)
                        ).length
                      }
                      )
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        <div className="widget-facet">
          {/* <div
            className="facet-title"
            data-bs-target="#size"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="size"
          >
            <span>Size</span>
            <span className="icon icon-arrow-up" />
          </div> */}
          {/* <div id="size" className="collapse show">
            <ul className="tf-filter-group current-scrollbar">
              {sizes.map((elm, i) => (
                <li
                  key={i}
                  onClick={() => handleSelectSizes(elm)}
                  className="list-item d-flex gap-12 align-items-center"
                >
                  <input
                    type="radio"
                    className="tf-check tf-check-size"
                    readOnly
                    checked={selectedSizes.includes(elm)}
                  />
                  <label className="label">
                    <span>{elm}</span>&nbsp;
                    <span>
                      (
                      {products1.filter((el) => el.sizes?.includes(elm)).length}
                      )
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </form>
      <div className="mt-5"></div>
      <a
        className="tf-btn style-2 btn-fill rounded animate-hover-btn"
        onClick={clearFilter}
      >
        Xóa lọc
      </a>
    </div>
  );
}