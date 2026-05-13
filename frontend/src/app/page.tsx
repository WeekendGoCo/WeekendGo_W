"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-wider">
              WEEKEND <span className="text-primary">GO</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-primary transition-colors">DESTINATIONS</a>
            <a href="#" className="hover:text-primary transition-colors">LUXURY STAYS</a>
            <a href="#" className="hover:text-primary transition-colors">EXPERIENCES</a>
            <a href="#" className="hover:text-primary transition-colors">ABOUT</a>
          </div>
          <button className="bg-primary text-background px-6 py-2 rounded-full font-bold hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
          <Image 
            src="/hero-bg.png" 
            alt="Luxurious travel destination" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Experience The World In <br />
            <span className="lux-gradient">Unparalleled Luxury</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Curated stays, exclusive experiences, and seamless bookings. Your ultimate getaway begins with Weekend Go.
          </motion.p>

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="glass p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center shadow-2xl"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-text">
              <MapPin className="text-primary w-5 h-5" />
              <div className="text-left w-full">
                <p className="text-xs text-gray-400 font-semibold uppercase">Destination</p>
                <input type="text" placeholder="Where to?" className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500 font-medium" />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <Calendar className="text-primary w-5 h-5" />
              <div className="text-left w-full">
                <p className="text-xs text-gray-400 font-semibold uppercase">Dates</p>
                <p className="text-white font-medium">Select dates</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <Users className="text-primary w-5 h-5" />
              <div className="text-left w-full">
                <p className="text-xs text-gray-400 font-semibold uppercase">Guests</p>
                <p className="text-white font-medium">2 Adults</p>
              </div>
            </div>
            <Link href="/search" className="bg-primary hover:bg-primary-dark text-background p-4 rounded-2xl transition-all transform hover:scale-105 flex items-center justify-center w-full md:w-auto h-full shadow-lg shadow-primary/20">
              <Search className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trending <span className="text-primary">Destinations</span></h2>
            <p className="text-gray-400 max-w-xl">Discover our hand-picked selection of the most sought-after luxury locations around the globe.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors">
            View All <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Maldives", image: "/dest-maldives.png", price: "$1,200", rating: 4.9 },
            { name: "Santorini", image: "/dest-santorini.png", price: "$850", rating: 4.8 },
            { name: "Dubai", image: "/dest-dubai.png", price: "$950", rating: 4.9 }
          ].map((dest, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group rounded-3xl overflow-hidden glass border border-white/10 relative cursor-pointer"
            >
              <div className="h-80 relative w-full">
                <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span>{dest.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Starting from</p>
                    <p className="text-xl font-bold text-primary">{dest.price} <span className="text-sm font-normal text-gray-300">/night</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
