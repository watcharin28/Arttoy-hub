import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AddProduct({ onClose, onAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const API_URL = process.env.VITE_API_URL;
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...imageFiles, ...newFiles];
    setImageFiles(updatedFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((files) => files.filter((_, i) => i !== index));
    setPreviewImages((previews) => previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("model", model);
    formData.append("color", color);
    formData.append("size", size);
    imageFiles.forEach((file) => {
      formData.append("product_image", file);
    });

    try {
      await axios.post(`${API_URL}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Product added successfully!");

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setModel("");
      setColor("");
      setSize("");
      setImageFiles([]);
      setPreviewImages([]);

      onAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-[-40px] bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeInScale 0.3s ease" }}
      >
        {/* Header bar สีม่วง */}
        <div className="flex justify-between items-center bg-purple-600 text-white px-6 py-3 rounded-t-lg">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-white text-3xl leading-none hover:text-gray-300"
            type="button"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-12 py-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2">Product Images</label>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-all cursor-pointer min-h-[160px] flex flex-col items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              {!imageFiles.length && (
                <>
                  <button
                    type="button"
                    className="text-gray-500 mb-2 px-4 py-2 border border-gray-300 rounded hover:border-purple-500 hover:text-purple-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Click to upload images
                  </button>
                  <p className="text-sm text-gray-400 mb-4">
                    Accepted formats: PNG, JPG, GIF (multiple files allowed)
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {previewImages.length > 0 && (
                <div className="flex space-x-4 overflow-x-auto w-full px-2">
                  {previewImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-28 h-28 flex-shrink-0"
                    >
                      <img
                        src={img}
                        alt={`preview-${index}`}
                        className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition text-gray-600"
                        aria-label="Remove image"
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter product name"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              >
                <option value="" disabled>Select Category</option>
                <option value="Crybaby">Crybaby</option>
                <option value="Labubu">Labubu</option>
                <option value="Dimoo">Dimoo</option>
                <option value="Skullpanda">Skullpanda</option>
                <option value="Hacipupu">Hacipupu</option>
                <option value="Molly">Molly</option>
                <option value="Pucky">Pucky</option>
                <option value="Instinctoy">Instinctoy</option>
                <option value="Hirono">Hirono</option>
                <option value="Baby three">Baby three</option>
                <option value="Dodowo puppy">Dodowo puppy</option>
                <option value="Crayon shinchan">Crayon shinchan</option>
                <option value="Nyota">Nyota</option>
                <option value="Farmer Bob">Farmer Bob</option>
                <option value="Panghu">Panghu</option>
                <option value="Lulu">Lulu</option>
                <option value="Zsiga">Zsiga</option>
                <option value="Panda Roll">Panda Roll</option>
                <option value="Kimmon">Kimmon</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Type</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              >
                <option value="" disabled>
                  Select product type
                </option>
                <option value="unsealed">Unsealed</option>
                <option value="checked_with_card">Checked with Card</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Color</label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Red, Blue, Black"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              >
                <option value="" disabled>
                  Select size
                </option>
                <option value="100%">100%</option>
                <option value="400%">400%</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="e.g. 499.00"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Describe your product here (e.g. defects, conditions)"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition flex justify-end"
            >
              Add Product
            </button></div>
        </form>
      </div>
    </div>
  );
}
