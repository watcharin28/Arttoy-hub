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
        <div className="bg-white rounded-md shadow border mb-8 p-6">
          <h2 className="text-3xl font-bold mb-2 flex justufy-center"><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>{seller.name}</h2>
          <div className="flex items-center space-x-1 mb-1 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 mr-1">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.152c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.54-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.028 9.372c-.783-.57-.38-1.81.588-1.81h4.152a1 1 0 00.95-.69l1.286-3.945z" />
            </svg>
            <span className="text-gray-700">Rating: {seller.rating}</span>
          </div>
          <p className="text-gray-700 flex item-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
            All Art Toy: {sellerItems.length}</p>
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
