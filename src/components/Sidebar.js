import React from "react";

export default function Sidebar({ setCategory, closeSidebar, setSort }) {
  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#f4f4f4",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
        transition: "0.3s ease",
        overflowY: "auto",
      }}
    >
      {/* زر الإغلاق */}
      <button
        onClick={closeSidebar}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>

      {/* الفئات */}
      <h3>Categories</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((cat, i) => (
          <li
            key={i}
            onClick={() => {
              setCategory(cat);
              closeSidebar();
            }}
            style={{ margin: "10px 0", cursor: "pointer" }}
          >
            {cat}
          </li>
        ))}
      </ul>

      <hr />

      {/* الترتيب */}
      <h3>Sort By</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li
          onClick={() => {
            setSort("price-asc");
            closeSidebar();
          }}
          style={{ margin: "10px 0", cursor: "pointer" }}
        >
          Price ↑
        </li>
        <li
          onClick={() => {
            setSort("price-desc");
            closeSidebar();
          }}
          style={{ margin: "10px 0", cursor: "pointer" }}
        >
          Price ↓
        </li>
        <li
          onClick={() => {
            setSort("newest");
            closeSidebar();
          }}
          style={{ margin: "10px 0", cursor: "pointer" }}
        >
          Newest
        </li>
      </ul>
    </div>
  );
}

