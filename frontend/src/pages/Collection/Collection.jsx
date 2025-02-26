import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/category/${category}`
        );
        const data = await response.json();
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="collection-container min-h-screen bg-gray-50 py-12">
      <div className="collection-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="collection-title text-3xl font-bold text-gray-900 mb-8 capitalize text-center">
          {category} Collection
        </h1>

        {loading ? (
          <div className="loading-spinner flex justify-center items-center h-64">
            <div className="spinner-icon animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
