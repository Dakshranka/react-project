import Navbar from "../../Navbar";

const ContactPage = () => {
    return (
        <div>
            <Navbar />

            <section className="container py-5">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                        <h1 className="h2 mb-3">Contact Us</h1>
                        <p className="text-muted mb-2">Email: support@eshop.com</p>
                        <p className="text-muted mb-2">Phone: +91 1234567890</p>
                        <p className="text-muted mb-0">Address: 123 Market Street, Mumbai, India</p>
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
        </div>
    );
};

export default ContactPage;
