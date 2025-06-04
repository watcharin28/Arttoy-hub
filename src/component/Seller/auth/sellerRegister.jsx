import React, { useState, useEffect } from "react";
import StepProgress from "./progressBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerRegister = () => {
  const [username, setUsername] = useState('');
  const [gmail, setGmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/Profile`, {
          withCredentials: true,
        });
        setUsername(response.data.username || '');
        setGmail(response.data.gmail || '');
        setPhonenumber(response.data.phonenumber || '');
      } catch (err) {
        console.error(err);
        setError('Unable to load profile data.');
      }
    };

    fetchProfile();
  }, []);

  const [pageRegis, setPageRegis] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [idCardImage, setIdCardImage] = useState(null);
  const [idCardPreview, setIdCardPreview] = useState(null);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (idCardPreview) URL.revokeObjectURL(idCardPreview);
    };
  }, [idCardPreview]);

  const handleIdCardImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (idCardPreview) {
        URL.revokeObjectURL(idCardPreview);
      }
      const newPreview = URL.createObjectURL(file);
      setIdCardImage(file);
      setIdCardPreview(newPreview);
    }
  };

  const validateStep = () => {
    const errors = {};

    if (pageRegis === 1) {
      if (!firstName.trim()) errors.firstName = "Please enter your First name";
      if (!lastName.trim()) errors.lastName = "Please enter your Last name";
      if (idCard.length !== 13) errors.idCard = "National ID must be 13 digits";
      if (!idCardImage) errors.idCardImage = "Please upload your national ID card image";
    }

    if (pageRegis === 2) {
      if (!bankName.trim()) errors.bankName = "Please enter your bank name";
      if (!accountName.trim()) errors.accountName = "Please enter your bank account name";
      if (!accountNumber.trim()) errors.accountNumber = "Please enter your bank account number";
    }

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join("\n");
      alert(errorMessages);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setPageRegis((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setPageRegis((prev) => prev - 1);
  };

  // แก้ไข handleSubmit ให้ส่ง formData พร้อมไฟล์
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("bank_account_name", accountName);
      formData.append("bank_name", bankName);
      formData.append("bank_account_number", accountNumber);
      formData.append("citizen_id", idCard);
      if (idCardImage) {
        formData.append("id_card_image", idCardImage);
      }

      const response = await axios.post(`http://localhost:8080/api/user/become-seller`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.message === "Register Successful") {
        setSuccess(true);
        setTimeout(() => {
          navigate('/seller');
        }, 2000); // รอ 2 วิค่อยไป Login
      } else {
        setError(response.data.error || 'Register Failed!');
      }

    } catch (error) {
      console.error(error);
      setError('Register Failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 bg-violet-300 min-h-screen flex items-center justify-center px-4 md:px-12 lg:px-24">
        <form
          onSubmit={handleSubmit}
          className="px-16 py-10 bg-white rounded-2xl shadow-lg w-full min-h-[700px] flex flex-col"
          noValidate
        >
          <div className="flex flex-col items-center">
            <img src="/images/AThub.png" alt="Art Toy Hub" className="w-32 h-20" />
            <h2 className="text-2xl font-bold text-center">Welcome New Sellers</h2>
          </div>

          <StepProgress currentPage={pageRegis} />

          <div className="flex-grow overflow-auto">
            {pageRegis === 0 && (
              <>
                <div className="my-6">
                  <span className="text-gray-700">Username:</span>
                  <span className="p-2 rounded font-medium">{username}</span>
                </div>
                <div className="mb-6">
                  <span className="text-gray-700">Email:</span>
                  <span className="p-2 rounded font-medium">{gmail}</span>
                </div>
                <div className="mb-6">
                  <span className="text-gray-700">Phone Number:</span>
                  <span className="p-2 rounded font-medium">{phonenumber}</span>
                </div>
              </>
            )}

            {pageRegis === 1 && (
              <>
                <div className="my-2">
                  <label className="text-gray-500" htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
                  />
                </div>
                <div className="my-2">
                  <label className="text-gray-500" htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
                  />
                </div>
                <div className="my-2">
                  <label className="text-gray-500" htmlFor="nationalID">National ID</label>
                  <input
                    id="nationalID"
                    type="text"
                    name="nationalID"
                    value={idCard}
                    onChange={(e) => setIdCard(e.target.value)}
                    maxLength={13}
                    className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
                  />
                </div>
                <div className="my-2">
                  <label className="text-gray-500 block mb-1">Image National Card</label>

                  <div className="mb-4 mx-auto border-2 border-dashed border-gray-400 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="fileInput"
                        className="cursor-pointer inline-flex items-center justify-center w-6 h-6 rounded-full hover:text-white hover:bg-violet-700 transition"
                        title="เลือกรูปภาพ"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </label>

                      {!idCardPreview && (
                        <img
                          src="/images/NationalCard.png"
                          alt="ตัวอย่างรูปบัตรประชาชน"
                          className="h-16 w-auto rounded-lg border border-gray-300"
                        />
                      )}

                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleIdCardImageChange}
                        className="hidden"
                      />

                      {idCardPreview && (
                        <img
                          src={idCardPreview}
                          alt="ID Preview"
                          className="max-h-24 mx-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {pageRegis === 2 && (
              <>
                <div className="my-2">
                  <label className="text-gray-500" htmlFor="bankName">Bank Name</label>
                  <select
                    id="bank_name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
                  >
                    <option value="">-- กรุณาเลือกธนาคาร --</option>
                    <option value="กสิกรไทย">กสิกรไทย</option>
                    <option value="ไทยพาณิชย์">ไทยพาณิชย์</option>
                    <option value="กรุงเทพ">กรุงเทพ</option>
                    <option value="กรุงศรี">กรุงศรี</option>
                    <option value="กรุงไทย">กรุงไทย</option>
                  </select>
                </div>
                <div className="my-2">
                  <label className="text-gray-500" htmlFor="accountName">Bank Account Name</label>
                  <input
                    id="accountName"
                    type="text"
                    name="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
                  />
                </div>
                <div className="my-2">
                  <label className="text-gray-500" htmlFor="accountNumber">Bank Account Number</label>
                  <input
                    id="accountNumber"
                    type="text"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-4">
            {pageRegis === 0 && (
              <button
                type="button"
                onClick={() => setPageRegis(1)}
                className="w-full bg-violet-400 text-white py-3 rounded-lg hover:bg-violet-600 transition"
                disabled={loading}
              >
                Continue
              </button>
            )}

            {pageRegis === 1 && (
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-[48%] bg-gray-300 py-2 rounded hover:bg-gray-400"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-[48%] bg-violet-400 text-white py-2 rounded hover:bg-violet-600"
                  disabled={loading}
                >
                  Next
                </button>
              </div>
            )}

            {pageRegis === 2 && (
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-[48%] bg-gray-300 py-2 rounded hover:bg-gray-400"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-[48%] bg-green-500 text-white py-2 rounded hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="w-1/2 bg-violet-300 relative flex  flex-col ">
        <div className="flex-1 flex items-center justify-center relative">
          <img
            src="/images/dino.png"
            alt="Cartoon"
            className="w-4/5 z-10 mr-24"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
