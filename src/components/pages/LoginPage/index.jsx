import Navbar from "../../Navbar";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

const LoginPage = () => {
    const navigate = useNavigate();
    const [requestResponse, setRequestResponse] = useState({
        message: "",
        className: "",
    });
    const validationSchema = Yup.object({
        email: Yup.string().email("Enter a valid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        rememberMe: Yup.boolean(),
    });

    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setRequestResponse({
            message: "",
            className: "",
        });

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            const responseData = await response.json();

            if (!response.ok || responseData.error) {
                throw new Error(responseData.message || "Login failed. Please check your credentials.");
            }

            setRequestResponse({
                message: "Login successful!",
                className: "alert-success",
            });
            localStorage.setItem("token", responseData.token || "");
            localStorage.setItem("user", JSON.stringify(responseData.data || {}));
            navigate("/");
        } catch (error) {
            setRequestResponse({
                message: error.message || "Login failed. Please check your credentials.",
                className: "alert-danger",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />

            <section className="auth-hero py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-6">
                            <div className="card auth-card">
                                <div className="card-body p-4 p-md-5">
                                    <p className="text-uppercase auth-eyebrow mb-2">Welcome Back</p>
                                    <h1 className="h2 mb-2">Login to your account</h1>
                                    <p className="text-muted mb-4">Track orders, save addresses, and manage your cart faster.</p>

                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                        {({ touched, errors, values, isSubmitting }) => (
                                            <Form noValidate>
                                                {requestResponse.message && (
                                                    <div className={`alert ${requestResponse.className}`} role="alert">
                                                        {requestResponse.message}
                                                    </div>
                                                )}

                                                <div className="form-group mb-3">
                                                    <label className="mb-2" htmlFor="login-email">Email address</label>
                                                    <Field
                                                        id="login-email"
                                                        name="email"
                                                        type="email"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label className="mb-2" htmlFor="login-password">Password</label>
                                                    <Field
                                                        id="login-password"
                                                        name="password"
                                                        type="password"
                                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center mb-4 auth-meta">
                                                    <div className="form-check">
                                                        <Field
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="remember-me"
                                                            name="rememberMe"
                                                        />
                                                        <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                                                    </div>
                                                    <a href="#forgot" className="auth-link">Forgot password?</a>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100"
                                                    disabled={isSubmitting || !values.email.trim() || !values.password.trim()}
                                                >
                                                    Login
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>

                                    <p className="mb-0 mt-4 text-center text-muted">
                                        New to Eshop? <Link to="/register" className="auth-link">Create an account</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
