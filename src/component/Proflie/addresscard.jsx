export default function AddressCard({ address }) {
    return (
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-semibold">{address.name}</h2>
        <p>📞 {address.phone}</p>
        <p>🏠 {address.address}</p>
        <p>
          📍 {address.subdistrict} {address.district} {address.province} {address.zipcode}
        </p>
        {address.isDefault && (
          <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
            Default Address
          </span>
        )}
      </div>
    );
  }
  