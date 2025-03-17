export function setupWebSocket(port, updateFrame) {
    const socket = new WebSocket(`ws://localhost:${port}`);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateFrame(port, data.frame, data.vehicle_counts);
    };

    socket.onopen = () => console.log(`Connected to WebSocket on port ${port}`);
    socket.onerror = (error) => console.error(`WebSocket error on port ${port}:`, error);
    socket.onclose = () => console.log(`WebSocket closed on port ${port}`);

    return socket;
}
