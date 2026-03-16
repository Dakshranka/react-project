import Navbar from "../../Navbar";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div>
            <Navbar />

            <section className="py-5 text-white" style={{ background: "linear-gradient(120deg, #111827 0%, #1d4ed8 55%, #2563eb 100%)" }}>
                <div className="container text-center">
                    <p className="text-uppercase mb-2" style={{ letterSpacing: "1.5px", opacity: 0.9 }}>About Eshop</p>
                    <h1 className="display-5 mb-3">Shopping made simple, trusted, and fast</h1>
                    <p className="lead mb-0 mx-auto" style={{ maxWidth: "720px", opacity: 0.95 }}>
                        We build a modern shopping experience where quality products, transparent prices, and smooth delivery come together.
                    </p>
                </div>
            </section>

            <section className="container py-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                        <h2 className="h3 mb-3">Our Story</h2>
                        <p className="text-muted mb-3">
                            Eshop started with one simple idea: online shopping should feel effortless and reliable for everyone.
                            From fashion to electronics, we curate products that balance quality and value.
                        </p>
                        <p className="text-muted mb-0">
                            Today, we serve customers across cities with secure checkout, quick support, and a growing catalog updated every week.
                        </p>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <div className="card h-100 text-center">
                                    <div className="card-body py-4">
                                        <h3 className="display-6 mb-1">50K+</h3>
                                        <p className="text-muted mb-0">Happy Customers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="card h-100 text-center">
                                    <div className="card-body py-4">
                                        <h3 className="display-6 mb-1">1K+</h3>
                                        <p className="text-muted mb-0">Products Listed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card h-100 text-center">
                                    <div className="card-body py-4">
                                        <h3 className="display-6 mb-1">24/7</h3>
                                        <p className="text-muted mb-0">Customer Support</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card h-100 text-center">
                                    <div className="card-body py-4">
                                        <h3 className="display-6 mb-1">99%</h3>
                                        <p className="text-muted mb-0">On-time Delivery</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container pb-5">
                <div className="card border-0" style={{ background: "#0f172a", color: "#fff" }}>
                    <div className="card-body p-4 p-md-5">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-8 mb-3 mb-md-0">
                                <h2 className="h3 mb-2 text-white">Why customers choose us</h2>
                                <p className="mb-0" style={{ opacity: 0.9 }}>
                                    Carefully selected products, secure payments, and a support team that actually cares.
                                </p>
                            </div>
                            <div className="col-12 col-md-4 text-md-right">
                                <Link to="/products" className="btn btn-primary">Explore Products</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
