import { useState } from "react";
import "./AddProduct.css";
import baseURL from "../../config/api";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: [],
    specifications: "",
    productReview: "",
    amazonAffiliate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Product name is required";
    if (!formData.price) errors.price = "Price is required";
    if (formData.price <= 0) errors.price = "Price must be greater than 0";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (!formData.category) errors.category = "Category is required";
    if (formData.image.length === 0)
      errors.image = "At least one image is required";
    if (!formData.specifications.trim())
      errors.specifications = "Specifications are required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`${baseURL}/upload`, {
        method: "POST",
        body: formData,
      });
      const urls = await response.json();

      setFormData((prev) => ({
        ...prev,
        image: urls,
      }));
      setSuccess("Images uploaded successfully!");
    } catch (error) {
      setError("Failed to upload images");
      console.log("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      specifications: newSpecs,
    }));
    // Clear specification validation error
    if (validationErrors.specifications) {
      setValidationErrors((prev) => ({ ...prev, specifications: "" }));
    }
  };

  const addSpecification = () => {
    setFormData((prevState) => ({
      ...prevState,
      specifications: [...prevState.specifications, { name: "", value: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setError("Please provide all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      setSuccess("Product created successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: [],
        specifications: [{ name: "", value: "" }],
        productReview: "",
        amazonAffiliate: "",
      });
      setSelectedFiles([]);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="add-product-container max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New Product
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product name */}
          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.name ? "border-red-500" : "border-gray-200"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
            />
            {validationErrors.name && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.name}
              </p>
            )}
          </div>
          {/* Product Price  */}
          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₹</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                  validationErrors.price ? "border-red-500" : "border-gray-200"
                } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
              />
            </div>
            {validationErrors.price && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.price}
              </p>
            )}
          </div>
          {/* produt Description  */}
          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.description
                  ? "border-red-500"
                  : "border-gray-200"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
            />
            {validationErrors.description && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.description}
              </p>
            )}
          </div>
          {/* Product Categoory  */}
          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.category ? "border-red-500" : "border-gray-200"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
            >
              <option value="">Select Category</option>
              <option value="laptops">Laptops</option>
              <option value="smartphones">Smartphones</option>
              <option value="accessories">Accessories</option>
              <option value="audio">Audio</option>
            </select>
            {validationErrors.category && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.category}
              </p>
            )}
          </div>
          {/* Product Images  */}
          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Product Images
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                accept="image/*"
              />
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFiles.length || uploading}
                className="px-4 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition-colors"
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload Images"
                )}
              </button>
            </div>
            {formData.image.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Uploaded Images
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {formData.image.map((url, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 md:h-32 object-contain rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      />
                      <div className="absolute top-1 right-1">
                        <button
                          type="button"
                          className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                          onClick={() => removeImage(index)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {validationErrors.image && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.image}
              </p>
            )}
          </div>
          {/* Product Specifications */}
          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Specifications (Markdown)
            </label>
            <textarea
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              rows="8"
              placeholder="Enter product specifications in markdown format..."
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.specifications
                  ? "border-red-500"
                  : "border-gray-200"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
            />
            {validationErrors.specifications && (
              <p className="mt-2 text-sm text-red-600">
                {validationErrors.specifications}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Use markdown formatting for better presentation. Example:
              <br />
              ## Display
              <br />
              - 16-inch Retina Display
              <br />- 3456 x 2234 resolution
            </p>
          </div>

          {/* YouTube Video Review Links */}
          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              YouTube Review Links
            </label>
            <input
              type="text"
              name="productReview"
              value={formData.productReview}
              onChange={handleChange}
              placeholder="Enter YouTube video URL"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
            <p className="mt-2 text-sm text-gray-500">
              Add YouTube review video links (optional)
            </p>
          </div>

          {/* Affiliate Link */}

          <div className="form-group">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Amazon Affiliate Link
            </label>
            <input
              type="text"
              name="amazonAffiliate"
              value={formData.amazonAffiliate}
              onChange={handleChange}
              placeholder="Enter affiliate URL"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
            <p className="mt-2 text-sm text-gray-500">
              Add amazon affiliate link (optional)
            </p>
          </div>

          {/* Submit Button  */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </span>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
