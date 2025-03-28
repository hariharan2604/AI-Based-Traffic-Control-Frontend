import { FaCar, FaTruck, FaBus, FaMotorcycle, FaBicycle } from "react-icons/fa";

export default function VehicleStats({ vehicleCounts }) {
    const vehicleIcons = {
        car: <FaCar className="text-yellow-400" />,
        truck: <FaTruck className="text-blue-400" />,
        bus: <FaBus className="text-green-400" />,
        motorcycle: <FaMotorcycle className="text-red-400" />,
        bicycle: <FaBicycle className="text-purple-400" />
    };

    const totalVehicles = Object.values(vehicleCounts).reduce((sum, count) => sum + count, 0);

    return (
        <div className="mt-6">
            <div className="mb-4 text-center text-lg font-bold text-white">Total Vehicles: {totalVehicles}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(vehicleCounts).map(([type, count]) => (
                    <div
                        key={type}
                        className="flex flex-col items-center bg-gray-800 p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
                    >
                        <div className="text-4xl mb-2">{vehicleIcons[type] || "🚗"}</div>
                        <span className="text-md capitalize text-gray-300">{type}</span>
                        <strong className="text-lg text-white">{count}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}
