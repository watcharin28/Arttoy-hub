import React from "react";

export default function MyProductCard({ product_id, name, price, image, description, onDelete, onEdit, onViewMore }) {
    return (
        <div
            id={`product-${product_id}`}
            className="bg-white rounded-xl shadow flex items-center p-4 w-full relative"
        >
            <div className="absolute top-2 right-2 flex space-x-1">
                <button
                    onClick={() => onEdit(product_id)}
                    className="text-blue-600 p-1 rounded hover:bg-blue-100"
                    aria-label="Edit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(product_id)}
                    className="text-red-600 p-1 rounded hover:bg-red-100"
                    aria-label="Delete"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7L5 7M6 7L6 19a2 2 0 002 2h8a2 2 0 002-2L18 7M10 11v6M14 11v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                    </svg>
                </button>
            </div>

            <img
                src={image}
                alt={name}
                className="w-24 h-24 object-cover rounded-md"
            />

            <div className="flex-1 ml-4 flex flex-col justify-between h-24">
                <h3 className="text-lg font-bold text-black">{name}</h3>
                <p className="text-gray-600 text-sm truncate">{description}</p>

                <div className="flex justify-between items-center mt-auto">
                    <p className="text-red-500 font-bold text-sm">{`฿${price}`}</p>
                    <button
                        onClick={() => onViewMore(product_id)}
                        className="bg-violet-400 text-white text-sm border border-gray-300 px-3 py-1 rounded hover:bg-violet-600"
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
}
