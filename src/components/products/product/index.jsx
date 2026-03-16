import { Link } from "react-router-dom";

const placeholderImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='480'><rect width='100%25' height='100%25' fill='%23f1f3f5'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236c757d' font-family='Arial, sans-serif' font-size='24'>No Image</text></svg>";

const sanitizeImageUrl = (value) => {
	if (typeof value !== "string") {
		return "";
	}

	let candidate = value.trim();

	if (!candidate) {
		return "";
	}

	if (candidate.startsWith('"') && candidate.endsWith('"')) {
		candidate = candidate.slice(1, -1);
	}

	if (candidate.startsWith("[") && candidate.endsWith("]")) {
		try {
			const parsed = JSON.parse(candidate);
			if (Array.isArray(parsed) && parsed.length > 0) {
				candidate = typeof parsed[0] === "string" ? parsed[0].trim() : "";
			}
		} catch (error) {
			return "";
		}
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

const getPrimaryImage = (images) => {
	if (Array.isArray(images) && images.length > 0) {
		const validImage = images
			.map((item) => sanitizeImageUrl(item))
			.find((item) => Boolean(item));

		if (validImage) {
			return validImage;
		}
	}

	if (typeof images === "string") {
		try {
			const parsedImages = JSON.parse(images);
			if (Array.isArray(parsedImages) && parsedImages.length > 0) {
				const validImage = parsedImages
					.map((item) => sanitizeImageUrl(item))
					.find((item) => Boolean(item));

				if (validImage) {
					return validImage;
				}
			}
		} catch (error) {
			return sanitizeImageUrl(images);
		}
	}

	return "";
};

const Product = ({ product }) => {
	const imageUrl = getPrimaryImage(product?.images || product?.image) || placeholderImage;
	const categoryName = typeof product?.category === "string"
		? product.category
		: (product?.category?.name || "Uncategorized");

	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
			<div className="card h-100">
				<img
					src={imageUrl}
					className="card-img-top"
					alt={product?.title || "Product"}
					style={{ height: "220px", objectFit: "cover" }}
					onError={(event) => {
						event.currentTarget.onerror = null;
						event.currentTarget.src = placeholderImage;
					}}
				/>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title text-truncate" title={product?.title || ""}>
						{product?.title || "Untitled Product"}
					</h5>
					<p className="text-muted mb-2 text-truncate" title={categoryName}>
						{categoryName}
					</p>
					<p className="h5 mb-3">₹{Number(product?.price) || 0}</p>
					<Link to={`/products/${product.id}`} className="btn btn-outline-primary mt-auto">
						View Product
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Product;
