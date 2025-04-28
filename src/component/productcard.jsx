export default function AddressCard({ address, onEdit }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm mb-4 relative">
      <p className="font-semibold">{address.name}</p>
      <p>{address.phone}</p>
      <p className="mt-2">{address.address}</p>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        {address.isDefault && (
          <span className="text-red-500 border border-red-500 px-2 py-1 text-xs rounded">
            Default
          </span>
        )}
        <button 
          onClick={() => onEdit(address.id)}
          className="text-gray-600 text-sm hover:underline"
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  );
}
