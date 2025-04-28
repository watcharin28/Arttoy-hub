import { useState, useEffect } from "react";
import AddressCard from "./addresscard";
import AddAddress from "./addaddress";
import axios from "axios";

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(""); // เพิ่มการจัดการข้อผิดพลาด

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("/api/addresses");
      setAddresses(response.data);
      setError(""); // รีเซ็ตข้อผิดพลาด
    } catch (error) {
      setError("ไม่สามารถดึงข้อมูลที่อยู่ได้");
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddAddress = async (newAddress) => {
    try {
      // ตรวจสอบว่าให้เลือก Default หรือไม่
      if (newAddress.isDefault) {
        // เปลี่ยนที่อยู่เดิมให้ไม่เป็น Default
        await axios.put("/api/addresses/default", { id: newAddress.id });
      }
      
      await axios.post("/api/addresses", newAddress);
      fetchAddresses(); // รีเฟรชข้อมูลหลังจากเพิ่ม
      setIsModalOpen(false);
    } catch (error) {
      setError("ไม่สามารถเพิ่มที่อยู่ได้");
      console.error("Error adding address:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Address List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Add Address
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>} {/* แสดงข้อผิดพลาด */}

      <div className="grid gap-4">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>

      <AddAddress
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAddress}
      />
    </div>
  );
}
