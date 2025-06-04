import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard";
import axios from "axios";

export default function MyOrder() {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdateId, setLoadingUpdateId] = useState(null); // เพิ่ม state สำหรับ loading ตอน update
  const API_URL = process.env.VITE_API_URL;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders/seller`, {
          withCredentials: true,
        });
        console.log("✅ response.data = ", response.data);
        setOrders(response.data.orders || []);

      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getFilteredOrders = (status) => {
    if (status === "all") return orders.filter((o) => o.status !== "cancelled");
    return orders.filter((order) => order.status === status);
  };

  const getStatusCounts = () => {
    return {
      all: orders.filter((o) => o.status !== "cancelled").length,
      pending: orders.filter((o) => o.status === "pending").length,
      shipping: orders.filter((o) => o.status === "shipping").length,
      processing: orders.filter((o) => o.status === "processing").length,
      completed: orders.filter((o) => o.status === "completed").length,
    };
  };


  const updateOrderStatus = async (orderId, data, actionType) => {
  setLoadingUpdateId(orderId);

  let url = "";
  let method = "PUT";
  let body = data;

  switch (actionType) {
    case "shipping":
      url = `/api/orders/${orderId}/accept`;
      body = null;
      break;
    case "processing":
      url = `/api/orders/${orderId}/tracking`;
      break;
    case "complete":
      url = `/api/orders/${orderId}/confirm`;
      method = "POST";
      body = null;
      break;
    default:
      alert("Unknown action type");
      return;
  }

  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data: body,
      withCredentials: true,
    });

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, ...response.data } : order
      )
    );
  } catch (error) {
    console.error("Failed to update order status", error);
    alert("Failed to update order status");
  } finally {
    setLoadingUpdateId(null);
  }
};

const handleConfirmOrder = (orderId) => {
  updateOrderStatus(orderId, null, "shipping"); // กดรับคำสั่งซื้อ
};

const handleSubmitShipping = (orderId, shippingData) => {
  updateOrderStatus(orderId, shippingData, "processing"); // ใส่เลขพัสดุ
};

const handleCompleteOrder = (orderId) => {
  updateOrderStatus(orderId, null, "complete"); // กดยืนยันรับสินค้า
};


  const counts = getStatusCounts();

  const tabs = [
    { id: "all", label: `All (${counts.all})` },
    { id: "pending", label: `Pending (${counts.pending})` },
    { id: "shipping", label: `Shipping (${counts.shipping})` },
    { id: "processing", label: `Processing (${counts.processing})` },
    { id: "completed", label: `Completed (${counts.completed})` },
  ];

  return (
    <div className="px-12 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border p-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 -mb-px border-b-2 transition-colors duration-200 ${activeTab === tab.id
                  ? "border-purple-600 text-purple-700 font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 font-normal"
                }`}

            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading orders...</div>
          ) : getFilteredOrders(activeTab).length === 0 ? (
            <div className="p-8 text-center text-gray-500 border rounded-lg">
              No orders found for this status.
            </div>
          ) : (
            getFilteredOrders(activeTab).map((order) => (
              <OrderCard
                key={order.id || order._id}
                order={order}
                onConfirm={handleConfirmOrder}
                onSubmitShipping={handleSubmitShipping}
                onComplete={handleCompleteOrder}
                loading={loadingUpdateId === (order.id || order._id)} // ส่ง prop loading ไปบอกแต่ละออเดอร์
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
