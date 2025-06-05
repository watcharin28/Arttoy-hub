import Header from "../component/Seller/header";
import ShippingDetail from "../component/Seller/shippingDetail";




export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <ShippingDetail/>


    </div>
  );
}