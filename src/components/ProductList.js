// src/components/ProductList.js
import React from "react";
import { Link } from "react-router-dom";


export default function ProductList({ products, addToCart }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        padding: "10px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            background: "#fff",
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
            transition: "0.3s",
          }}
        >
          <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                backgroundColor:'#eef0f0ff',
                width: "100px",
                height: "100px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ fontSize: "16px", margin: "10px 0" }}>
              {product.title.length > 20
                ? product.title.slice(0, 20) + "..."
                : product.title}
            </h4>
          </Link>
          <p style={{ fontWeight: "bold", color: "#2f3e4eff" }}>
            ${product.price}
          </p>
          <button
            onClick={() => addToCart(product)}
            style={{
              background: "#222",
              color: "#fff",
              padding: "8px 12px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#555")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#222")}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
