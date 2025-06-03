import React, { useState } from "react";
import axios from "axios";

// Star Component
const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "#ffc107" : "#e4e5e9"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-6 h-6 cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557L3.041 10.385a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  shipping: "bg-blue-200 text-blue-800",
  processing: "bg-purple-200 text-purple-800",
  completed: "bg-green-200 text-green-800",
};

export default function PurchaseCard({
  order,
  onConfirm,
  onReview,
  loading,
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewClick = () => {
    setShowReviewForm(true);
  };

  const handleSubmitReview = async () => {
    if (rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5 stars.");
      return;
    }
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      await onReview(order.id, {
        productID: order.items[0]?.item?.id,
        rating,
        comment,
      });

      alert("Thank you for your review!");
      setShowReviewForm(false);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i + 1} filled={i + 1 <= rating} onClick={() => setRating(i + 1)} />
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full transition hover:shadow-lg flex flex-col">
      {/* Status Header */}
      <div
        className={`flex justify-end px-4 py-2 ${
          statusColors[order.status] || "bg-gray-100 text-gray-700"
        }`}
      >
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white shadow-sm">
          {order.status.toUpperCase()}
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4 p-4">
        {order.items.map((itemWrapper, index) => (
          <div key={index} className="flex gap-4 items-center">
            <img
              src={itemWrapper.item?.product_image?.[0] || "/images/placeholder.png"}
              alt={itemWrapper.item?.name || "Product"}
              className="w-20 h-20 rounded-xl object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {itemWrapper.item?.name || "No Name"}
              </h3>
              <p className="text-sm text-gray-500">฿ {itemWrapper.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Info */}
      <div className="px-4 pb-2 text-sm text-gray-600">
        {order.trackingNumber && (
          <p>
            Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
          </p>
        )}
        {order.shippingService && (
          <p>
            Service: <span className="font-mono">{order.shippingService}</span>
          </p>
        )}
      </div>

      {/* Total */}
      <div className="px-4 pb-4 flex justify-end">
        <p className="text-sm text-gray-500">
          Order Total:{" "}
          <span className="text-red-500 text-lg font-bold">฿ {order.total}</span>
        </p>
      </div>

      {/* Actions */}
      {(order.status === "processing" || order.status === "completed") && (
        <>
          <hr className="border-gray-300 mx-4" />
          <div className="px-4 py-3 flex gap-2 justify-end">
            {order.status === "processing" && (
              <button
                onClick={() => onConfirm(order.id)}
                disabled={loading}
                className={`text-white text-sm font-medium px-4 py-1 rounded-lg ${
                  loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading ? "Loading..." : "Confirm Receipt"}
              </button>
            )}
            {order.status === "completed" && (
              <button
                onClick={handleReviewClick}
                disabled={loading}
                className={`text-white text-sm font-medium px-4 py-1 rounded-lg ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Loading..." : "Review Product"}
              </button>
            )}
          </div>
        </>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative">
            <div className="bg-purple-600 rounded-t-3xl px-6 py-3 flex items-center justify-between">
              <h1 className="text-white text-lg font-semibold uppercase tracking-wide">
                Review Product
              </h1>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-gray-300 hover:text-gray-100 text-xl font-bold"
                aria-label="Close"
                disabled={loading}
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReview();
              }}
              className="space-y-5 px-6 py-6 text-sm text-gray-700"
            >
              <div>
                <h4 className="text-gray-600 font-semibold mb-2">Rating</h4>
                <div className="flex space-x-1">{renderStars()}</div>
              </div>

              <div>
                <h4 className="text-gray-600 font-semibold mb-2">Comment</h4>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none text-sm"
                  placeholder="Write your review here..."
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  disabled={loading}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
