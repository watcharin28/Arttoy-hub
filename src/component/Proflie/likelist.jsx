import { useEffect, useState } from "react";
import axios from "axios";
import LikeCard from "./LikeCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LikeList() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const user_id = Cookies.get("user_id");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${user_id}/favorites`);
        setFavorites(response.data); 
      } catch (err) {
        console.error("Error loading favorite products:", err);
        setError("Unable to load your favorite products");
      }
    };

    fetchFavoriteProducts();
  }, [user_id, navigate]);


  const handleDelete = async (product_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${user_id}/favorites/${product_id}`);
      setFavorites(favorites.filter(item => item.product_id !== product_id)); 
    } catch (err) {
      console.error("Error deleting favorite product:", err);
      setError("Unable to remove product from favorites");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Like</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex flex-col gap-4">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <LikeCard
              key={item.product_id} 
              product_id={item.product_id}
              name={item.name}
              price={item.price}
              image={item.image}
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <p className="text-gray-500">You have no favorite product yet.</p>
        )}
      </div>
    </div>
  );
}
