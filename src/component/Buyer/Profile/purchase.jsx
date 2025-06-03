import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseCard from "./purchaseCard";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState("all");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUpdateId, setLoadingUpdateId] = useState(null);
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/orders`, {
                    withCredentials: true,
                });
                console.log("Fetched Orders:", response.data);
                setOrders(response.data || []);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/reviews/my-reviews", {
                    withCredentials: true,
                });
                setUserReviews(res.data || []);
            } catch (err) {
                console.error("Failed to fetch user reviews", err);
            }
        };
        fetchReviews();
    }, []);

    const getFilteredOrders = (status) => {
        console.log("Fetched statusOrders:", orders.status)
        if (status === "all") return orders.filter((o) => o.status?.toLowerCase() !== "cancelled");
        return orders.filter((order) => order.status?.toLowerCase() === status);

    };

    const getStatusCounts = () => ({
        all: orders.filter((o) => o.status?.toLowerCase() !== "cancelled").length,
        pending: orders.filter((o) => o.status?.toLowerCase() === "pending").length,
        shipping: orders.filter((o) => o.status?.toLowerCase() === "shipping").length,
        processing: orders.filter((o) => o.status?.toLowerCase() === "processing").length,
        completed: orders.filter((o) => o.status?.toLowerCase() === "completed").length,
    });

    const updateOrderStatus = async (orderId, data, actionType) => {
        setLoadingUpdateId(orderId);

        // ผู้ซื้อสามารถอัปเดตเป็น 'completed' ได้เท่านั้น
        if (actionType !== "completed") {
            setLoadingUpdateId(null);
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/orders/${orderId}/confirm`,
                {},
                { withCredentials: true }
            );

            
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
                    product_id: reviewData.productID,
                    rating: parseInt(reviewData.rating),
                    comment: reviewData.comment,
                },
                { withCredentials: true }
            );
            const reviewsRes = await axios.get(`http://localhost:8080/api/reviews/my-reviews`, {
                withCredentials: true,
            });
            setUserReviews(reviewsRes.data || []);
            alert("Review submitted successfully");
        } catch (error) {
            console.error("Failed to submit review", error);
            alert("Failed to submit review");
        }
    };

    const counts = getStatusCounts();

    const tabs = [
        { id: "all", label: `All (${counts.all})` },
        { id: "pending", label: `pending (${counts.pending})` },
        { id: "shipping", label: `shipping (${counts.shipping})` },
        { id: "processing", label: `processing (${counts.processing})` },
        { id: "completed", label: `completed (${counts.completed})` },
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
                                    key={order.id}
                                    order={order}
                                    userReviews={userReviews}
                                    loading={loadingUpdateId === order.id}
                                    onComplete={() => handleConfirmReceipt(order.id)}
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
