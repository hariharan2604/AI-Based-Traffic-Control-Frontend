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

    if (!signalData) return <p className="text-white text-center">Loading...</p>;

    const signalSize = size === "small" ? "w-8 h-8" : "w-12 h-12";
    const borderSize = size === "small" ? "border-2" : "border-4";

    return (
        <div className={`relative flex flex-col items-center justify-evenly p-1 ${borderSize} border-gray-600 rounded-lg bg-black`}>
            <div className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "red" ? "bg-red-500 shadow-red-500 shadow-lg" : "bg-gray-700"}`} />
            <div className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "yellow" ? "bg-yellow-400 shadow-yellow-400 shadow-lg" : "bg-gray-700"}`} />
            <div className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "green" ? "bg-green-500 shadow-green-500 shadow-lg" : "bg-gray-700"}`} />

            {/* Timer Placement */}
            <p className={`mt-1 text-lg font-extrabold ${remainingTime < 5 ? "text-red-500 animate-pulse" : "text-white"}`}>
                {remainingTime}
            </p>
        </div>
    );
}

