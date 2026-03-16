import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-dark text-white py-5 border-bottom">
            <div className="container text-center">
                <h1 className="display-5 font-weight-bold mb-3">Welcome to Eshop</h1>
                <p className="lead mb-4">Discover great products at the best prices.</p>
                <Link to="/products" className="btn btn-primary btn-lg">Shop Now</Link>
            </div>
        </header>
    );
}   
export default Header;