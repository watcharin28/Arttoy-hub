import { useState, useEffect } from "react";
import axios from "axios";
import AddressCard from "./addresscard";
import AddAddress from "./addaddress";
import EditAddress from "./editaddress";

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState("");
  const API_URL = process.env.API_URL;
  const fetchAddresses = async () => {
    try {
      // const response = await axios.get('http://localhost:8080/api/user/addresses'
      const response = await axios.get(`${API_URL}/api/user/addresses`, {
        withCredentials: true, // สำคัญ: ต้องใส่ตัวนี้เพื่อส่ง cookie

      });
      console.log("Fetched addresses:", response.data);
      setAddresses(response.data.addresses);
      setError("");
    } catch (error) {
      setError("Unable to load address information.");
      console.error("Error fetching addresses:", error);
    }
  };

const handleAddAddress = async (newAddress) => {
  try {
    
    // const response = await axios.put(`http://localhost:8080/api/user/shipping-address`
    const response = await axios.put(`${API_URL}/api/user/shipping-address`, newAddress, { withCredentials: true });
    const addedAddress = response.data.address; //  ดึง address จริง

    if (addedAddress.isDefault) {
      setAddresses((prev) =>
        Array.isArray(prev) ? prev.map((addr) => ({ ...addr, isDefault: false })) : []
      );
    }

    setAddresses((prev) =>
      Array.isArray(prev) ? [...prev, addedAddress] : [addedAddress]
    );

    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedAddress(null);
    setError("");
  } catch (error) {
    setError("Unable to add the address.");
    console.error("Error adding address:", error);
  }
};

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateAddress = async (updatedAddress) => {
    console.log("Updating address with id:", updatedAddress.id);
    try {
      const response = await axios.put(`${API_URL}/api/user/addresses/${updatedAddress.id}`, updatedAddress, { withCredentials: true });
      const updated = response.data;

      setAddresses((prev) =>
        prev.map((addr) => (addr.id === updated.id ? updated : addr))
      );
      await fetchAddresses();  // หลังเพิ่มเสร็จ ให้ fetch addresses ใหม่
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedAddress(null);
      setError("");
    } catch (error) {
      setError("Unable to update the address.");
      console.error("Error updating address:", error);
    }
  };

   const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await axios.delete(`${API_URL}/api/user/addresses/${addressId}`, {
        withCredentials: true,
      });
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
      setError("");
    } catch (error) {
      setError("Unable to delete the address.");
      console.error("Error deleting address:", error);
    }
  };


  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="px-12 py-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ">My Address</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setSelectedAddress(null);
          }}
          className="p-2 text-sm bg-violet-500 text-white rounded flex item-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4 mr-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
Add Address
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid gap-4">
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          ))
        ) : (
          <div className="text-gray-500">You have not added an address yet.</div>
        )}
      </div>

      <AddAddress
        isOpen={isModalOpen && !isEditMode}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAddress}
      />

      <EditAddress
        isOpen={isModalOpen && isEditMode}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdateAddress}
        address={selectedAddress}
      />
    </div>
  );
}


