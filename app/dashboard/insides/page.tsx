import Sidebar from "@/components/sidebar";

export default function Insides() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Insides</h1>
        {/* Add content for insides page */}
      </main>
    </div>
  );
}
