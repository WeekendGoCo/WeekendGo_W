"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, Users, Hotel, 
  DollarSign, ArrowUpRight, 
  ArrowDownRight, Calendar 
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Revenue', value: '$240,500', icon: <DollarSign className="text-[#A3E635]" />, trend: '+12.5%', isUp: true },
    { name: 'Active Bookings', value: '1,420', icon: <Calendar className="text-[#22C7F2]" />, trend: '+8.2%', isUp: true },
    { name: 'New Users', value: '850', icon: <Users className="text-purple-500" />, trend: '-2.1%', isUp: false },
    { name: 'Total Hotels', value: '45', icon: <Hotel className="text-amber-500" />, trend: '+2', isUp: true },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">DASHBOARD OVERVIEW</h1>
          <p className="text-white/40 font-bold text-sm">Welcome back, here's what's happening today.</p>
        </div>
        <button className="bg-[#A3E635] text-[#0D1B2A] px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1F2937]/30 border border-white/5 p-8 rounded-[2rem] hover:border-[#A3E635]/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#A3E635]/10 transition-all">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black ${stat.isUp ? 'text-[#A3E635]' : 'text-red-500'}`}>
                {stat.trend} {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{stat.name}</p>
            <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#1F2937]/30 border border-white/5 rounded-[2.5rem] p-10">
          <h3 className="text-xl font-black mb-8 tracking-tighter uppercase">Recent Bookings</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800" />
                  <div>
                    <p className="text-sm font-black text-white">Burj Al Arab Jumeirah</p>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Riyadh, Saudi Arabia</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#A3E635]">$1,200</p>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">2h ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Performance */}
        <div className="bg-[#A3E635] rounded-[2.5rem] p-10 text-[#0D1B2A]">
          <h3 className="text-xl font-black mb-8 tracking-tighter uppercase">Platform Status</h3>
          <div className="space-y-8">
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">API Availability</p>
               <div className="flex justify-between items-end">
                 <p className="text-3xl font-black">99.9%</p>
                 <TrendingUp size={24} />
               </div>
             </div>
             <div className="h-[1px] bg-[#0D1B2A]/10" />
             <div className="space-y-4">
                <button className="w-full bg-[#0D1B2A] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">Add New Hotel</button>
                <button className="w-full border-2 border-[#0D1B2A] text-[#0D1B2A] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0D1B2A] hover:text-white transition-all">Review Users</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
