import ChartArea from "@/components/chart-area";
import Sidebar from "@/components/sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ChartArea />
      </main>
    </div>
  );
}
