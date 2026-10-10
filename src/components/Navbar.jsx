
import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">S</span>
        <span>ShopSphere</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <a href="/#products">Products</a>
        <NavLink to="/cart" className="cart-link">
          Cart <span className="cart-count">{cartCount}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
