import { useState, useEffect, useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ProductCard from "../ProductCard/ProductCard";
import "./RelatedProducts.css";
import baseURL from "../../config/api";

const RelatedProducts = ({ currentProductId, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `${baseURL}/products/category/${category}`
        );
        const data = await response.json();
        const filteredProducts = data.filter(
          (product) => product._id !== currentProductId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, currentProductId]);

  return (
    <div className="related-products mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Products</h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="scroll-button hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md hover:bg-white"
        >
          <BiChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="scroll-button hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-md hover:bg-white"
        >
          <BiChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        <div
          ref={scrollContainerRef}
          className="featured-slider overflow-x-auto snap-x snap-mandatory"
        >
          <div className="featured-track flex gap-6 pb-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex-none w-[280px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
