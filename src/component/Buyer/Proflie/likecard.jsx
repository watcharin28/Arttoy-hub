import React from "react";

export default function LikeCard({ product_id, name, price, image, onDelete }) {
  return (
    <div
      id={`product-${product_id}`}
      className="bg-white rounded-xl shadow flex items-center p-4 w-full"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-md"
      />

      <div className="flex-1 ml-4 flex flex-col justify-between h-24">
        <h3 className="text-lg font-bold text-black">{name}</h3>

        <div className="flex justify-between items-center mt-auto">
          <p className="text-red-500 font-bold text-sm">฿{price}</p>
          <button
            onClick={() => onDelete(product_id)}
            className="text-gray-600 text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
