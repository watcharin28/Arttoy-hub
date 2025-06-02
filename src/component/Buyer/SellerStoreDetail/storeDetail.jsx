import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data ร้านค้า
const stores = [
  {
    id: '1',
    name: 'Spicy Som Tum Shop',
    description: 'A super spicy Som Tum shop in this area with a variety of dishes and bold flavors',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    location: 'Sukhumvit Road, Bangkok',
    phone: '081-234-5678',
    openingHours: '10:00 AM - 9:00 PM',
    categories: ['food', 'spicy', 'thai'],
  },
  {
    id: '2',
    name: 'Cozy Cafe',
    description: 'A small cozy coffee shop, perfect for working or relaxing',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    location: 'Thonglor Alley, Bangkok',
    phone: '089-765-4321',
    openingHours: '8:00 AM - 6:00 PM',
    categories: ['beverage', 'coffee', 'dessert'],
  },
];

// Mock data สินค้า เพิ่ม sellerId เชื่อมกับ store.id
const products = [
  {
    id: '1',
    name: 'Som Tum Thai',
    description: 'Delicious Thai papaya salad with a balanced sweet and sour taste',
    price: 50,
    category: 'spicy',
    sellerId: '1',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb22?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Spicy Pork Salad',
    description: 'Intensely flavored spicy pork salad',
    price: 60,
    category: 'spicy',
    sellerId: '1',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Hot Latte',
    description: 'Smooth and creamy hot latte coffee',
    price: 80,
    category: 'coffee',
    sellerId: '2',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    description: 'Smooth chocolate cake with less sweetness',
    price: 90,
    category: 'dessert',
    sellerId: '2',
    image: 'https://images.unsplash.com/photo-1559628231-79e0aa788433?auto=format&fit=crop&w=600&q=80',
  },
];

const StoreDetail = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const store = stores.find((s) => s.id === storeId);
  const storeProducts = products.filter((p) => p.sellerId === store?.id);

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Seller</h1>
            <div style={{ width: 48 }}></div>
          </div>
        </header>

        <main className="flex-grow flex flex-col justify-center items-center px-6">
          <p className="text-gray-500 text-lg mb-48">Seller Not Found</p>
        </main>
      </div>
    );
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const Button = ({ children, onClick, className = '', type = 'button' }) => (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-1 rounded-md transition ${className}`}
    >
      {children}
    </button>
  );

  const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-md shadow border ${className}`}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = '' }) => (
    <div className={`p-4 ${className}`}>{children}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
            <div style={{ width: 48 }}></div>
          </div>
        </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <Card className="mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-64 md:h-full object-cover rounded-l-md"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{store.name}</h2>
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.152c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.54-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.028 9.372c-.783-.57-.38-1.81.588-1.81h4.152a1 1 0 00.95-.69l1.286-3.945z" />
                  </svg>
                  <span className="text-lg font-semibold">{store.rating}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{store.description}</p>
              <div className="space-y-1 text-gray-600">
                <div>Location: {store.location}</div>
                <div>Phone: {store.phone}</div>
                <div>Opening Hours: {store.openingHours}</div>
              </div>
            </div>
          </div>
        </Card>

        <section>
          <h3 className="text-2xl font-bold mb-4">Products</h3>
          {storeProducts.length === 0 ? (
            <p className="text-gray-600">No products available from this store.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {storeProducts.map((product) => (
                <Card key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                  <CardContent>
                    <h4 className="text-xl font-semibold">{product.name}</h4>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="font-bold text-orange-600 mb-4">{product.price} ฿</p>
ล
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StoreDetail;