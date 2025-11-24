"use client";
import { useState } from "react";
import { LayoutDashboard, BarChart3, User, LogOut, Menu } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-[#0d0f17]/90 backdrop-blur-xl text-white border-r border-white/10 transition-all duration-300
      ${collapsed ? "w-20" : "w-64"} flex flex-col`}
    >
      {/* Top */}
      <div className="flex items-center justify-between p-6">
        {!collapsed && <h1 className="text-2xl font-extrabold tracking-wide">NeuroSync</h1>}
        <Menu
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer text-gray-300 hover:text-white"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-4">
        {[
          { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
          { name: "Analytics", icon: <BarChart3 size={20} /> },
          { name: "Profile", icon: <User size={20} /> },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl cursor-pointer 
            text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            {item.icon}
            {!collapsed && <span className="text-lg">{item.name}</span>}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10 flex items-center gap-3 cursor-pointer text-gray-300 hover:text-red-400">
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </div>
    </div>
  );
}
