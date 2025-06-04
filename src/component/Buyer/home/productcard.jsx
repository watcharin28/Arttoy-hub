import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default function ProductCard({ product_id, name, price, image, category, model }) {
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;
  const [user_id, setUserId] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserId(decoded.user_id);

        axios.get(`${API_URL}/api/user/favorites/status/${product_id}`, {
          withCredentials: true,
        })
          .then(response => {
            setLiked(response.data.liked);
          })
          .catch(err => {
            console.error("Error fetching like status", err);
          });
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [product_id]);

  const handleLike = async () => {
    if (!user_id) {
      alert("Please login to like the product");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/user/favorites/${product_id}`,
        {},
        { withCredentials: true }
      );
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to like product:", err);
      alert("An error occurred while liking the product");
    }
  };

  const handleViewDetail = () => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div className="relative border rounded-xl shadow-md min-w-64 bg-white">
      <img
        src={image?.[0]}
        alt={name}
        className="w-full h-56 object-cover rounded-t-md mb-2 cursor-pointer"
        onClick={handleViewDetail}
      />
  <div className="px-4">
      <h3 className="font-semibold cursor-pointer" onClick={handleViewDetail}>
        {name}
      </h3>
      <div className="flex gap-2 flex-wrap">
        {category && (
          <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold capitalize">
            {category}
          </span>
        )}
        {model && (
          <span className="border border-indigo-500 text-indigo-600 px-2 py-1 rounded text-sm font-semibold capitalize">
            {model === "checked_with_card" ? "Checked with Card" : model}
          </span>
        )}
      </div>
      </div>

      <div className="py-6 px-4 ml-1">
        <p className="text-red-500 font-bold">{price}฿</p>



        <button
          className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg ${liked ? "bg-pink-500 text-white" : "bg-gray-200 text-black"
            }`}
          onClick={handleLike}
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
