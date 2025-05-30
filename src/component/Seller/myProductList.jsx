import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyProductCard from "./myProductCard";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  // โหลดสินค้าเมื่อ component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data || []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  // ลบสินค้า
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Failed to delete product");
    }
  };

  // เพิ่มสินค้าใหม่
  const handleAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setAdding(false);
  };

  // แก้ไขสินค้า
  const handleEdited = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  // กดดูรายละเอียดสินค้า เปลี่ยนหน้า
  const handleViewMore = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="px-12 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border p-16 space-y-6">

        {/* หัวข้อ + ปุ่มเพิ่มสินค้า */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Product List</h1>
          {!adding && !editingProduct && (
            <button
              onClick={() => setAdding(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add New Product
            </button>
          )}
        </div>

        {/* Popup เพิ่มสินค้า */}
        {adding && (
          <AddProduct
            onClose={() => setAdding(false)}
            onAdded={handleAdded}
          />
        )}

        {/* Popup แก้ไขสินค้า */}
        {editingProduct && (
          <EditProduct
            initialData={editingProduct}
            onClose={() => setEditingProduct(null)}
            onEdited={handleEdited}
          />
        )}

        {/* รายการสินค้า */}
        {!adding && !editingProduct && (
          <>
            {products.length === 0 && (
              <p className="text-center text-gray-500">No products found</p>
            )}

            <div className="flex flex-col space-y-4">
              {products.map((p) => (
                <MyProductCard
                  key={p.id}
                  product_id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  onDelete={() => handleDelete(p.id)}
                  onEdit={() => setEditingProduct(p)}
                  onViewMore={() => handleViewMore(p.id)}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}


