import mqtt from "mqtt";

const signalState = {}; // Store latest signal states

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
    console.log("✅ Connected to MQTT Broker");
    client.subscribe("signal/status/#");
});

client.on("message", (topic, message) => {
    console.log(`📥 MQTT Message Received: ${topic} -> ${message.toString()}`);
    try {
        const data = JSON.parse(message.toString());
        signalState[topic] = {
            state: data.state || "unknown",
            remainingTime: data.duration || 0,
            manual_override: data.manual_override || false,
            emergency_mode: data.emergency || false,
            lastUpdate: Date.now(), // Timestamp of last update
        };

        console.log(`🚦 Signal Updated [${topic}]:`, signalState[topic]);
    } catch (error) {
        console.error("❌ Error parsing MQTT message:", error);
    }
});

export { signalState };
