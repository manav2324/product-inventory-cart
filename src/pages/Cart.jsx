
import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  function updateQuantity(id, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== id) return item;

          const nextQuantity = item.cartQuantity + change;

          if (nextQuantity <= 0) return item;

          if (nextQuantity > item.quantity) {
            alert("Maximum available stock reached!");
            return item;
          }

          return { ...item, cartQuantity: nextQuantity };
        })
    );
  }

  function removeItem(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  return (
    <main className="container cart-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR SELECTION</span>
          <h2>Shopping Cart</h2>
        </div>
        <span className="result-count">
          {cart.reduce((sum, item) => sum + item.cartQuantity, 0)} items
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Explore our collection and add something you like.</p>
          <Link to="/" className="add-button">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>
                    {item.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0
                    })}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span>{item.cartQuantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={item.cartQuantity >= item.quantity}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-end">
                  <strong>
                    {(item.price * item.cartQuantity).toLocaleString(
                      "en-IN",
                      {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0
                      }
                    )}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <span>Total Price</span>
            <strong>
              {total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
              })}
            </strong>
            <button
              className="add-button"
              onClick={() =>
                alert("Checkout demo completed! This is a college project.")
              }
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
