import { FaCar, FaTruck, FaBus, FaMotorcycle, FaBicycle } from "react-icons/fa";

export default function VehicleStats({ vehicleCounts }) {
    const vehicleIcons = {
        car: <FaCar className="text-yellow-500 drop-shadow-lg" />,
        truck: <FaTruck className="text-blue-500 drop-shadow-lg" />,
        bus: <FaBus className="text-green-500 drop-shadow-lg" />,
        motorcycle: <FaMotorcycle className="text-red-500 drop-shadow-lg" />,
        bicycle: <FaBicycle className="text-purple-500 drop-shadow-lg" />,
    };

    const totalVehicles = Object.values(vehicleCounts).reduce((sum, count) => sum + count, 0);

    return (
        <div className="mt-6 p-6 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
            {/* Header */}
            <div className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                🚦 <span className="opacity-80">Total Vehicles:</span> <span className="text-yellow-500">{totalVehicles}</span>
            </div>

            {/* Vehicle Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mt-5">
                {Object.entries(vehicleCounts).map(([type, count]) => (
                    <div
                        key={type}
                        className="flex flex-col items-center p-5 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {/* Animated Icon */}
                        <div className="text-5xl mb-3 animate-[wiggle_1s_ease-in-out_infinite]">{vehicleIcons[type] || "🚗"}</div>

                        {/* Vehicle Type Name */}
                        <span className="text-lg capitalize text-gray-900 dark:text-gray-200 font-medium tracking-wide">
                            {type}
                        </span>

                        {/* Count */}
                        <strong className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{count}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}
