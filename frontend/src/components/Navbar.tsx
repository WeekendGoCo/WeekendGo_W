
"use client";

import { Plane, Globe, LogIn, LogOut, User } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 border-b ${
      scrolled 
        ? "bg-[#0D1B2A]/90 backdrop-blur-2xl py-4 border-white/10 shadow-2xl" 
        : "bg-transparent py-7 border-transparent"
    } px-6 transform translate-z-0`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Plane className="w-9 h-9 text-[#A3E635] transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-white uppercase">
              WEEKEND <span className="text-[#A3E635]">GO</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-[#22C7F2] font-black">ويكند جو</span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-12 text-[11px] font-black uppercase tracking-[0.2em]">
          <NavLink href="/search">{t.nav.destinations}</NavLink>
          <NavLink href="#">{t.nav.collection}</NavLink>
          <NavLink href="#">{t.nav.concierge}</NavLink>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-[#A3E635] transition-all"
          >
            <Globe size={16} className="text-[#22C7F2]" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {session ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 transition-all group"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-[#A3E635]/30 group-hover:border-[#A3E635] transition-all">
                   {session.user?.image ? (
                     <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                   ) : (
                     <User size={14} className="m-auto mt-1.5 text-[#A3E635]" />
                   )}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{session.user?.name?.split(' ')[0]}</span>
              </button>
              
              <AnimatePresence>
                {showProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-64 bg-[#1F2937] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] z-[110]"
                  >
                    <div className="px-8 py-6 border-b border-white/5 bg-white/5">
                      <p className="text-[9px] uppercase font-black text-[#A3E635] tracking-[0.3em] mb-2">Member Since 2026</p>
                      <p className="text-xs font-black text-white truncate">{session.user?.email}</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-4 px-6 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all rounded-xl"
                      >
                        <LogOut size={16} /> {t.nav.logout}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={() => signIn('google')}
              className="bg-[#A3E635] text-[#0D1B2A] px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:scale-105 transition-all shadow-[0_15px_30px_rgba(163,230,53,0.3)] flex items-center gap-3"
            >
              <LogIn size={14} strokeWidth={3} /> {t.nav.login}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/60 hover:text-[#A3E635] transition-all relative group py-2">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A3E635] transition-all group-hover:w-full rounded-full" />
    </Link>
  );
}
