import { useEffect, useState } from "react";
import ProductCard from "./productcard";
import axios from 'axios';
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        // console.log(response.data)
        setProducts(response.data);
      } catch (err) {
        console.error("Error occurred!", err);
        setError("Unable to load products data.");
      }
    };

    fetchProducts();
  }, );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">You Might Be Interested In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((item) => (
          <ProductCard
            key={item.id} // เปลี่ยนจาก id เป็น product_id
            product_id={item.id} // ส่ง product_id
            name={item.name}
            price={item.price}
            image={item.product_image}
          />
        ))}
      </div>
    </div>
  );
}
