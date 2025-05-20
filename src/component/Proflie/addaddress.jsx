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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="relative bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl">
        {/* ปุ่มปิดมุมขวาบน */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-8 text-center">Add Address</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Recipient Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Postal Code"
              value={formData.zipcode}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4 focus:ring-2 focus:ring-purple-500"
            />
            <label className="text-sm">Set Default Address</label>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-gray-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
