import { useEffect, useState } from "react";
import ProductCard from "./productcard";
import axios from "axios";

export default function ProductList({ searchResults, keyword = "", category, isSearching = false }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        console.log('API_URL:', API_URL);
        console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
        // const response = await axios.get("http://localhost:8080/api/products");
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
    <div className="flex justify-center px-32 py-12">
      <div className="w-full min-w-7xl">
        <h2 className="text-xl font-bold mb-4 flex justify-start">
          {isSearching ? (
            keyword ? (
              <>Search results for "<span className="text-violet-600">{keyword}</span>"</>
            ) : category ? (
              <>Showing category "<span className="text-violet-600">{category}</span>"</>
            ) : (
              <>Showing all products</>
            )
          ) : (
            "You Might Be Interested In"
          )}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {noResult && (
            <p className="text-gray-500 mt-4 col-span-full text-center">
              {keyword ? (
                <>No products found for "<span className="text-violet-600">{keyword}</span>"</>
              ) : category ? (
                <>No products found in "<span className="text-violet-600">{category}</span>"</>
              ) : (
                <>No products found.</>
              )}
            </p>
          )}

          {!noResult &&
            Array.isArray(displayProducts) &&
            displayProducts.map((item) => (
              <ProductCard
                key={item.id}
                product_id={item.id}
                name={item.name}
                price={item.price}
                image={item.product_image}
                category={item.category}
                model={item.model}
                type={item.type}
              />
            ))}
        </div>
      </div>
    </div>

  );
}

