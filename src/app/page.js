import cameras from "@/app/config/cameras";
import TrafficCamera from "@/app/components/TrafficCamera";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
        🚦 Traffic Monitoring Dashboard
      </h1>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {cameras.slice(0, 4).map((camera) => (
          <TrafficCamera key={camera.id} title={camera.title} wsUrl={camera.wsUrl} mqttTopic={camera.topic} />
        ))}
      </div>
    </main>
  );
}
