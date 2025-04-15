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
            className="p-5 bg-[var(--card-bg)] rounded-lg shadow-lg border border-[var(--border-color)] text-[var(--text-color)] transition-transform hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
                <StatusIndicator isConnected={isConnected} />
            </div>

            {/* Traffic Camera Video Feed with Modern Loader */}
            <div className="border border-[var(--border-color)] rounded-lg overflow-hidden shadow-md relative">
                {isConnected && frame ? (
                    <img src={frame} alt="Traffic Camera" className="w-full h-auto object-cover" />
                ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-300 dark:bg-gray-800 rounded-lg relative">
                        {/* Modern Loader */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <div className="flex space-x-2">
                                <span className="w-4 h-4 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-4 h-4 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-4 h-4 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {isConnected ? "Loading video..." : "Connecting"}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Signal & Vehicle Stats */}
            {isConnected && (
                <div className="mt-3 flex flex-wrap justify-between items-center gap-3">
                    <SignalStatus mqttTopic={mqttTopic} size="small" />
                    <div className="flex-1 min-w-[200px]">
                        <VehicleStats vehicleCounts={vehicleCounts} />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
