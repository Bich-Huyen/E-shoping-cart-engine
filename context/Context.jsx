"use client";
import { openCartModal } from "@/utlis/openCartModal";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(response => {
        if (response.data.productList && Array.isArray(response.data.productList)) {
          setProducts(response.data.productList);
          setQuickViewItem(response.data.productList);
        }
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []); // Run only once on mount

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (id, qty) => {
    if (!cartProducts.some(elm => elm.id === id)) {
      const item = {
        ...products.find(elm => elm.id === id),
        quantity: qty || 1,
      };
      console.log(products)
      setCartProducts(prev => [...prev, item]);
      openCartModal();
    }
  };

  const isAddedToCartProducts = id => cartProducts.some(elm => elm.id === id);

  const addToWishlist = id => {
    setWishList(prev => prev.includes(id) ? prev.filter(elm => elm !== id) : [...prev, id]);
  };

  const addToRecent = (productId) => {
    setRecentProducts((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };
  const removeFromWishlist = id => {
    setWishList(prev => prev.filter(elm => elm !== id));
  };

  const addToCompareItem = id => {
    if (!compareItem.includes(id)) {
      setCompareItem(prev => [...prev, id]);
    }
  };

  const removeFromCompareItem = id => {
    setCompareItem(prev => prev.filter(elm => elm !== id));
  };

  const isAddedtoWishlist = id => wishList.includes(id);

  const isAddedtoCompareItem = id => compareItem.includes(id);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) setCartProducts(items);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) setWishList(items);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recent"));
    if (items?.length) setRecentProducts(items);
  }, []);

  useEffect(() => {
    localStorage.setItem("recent",JSON.stringify(recentProducts));
  }, [recentProducts]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    setQuickViewItem,
    wishList,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    recentProducts,
    setRecentProducts,
    addToRecent,
  };

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
