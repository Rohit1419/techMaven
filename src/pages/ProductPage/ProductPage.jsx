import React, { useState } from "react";
import "./ProductPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const product = {
  name: "iPhone 14 Pro",
  brand: "Apple",
  price: 999.99,
  rating: 4.8,
  reviews: 1234,
  description:
    "The iPhone 14 Pro features a stunning Super Retina XDR display, A16 Bionic chip, and an advanced camera system.",
  colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
  storage: ["128GB", "256GB", "512GB", "1TB"],
  images: [
    "/src/assets/iphone-detail.jpg",
    "/src/assets/iphone-angle.png",
    "/src/assets/iphone-back.png",
    "/src/assets/iphone-detail.jpg",
  ],
  specs: [
    { label: "Display", value: "6.1-inch Super Retina XDR" },
    { label: "Processor", value: "A16 Bionic chip" },
    { label: "Camera", value: "48MP Main | 12MP Ultra Wide" },
    { label: "Battery", value: "Up to 23 hours video playback" },
  ],
};

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);

  return (
    <div className="product-page bg-white">
      <div className="product-container max-w-7xl mx-auto px-4 py-8">
        <div className="product-content grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div className="product-gallery">
            <div className="main-image-container mb-4">
              <img
                src={mainImage}
                alt={product.name}
                className="main-image w-full rounded-lg"
              />
            </div>
            <div className="thumbnail-grid grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`thumbnail-btn p-2 rounded-lg border-2 ${
                    mainImage === image ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="product-meta flex items-center gap-4 mb-4">
              <span className="brand-name text-gray-600">{product.brand}</span>
              <div className="rating-wrapper flex items-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <span className="ml-1 text-gray-700">{product.rating}</span>
                <span className="text-gray-500 ml-1">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
            <p className="product-description text-gray-600 mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="color-selection mb-6">
              <h3 className="text-lg font-semibold mb-2">Color</h3>
              <div className="color-options flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`color-btn px-4 py-2 rounded-lg border ${
                      selectedColor === color
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="storage-selection mb-6">
              <h3 className="text-lg font-semibold mb-2">Storage</h3>
              <div className="storage-options flex gap-3">
                {product.storage.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`storage-btn px-4 py-2 rounded-lg border ${
                      selectedStorage === storage
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Marketplace Links */}
            <div className="price-marketplace-wrapper mt-8">
              <div className="price-tag text-3xl font-bold text-gray-900 mb-4">
                Starting from ${product.price}
              </div>
              <div className="marketplace-buttons flex flex-col gap-3">
                <a
                  href="https://amazon.com/product-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="marketplace-btn flex items-center justify-between px-6 py-4 rounded-lg border border-gray-300 hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Buy on Amazon</span>
                  </div>
                  <span className="text-blue-600 font-bold">$999.99</span>
                </a>

                <a
                  href="https://flipkart.com/product-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="marketplace-btn flex items-center justify-between px-6 py-4 rounded-lg border border-gray-300 hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Buy on Flipkart</span>
                  </div>
                  <span className="text-blue-600 font-bold">$989.99</span>
                </a>
              </div>
            </div>

            {/* Specifications */}
            <div className="specifications mt-8 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="specs-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-label text-gray-600">
                      {spec.label}:
                    </span>
                    <span className="spec-value ml-2 text-gray-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
