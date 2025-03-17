export default function StatusIndicator({ isConnected }) {
    return (
        <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
    );
}
