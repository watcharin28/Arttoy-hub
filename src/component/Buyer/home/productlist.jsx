import { useEffect, useState } from "react";
import ProductCard from "./productcard";
import axios from "axios";

export default function ProductList({ searchResults, keyword = "", isSearching = false }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  const safeResults = Array.isArray(searchResults) ? searchResults : [];

  const noResult = isSearching && safeResults.length === 0;

  const displayProducts = isSearching ? safeResults : products;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ">
        {isSearching
          ? <>Search results for "<span className="text-violet-600">{keyword}</span>"</>
          : "You Might Be Interested In"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-4 justify-center">
        {noResult && (
          <p className="text-gray-500 mt-4 w-full text-center">
            No products found for "{keyword}"
          </p>
        )}

        {!noResult && Array.isArray(displayProducts) &&
          displayProducts.map((item) => (
            <ProductCard
              key={item.id}
              product_id={item.id}
              name={item.name}
              price={item.price}
              image={item.product_image}
            />
          ))}
      </div>
    </div>
  );
}
