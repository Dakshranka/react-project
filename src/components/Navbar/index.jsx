import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const topTickerItems = [
        "Free shipping above Rs 500",
        "Weekend sale up to 40% off",
        "New arrivals every Friday",
        "Use code WELCOME10 on first order"
    ];

    return (
        <>
            <div className="top-ticker" role="status" aria-label="Store updates">
                <div className="top-ticker__track">
                    <div className="top-ticker__content">
                        {topTickerItems.map((item, index) => (
                            <span className="top-ticker__item" key={`ticker-a-${index}`}>{item}</span>
                        ))}
                    </div>
                    <div className="top-ticker__content" aria-hidden="true">
                        {topTickerItems.map((item, index) => (
                            <span className="top-ticker__item" key={`ticker-b-${index}`}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                <Link className="navbar-brand font-weight-bold" to="/">Eshop</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <div className="navbar-nav align-items-lg-center">
                            {!isLoggedIn && (
                                <NavLink to="/login" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
                                    Login
                                </NavLink>
                            )}

                            {!isLoggedIn && (
                                <NavLink to="/register" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
                                    Register
                                </NavLink>
                            )}

                            {isLoggedIn && (
                                <button type="button" className="btn btn-link nav-item nav-link" onClick={handleLogout}>
                                    Logout
                                </button>
                            )}

                            <a className="nav-item nav-link" href="#cart">Cart (0)</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Navbar;