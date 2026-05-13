"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, Hotel, Users, 
  Settings, LogOut, BarChart3, 
  CalendarCheck, Bell, Search 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Hotel Management', icon: <Hotel size={20} />, path: '/admin/hotels' },
    { name: 'Bookings', icon: <CalendarCheck size={20} />, path: '/admin/bookings' },
    { name: 'Users', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-[#0D1B2A] border-r border-white/5 flex flex-col p-8">
        <div className="flex items-center gap-3 mb-16">
          <div className="bg-[#A3E635] p-2 rounded-xl">
             <Hotel size={24} className="text-[#0D1B2A]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white uppercase">WG <span className="text-[#A3E635]">ADMIN</span></span>
            <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Control Center</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                pathname === item.path 
                  ? 'bg-[#A3E635] text-[#0D1B2A]' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-6 py-4 text-white/20 hover:text-red-500 transition-colors font-bold text-sm mt-auto">
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 bg-[#0D1B2A]/30 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl w-96">
            <Search size={18} className="text-white/20" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/20"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#A3E635] rounded-full" />
            </button>
            <div className="h-10 w-[1px] bg-white/5" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-black">Admin User</p>
                <p className="text-[10px] text-[#A3E635] font-bold uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A3E635] to-[#22C7F2]" />
            </div>
          </div>
        </header>

        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
