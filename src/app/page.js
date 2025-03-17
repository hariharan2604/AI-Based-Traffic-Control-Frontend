import TrafficCamera from "@/app/components/TrafficCamera";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🚦 Traffic Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <TrafficCamera title="Intersection 1" wsUrl="ws://localhost:4001" />
        <TrafficCamera title="Intersection 2" wsUrl="ws://localhost:4002" />
        <TrafficCamera title="Intersection 3" wsUrl="ws://localhost:4003" />
        <TrafficCamera title="Intersection 4" wsUrl="ws://localhost:4004" />
      </div>
    </main>
  );
}
