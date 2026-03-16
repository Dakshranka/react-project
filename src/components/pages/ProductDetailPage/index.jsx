import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Navbar";

const placeholderImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='480'><rect width='100%25' height='100%25' fill='%23f1f3f5'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236c757d' font-family='Arial, sans-serif' font-size='24'>No Image</text></svg>";

const sanitizeImageUrl = (value) => {
    if (typeof value !== "string") {
        return "";
    }

    const candidate = value.trim();

    if (!candidate) {
        return "";
    }

    try {
        const parsedUrl = new URL(candidate);
        if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" || parsedUrl.protocol === "data:") {
            return candidate;
        }
        return "";
    } catch (error) {
        return "";
    }
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const response = await fetch(`https://fakestoreapi.com/products/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch product details.");
                }

                const data = await response.json();
                setProduct({
                    ...data,
                    price: Number(data?.price) || 0,
                    image: sanitizeImageUrl(data?.image)
                });
            } catch (error) {
                setErrorMessage(error.message || "Something went wrong while fetching product details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const imageUrl = product?.image || placeholderImage;

    return (
        <div>
            <Navbar />

            <section className="container py-5">
                <div className="mb-4">
                    <Link to="/products" className="btn btn-outline-secondary">← Back to Products</Link>
                </div>

                {isLoading && <p className="text-muted mb-0">Loading product details...</p>}

                {!isLoading && errorMessage && (
                    <div className="alert alert-danger mb-0" role="alert">
                        {errorMessage}
                    </div>
                )}

                {!isLoading && !errorMessage && product && (
                    <div className="row">
                        <div className="col-12 col-lg-5 mb-4 mb-lg-0">
                            <div className="card">
                                <img
                                    src={imageUrl}
                                    alt={product.title}
                                    className="card-img-top"
                                    style={{ maxHeight: "420px", objectFit: "contain" }}
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = placeholderImage;
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-7">
                            <h1 className="h2 mb-3">{product.title}</h1>
                            <p className="text-muted mb-2 text-capitalize">Category: {product.category || "Uncategorized"}</p>
                            <p className="h3 mb-4">₹{product.price}</p>
                            <p className="mb-3">{product.description}</p>
                            <p className="text-muted mb-4">Rating: {product?.rating?.rate || 0} ({product?.rating?.count || 0} reviews)</p>
                            <button type="button" className="btn btn-dark">Add to Cart</button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductDetailPage;
