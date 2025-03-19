"use client";

import useWebSocket from "@/app/hooks/useWebSocket";
import SignalStatus from "./SignalStatus";
import StatusIndicator from "./StatusIndicator";
import VehicleStats from "./VehicleStats";
import { motion } from "framer-motion";

export default function TrafficCamera({ title, wsUrl, mqttTopic }) {
    const { frame, vehicleCounts, isConnected } = useWebSocket(wsUrl);

    return (
        <motion.div
            className="p-6 bg-gray-800/70 rounded-xl shadow-lg border border-gray-700 text-white transition-all hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <StatusIndicator isConnected={isConnected} />
            </div>

            {/* Traffic Camera Video Feed */}
            <div className="border border-gray-600 rounded-lg overflow-hidden">
                {frame ? (
                    <img src={frame} alt="Traffic Camera" className="w-full h-auto rounded-lg" />
                ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-700 rounded-lg">
                        <div className="animate-pulse w-16 h-16 bg-gray-600 rounded-full" />
                    </div>
                )}
            </div>
            {isConnected && <><SignalStatus mqttTopic={mqttTopic} />
                <VehicleStats vehicleCounts={vehicleCounts} /></>}
            
        </motion.div>
    );
}
