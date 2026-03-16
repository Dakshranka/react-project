import { Link } from "react-router-dom";

const Category = ({ category }) => {
	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
			<div className="card h-100">
				<img
					src={category.image}
					className="card-img-top"
					alt={category.name}
					style={{ height: "180px", objectFit: "cover" }}
				/>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title text-truncate" title={category.name}>
						{category.name}
					</h5>
					<Link to="/products" className="btn btn-outline-primary mt-auto">
						Explore
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Category;
