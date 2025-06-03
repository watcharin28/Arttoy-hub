// import { useEffect, useState } from "react";
// import axios from "axios";
// import LikeCard from "./likecard";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// export default function LikeList() {
//   const [favorites, setFavorites] = useState([]);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFavoriteProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/user/favorites", {
//           withCredentials: true,
//         });
//         console.log(response.data);
//         setFavorites(response.data); // เซ็ต favorites ด้วยข้อมูลที่ได้จาก API
//       } catch (err) {
//         console.error("Error loading favorite products:", err);
//         setError("Unable to load your favorite products");
//       }
//     };

//     fetchFavoriteProducts();
//   }, [navigate]);

//   const handleDelete = async (product_id) => {
//     try {
//       if (!product_id) {
//         console.error("Invalid product ID");
//         return;
//       }
      
//       // ลบสินค้าจากรายการโปรดผ่าน API
//       await axios.delete(`http://localhost:8080/api/user/favorites/${product_id}`, {
//         withCredentials: true, 
//       });
//       const response = await axios.get("http://localhost:8080/api/user/favorites", {
//         withCredentials: true, 
//       });
//       // อัปเดต favorites หลังจากลบสินค้าออก
//       setFavorites(response.data);
//     } catch (err) {
//       console.error("Error deleting favorite product:", err);
//       setError("Unable to remove product from favorites");
//     }
//   };

//   return (
//       <div className="px-12 py-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">My Like</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <div className="flex flex-col gap-4">
//         {favorites && Array.isArray(favorites) && favorites.length > 0 ? (
//           favorites.map((item) => (
//             <LikeCard
//               key={item.id} // หรือใช้ item.product_id ถ้าใช้ชื่อเดียวกัน
//               product_id={item.id} // ใช้ชื่อ id หรือ product_id ขึ้นอยู่กับ API
//               name={item.name}
//               price={item.price}
//               image={item.product_image?.[0]}
//               category={item.category}
//               type={item.type}
//               onDelete={handleDelete} 
//             />
//           ))
//         ) : (
//           <p className="text-gray-500">You have no favorite products yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import LikeCard from "./likecard";

export default function LikeList() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // MOCK DATA ใช้แทนการดึงจาก backend จริง
  useEffect(() => {
    const mockData = [
      {
        id: "p1",
        name: "Iron Man Mark 85",
        price: 1990,
        product_image: ["/images/NationalCard.png"],
        category: "Action Figure",
        type: "checked_with_card",
      },
      {
        id: "p2",
        name: "Luffy Gear 5",
        price: 1250,
        product_image: ["https://via.placeholder.com/300x200?text=Luffy"],
        category: "Anime",
        type: "unseal",
      },
      {
        id: "p3",
        name: "Batman Limited Edition",
        price: 2500,
        product_image: ["https://via.placeholder.com/300x200?text=Batman"],
        category: "Collector",
        type: "checked_with_card",
      },
    ];

    setFavorites(mockData);
  }, []);

  const handleDelete = (product_id) => {
    if (!product_id) {
      console.error("Invalid product ID");
      return;
    }

    // ลบจาก state mock
    const updated = favorites.filter((item) => item.id !== product_id);
    setFavorites(updated);
  };

  return (
    <div className="px-12 py-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Like</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex flex-col gap-4">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <LikeCard
              key={item.id}
              product_id={item.id}
              name={item.name}
              price={item.price}
              image={item.product_image?.[0]}
              category={item.category}
              type={item.type}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">You have no favorite products yet.</p>
        )}
      </div>
    </div>
  );
}
