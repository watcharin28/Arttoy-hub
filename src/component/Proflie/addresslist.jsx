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

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("/api/addresses");
      setAddresses(response.data);
      setError("");
    } catch (error) {
      setError("Unable to load address information.");
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddAddress = async (newAddress) => {
    try {
      const response = await axios.post("/api/addresses", newAddress);
      const addedAddress = response.data;

      if (addedAddress.isDefault) {
        setAddresses((prev) =>
          prev.map((addr) => ({ ...addr, isDefault: false }))
        );
      }

      setAddresses((prev) => [...prev, addedAddress]);

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
    try {
      const response = await axios.put(`/api/addresses/${updatedAddress.id}`, updatedAddress);
      const updated = response.data;

      setAddresses((prev) =>
        prev.map((addr) => (addr.id === updated.id ? updated : addr))
      );

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedAddress(null);
      setError("");
    } catch (error) {
      setError("Unable to update the address.");
      console.error("Error updating address:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-4">My Address</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setSelectedAddress(null);
          }}
          className="p-2 text-sm bg-black text-white rounded"
        >
          Add Address
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={handleEditAddress}
          />
        ))}
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
