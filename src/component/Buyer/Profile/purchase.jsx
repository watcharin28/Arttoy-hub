import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseCard from "./purchaseCard";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState("all");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUpdateId, setLoadingUpdateId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/orders/seller`, {
                    withCredentials: true,
                });
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

    const getStatusCounts = () => ({
        all: orders.filter((o) => o.status !== "cancelled").length,
        pending: orders.filter((o) => o.status === "pending").length,
        shipping: orders.filter((o) => o.status === "shipping").length,
        processing: orders.filter((o) => o.status === "processing").length,
        completed: orders.filter((o) => o.status === "completed").length,
    });

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
                url = `/api/orders/${orderId}/processing`;
                break;
            case "completed":
                url = `/api/orders/${orderId}/completed`;
                break;
            default:
                url = `/api/orders/${orderId}/status`;
                break;
        }

        try {
            await axios({
                method,
                url: `http://localhost:8080${url}`,
                data: body,
                withCredentials: true,
            });
            // Refresh orders
            const res = await axios.get(`http://localhost:8080/api/orders/seller`, {
                withCredentials: true,
            });
            setOrders(res.data.orders || []);
        } catch (error) {
            console.error(`Failed to update order status to ${actionType}`, error);
            alert("Failed to update order status. Please try again.");
        } finally {
            setLoadingUpdateId(null);
        }
    };

    // Confirm receipt (processing -> completed)
    const handleConfirmReceipt = (orderId) => {
        updateOrderStatus(orderId, null, "completed");
    };


    // Submit review handler
    const handleReviewSubmit = async (orderId, reviewData) => {
        try {
            await axios.post(
                `http://localhost:8080/api/reviews`,
                {
                    orderID: orderId,
                    productID: reviewData.productID,
                    rating: reviewData.rating,
                    comment: reviewData.comment,
                },
                { withCredentials: true }
            );
            alert("Review submitted successfully");
        } catch (error) {
            console.error("Failed to submit review", error);
            alert("Failed to submit review");
        }
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

        <div className="px-12 py-6 max-w-6xl mx-auto">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold mb-6">My Purchases</h1>

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

                {/* Orders List */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading orders...</p>
                ) : (
                    <div className="space-y-6">
                        {getFilteredOrders(activeTab).length === 0 ? (
                            <p className="text-center text-gray-500">No orders found.</p>
                        ) : (
                            getFilteredOrders(activeTab).map((order) => (
                                <PurchaseCard
                                    key={order._id}
                                    order={order}
                                    loading={loadingUpdateId === order._id}
                                    onComplete={() => handleConfirmReceipt(order._id)}
                                    onReview={handleReviewSubmit}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
