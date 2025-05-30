import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    //ดึง Api

    const groupedBySeller = items.reduce((acc, item) => {
        if (!acc[item.seller_name]) {
            acc[item.seller_name] = [];
        }
        acc[item.seller_name].push(item);
        return acc;
    }, {});

    const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const shippingFee = 40;
    const total = subtotal + shippingFee;

    return (
        <div className="min-h-screen">
            <header className="bg-white shadow-sm border-b w-full">
                <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
                    <button
                        onClick={() => navigate("/product/1")} // ตัวอย่างเปลี่ยน {id} เป็น 1
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
                    <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
                    <div style={{ width: 48 }}></div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* คอลัมน์ซ้าย */}
                <div className="space-y-3 col-span-3">
                    <div className="bg-white rounded-xl shadow p-10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">Products Ordered</h2>
                        {Object.entries(groupedBySeller).map(([sellerName, sellerItems]) => (
                            <div key={sellerName} className="bg-gray-100 border border-gray-200 rounded-xl p-5 mb-4">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
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
                                    {sellerName}
                                </h2>
                                {sellerItems.map(item => (
                                    <div key={item.id} className="bg-white flex items-center space-x-4 mb-4 p-4 rounded-md shadow-sm">
                                        <img
                                            src={item.item?.product_image?.[0] || "/images/placeholder.png"}
                                            alt={item.item?.name || "Product image"}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1 flex flex-col justify-between h-20">
                                            <p className="text-base font-medium">{item.name}</p>
                                            <p className="text-gray-600 text-base mt-auto">฿{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* คอลัมน์ขวา */}
                <div className="space-y-3 col-span-2">
                    <div className="bg-white shadow rounded-xl overflow-hidden">
                        {/* แถบไปรษณีย์ด้านบน */}
                        <div
                            className="h-3 w-full"
                            style={{
                                backgroundImage:
                                    'repeating-linear-gradient(45deg, #ef4444 0 10px, #ffffff 10px 20px, #3b82f6 20px 30px, #ffffff 30px 40px)',
                            }}
                        />

                        {/* เนื้อหาการ์ด */}
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
                            <div className="text-gray-700">
                                <p className="font-medium">{Address.name}</p>
                                <p className="text-sm">{Address.phone}</p>
                                <p className="text-sm mt-2">
                                    {Address.address}{Address.subdistrict} {Address.district} {Address.province} {Address.zipcode}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Standard delivery</p>
                                <p className="text-sm text-gray-600">Ships within 1–4 business days</p>
                            </div>
                            <p className="font-medium">฿40</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                                    />
                                </svg>
                                <div>
                                    <p className="font-medium">Bank Transfer</p>
                                    <p className="text-sm text-gray-600">Pay via QR code</p>
                                </div>
                            </div>
                            <p className="text-sm text-red-500">Only</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <div className="flex justify-between">
                            <span>Merchandise Subtotal</span>
                            <span>฿{subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span>฿{shippingFee}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>฿{total}</span>
                        </div>
                        <button
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded"
                            onClick={() => setShowPaymentModal(true)}
                        >
                            Continue to Payment ฿{total}
                        </button>
                    </div>
                </div>
            </main>

            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                        <div className="text-center mb-6">
                            <div className="w-48 h-48 mx-auto border-2 border-gray-300 rounded flex items-center justify-center">
                                <img src="/images/Qr.png" alt="Payment QR Code" />
                            </div>
                            <p className="text-sm text-gray-600 mt-3">QR Code: Payment QR002</p>
                            <p className="text-xs text-gray-500">Business Owner Name</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span>Total Payment</span>
                            <span className="font-bold">฿{total}</span>
                        </div>
                        <button
                            onClick={() => {
                                setShowPaymentModal(false);
                                alert("Payment processed successfully");
                            }}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
