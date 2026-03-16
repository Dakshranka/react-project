import Navbar from "../../Navbar";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [requestResponse, setRequestResponse] = useState({
        message: "",
        className: "",
    });

    const validationSchema = Yup.object({
        firstName: Yup.string().trim().required("First name is required"),
        lastName: Yup.string().trim().required("Last name is required"),
        email: Yup.string().email("Enter a valid email").required("Email is required"),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
            .required("Mobile number is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        termsAgree: Yup.boolean().oneOf([true], "Please accept Terms and Privacy Policy"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            termsAgree: false,
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setRequestResponse({
                message: "",
                className: "",
            });

            try {
                const response = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstname: values.firstName,
                        lastname: values.lastName,
                        email: values.email,
                        mobile: values.mobile,
                        password: values.password,
                    }),
                });

                const responseData = await response.json();

                if (!response.ok || responseData.error) {
                    throw new Error(responseData.message || "Registration failed. Please try again.");
                }

                setRequestResponse({
                    message: "Registration successful! Please login.",
                    className: "alert-success",
                });

                formik.resetForm();
                setTimeout(() => navigate("/login"), 900);
            } catch (error) {
                setRequestResponse({
                    message: error.message || "Registration failed. Please try again.",
                    className: "alert-danger",
                });
            } finally {
                setSubmitting(false);
            }
        },
        validateOnMount: true,
    });

    const fieldError = (name) => formik.touched[name] && formik.errors[name];

    
    return (
        <div>
            <Navbar />

            <section className={`${styles.authHero} py-5`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-7">
                            <div className={`card ${styles.authCard}`}>
                                <div className="card-body p-4 p-md-5">
                                    <p className={`text-uppercase mb-2 ${styles.authEyebrow}`}>Get Started</p>
                                    <h1 className={`h2 mb-2 ${styles.authTitle}`}>Create your Eshop account</h1>
                                    <p className={`text-muted mb-4 ${styles.authSubtitle}`}>Register once to checkout faster and keep your order history in one place.</p>

                                    <form onSubmit={formik.handleSubmit} noValidate>
                                        {requestResponse.message && (
                                            <div className={`alert ${requestResponse.className}`} role="alert">
                                                {requestResponse.message}
                                            </div>
                                        )}

                                        <div className="row">
                                            <div className="col-12 col-md-6 form-group mb-3">
                                                <label className="mb-2" htmlFor="first-name">First name</label>
                                                <input
                                                    id="first-name"
                                                    type="text"
                                                    className={`form-control ${fieldError("firstName") ? "is-invalid" : ""}`}
                                                    {...formik.getFieldProps("firstName")}
                                                />
                                                {fieldError("firstName") && <div className="invalid-feedback">{formik.errors.firstName}</div>}
                                            </div>
                                            <div className="col-12 col-md-6 form-group mb-3">
                                                <label className="mb-2" htmlFor="last-name">Last name</label>
                                                <input
                                                    id="last-name"
                                                    type="text"
                                                    className={`form-control ${fieldError("lastName") ? "is-invalid" : ""}`}
                                                    {...formik.getFieldProps("lastName")}
                                                />
                                                {fieldError("lastName") && <div className="invalid-feedback">{formik.errors.lastName}</div>}
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="mb-2" htmlFor="register-email">Email address</label>
                                            <input
                                                id="register-email"
                                                type="email"
                                                className={`form-control ${fieldError("email") ? "is-invalid" : ""}`}
                                                {...formik.getFieldProps("email")}
                                            />
                                            {fieldError("email") && <div className="invalid-feedback">{formik.errors.email}</div>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="mb-2" htmlFor="register-mobile">Mobile No:</label>
                                            <input
                                                id="register-mobile"
                                                type="tel"
                                                className={`form-control ${fieldError("mobile") ? "is-invalid" : ""}`}
                                                {...formik.getFieldProps("mobile")}
                                            />
                                            {fieldError("mobile") && <div className="invalid-feedback">{formik.errors.mobile}</div>}
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-md-6 form-group mb-3">
                                                <label className="mb-2" htmlFor="register-password">Password</label>
                                                <input
                                                    id="register-password"
                                                    type="password"
                                                    className={`form-control ${fieldError("password") ? "is-invalid" : ""}`}
                                                    {...formik.getFieldProps("password")}
                                                />
                                                {fieldError("password") && <div className="invalid-feedback">{formik.errors.password}</div>}
                                            </div>
                                            
                                        </div>

                                        <div className="form-group mb-4">
                                            <div className="form-check">
                                                <input
                                                    className={`form-check-input ${fieldError("termsAgree") ? "is-invalid" : ""}`}
                                                    type="checkbox"
                                                    id="terms-agree"
                                                    name="termsAgree"
                                                    checked={formik.values.termsAgree}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label className="form-check-label" htmlFor="terms-agree">
                                                    I agree to the Terms and Privacy Policy
                                                </label>
                                                {fieldError("termsAgree") && <div className="invalid-feedback d-block">{formik.errors.termsAgree}</div>}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className={`btn btn-primary w-100 ${styles.submitBtn}`}
                                            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                                        >
                                            {formik.isSubmitting ? "Creating Account..." : "Create Account"}
                                        </button>
                                    </form>

                                    <p className={`mb-0 mt-4 text-center text-muted ${styles.loginText}`}>
                                        Already have an account? <Link to="/login" className={styles.authLink}>Login</Link>
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

export default RegisterPage;
