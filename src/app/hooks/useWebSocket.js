"use client"
import { useEffect, useState } from "react";

export default function useWebSocket(url) {
    const [frame, setFrame] = useState(null);
    const [vehicleCounts, setVehicleCounts] = useState({});

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setFrame(`data:image/jpeg;base64,${data.frame}`);
                setVehicleCounts(data.vehicle_counts);
            } catch (error) {
                console.error("WebSocket Error:", error);
            }
        };

        return () => socket.close();
    }, [url]);

    return { frame, vehicleCounts };
}
