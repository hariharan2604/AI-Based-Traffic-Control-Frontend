"use client";

import { useEffect, useState } from "react";

export default function SignalStatus({ mqttTopic }) {
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

    // Timer Effect (Countdown)
    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    if (!signalData) return <p>Loading...</p>;

    return (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg text-white">
            <h3 className="text-lg font-semibold">Traffic Signal</h3>
            <p><strong>State:</strong> {signalData.state?.toUpperCase()}</p>
            <p><strong>Remaining Time:</strong> {remainingTime}s</p>
            {signalData.manual_override && <p className="text-yellow-400">🚨 Manual Override Active</p>}
            {signalData.emergency_mode && <p className="text-red-500">🚨 Emergency Mode Enabled</p>}
        </div>
    );
}
