import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { totalItems } = useCart();

    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
            <div className="container-fluid">
                <Link href="/" className="navbar-brand">Cebies Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className="nav-link">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/cart" className="nav-link">
                                Cart ({totalItems()})
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={toggleTheme} className="btn btn-outline-secondary">
                                Toggle Theme
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;