import { FaCar, FaTruck, FaBus, FaMotorcycle, FaBicycle } from "react-icons/fa";

export default function VehicleStats({ vehicleCounts }) {
    const vehicleIcons = {
        car: { icon: <FaCar />, color: "bg-yellow-500" },
        truck: { icon: <FaTruck />, color: "bg-blue-500" },
        bus: { icon: <FaBus />, color: "bg-green-500" },
        motorcycle: { icon: <FaMotorcycle />, color: "bg-red-500" },
        bicycle: { icon: <FaBicycle />, color: "bg-purple-500" },
    };

    const totalVehicles = Object.values(vehicleCounts).reduce((sum, count) => sum + count, 0);

    return (
        <div className="mt-6 p-5 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300">
            {/* Header */}
            <div className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Total Vehicles: <span className="text-yellow-500 font-bold">{totalVehicles}</span>
            </div>

            {/* Vehicle Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
                {Object.entries(vehicleCounts).map(([type, count]) => {
                    const { icon, color } = vehicleIcons[type] || {};
                    return (
                        <div
                            key={type}
                            className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                            {/* Small Circular Icon Badge */}
                            <div className={`w-12 h-12 ${color} flex items-center justify-center text-white text-2xl rounded-full shadow-md`}>
                                {icon || "🚗"}
                            </div>

                            {/* Vehicle Type Name */}
                            <span className="mt-2 text-sm capitalize text-gray-900 dark:text-gray-200 font-medium">
                                {type==='motorcycle'?'bike':type}
                            </span>

                            {/* Count */}
                            <strong className="text-2xl font-bold text-gray-900 dark:text-gray-100">{count}</strong>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
