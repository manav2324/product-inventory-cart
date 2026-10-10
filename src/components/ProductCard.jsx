
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-image-link"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <strong>
            {product.price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0
            })}
          </strong>

          <span className="stock">
            Stock: {product.quantity}
          </span>
        </div>

        <div className="product-actions">
          <Link
            to={`/products/${product.id}`}
            className="details-button"
          >
            View Details
          </Link>

          <button
            className="add-button"
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
