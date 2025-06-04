export default function AddressCard({ address, onEdit, onDelete }) {
    return (
        <div className="border p-4 rounded-lg shadow relative">
            <h2 className="text-lg font-semibold">{address.name}</h2>
            <p>{address.phone}</p><br />
            <p>{address.address}</p>
            <p>
                {address.subdistrict} {address.district} {address.province} {address.zipcode}
            </p>

            {/* ส่วนของ Default Address และ Edit Button */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
                {address.isDefault && (
                    <span className="px-2 py-1 mr-2 bg-green-500 text-white text-xs rounded">
                        Default Address
                    </span>
                )}
                <button onClick={() => onEdit(address)} className="text-gray-500">
          <div className="text-blue-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="2" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </div>
        </button>
        <button onClick={() => onDelete(address._id)} className="text-gray-500">
          <div className="text-red-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 7L5 7M6 7L6 19a2 2 0 002 2h8a2 2 0 002-2L18 7M10 11v6M14 11v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
            </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}
