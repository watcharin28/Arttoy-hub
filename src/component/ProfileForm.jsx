import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phonenumber: "",
    gmail: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/user/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setFormData({
            username: data.username,
            phonenumber: data.phonenumber,
            gmail: data.gmail,
          });
          // ใช้ GCS URL โดยตรงจาก profile_image
          setImagePreview(data.profile_image || null);
        }
      } catch (error) {
        console.error("โหลดโปรไฟล์ล้มเหลว", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8080/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();
      setUser((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
      alert("✅ อัปเดตโปรไฟล์เรียบร้อยแล้ว");
    } catch (error) {
      alert("⚠️ เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // แสดงตัวอย่างในเครื่องก่อนอัปโหลด
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return alert("กรุณาเลือกรูปภาพก่อน");

    // แป。アปโหลดเป็น base64 string
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        const res = await fetch("http://localhost:8080/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profile_image: base64String }),
          credentials: "include",
        });

        if (!res.ok) throw new Error("อัปโหลดไม่สำเร็จ");

        const updated = await res.json();
        // ใช้ GCS URL ที่ backend คืนมา
        setImagePreview(updated.profile_image);
        setUser((prev) => ({ ...prev, profile_image: updated.profile_image }));
        alert("✅ รูปภาพอัปโหลดเรียบร้อยแล้ว");
      } catch (error) {
        console.error(error);
        alert("❌ อัปโหลดรูปไม่สำเร็จ");
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  if (!user) return <div className="text-center mt-10">⏳ กำลังโหลดข้อมูล...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🏠 โปรไฟล์ผู้ใช้</h1>

      {imagePreview && (
        <div className="text-center mb-4">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto border"
          />
        </div>
      )}

      <div className="text-center mb-6">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          onClick={handleUpload}
          className="ml-2 px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          ⬆️ อัปโหลดรูป
        </button>
      </div>

      {!editMode ? (
        <div className="space-y-3 text-lg">
          <p><strong>👤 ชื่อผู้ใช้:</strong> {user.username}</p>
          <p><strong>📞 เบอร์โทร:</strong> {user.phonenumber}</p>
          <p><strong>📧 อีเมล:</strong> {user.gmail}</p>
          <div className="text-center">
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ✏️ แก้ไขข้อมูล
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">👤 ชื่อผู้ใช้</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">📞 เบอร์โทร</label>
            <input
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">📧 อีเมล</ label>
            <input
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              💾 บันทึก
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ❌ ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;