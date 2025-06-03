import React from "react";
import { useNavigate } from "react-router-dom";

export default function LikeCard({ product_id, name, price, image, category, type, onDelete }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div
      id={`product-${product_id}`}
      className="bg-white rounded-xl  border shadow flex items-center p-4 w-full relative"
    >
      {/* ปุ่มลบ */}
      <button
        onClick={() => onDelete(product_id)}
        className="absolute top-2 right-2 text-red-600 p-1 rounded hover:text-bold"
        aria-label="Remove from favorites"
        title="Remove from favorites"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7L5 7M6 7L6 19a2 2 0 002 2h8a2 2 0 002-2L18 7M10 11v6M14 11v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
          />
        </svg>
      </button>

      {/* รูปภาพสินค้า (คลิกได้) */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-md border border-gray-200 cursor-pointer"
        onClick={handleViewDetail}
      />

      {/* รายละเอียดสินค้า */}
      <div className="flex-1 ml-4 flex flex-col justify-between h-24 cursor-pointer" onClick={handleViewDetail}>
        <h3 className="text-lg font-bold text-black">{name}</h3>

        <div className="flex gap-2 flex-wrap">
          {category && (
            <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium capitalize">
              {category}
            </span>
          )}
          {type && (
            <span className="border border-indigo-500 text-indigo-600 px-2 py-0.5 rounded text-xs font-medium capitalize">
              {type === "checked_with_card" ? "Checked with Card" : type}
            </span>
          )}
        </div>

        <p className="text-rose-500 font-bold text-sm mt-auto">฿{price}</p>
      </div>
    </div>
  );
}
