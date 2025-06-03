import { useState } from "react";

export default function AddAddress({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    zipcode: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative">
        {/* Header */}
        <div className="bg-purple-600 rounded-t-3xl px-6 py-3 flex items-center justify-between">
          <h2 className="text-white text-lg font-semibold uppercase tracking-wide">
            Add Address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-100 text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-6 text-sm text-gray-700"
        >
          <input
            type="text"
            name="name"
            placeholder="Recipient Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none resize-none"
            rows="2"
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="subdistrict"
              placeholder="Subdistrict"
              value={formData.subdistrict}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="province"
              placeholder="Province"
              value={formData.province}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Postal Code"
              value={formData.zipcode}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4 focus:ring-2 focus:ring-purple-400"
              id="defaultAddress"
            />
            <label htmlFor="defaultAddress" className="text-sm cursor-pointer">
              Set Default Address
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
