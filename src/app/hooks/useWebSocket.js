"use client";
import { useEffect, useState, useRef } from "react";

export default function useWebSocket(url) {
    const [frame, setFrame] = useState(null);
    const [vehicleCounts, setVehicleCounts] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const reconnectAttempts = useRef(0);
    const socketRef = useRef(null);

    const connectWebSocket = () => {
        if (socketRef.current) {
            socketRef.current.close(); // Close any existing connection before reconnecting
        }

        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("✅ WebSocket Connected");
            setIsConnected(true);
            reconnectAttempts.current = 0; // Reset retry counter
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setFrame(`data:image/webp;base64,${data.frame}`);
                setVehicleCounts(data.vehicle_counts);
            } catch (error) {
                console.error("⚠️ WebSocket Message Error:", error);
            }
        };

        socket.onclose = () => {
            console.warn("🔄 WebSocket Disconnected, retrying...");
            setIsConnected(false);
            retryConnection(); // Attempt reconnection
        };

        socket.onerror = (error) => {
            console.error("❌ WebSocket Error:", error);
            socket.close();
        };
    };

    const retryConnection = () => {
        const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000); // Exponential backoff (max 30s)
        reconnectAttempts.current += 1;

        setTimeout(() => {
            if (!isConnected) {
                console.log(`🔁 Reconnecting... Attempt ${reconnectAttempts.current}`);
                connectWebSocket();
            }
        }, delay);
    };

    useEffect(() => {
        connectWebSocket();
        return () => socketRef.current?.close();
    }, [url]);

    return { frame, vehicleCounts, isConnected };
}
