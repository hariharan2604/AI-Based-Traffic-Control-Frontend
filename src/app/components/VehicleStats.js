import { FaCar, FaTruck, FaBus, FaMotorcycle } from "react-icons/fa";

export default function VehicleStats({ vehicleCounts }) {
    const vehicleIcons = {
        car: <FaCar className="text-yellow-400 mr-2" />,
        truck: <FaTruck className="text-blue-400 mr-2" />,
        bus: <FaBus className="text-green-400 mr-2" />,
        motorcycle: <FaMotorcycle className="text-red-400 mr-2" />
    };

    return (
        <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(vehicleCounts).map(([type, count]) => (
                <div key={type} className="flex items-center bg-gray-700/60 p-2 rounded-lg shadow-md">
                    {vehicleIcons[type] || <span className="mr-2">🚗</span>}
                    <span className="text-sm">{type}: <strong>{count}</strong></span>
                </div>
            ))}
        </div>
    );
}
