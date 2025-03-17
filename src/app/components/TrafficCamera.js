"use client"
import useWebSocket from "@/app/hooks/useWebSocket";

export default function TrafficCamera({ title, wsUrl }) {
    const { frame, vehicleCounts } = useWebSocket(wsUrl);

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <div className="border border-gray-600 rounded-lg overflow-hidden">
                {frame ? (
                    <img src={frame} alt="Traffic Camera" className="w-full h-auto" />
                ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-700">
                        <p>Loading...</p>
                    </div>
                )}
            </div>
            <div className="mt-2">
                <h3 className="text-lg font-semibold">Vehicle Count</h3>
                <ul>
                    {Object.entries(vehicleCounts).map(([type, count]) => (
                        <li key={type}>
                            {type}: {count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
