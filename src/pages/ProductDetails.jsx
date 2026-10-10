
import { Link, useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="container empty-state">
        <h2>Product not found</h2>
        <Link to="/" className="details-button">Back to Store</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="detail-layout">
        <img
          className="detail-image"
          src={product.image}
          alt={product.name}
        />

        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <h2>
            {product.price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0
            })}
          </h2>
          <p>{product.description}</p>
          <p><strong>Product ID:</strong> {product.id}</p>
          <p><strong>Available quantity:</strong> {product.quantity}</p>

          <div className="product-actions">
            <button
              className="add-button"
              disabled={product.quantity === 0}
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
            <Link to="/" className="details-button">Continue Shopping</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
