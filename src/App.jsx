
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import "./index.css";

function AppContent() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        if (existing.cartQuantity >= product.quantity) {
          alert("Maximum available stock reached!");
          return currentCart;
        }

        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }

      if (product.quantity <= 0) {
        alert("This product is out of stock.");
        return currentCart;
      }

      return [...currentCart, { ...product, cartQuantity: 1 }];
    });
  }

  return (
    <>
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.cartQuantity, 0)} />

      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />

        <Route
          path="/products/:id"
          element={
            <ProductDetails
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="container empty-state">
              <h2>404 - Page Not Found</h2>
              <a href="/">Return Home</a>
            </main>
          }
        />
      </Routes>

      <footer className="footer">
        <p>© 2026 ShopSphere · AWT React Assignment</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
