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
                    const res = await fetch("/api/signals");
                    const data = await res.json();
                    if (data[mqttTopic]) {
                        setSignalData(data[mqttTopic]);

                        if (lastUpdate !== data[mqttTopic].lastUpdate) {
                            setRemainingTime(data[mqttTopic].remainingTime || 0);
                            setLastUpdate(data[mqttTopic].lastUpdate);
                        }
                    }
                } catch (error) {
                    console.error("❌ Error fetching signal data:", error);
                }

                await new Promise((resolve) => setTimeout(resolve, 2000));
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

    if (!signalData) {
        return <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>;
    }

    const signalSize = size === "small" ? "w-8 h-8" : "w-14 h-14";
    const borderSize = size === "small" ? "border-[2px]" : "border-[3px]";

    return (
        <div
            className={`flex flex-col items-center gap-3 p-4 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300`}
        >
            {/* Signal Lights */}
            <div className="flex flex-col items-center gap-2">
                <div
                    className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "red" ? "bg-red-500 shadow-red-600 shadow-lg" : "bg-gray-300 dark:bg-gray-700"
                        }`}
                />
                <div
                    className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "yellow" ? "bg-yellow-400 shadow-yellow-500 shadow-lg" : "bg-gray-300 dark:bg-gray-700"
                        }`}
                />
                <div
                    className={`${signalSize} rounded-full transition-all duration-500 ${signalData.state === "green" ? "bg-green-500 shadow-green-600 shadow-lg" : "bg-gray-300 dark:bg-gray-700"
                        }`}
                />
            </div>

            <div className="relative flex items-center justify-center w-15 h-15 bg-black rounded-lg shadow-lg border-4 border-gray-700 dark:border-gray-500">
                <p
                    className={`text-2xl font-bold tracking-wide text-white ${remainingTime < 5 ? "text-red-500 animate-pulse" : "text-green-400"}`}
                >
                    {remainingTime}
                </p>
            </div>
        </div>
    );
}
