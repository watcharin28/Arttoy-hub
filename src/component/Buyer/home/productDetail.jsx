import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Star = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557L3.041 10.385a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

const ProductDetail = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [userId, setUserId] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${API_URL}/api/products/${product_id}`,
          { withCredentials: true }
        );
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Error loading product", err);
        setError("Unable to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserId(decoded.user_id);


        axios
          .get(
            `${API_URL}/api/user/favorites/status/${product_id}`,
            { withCredentials: true }
          )
          .then((response) => {
            setIsLiked(response.data.liked);
          })
          .catch((err) => {
            console.error("Error fetching like status", err);
          });
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [product_id]);

  const handleLike = async () => {
    if (!userId) {
      alert("Please log in to like.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/user/favorites/${product_id}`,
        {},
        { withCredentials: true }
      );
      setIsLiked((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle like:", err);
      alert("Error occurred. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }
   try {
      setAddingToCart(true);

      const res = await axios.get(`${API_URL}/api/cart`, { withCredentials: true });
      const cartItems = res.data.cart || [];

      const alreadyInCart = cartItems.some(item => item.product_id === product_id);
      if (alreadyInCart) {
        alert("This product is already in your cart.");
        return;
      }

      await axios.post(
        `${API_URL}/api/cart/add`,
        {
          product_id: product_id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      alert("Added product to cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Error adding the item to your cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };


    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading product...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      );
    }

    if (!product) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3">
          <p>Product not found</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      );
    }

    const isSeller = userId === product.seller?.id;

    const renderStars = (rating, size = "h-4 w-4") => {
      const roundedRating = Math.round(rating);
      return (
        <div className="flex items-center space-x-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`${size} ${star <= roundedRating ? "text-yellow-400" : "text-gray-300"
                }`}
            />
          ))}
        </div>
      );
    };

    return (
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
            <button
              onClick={() => navigate("/")}
              className="flex items-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="ml-1">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Product Detail</h1>
            <div style={{ width: 48 }}></div> {/* placeholder */}
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white max-w-7xl mx-auto px-6 lg:px-20 py-12">
          <main className="flex flex-col md:flex-row gap-10">
            {/* Left: Image Gallery */}
            <section className="md:w-1/2 flex flex-col gap-4 relative">
              {/* Main Image */}
              <div className="relative w-full rounded-lg overflow-hidden border border-gray-300 shadow-md aspect-[4/3]">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} - image ${selectedImageIndex + 1}`}
                  className="object-cover w-full h-full"
                />
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-1"
                  aria-label="Previous Image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* Next Button */}
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-1"
                  aria-label="Next Image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto pt-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`rounded border-2 ${idx === selectedImageIndex
                      ? "border-indigo-500"
                      : "border-transparent hover:border-gray-400"
                      } focus:outline-none`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Right: Product Info */}
            <section className="md:w-1/2 flex flex-col gap-4">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h2>

              {/* Category and Type */}
              <div className="flex gap-2 flex-wrap">
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold capitalize">
                  {product.category}
                </span>
                <span className="border border-indigo-500 text-indigo-600 px-2 py-1 rounded text-sm font-semibold capitalize">
                  {product.type === "checked_with_card"
                    ? "Checked with Card"
                    : "Unseal"}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {renderStars(product.rating, "h-5 w-5")}
                <span className="text-gray-600 text-sm font-medium">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ฿{product.price.toFixed(2)}
              </p>

              {/* Like & Buttons */}
              <div className="flex items-center gap-4 mt-4 pr-4">
                {!isSeller && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike();
                    }}
                    aria-label={isLiked ? "Unlike product" : "Like product"}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-3xl ${isLiked
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-black"
                      }`}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isLiked ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                )}

                {!isSeller && (
                  <>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className="flex-1 bg-black text-white font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      {addingToCart ? "กำลังเพิ่ม..." : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!userId) {
                          alert("Please login before purchasing.");
                          navigate("/login");
                          return;
                        }

                        navigate("/checkout", {
                          state: {
                            items: [
                              {
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                seller_name: product.seller.name,
                                item: product,
                                quantity: 1,
                              },
                            ],
                          },
                        });
                      }}
                      className="flex-1 bg-yellow-500 text-black font-semibold py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Buy Now
                    </button>
                  </>
                )}
              </div>
            </section>
          </main>

          {/* Description Section */}
          <div className="mt-6 w-full bg-gray-100 rounded-md p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-black mb-4 text-xl">
                Product Description
              </h3>
              <p className="text-gray-900 mb-2 text-lg font-medium">
                {product.description}
              </p>
              <div className="mt-2 text-gray-700 space-y-2">
                <div className="flex items-center">
                  <span className="w-24 text-base text-gray-500">Category</span>
                  <span className="text-lg font-medium text-black">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-base text-gray-500">Type</span>
                  <span className="text-lg font-medium text-black">
                    {product.type === "checked_with_card"
                      ? "Checked with Card"
                      : "Unseal"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-base text-gray-500">Color</span>
                  <span className="text-lg font-medium text-black">
                    {product.color}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-base text-gray-500">Size</span>
                  <span className="text-lg font-medium text-black">
                    {product.size}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Section */}
          <div className="mt-6 w-full bg-gray-100 rounded-md p-6 shadow-sm">
            <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
              {product.seller.name}
              {renderStars(product.rating, "h-5 w-5")}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm font-medium">
                  Rating :
                  <span className="text-lg font-medium ml-2 text-black">
                    {product.rating.toFixed(1)}
                  </span>
                </span>
              </div>
              <button
                onClick={() => {
                  navigate(`/seller-store/${product.seller.id}`);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
              >
                View Seller
              </button>
            </div>
          </div>

          {/* Reviews Carousel */}
          <div className="mt-6 w-full bg-gray-100 rounded-md p-4 shadow-sm">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border p-4 rounded-lg shadow-sm bg-white w-80 h-96 flex-shrink-0 relative flex flex-col items-center justify-center text-center"
                >
                  <img
                    src={review.profileImage}
                    alt={`${review.userName} avatar`}
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <span className="font-semibold text-gray-800 mb-1">
                    {review.userName}
                  </span>
                  <div className="mb-2">{renderStars(review.rating)}</div>
                  <p className="text-base text-gray-700 mb-3 px-2">
                    "{review.comment}"
                  </p>
                  <span className="absolute bottom-2 right-3 text-gray-500 text-xs">
                    {new Date(review.date).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Bangkok",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductDetail;
