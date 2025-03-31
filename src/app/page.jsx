import cameras from "@/app/config/cameras";
import TrafficCamera from "@/app/components/TrafficCamera";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] p-6 flex flex-col items-center">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between w-full max-w-6xl">
        <h1 className="text-4xl font-bold tracking-wide">🚦 Traffic Monitoring Dashboard</h1>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mt-6">
        {cameras.slice(0, 4).map((camera) => (
          <TrafficCamera key={camera.id} title={camera.title} wsUrl={camera.wsUrl} mqttTopic={camera.topic} />
        ))}
      </div>
    </main>
  );
}
