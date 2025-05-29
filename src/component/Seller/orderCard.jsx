import React, { useState } from "react";

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  shipping: "bg-blue-200 text-blue-800",
  processing: "bg-purple-200 text-purple-800",
  completed: "bg-green-200 text-green-800",
};

export default function OrderCard({ order, onConfirm, onSubmitShipping, loading }) {
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shippingService, setShippingService] = useState("");

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    if (!trackingNumber || !shippingService) {
      alert("Please enter the tracking number and shipping service");
      return;
    }
    onSubmitShipping(order.id, { trackingNumber, shippingService });
    setShowShippingForm(false);
    setTrackingNumber("");
    setShippingService("");
  };

  const hasActionButton = order.status === "pending" || order.status === "shipping";

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full transition hover:shadow-lg flex flex-col">
      {/* Card Header */}
      <div
        className={`flex justify-end px-4 py-2 ${
          statusColors[order.status] || "bg-gray-100 text-gray-700"
        }`}
      >
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white shadow-sm">
          {order.status.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="flex p-4 gap-4 flex-1">
        <img
          src={order.item.image}
          alt={order.item.Name}
          className="w-24 h-24 rounded-xl object-cover border"
        />
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{order.item.Name}</h3>

          <div className="flex flex-col gap-1">
            {order.trackingNumber && (
              <p className="text-sm text-gray-600">
                Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
              </p>
            )}
            {order.shippingService && (
              <p className="text-sm text-gray-600">
                Service: <span className="font-mono">{order.shippingService}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-end">
          <p className="text-sm text-gray-500">
            Order Total:{" "}
            <span className="text-red-500 text-lg font-bold">฿ {order.total}</span>
          </p>
        </div>
      </div>

      {hasActionButton && <hr className="border-gray-300 mx-4" />}

      {hasActionButton && (
        <div className="px-4 py-3 flex gap-2 justify-end">
          {order.status === "pending" && (
            <button
              onClick={() => onConfirm(order.id)}
              disabled={loading}
              className={`text-white text-sm font-medium px-4 py-1 rounded-lg ${
                loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Loading..." : "Confirm Order"}
            </button>
          )}
          {order.status === "shipping" && (
            <button
              onClick={() => setShowShippingForm(true)}
              disabled={loading}
              className={`text-white text-sm font-medium px-4 py-1 rounded-lg ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Enter Tracking Number"}
            </button>
          )}
        </div>
      )}

      {showShippingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative">
            {/* Form Header */}
            <div className="bg-purple-600 rounded-t-3xl px-6 py-3 flex items-center justify-between">
              <h1 className="text-white text-lg font-semibold uppercase tracking-wide">
                Shipping Information
              </h1>
              <button
                onClick={() => setShowShippingForm(false)}
                className="text-gray-300 hover:text-gray-100 text-xl font-bold"
                aria-label="Close"
                disabled={loading}
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmitShipping}
              className="space-y-5 px-6 py-6 text-sm text-gray-700"
            >
              <div>
                <h4 className="text-gray-600 font-semibold mb-2">Tracking Number</h4>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none text-sm"
                  autoFocus
                  disabled={loading}
                />
              </div>

              <div>
                <h4 className="text-gray-600 font-semibold mb-1 mt-4">Shipping Service</h4>
                <select
                  value={shippingService}
                  onChange={(e) => setShippingService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none text-sm cursor-pointer"
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select Shipping Service
                  </option>
                  <option value="Kerry">Kerry</option>
                  <option value="Flash">Flash</option>
                  <option value="J&T">J&T</option>
                  <option value="Thailand Post">Thailand Post</option>
                  <option value="Ninja Van">Ninja Van</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 rounded-lg font-semibold text-sm transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
