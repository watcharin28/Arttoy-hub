import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductList({ searchResults }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // ใช้ useEffect เพื่อดึงข้อมูลสินค้าทั้งหมด
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error occurred!", err);
        setError("Unable to load products data.");
      }
    };

    fetchProducts();
  }, []);

  // กำหนดว่าจะใช้ผลลัพธ์จากการค้นหาหรือสินค้าทั้งหมด
  const displayProducts = searchResults.length > 0 ? searchResults : products;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
      You Might Be Interested In
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-4 justify-center">
        {displayProducts.length === 0 && !error && (
          <p className="text-gray-500">No products found.</p>
        )}
        {displayProducts.map((item) => (
          <ProductCard
            key={item.id} // ใช้ key ตาม id หรือ product_id
            product_id={item.id} // ส่ง product_id ไปที่ ProductCard
            name={item.name}
            price={item.price}
            image={item.product_image}
          />
        ))}
      </div>
    </div>
  );
}
