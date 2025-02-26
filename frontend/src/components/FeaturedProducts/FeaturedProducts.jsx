import { useState, useEffect, useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ProductCard from "../ProductCard/ProductCard";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
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
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        // Filter for products added in last month and limit to 8
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const recentProducts = data
          .filter((product) => new Date(product.createdAt) > oneMonthAgo)
          .slice(0, 8);

        setProducts(recentProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="featured-section py-8">
      <div className="featured-container px-4">
        <div className="featured-header mb-6">
          <h2 className="featured-title text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="featured-subtitle text-sm text-gray-600 mt-1">
            Check out our latest additions
          </p>
        </div>

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
    </section>
  );
}
