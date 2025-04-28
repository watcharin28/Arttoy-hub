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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input 
            type="text" 
            name="phone" 
            placeholder="Phone" 
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <textarea 
            name="address" 
            placeholder="Address (บ้านเลขที่, ถนน)" 
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input 
            type="text" 
            name="subdistrict" 
            placeholder="Subdistrict (ตำบล)" 
            value={formData.subdistrict}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input 
            type="text" 
            name="district" 
            placeholder="District (อำเภอ)" 
            value={formData.district}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input 
            type="text" 
            name="province" 
            placeholder="Province (จังหวัด)" 
            value={formData.province}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input 
            type="text" 
            name="zipcode" 
            placeholder="Zipcode (รหัสไปรษณีย์)" 
            value={formData.zipcode}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="isDefault" 
              checked={formData.isDefault}
              onChange={handleChange}
            />
            Set as Default
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
