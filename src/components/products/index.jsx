import { useEffect, useState } from "react";
import Product from "./product";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");
                const response = await fetch("https://fakestoreapi.com/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products.");
                }

                const data = await response.json();
                const normalizedProducts = (Array.isArray(data) ? data : [])
                    .filter((item) => item && item.id && item.title)
                    .map((item) => ({
                        ...item,
                        price: Number(item.price) || 0,
                        images: item.image ? [item.image] : (Array.isArray(item.images) ? item.images : []),
                        category: typeof item.category === "string"
                            ? { name: item.category }
                            : (item.category || { name: "Uncategorized" })
                    }));

                setProducts(normalizedProducts);
            } catch (error) {
                setErrorMessage("Could not load products from API.");
               
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section id="products" className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">All Products</h2>
            </div>

            {isLoading && <p className="text-muted mb-0">Loading products...</p>}

            {!isLoading && errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            {!isLoading && products.length > 0 && (
                <div className="row">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            )}

            {!isLoading && products.length === 0 && !errorMessage && (
                <p className="text-muted mb-0">No products available right now.</p>
            )}
        </section>
    );
};

export default Products;
