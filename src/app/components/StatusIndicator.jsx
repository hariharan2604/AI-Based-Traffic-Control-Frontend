export default function StatusIndicator({ isConnected }) {
    return (
        <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            <span className="text-sm">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
    );
}
