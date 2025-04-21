import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error occurred!", err);
        setError("Unable to load products data.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">You Might Be Interested In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((item) => (
          <ProductCard
            key={item.product_id} // เปลี่ยนจาก id เป็น product_id
            product_id={item.product_id} // ส่ง product_id
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
