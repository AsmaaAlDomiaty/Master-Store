import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

export default function Navbar({
  cart = [],
  removeFromCart = () => {},
  updateQuantity = () => {},
  toggleSidebar,
  setSearch = () => {},
  user,
  setUser,
}) {
  const [openLogin, setOpenLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [method, setMethod] = useState("");
  const [details, setDetails] = useState("");
  const [pendingPayment, setPendingPayment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [shipping, setShipping] = useState(() => {
    const saved = localStorage.getItem("shipping");
    return saved
      ? JSON.parse(saved)
      : {
          fullName: "",
          phone: "",
          address: "",
          city: "",
          governorate: "",
          country: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("shipping", JSON.stringify(shipping));
  }, [shipping]);

  const total = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  const processPayment = () => {
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.governorate ||
      !shipping.country
    ) {
      alert("⚠️ من فضلك أدخل بيانات الشحن كاملة");
      return;
    }

    if (!method || !details) {
      alert("⚠️ من فضلك اختر وسيلة الدفع وأدخل البيانات");
      return;
    }

    alert(
      `✅ تم الدفع بنجاح!\n📦 سيتم التوصيل إلى:\n${shipping.fullName}, ${shipping.address}, ${shipping.city}, ${shipping.governorate}, ${shipping.country}\n☎️ ${shipping.phone}`
    );

    setMethod("");
    setDetails("");
    setShowCart(false);
    setPendingPayment(false);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!user) {
      setOpenLogin(true);
      setPendingPayment(true);
      return;
    }
    processPayment();
  };

  useEffect(() => {
    if (user && pendingPayment) {
      setPendingPayment(false);
      setShowCart(true);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowMenu(false);
  };

  return (
    <nav
      style={{
        padding: "15px 20px",
        background: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        flexWrap: "wrap", 
      }}
    >
    
      <button
        onClick={toggleSidebar}
        style={{
          fontSize: "20px",
          background: "transparent",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginRight: "20px",
        }}
      >
        ☰
      </button>

      {/* لوجو */}
      <h2 style={{ margin: "0 10px" }}>Master Store</h2>

      {/* البحث */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          margin: "10px",
          flex: "1 1 200px",
        }}
      />

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* 🛒 السلة */}
        <div style={{ cursor: "pointer", position: "relative" }}>
          <span onClick={() => setShowCart(!showCart)}>
            🛒 {cart.reduce((sum, item) => sum + item.qty, 0)}
          </span>

          {showCart && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.3)",
                zIndex: 1000,
              }}
              onClick={() => setShowCart(false)}
            >
              <div
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "60px",
                  background: "#fff",
                  color: "#000",
                  width: "350px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h4>🛒 Cart Items</h4>
                {cart.length === 0 ? (
                  <p>No items in cart</p>
                ) : (
                  <>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {cart.map((item) => (
                        <li key={item.id} style={{ marginBottom: "10px" }}>
                          <span>{item.title.slice(0, 15)}...</span>
                          <br />
                          <span>${item.price}</span>
                          <br />
                          <button
                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                            style={{ margin: "5px", padding: "2px 6px" }}
                          >
                            ➖
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                            style={{ margin: "5px", padding: "2px 6px" }}
                          >
                            ➕
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              marginLeft: "10px",
                              background: "red",
                              color: "#fff",
                              border: "none",
                              padding: "2px 6px",
                            }}
                          >
                            x
                          </button>
                        </li>
                      ))}
                    </ul>

                    <hr />
                    <strong>Total: ${total}</strong>

                    {/* ✅ فورم الشحن + الدفع */}
                    <form onSubmit={handlePayment} style={{ marginTop: "15px" }}>
                      <h4>📦 Delivery Info</h4>

                      <input
                        type="text"
                        placeholder="Full Name"
                        value={shipping.fullName}
                        onChange={(e) =>
                          setShipping({ ...shipping, fullName: e.target.value })
                        }
                        required
                        style={{ display: "block", margin: "5px 0", width: "100%" }}
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={shipping.phone}
                        onChange={(e) =>
                          setShipping({ ...shipping, phone: e.target.value })
                        }
                        required
                        style={{ display: "block", margin: "5px 0", width: "100%" }}
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={shipping.address}
                        onChange={(e) =>
                          setShipping({ ...shipping, address: e.target.value })
                        }
                        required
                        style={{ display: "block", margin: "5px 0", width: "100%" }}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping({ ...shipping, city: e.target.value })
                        }
                        required
                        style={{ display: "block", margin: "5px 0", width: "100%" }}
                      />
                      <input
                        type="text"
                        placeholder="Governorate"
                        value={shipping.governorate}
                        onChange={(e) =>
                          setShipping({ ...shipping, governorate: e.target.value })
                        }
                        required
                        style={{ display: "block", margin: "5px 0", width: "100%" }}
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={shipping.country}
                        onChange={(e) =>
                          setShipping({ ...shipping, country: e.target.value })
                        }
                        required
                        style={{ display: "block", margin: "5px 0", width: "100%" }}
                      />

                      <h4>💳 Payment Info</h4>
                      <label>
                        <input
                          type="radio"
                          name="method"
                          value="Vodafone Cash"
                          checked={method === "Vodafone Cash"}
                          onChange={(e) => setMethod(e.target.value)}
                        />
                        📱 Vodafone Cash
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="method"
                          value="Visa"
                          checked={method === "Visa"}
                          onChange={(e) => setMethod(e.target.value)}
                        />
                        💳 Visa
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="method"
                          value="InstaPay"
                          checked={method === "InstaPay"}
                          onChange={(e) => setMethod(e.target.value)}
                        />
                        🏦 InstaPay
                      </label>

                      {method && (
                        <input
                          type="text"
                          placeholder={
                            method === "Vodafone Cash"
                              ? "رقم الموبايل (11 رقم)"
                              : method === "Visa"
                              ? "رقم الكارت (16 رقم)"
                              : "رقم الحساب (8 أرقام)"
                          }
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          maxLength={
                            method === "Vodafone Cash"
                              ? 11
                              : method === "Visa"
                              ? 16
                              : 8
                          }
                          required
                          style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "8px",
                            width: "100%",
                          }}
                        />
                      )}

                      <button
                        type="submit"
                        style={{
                          background: "green",
                          color: "#fff",
                          padding: "10px",
                          border: "none",
                          cursor: "pointer",
                          marginTop: "10px",
                          width: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        🚀 Confirm & Pay
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 👤 المستخدم */}
        <div style={{ position: "relative" }}>
          {!user ? (
            <div style={{ cursor: "pointer" }} onClick={() => setOpenLogin(true)}>
              👤 Login
            </div>
          ) : (
            <div style={{ cursor: "pointer" }} onClick={() => setShowMenu(!showMenu)}>
              📧 {user.email.split("@")[0]}
            </div>
          )}

          {showMenu && user && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: 0,
                background: "#fff",
                color: "#000",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                minWidth: "150px",
                zIndex: 2000,
              }}
            >
              <p>{user.email}</p>
              <button
                onClick={handleLogout}
                style={{
                  background: "red",
                  color: "#fff",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {openLogin && <LoginModal setOpenLogin={setOpenLogin} setUser={setUser} />}
    </nav>
  );
}






