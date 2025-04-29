import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProductCard({ product_id, name, price, image }) {
  const navigate = useNavigate();

  const user_id = Cookies.get("user_id");
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!user_id) {
      alert("Please login to like the product");
      return; 
    }

    try {
      await axios.post(`http://localhost:3000/api/users/${user_id}/favorites`, {
        productId: product_id,
      });
      setLiked(true); 
    } catch (err) {
      console.error("Failed to like product:", err);
      alert("An error occurred while liking the product");
    }
  };

  const handleViewDetail = () => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div className="relative border rounded-xl shadow-md  w-64">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-md mb-2 cursor-pointer"
        onClick={handleViewDetail}
      />
      
      <h3 className="font-semibold cursor-pointer px-4" onClick={handleViewDetail}>
        {name}
      </h3>
      <div className="py-6 px-4">
      <p className="text-red-500 font-bold">{price}฿</p>

      <button
         className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
          liked ? "bg-pink-500 text-white" : "bg-gray-200 text-black"
        }`}
        onClick={handleLike}
      >
        {liked ? "♥ " : "♡ "}
      </button>
      </div>
    </div>
  );
}