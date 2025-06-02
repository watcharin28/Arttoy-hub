import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../home/productcard';

const sellers = [
  {
    id: '1',
    name: 'Spicy Som Tum Shop',
    image: '/images/NationalCard.png',
    rating: 4.8,
    phone: '081-234-5678',
  },
  {
    id: '2',
    name: 'Cozy Cafe',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    phone: '089-765-4321',
  },
];

const items = [
  {
    id: '1',
    name: 'Som Tum Thai',
    description: 'Delicious Thai papaya salad with balanced sweet and sour taste',
    price: 50,
    category: 'spicy',
    sellerId: '1',
    image: '/images/NationalCard.png',
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
    sellerId: '1',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    description: 'Smooth chocolate cake with less sweetness',
    price: 90,
    category: 'dessert',
    sellerId: '1',
    image: 'https://images.unsplash.com/photo-1559628231-79e0aa788433?auto=format&fit=crop&w=600&q=80',
  },
];

const StoreDetail = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const seller = sellers.find((s) => s.id === storeId);
  const sellerItems = items.filter((item) => item.sellerId === seller?.id);

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm border-b w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
            <button onClick={() => navigate("/")} className="flex items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Seller</h1>
            <div style={{ width: 48 }}></div>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center px-6">
          <p className="text-gray-500 text-lg">Seller Not Found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
          <button onClick={() => navigate("/")} className="flex items-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">{seller.name}</h1>
          <div style={{ width: 48 }}></div>
        </div>
      </header>
        <main className="max-w-7xl mx-auto px-20 py-10 pb-48 bg-white">
        <div className="bg-white rounded-md shadow border mb-8 md:flex">
          <img
            src={seller.image}
            alt={seller.name}
            className="w-full md:w-1/3 h-64 md:h-auto object-cover rounded-l-md"
          />
          <div className="p-6 md:w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{seller.name}</h2>
              <div className="flex items-center space-x-1 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.152c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.54-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.028 9.372c-.783-.57-.38-1.81.588-1.81h4.152a1 1 0 00.95-.69l1.286-3.945z" />
                </svg>
                <span className="font-semibold">{seller.rating}</span>
              </div>
              <p className="text-gray-600 mt-2">
                All Art Toy : {sellerItems.length}
              </p>
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-2xl font-bold mb-4">Art Toys</h3>
          {sellerItems.length === 0 ? (
            <p className="text-gray-600">No items available from this seller.</p>
          ) : (
     <div className="grid grid-cols-4 gap-3 flex justify-center">
              {sellerItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product_id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StoreDetail;
