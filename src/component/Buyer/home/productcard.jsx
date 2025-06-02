import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";// ใช้สำหรับถอดรหัส JWT
export default function ProductCard({ product_id, name, price, image }) {
  const navigate = useNavigate();

  const [user_id, setUserId] = useState(null);
  const [liked, setLiked] = useState(false);

  // ดึงข้อมูลสถานะไลค์จากฐานข้อมูลเมื่อ component ถูกโหลด
  useEffect(() => {
    // ดึง JWT token จาก cookies
    const token = Cookies.get("token");  
    if (token) {
      try {
        const decoded = jwt_decode(token);  
        setUserId(decoded.user_id);  
        
        // ตรวจสอบสถานะการไลค์สินค้า
        axios.get(`http://localhost:8080/api/user/favorites/status/${product_id}`, {
          withCredentials: true,
        })
        .then(response => {
          setLiked(response.data.liked);  // ตั้งค่า liked ตามสถานะจากฐานข้อมูล
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
      // ส่งคำขอไปที่ backend เพื่อเพิ่มหรือยกเลิกไลค์
      await axios.post(
        `http://localhost:8080/api/user/favorites/${product_id}`,
        {},
        { withCredentials: true }
      );
      setLiked(!liked);  // อัปเดตสถานะ liked หลังจากคลิก
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