import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div
      style={{
        background:'#fffff', 
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "30px",
          alignItems: "center",
        }}
      >
        {/* الصورة */}
        <div style={{ textAlign: "center" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* التفاصيل */}
        <div>
          <h2 style={{ fontSize: "26px", marginBottom: "15px", color: "#222" }}>
            {product.title}
          </h2>
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px", lineHeight: "1.6" }}>
            {product.description}
          </p>
          <h3 style={{ fontSize: "24px", color: "#e63946", marginBottom: "25px" }}>
            ${product.price}
          </h3>
          <button
            style={{
              padding: "12px 25px",
              background: "#0077b6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
