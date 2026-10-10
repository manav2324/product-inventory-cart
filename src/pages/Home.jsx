
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="container">
      <section className="hero">
        <span className="hero-label">YOUR EVERYDAY STORE</span>
        <h1>Find your next <span>favourite.</span></h1>
        <p>Discover useful products for your workspace, home, and daily life.</p>
        <a href="#products" className="hero-button">Explore Products ↓</a>
      </section>

      <section id="products" className="products-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR COLLECTION</span>
            <h2>Explore Products</h2>
          </div>
          <span className="result-count">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try another search term or category.</p>
            <button
              className="details-button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
