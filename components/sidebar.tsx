import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link
            href="/dashboard"
            className="hover:text-gray-300"
          >
            Overview
          </Link>
        </li>
      </ul>
    </nav>
  );
}
