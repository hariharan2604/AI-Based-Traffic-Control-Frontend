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
            className="p-5 bg-gray-900/80 rounded-lg shadow-lg border border-gray-700 text-gray-200 transition-transform hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
                <StatusIndicator isConnected={isConnected} />
            </div>

            {/* Traffic Camera Video Feed */}
            <div className="border border-gray-700 rounded-lg overflow-hidden shadow-md">
                {frame ? (
                    <img src={frame} alt="Traffic Camera" className="w-full h-auto object-cover" />
                ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-800 rounded-lg">
                        <div className="animate-pulse w-14 h-14 bg-gray-600 rounded-full" />
                    </div>
                )}
            </div>

            {/* Signal and Vehicle Stats (only if connected) */}
            {isConnected && (
                <div className="mt-3 flex flex-wrap justify-between items-center gap-3">
                    <SignalStatus mqttTopic={mqttTopic} size="small" />
                    <div className="flex-1 min-w-[200px]">
                        <VehicleStats vehicleCounts={vehicleCounts} size="small" />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
