import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiTrash2, FiEdit2, FiPlus } from "react-icons/fi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    size: "",
    color: "",
    stock: "",
    images: [""], // Array for multiple images
    uploadedFiles: [], // Files from device
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/products`, {
        withCredentials: true,
      });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      Swal.fire("Error", "Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length === 0) return;

    // Append files to existing files (don't replace)
    const allFiles = [...formData.uploadedFiles, ...newFiles];

    // Limit to 10 total files
    if (allFiles.length > 10) {
      Swal.fire(
        "Warning",
        "Maximum 10 files allowed. Some files were not added.",
        "warning",
      );
      setFormData({ ...formData, uploadedFiles: allFiles.slice(0, 10) });
      return;
    }

    setFormData({ ...formData, uploadedFiles: allFiles });
    Swal.fire(
      "Success",
      `${allFiles.length} file(s) selected (${newFiles.length} new)`,
      "success",
    );
  };

  const removeUploadedFile = (index) => {
    if (!formData.uploadedFiles) return;
    const newFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    setFormData({ ...formData, uploadedFiles: newFiles });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages.length > 0 ? newImages : [""],
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category_id: "",
      size: "",
      color: "",
      stock: "",
      images: [""],
      uploadedFiles: [],
    });
    setEditingId(null);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.category_id
    ) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);

      // Create FormData for multipart upload
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("category_id", formData.category_id);
      form.append("size", formData.size);
      form.append("color", formData.color);
      form.append("stock", formData.stock);

      // Add URL-based images
      const filteredImages = formData.images.filter((img) => img.trim());
      form.append("images", JSON.stringify(filteredImages));

      // Add uploaded files
      if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
        for (let i = 0; i < formData.uploadedFiles.length; i++) {
          form.append("files", formData.uploadedFiles[i]);
        }
      }

      if (editingId) {
        await axios.put(`${API_URL}/api/products/${editingId}`, form, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Success", "Product updated successfully", "success");
      } else {
        await axios.post(`${API_URL}/api/products`, form, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Success", "Product added successfully", "success");
      }

      resetForm();
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to save product",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category_id: product.category_id || "",
      size: product.size || "",
      color: product.color || "",
      stock: product.stock || "",
      images: product.images
        ? product.images.map((img) => img.image_url)
        : [""],
      uploadedFiles: [],
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/api/products/${productId}`, {
            withCredentials: true,
          });
          Swal.fire("Deleted!", "Product deleted successfully", "success");
          fetchProducts();
        } catch (err) {
          Swal.fire("Error", "Failed to delete product", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Products Management
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <FiPlus /> {showForm && !editingId ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            {editingId ? "Edit Product" : "Add New Product"}
          </h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size (e.g., S,M,L,XL)
                </label>
                <input
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            {/* Images Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images (URL or Upload)
              </label>
              <div className="space-y-3">
                {/* File Upload Section */}
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📤 Upload from Device
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="border border-gray-300 p-2 rounded w-full text-sm file:mr-2 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported: JPG, PNG, GIF, WebP (Max 5MB each) | Max 10 files
                    total
                  </p>

                  {/* Display Selected Files */}
                  {formData.uploadedFiles && formData.uploadedFiles.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        Selected Files ({formData.uploadedFiles.length}):
                      </p>
                      <div className="space-y-1">
                        {formData.uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white p-2 rounded text-xs"
                          >
                            <span className="text-gray-700">
                              📄 {file.name} (
                              {(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                            <button
                              type="button"
                              onClick={() => removeUploadedFile(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-300 my-2"></div>

                {/* URL-based Images */}
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Image URL ${index + 1} (e.g., https://example.com/image.jpg)`}
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="border border-gray-300 p-3 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                + Add Image URL
              </button>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                    ? "Update Product"
                    : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Product
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Images
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.category_name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    ₹{parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {product.images && product.images.length > 0 ? (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {product.images.length} image
                        {product.images.length !== 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-gray-400">No images</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition inline-flex items-center gap-1"
                    >
                      <FiEdit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition inline-flex items-center gap-1"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
