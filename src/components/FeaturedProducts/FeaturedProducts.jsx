import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedProducts.css";

const products = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    category: "Smartphone",
    price: 999.99,
    rating: 4.9,
    reviews: 1234,
    image: "./src/assets/iphone-detail.jpg",
  },
  {
    id: 2,
    name: "MacBook Pro M2",
    category: "Laptop",
    price: 1299.99,
    rating: 4.8,
    reviews: 856,
    image: "./src/assets/mackbook-image.webp",
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    category: "Audio",
    price: 349.99,
    rating: 4.7,
    reviews: 2345,
    image: "./src/assets/Sony WH-1000XM4.jpg",
  },
  {
    id: 4,
    name: "iPad Air",
    category: "Tablet",
    price: 599.99,
    rating: 4.8,
    reviews: 945,
    image: "./src/assets/ipad-image.webp",
  },
];

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="featured-section py-8">
      <div className="featured-container px-4">
        <div className="featured-header mb-6">
          <h2 className="featured-title text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="featured-subtitle text-sm text-gray-600 mt-1">
            Swipe to explore our top picks
          </p>
        </div>

        <div className="featured-slider overflow-x-auto  snap-x snap-mandatory">
          <div className="featured-track flex gap-4 pb-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card flex-none w-[280px] snap-center"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-wrapper relative rounded-2xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image w-full h-[280px] object-cover"
                  />
                  <div className="product-badge absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                </div>

                <div className="product-info mt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="product-name text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="product-category text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <div className="product-price text-lg font-bold text-blue-600">
                      ${product.price}
                    </div>
                  </div>

                  <div className="product-rating flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
