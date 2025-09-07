import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  let filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  filteredProducts = filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "price-asc")
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  if (sort === "price-desc")
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  if (sort === "newest")
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);

  return (
    <Router>
      <Navbar
        toggleSidebar={() => setSidebarOpen(true)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />

      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              zIndex: 900,
            }}
          />
          <Sidebar
            setCategory={setCategory}
            setSort={setSort}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </>
      )}

      <div
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<ProductList products={filteredProducts} addToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails products={products} addToCart={addToCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}










