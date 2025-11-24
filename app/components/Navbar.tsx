import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="backdrop-blur-lg bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
      
      {/* Search */}
      <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl">
        <Search className="text-gray-300 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent focus:outline-none text-gray-200"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <Bell className="text-gray-300 hover:text-white cursor-pointer" />
        <div className="bg-white/10 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold">
          N
        </div>
      </div>

    </div>
  );
}
