
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, ArrowRight, Star, Plane, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function Home() {
  const router = useRouter();
  const { t, isRtl } = useTranslation();
  const [query, setQuery] = useState("");
  const [selectedDestId, setSelectedDestId] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle autocomplete search
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const res = await fetch(`/api/hotels/suggest?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data.data || []);
      } catch (err) {
        console.error("Suggestion fetch failed");
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [checkIn, setCheckIn] = useState("2026-10-15");
  const [checkOut, setCheckOut] = useState("2026-10-22");

  const handleSelectSuggestion = (suggestion: any) => {
    const name = suggestion.name || suggestion.label;
    const id = suggestion.id || suggestion.dest_id;
    setQuery(name);
    setSelectedDestId(id);
    setShowSuggestions(false);
    router.push(`/search?destination=${encodeURIComponent(name)}&destId=${id}&checkIn=${checkIn}&checkOut=${checkOut}`);
  };

  return (
    <main className={`min-h-screen bg-[#0D1B2A] text-white selection:bg-[#A3E635] selection:text-[#0D1B2A] ${isRtl ? 'font-arabic' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/20 via-[#0D1B2A]/80 to-[#0D1B2A] z-10" />
          <Image 
            src="/hero-bg.png" 
            alt="Luxury Destination" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          {/* Decorative Curves */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-[#0D1B2A] clip-path-curve" />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#22C7F2]">
                {t.hero.subtitle}
              </span>
            </div>
            
            <h1 className={`text-6xl md:text-9xl font-black mb-10 leading-[0.9] tracking-tighter ${isRtl ? 'leading-[1.1]' : ''}`}>
              {isRtl ? (
                <>سافر <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#22C7F2]">بذكاء وفخامة</span></>
              ) : (
                <>EXPLORE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#22C7F2]">SMARTER</span></>
              )}
            </h1>
          </motion.div>

          {/* Advanced Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-5xl mx-auto mt-12"
            ref={searchRef}
          >
            <div className="bg-[#1F2937]/60 backdrop-blur-3xl p-4 rounded-[3rem] flex flex-col md:flex-row gap-3 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <div className="flex-[1.8] relative">
                <div className="flex items-center gap-5 px-8 py-5 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all border border-transparent focus-within:border-[#A3E635]/50 group">
                  <MapPin className="text-[#A3E635] w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left w-full">
                    <p className="text-[9px] text-[#22C7F2] font-black uppercase tracking-widest mb-1">{t.search.destination}</p>
                    <input 
                      type="text" 
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder={t.search.placeholder} 
                      className={`bg-transparent border-none outline-none w-full text-white placeholder-white/30 font-bold text-lg ${isRtl ? 'text-right' : ''}`} 
                    />
                  </div>
                  {loadingSuggestions && <Loader2 className="animate-spin text-[#A3E635] shrink-0" size={20} />}
                </div>

                {/* Autocomplete */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute top-full left-0 w-full mt-5 bg-[#1F2937] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-50 p-2"
                    >
                      {suggestions.map((s, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleSelectSuggestion(s)}
                          className="flex items-center gap-5 px-7 py-5 hover:bg-[#A3E635] hover:text-[#0D1B2A] transition-all cursor-pointer group rounded-2xl mb-1 last:mb-0"
                        >
                          <div className="bg-white/5 p-3 rounded-xl group-hover:bg-[#0D1B2A]/10 transition-colors">
                            <MapPin size={22} />
                          </div>
                          <div className="text-left">
                            <p className="font-black text-base">{s.name || s.label}</p>
                            <p className="text-[10px] uppercase font-bold opacity-60 tracking-widest">{s.cityName}, {s.country}</p>
                          </div>
                          <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isRtl ? 'rotate-180' : ''}`}>
                            <ArrowRight size={20} strokeWidth={3} />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1 flex items-center gap-5 px-8 py-5 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all border border-transparent">
                <Calendar className="text-[#22C7F2] w-6 h-6 shrink-0" />
                <div className="text-left w-full">
                  <p className="text-[9px] text-[#22C7F2] font-black uppercase tracking-widest mb-1">{t.search.checkIn}</p>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-white font-bold text-base [color-scheme:dark]" 
                  />
                </div>
              </div>

              <div className="flex-1 flex items-center gap-5 px-8 py-5 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all border border-transparent">
                <Calendar className="text-[#22C7F2] w-6 h-6 shrink-0" />
                <div className="text-left w-full">
                  <p className="text-[9px] text-[#22C7F2] font-black uppercase tracking-widest mb-1">{t.search.checkOut}</p>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-white font-bold text-base [color-scheme:dark]" 
                  />
                </div>
              </div>

              <button 
                onClick={() => router.push(`/search?destination=${encodeURIComponent(query)}&destId=${selectedDestId}&checkIn=${checkIn}&checkOut=${checkOut}`)}
                className="bg-[#A3E635] hover:bg-white text-[#0D1B2A] px-10 rounded-[2rem] transition-all transform hover:scale-105 flex items-center justify-center shrink-0 shadow-[0_20px_40px_rgba(163,230,53,0.3)] group"
              >
                <Search className="w-7 h-7 group-hover:scale-110 transition-transform" strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Saudi Luxury Gems Section */}
      <section className="py-40 bg-[#0D1B2A] relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className={`mb-24 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-4 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="h-[1px] w-12 bg-[#A3E635]" />
                <span className="text-[#22C7F2] text-[10px] font-black uppercase tracking-[0.5em]">{isRtl ? 'كنوز المملكة العربية السعودية' : 'Saudi Luxury Gems'}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white uppercase">
                {isRtl ? <>اكتشف <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#22C7F2]">فخامة المملكة</span></> : <>EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#22C7F2]">THE KINGDOM</span></>}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               <DestinationCard 
                 name={isRtl ? "العلا" : "AlUla"} 
                 image="/dest-alula.png" 
                 tag={isRtl ? "تراث وتاريخ" : "Heritage"} 
                 price="$2,500"
               />
               <DestinationCard 
                 name={isRtl ? "الرياض" : "Riyadh"} 
                 image="/dest-riyadh.png" 
                 tag={isRtl ? "عصرية وفخامة" : "Modern Luxury"} 
                 price="$1,200"
               />
               <DestinationCard 
                 name={isRtl ? "جدة" : "Jeddah"} 
                 image="/dest-jeddah.png" 
                 tag={isRtl ? "بحر وسحر" : "Coastal Bliss"} 
                 price="$950"
               />
            </div>
         </div>
      </section>

      {/* Global Featured Destinations */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#A3E635]" />
              <span className="text-[#22C7F2] text-[10px] font-black uppercase tracking-[0.5em] block">{t.featured.subtitle}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {t.featured.title.split(' ')[0]} <br />
              <span className="text-white/20">{t.featured.title.split(' ').slice(1).join(' ')}</span>
            </h2>
          </div>
          <button className="flex items-center gap-4 text-[#A3E635] font-black text-xs uppercase tracking-[0.2em] group">
            {t.featured.viewAll} 
            <div className={`p-4 rounded-full border border-[#A3E635]/20 group-hover:bg-[#A3E635] group-hover:text-[#0D1B2A] transition-all ${isRtl ? 'rotate-180' : ''}`}>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: isRtl ? "جزر المالديف" : "Maldives", image: "/dest-maldives.png", price: "$1,200", rating: 4.9, tag: "Romantic" },
            { name: isRtl ? "سانتوريني" : "Santorini", image: "/dest-santorini.png", price: "$850", rating: 4.8, tag: "Scenic" },
            { name: isRtl ? "دبي" : "Dubai", image: "/dest-dubai.png", price: "$950", rating: 4.9, tag: "Luxury" }
          ].map((dest, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group dynamic-card relative cursor-pointer h-[550px]"
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
              </div>
              
              <div className="absolute top-8 left-8">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  {dest.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10 z-10">
                <div className="flex justify-between items-end">
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-[#A3E635] fill-[#A3E635]" />
                      <span className="text-xs font-black text-[#22C7F2] uppercase tracking-widest">{dest.rating}</span>
                    </div>
                    <h3 className="text-4xl font-black mb-2 tracking-tighter">{dest.name}</h3>
                  </div>
                  <div className={isRtl ? 'text-left' : 'text-right'}>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{isRtl ? 'تبدأ من' : 'Starting From'}</p>
                    <p className="text-3xl font-black text-[#A3E635]">{dest.price}</p>
                  </div>
                </div>
              </div>

              {/* Hover Effect Reveal */}
              <div className="absolute inset-0 border-2 border-[#A3E635]/0 group-hover:border-[#A3E635]/20 transition-all rounded-[2.5rem] pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DestinationCard({ name, image, tag, price }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative h-[600px] dynamic-card cursor-pointer overflow-hidden"
    >
      <Image src={image} alt={name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent opacity-90" />
      <div className="absolute top-8 left-8">
        <span className="bg-[#A3E635] text-[#0D1B2A] text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
          {tag}
        </span>
      </div>
      <div className="absolute bottom-10 left-10 text-left">
        <h3 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">{name}</h3>
        <p className="text-[#22C7F2] text-xl font-black">{price} <span className="text-[10px] text-white/30 uppercase tracking-widest">Starting</span></p>
      </div>
    </motion.div>
  );
}
