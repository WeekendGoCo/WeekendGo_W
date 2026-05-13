
"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { 
  Star, MapPin, Calendar, Users, Coffee, 
  Wifi, WavesLadder as Pool, Tv, Wind, ShieldCheck, 
  ChevronRight, ArrowLeft, Loader2, Heart,
  Share2, Camera, Info, CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function HotelDetails() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { t, isRtl } = useTranslation();
  const checkIn = searchParams.get("checkIn") || "2026-10-15";
  const checkOut = searchParams.get("checkOut") || "2026-10-22";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/hotels/details?hotelId=${id}&checkIn=${checkIn}&checkOut=${checkOut}`);
        const result = await res.json();
        if (result.success) {
          setData(result);
        }
      } catch (err) {
        console.error("Failed to fetch hotel details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, checkIn, checkOut]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex flex-col items-center justify-center text-white">
        <div className="relative">
          <Loader2 className="animate-spin text-[#A3E635] mb-8" size={64} strokeWidth={1} />
          <div className="absolute inset-0 blur-3xl bg-[#A3E635]/20" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#22C7F2] animate-pulse">
          {isRtl ? 'جاري تحضير تجربتك الحصرية' : 'Crafting your exclusive experience'}
        </p>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen bg-[#0D1B2A] text-white p-20 text-center">Hotel not found.</div>;

  const hotel = data.data;
  const photos = data.photos || [];
  const rooms = data.rooms || [];
  const policies = data.policies || [];

  return (
    <main className={`min-h-screen bg-[#0D1B2A] text-white pb-32 ${isRtl ? 'font-arabic' : ''}`}>
      <Navbar />

      {/* Hero Image Gallery */}
      <section className="pt-32 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/search" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#A3E635] hover:text-[#0D1B2A] transition-all">
            <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
          </Link>
          <div className="h-[1px] flex-1 bg-white/5" />
          <div className="flex gap-4">
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><Share2 size={18} /></button>
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-500 hover:border-red-500 transition-all"><Heart size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[650px]">
          <div className="lg:col-span-3 relative dynamic-card cursor-pointer group shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <Image 
              src={photos[activeImage]?.url_max || '/dest-dubai.png'} 
              alt={hotel.hotel_name} 
              fill 
              className="object-cover transition-transform duration-[2s] group-hover:scale-105" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent opacity-80" />
            <div className={`absolute bottom-12 ${isRtl ? 'right-12 text-right' : 'left-12 text-left'}`}>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < (hotel.stars || 5) ? "fill-[#A3E635] text-[#A3E635]" : "text-white/10"} />
                ))}
                <span className="text-[9px] font-black uppercase tracking-widest text-[#22C7F2] bg-[#22C7F2]/10 px-3 py-1 rounded-full ml-2">
                  {hotel.hotel_name.includes('Resort') ? 'Resort' : 'Luxury Stay'}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none">{hotel.hotel_name}</h1>
              <p className="flex items-center gap-2 text-white/60 font-bold">
                <MapPin className="text-[#A3E635]" size={18} /> {hotel.address}
              </p>
            </div>
            <button className="absolute bottom-12 right-12 bg-[#0D1B2A]/60 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#A3E635] hover:text-[#0D1B2A] transition-all">
              <Camera size={18} /> {photos.length} {isRtl ? 'صورة' : 'Photos'}
            </button>
          </div>
          <div className="hidden lg:flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {photos.slice(0, 8).map((photo: any, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`relative h-[120px] rounded-[1.5rem] overflow-hidden cursor-pointer border-2 transition-all duration-500 ${activeImage === idx ? 'border-[#A3E635] scale-[0.98]' : 'border-transparent hover:border-white/20'}`}
              >
                <Image src={photo.url_max} alt="Gallery" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="mt-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-24">
          {/* Description */}
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <div className={`flex items-center gap-4 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="h-[1px] w-12 bg-[#A3E635]" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#22C7F2]">{t.details.experience}</h2>
            </div>
            <p className="text-2xl text-white/80 leading-relaxed font-bold tracking-tight">
              {hotel.description || "A sanctuary of unparalleled luxury and sophisticated design awaits at this world-class destination."}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className={`text-3xl font-black mb-12 tracking-tighter ${isRtl ? 'text-right' : 'text-left'}`}>{t.details.facilities}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <AmenityItem icon={<Pool size={22} />} text={isRtl ? "مسبح توقيع" : "Signature Pool"} />
              <AmenityItem icon={<Wifi size={22} />} text={isRtl ? "إنترنت ألياف" : "Fiber Internet"} />
              <AmenityItem icon={<Coffee size={22} />} text={isRtl ? "مطعم فاخر" : "Fine Dining"} />
              <AmenityItem icon={<Wind size={22} />} text={isRtl ? "تكييف كامل" : "Full A/C"} />
              <AmenityItem icon={<Tv size={22} />} text={isRtl ? "تلفاز ذكي" : "Smart TV"} />
              <AmenityItem icon={<ShieldCheck size={22} />} text={isRtl ? "أمن 24/7" : "24/7 Security"} />
            </div>
          </div>

          {/* Rooms Selection */}
          <div>
            <div className="flex justify-between items-end mb-12">
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h3 className="text-4xl font-black tracking-tighter mb-2">{t.details.available}</h3>
                <div className={`h-1 w-20 bg-[#A3E635] ${isRtl ? 'ml-auto' : ''}`} />
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{isRtl ? 'الأسعار المختارة' : 'Curated rates'}</p>
            </div>
            <div className="space-y-10">
              {rooms.map((room: any, idx: number) => (
                <RoomCard key={idx} room={room} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Book */}
        <aside className="space-y-10">
          <div className="bg-[#1F2937]/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 sticky top-32 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
            <div className="flex justify-between items-start mb-10">
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#22C7F2] mb-2">{t.details.from}</p>
                <p className="text-5xl font-black tracking-tighter text-white">${hotel.price || 850}</p>
                <p className="text-[10px] font-bold text-white/30 uppercase mt-1 tracking-widest">{t.details.perNight}</p>
              </div>
              <div className="bg-[#A3E635] text-[#0D1B2A] px-5 py-3 rounded-[1.5rem] text-center shadow-[0_10px_20px_rgba(163,230,53,0.2)]">
                <p className="text-2xl font-black">{hotel.rating || 9.5}</p>
                <p className="text-[9px] font-black uppercase tracking-tighter">{t.details.rating}</p>
              </div>
            </div>

            <div className="space-y-5 mb-10">
              <div className="p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-[#A3E635]/30 transition-all">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">{isRtl ? 'مدة الإقامة' : 'Stay Duration'}</p>
                <div className="flex justify-between items-center text-sm font-bold text-white">
                  <span>{checkIn}</span>
                  <ChevronRight size={14} className="text-[#A3E635]" />
                  <span>{checkOut}</span>
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-[#A3E635]/30 transition-all">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">{isRtl ? 'الضيوف' : 'Guests'}</p>
                <div className="flex items-center gap-3 text-sm font-black text-white">
                  <Users size={18} className="text-[#22C7F2]" /> 2 {isRtl ? 'بالغين' : 'Adults'}
                </div>
              </div>
            </div>

            <button className="w-full bg-[#A3E635] hover:bg-white text-[#0D1B2A] font-black py-6 rounded-[1.8rem] transition-all transform hover:scale-[1.02] shadow-[0_20px_40px_rgba(163,230,53,0.3)] uppercase tracking-[0.2em] text-[11px]">
              {t.details.reserve}
            </button>
            <p className="text-center text-[9px] text-white/30 mt-6 font-bold tracking-widest uppercase italic">
              Exclusive Weekend Go perks applied
            </p>
          </div>

          <div className="bg-[#1F2937]/30 border border-white/5 rounded-[2.5rem] p-10">
            <h4 className={`text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Info size={18} className="text-[#22C7F2]" /> {isRtl ? 'معلومات مفيدة' : 'Useful Info'}
            </h4>
            <div className="space-y-6 text-xs font-bold text-white/40">
              {policies.length > 0 ? policies.map((p: any, i: number) => (
                <div key={i} className="flex justify-between gap-4 border-b border-white/5 pb-4 last:border-none">
                  <span className="shrink-0">{p.title}</span>
                  <span className="text-white text-right">{p.content}</span>
                </div>
              )) : (
                <>
                  <div className="flex justify-between"><span>Check-in</span> <span className="text-white">From 15:00</span></div>
                  <div className="flex justify-between"><span>Check-out</span> <span className="text-white">Until 12:00</span></div>
                  <div className="flex justify-between"><span>Cancellation</span> <span className="text-[#A3E635]">Free before 48h</span></div>
                </>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function AmenityItem({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-5 group cursor-default">
      <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 group-hover:border-[#A3E635]/30 group-hover:bg-[#A3E635]/5 transition-all text-white/30 group-hover:text-[#A3E635]">
        {icon}
      </div>
      <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{text}</span>
    </div>
  );
}

function RoomCard({ room }: { room: any }) {
  const { isRtl } = useTranslation();
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#1F2937]/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row group"
    >
      <div className="relative w-full md:w-[350px] h-[300px] md:h-auto overflow-hidden">
        <Image 
          src={room.photos?.[0]?.url_max || room.image || '/dest-dubai.png'} 
          alt={room.room_name} 
          fill 
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] to-transparent opacity-40" />
      </div>
      <div className="p-10 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-3xl font-black mb-6 tracking-tighter">{room.room_name}</h4>
          <div className="flex flex-wrap gap-3 mb-8">
            {room.facilities?.slice(0, 5).map((f: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#22C7F2] bg-[#22C7F2]/5 px-4 py-2 rounded-xl border border-[#22C7F2]/10">
                <CheckCircle2 size={12} strokeWidth={3} /> {f}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-end border-t border-white/5 pt-8">
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{isRtl ? 'لكل ليلة' : 'Per Night'}</p>
            <p className="text-4xl font-black text-white">${room.price} <span className="text-sm font-bold text-white/20 tracking-widest">USD</span></p>
          </div>
          <button className="bg-white/5 border border-white/10 text-white font-black px-10 py-4 rounded-[1.2rem] hover:bg-[#A3E635] hover:text-[#0D1B2A] hover:border-[#A3E635] transition-all text-[10px] uppercase tracking-widest">
            {isRtl ? 'اختر الغرفة' : 'Select Collection'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
