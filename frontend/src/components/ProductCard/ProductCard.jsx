import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="product-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    >
      <div className="product-image-container aspect-square p-6 bg-gray-50 group-hover:bg-gray-100 transition-colors">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="product-info p-6">
        <h3 className="product-title font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <div className="product-rating flex items-center gap-1 mb-3">
          <div className="stars flex">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="rating-value text-sm text-gray-600">
            ({product.rating})
          </span>
        </div>
        <p className="product-price text-lg font-bold text-indigo-600">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
