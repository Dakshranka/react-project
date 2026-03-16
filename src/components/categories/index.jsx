import { useEffect, useState } from "react";
import axios from "axios";
import Category from "./category";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");
                const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
                setCategories(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                setErrorMessage(error.message || "Something went wrong while fetching categories.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section id="products" className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Shop by Categories</h2>
            </div>

            {isLoading && <p className="text-muted mb-0">Loading categories...</p>}

            {!isLoading && errorMessage && (
                <div className="alert alert-danger mb-0" role="alert">
                    {errorMessage}
                </div>
            )}

            {!isLoading && !errorMessage && (
                <div className="row">
                    {categories.map((category) => (
                        <Category key={category.id} category={category} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Categories;