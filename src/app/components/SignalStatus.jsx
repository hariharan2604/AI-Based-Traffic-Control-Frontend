"use client";

import { useEffect, useState } from "react";

export default function SignalStatus({ mqttTopic, size = "large" }) {
    const [signalData, setSignalData] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchSignalUpdate = async () => {
            while (isMounted) {
                try {
                    const res = await fetch("/api/signals"); // Fetch from API
                    const data = await res.json();
                    if (data[mqttTopic]) {
                        setSignalData(data[mqttTopic]);

                        // Only reset remaining time if it's a new update
                        if (lastUpdate !== data[mqttTopic].lastUpdate) {
                            setRemainingTime(data[mqttTopic].remainingTime || 0);
                            setLastUpdate(data[mqttTopic].lastUpdate);
                        }
                    }
                } catch (error) {
                    console.error("❌ Error fetching signal data:", error);
                }

                await new Promise((resolve) => setTimeout(resolve, 2000)); // Poll every 2s
            }
        };

        fetchSignalUpdate();

        return () => {
            isMounted = false;
        };
    }, [mqttTopic, lastUpdate]);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    if (!signalData) return <p className="text-gray-300 text-center">Loading...</p>;

    const signalSize = size === "small" ? "w-8 h-8" : "w-14 h-14";
    const borderSize = size === "small" ? "border-[2px]" : "border-[3px]";

    return (
        <div className={`relative flex flex-col items-center gap-2 p-3 ${borderSize} border-gray-700 rounded-xl bg-gray-900 shadow-md shadow-gray-800`}>
            <div className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "red" ? "bg-red-500 shadow-red-600 shadow-md" : "bg-gray-800"}`} />
            <div className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "yellow" ? "bg-yellow-400 shadow-yellow-500 shadow-md" : "bg-gray-800"}`} />
            <div className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "green" ? "bg-green-500 shadow-green-600 shadow-md" : "bg-gray-800"}`} />

            {/* Timer with sleek design */}
            <p className={`mt-2 text-xl font-bold tracking-wider ${remainingTime < 5 ? "text-red-400 animate-pulse" : "text-gray-200"}`}>
                {remainingTime}
            </p>
        </div>
    );
}
