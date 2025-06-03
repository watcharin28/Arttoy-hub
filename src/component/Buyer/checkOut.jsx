import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [items, setItems] = useState(location.state?.items || []);
    const [address, setAddress] = useState(null);
    const [qrImage, setQrImage] = useState("");
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/user/addresses", {
                    withCredentials: true,
                });

                const addresses = res.data.addresses || [];
                const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
                if (defaultAddr) setAddress(defaultAddr);
            } catch (error) {
                console.error("Error loading address", error);
            }
        };

        fetchAddress();
    }, []);

    const groupedBySeller = items.reduce((acc, item) => {
        const sellerName = item.seller_name || item.product?.seller || "Unknown Seller";
        if (!acc[sellerName]) acc[sellerName] = [];
        acc[sellerName].push(item);
        return acc;
    }, {});

    const subtotal = items.reduce(
        (sum, item) => sum + (item.price || item.product?.price || 0) * (item.quantity || 1),
        0
    );
    const shippingFee = 40;
    const total = subtotal + shippingFee;
    console.log("Address object being sent:", address);
    console.log(items)
    const handlePayment = async () => {
        const payloadItems = items.map(i => ({
            id: i.item.id, 
            quantity: i.quantity || 1,
        }));
        console.log("Items being sent:", payloadItems);

        try {
            console.log("PAYLOAD", {
                items: payloadItems,
                address_id: address.id
            });
            const res = await axios.post("http://localhost:8080/api/orders/qr", {
                items: payloadItems,
                address_id: address.id
            }, {
                withCredentials: true,
            });
            setOrderId(res.data.order_id);
            setQrImage(res.data.qr_image);
            setShowPaymentModal(true);
        } catch (err) {
            console.error("Create order failed:", err.response?.data || err.message);
        }
    };

    const handleConfirmPayment = async () => {
        try {
            await axios.post(`http://localhost:8080/api/orders/${orderId}/mark-paid`, {}, {
                withCredentials: true,
            });
            alert("Payment confirmed!");
            navigate("/orders");
        } catch (err) {
            console.error("Failed to mark as paid", err);
            alert("Confirm failed.");
        }
    };

    return (
        <div className="min-h-screen">
            <header className="bg-white shadow-sm border-b w-full">
                <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
                    <button onClick={() => navigate(-1)} className="flex items-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
                    <div style={{ width: 48 }}></div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="space-y-3 col-span-3">
                    <div className="bg-white rounded-xl shadow p-10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">Products Ordered</h2>
                        {Object.entries(groupedBySeller).map(([sellerName, sellerItems]) => (
                            <div key={sellerName} className="bg-gray-100 border border-gray-200 rounded-xl p-5 mb-4">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">{sellerName}</h2>
                                {sellerItems.map(item => (
                                    <div key={item._id || item.id} className="bg-white flex items-center space-x-4 mb-4 p-4 rounded-md shadow-sm">
                                        <img
                                            src={item.product?.image || item.item?.product_image || item.image || "/images/placeholder.png"}
                                            alt={item.name || item.product?.name || "Item"}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1 flex flex-col justify-between h-20">
                                            <p className="text-base font-medium">{item.name || item.product?.name}</p>
                                            <p className="text-gray-600 text-base mt-auto">฿{(item.price || item.product?.price || 0).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 col-span-2">
                    <div className="bg-white shadow rounded-xl overflow-hidden">
                        <div className="h-3 w-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0 10px, #ffffff 10px 20px, #3b82f6 20px 30px, #ffffff 30px 40px)' }} />
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
                            {address ? (
                                <div className="text-gray-700">
                                    <p className="font-medium">{address.name}</p>
                                    <p className="text-sm">{address.phone}</p>
                                    <p className="text-sm mt-2">{address.address} {address.subdistrict} {address.district} {address.province} {address.zipcode}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-red-500">No address available</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Standard delivery</p>
                                <p className="text-sm text-gray-600">Ships within 1–4 business days</p>
                            </div>
                            <p className="font-medium">฿{shippingFee}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875h4.5v4.5h-4.5zM3.75 14.625h4.5v4.5h-4.5zM13.5 4.875h4.5v4.5h-4.5z" />
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
                        <div className="flex justify-between"><span>Merchandise Subtotal</span><span>฿{subtotal.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>Shipping Fee</span><span>฿{shippingFee}</span></div>
                        <hr />
                        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>฿{total.toLocaleString()}</span></div>
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded" onClick={handlePayment}>
                            Continue to Payment ฿{total.toLocaleString()}
                        </button>
                    </div>
                </div>
            </main>

            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                        <button onClick={() => setShowPaymentModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                        <div className="text-center mb-6">
                            <div className="w-48 h-48 mx-auto border-2 border-gray-300 rounded flex items-center justify-center">
                                <img src={qrImage || "/images/Qr.png"} alt="Payment QR Code" />
                            </div>
                            <p className="text-sm text-gray-600 mt-3">Scan the QR Code above to pay</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span>Total Payment</span>
                            <span className="font-bold">฿{total.toLocaleString()}</span>
                        </div>
                        <button onClick={handleConfirmPayment} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded">
                            Confirm Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;