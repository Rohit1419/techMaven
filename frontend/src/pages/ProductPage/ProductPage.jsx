import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { AiFillStar, AiOutlineAmazon } from "react-icons/ai";
import { SiFlipkart } from "react-icons/si";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setMainImage(data.image[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-loading flex justify-center items-center min-h-screen">
        <div className="loading-spinner animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-error text-center py-12">
        <h2 className="text-2xl text-red-600">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="product-page bg-gray-50">
      <div className="product-container max-w-8xl mx-5 px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="left-column space-y-4">
            {/* Image Gallery */}
            <div className="product-gallery bg-white p-4 rounded-xl shadow-sm">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[350px] object-contain mb-4"
              />
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
                {product.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 aspect-square border-2 rounded-lg p-1 ${
                      mainImage === img
                        ? "border-indigo-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications - Desktop */}
            <div className="specifications hidden lg:block bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold p-6 border-b">
                Technical Specifications
              </h2>
              <div className="p-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    table: ({ node, ...props }) => (
                      <table
                        className="min-w-full text-sm border-collapse"
                        {...props}
                      />
                    ),
                    tr: ({ node, isHeader, ...props }) => (
                      <tr className="even:bg-gray-50" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        className="px-4 py-3 border border-gray-200 text-gray-600"
                        {...props}
                      />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="px-4 py-3 border border-gray-200 bg-gray-100 text-gray-700 font-medium text-left"
                        {...props}
                      />
                    ),
                  }}
                >
                  {product.specifications}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Right Column - Now Sticky */}
          <div className="right-column">
            <div className="sticky top-4 space-y-4">
              {/* Product Info */}
              <div className="product-info bg-white p-6 rounded-xl shadow-sm">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span>({product.rating})</span>
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-6">
                  ₹{product.price}
                </div>

                {/* Buy Buttons */}
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-600 group"
                  >
                    <div className="flex items-center gap-3">
                      <AiOutlineAmazon className="text-2xl group-hover:text-indigo-600" />
                      <span>Buy on Amazon</span>
                    </div>
                    <span className="font-semibold text-indigo-600">
                      ₹{product.price}
                    </span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-600 group"
                  >
                    <div className="flex items-center gap-3">
                      <SiFlipkart className="text-2xl group-hover:text-indigo-600" />
                      <span>Buy on Flipkart</span>
                    </div>
                    <span className="font-semibold text-indigo-600">
                      ₹{product.price}
                    </span>
                  </a>
                </div>
              </div>

              {/* Product Review */}
              <div className="product-review bg-white rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold p-6 border-b">
                  Product Review <br />
                  <span className="text-sm text-gray-500">
                    {" "}
                    "Trust me*, just buy it! No need to scroll endlessly or
                    watch a million videos—I've done the homework for you. 😉"
                  </span>
                </h2>
                <div className="p-6 prose max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {product.description}
                  </ReactMarkdown>
                </div>
                {/* YouTube Video */}
                {product.productReview && (
                  <div className="aspect-video w-full">
                    <iframe
                      src={product.productReview.replace("watch?v=", "embed/")}
                      className="w-full h-full rounded-lg"
                      title="Product Review Video"
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Specifications - Mobile */}
          <div className="specifications lg:hidden bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold p-6 border-b">
              Technical Specifications
            </h2>
            <div className="p-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  table: ({ node, ...props }) => (
                    <table
                      className="min-w-full text-sm border-collapse"
                      {...props}
                    />
                  ),
                  tr: ({ node, isHeader, ...props }) => (
                    <tr className="even:bg-gray-50" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="px-4 py-3 border border-gray-200 text-gray-600"
                      {...props}
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="px-4 py-3 border border-gray-200 bg-gray-100 text-gray-700 font-medium text-left"
                      {...props}
                    />
                  ),
                }}
              >
                {product.specifications}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      {/* Related Products section */}
      <RelatedProducts
        currentProductId={product._id}
        category={product.category}
      />
    </div>
  );
};

export default ProductPage;
