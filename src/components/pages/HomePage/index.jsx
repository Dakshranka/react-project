import Categories from "../../categories";
import Header from "../../Header";
import Navbar from "../../Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div id="home">
            <Navbar />
            <Header />

            <section className="container py-4">
                <div className="row text-center">
                    <div className="col-12 col-md-4 mb-3 mb-md-0">
                        <div className="border rounded p-3 h-100">
                            <h5 className="mb-2">Free Delivery</h5>
                            <p className="text-muted mb-0">On orders above rupees 500 across all major cities.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3 mb-md-0">
                        <div className="border rounded p-3 h-100">
                            <h5 className="mb-2">Secure Payment</h5>
                            <p className="text-muted mb-0">100% secure checkout with trusted payment partners.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="border rounded p-3 h-100">
                            <h5 className="mb-2">24/7 Support</h5>
                            <p className="text-muted mb-0">Fast support for orders, returns, and product queries.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Categories />

            <section id="deals" className="bg-light py-5 border-top border-bottom">
                <div className="container text-center">
                    <h2 className="h3 mb-3">Today’s Best Deals</h2>
                    <p className="text-muted mb-4">Save up to 40% on selected categories for a limited time.</p>
                    <Link to="/products" className="btn btn-primary">View Deals</Link>
                </div>
            </section>

            <section id="contact" className="container py-5">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                        <h2 className="h3 mb-3">Get in Touch</h2>
                        <p className="text-muted mb-2">Email: support@eshop.com</p>
                        <p className="text-muted mb-2">Phone: +91 1234567890</p>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Quick Message</h5>
                                <form onSubmit={(event) => event.preventDefault()}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Your email" />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" rows="3" placeholder="Your message"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-dark">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-dark text-white py-3">
                <div className="container text-center">
                    <small>© 2026 Eshop. All rights reserved.</small>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;