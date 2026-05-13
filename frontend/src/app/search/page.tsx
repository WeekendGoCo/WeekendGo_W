import { MapPin, Star, Wifi, Coffee, Pool, Search as SearchIcon, Filter } from "lucide-react";
import Image from "next/image";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-8 flex flex-wrap gap-4 items-center justify-between text-white shadow-xl">
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            <div className="bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
              <MapPin size={18} className="text-amber-400" />
              <span>Dubai, UAE</span>
            </div>
            <div className="bg-slate-800 rounded-lg px-4 py-2">
              <span>Oct 15 - Oct 22</span>
            </div>
            <div className="bg-slate-800 rounded-lg px-4 py-2">
              <span>2 Guests, 1 Room</span>
            </div>
          </div>
          <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
            <SearchIcon size={18} /> Modify Search
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-lg mb-4 border-b border-slate-100 pb-2">
                <Filter size={20} />
                Filters
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Price per night</h4>
                  <input type="range" className="w-full accent-amber-500" />
                  <div className="flex justify-between text-sm text-slate-500 mt-1">
                    <span>$100</span>
                    <span>$2000+</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="font-semibold mb-2">Star Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3].map(star => (
                      <label key={star} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" defaultChecked={star >= 4} />
                        <span className="flex items-center gap-1 text-sm">
                          {star} <Star size={14} className="fill-amber-400 text-amber-400" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="font-semibold mb-2">Amenities</h4>
                  <div className="space-y-2">
                    {['Pool', 'Spa', 'Beachfront', 'Free Breakfast'].map(amenity => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">142 Luxury Stays Found</h2>
              <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 outline-none">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>

            {/* Hotel Cards */}
            <HotelCard 
              name="Atlantis The Royal"
              location="Palm Jumeirah, Dubai"
              rating={4.9}
              reviews={1204}
              price={850}
              image="/dest-dubai.png"
              isExclusive={true}
            />
            <HotelCard 
              name="Burj Al Arab Jumeirah"
              location="Umm Suqeim, Dubai"
              rating={5.0}
              reviews={843}
              price={1200}
              image="/dest-dubai.png"
              isExclusive={false}
            />
            <HotelCard 
              name="One&Only The Palm"
              location="Palm Jumeirah, Dubai"
              rating={4.8}
              reviews={560}
              price={720}
              image="/dest-dubai.png"
              isExclusive={false}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

function HotelCard({ name, location, rating, reviews, price, image, isExclusive }: { name: string, location: string, rating: number, reviews: number, price: number, image: string, isExclusive: boolean }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow">
      <div className="relative w-full sm:w-72 h-64 sm:h-auto flex-shrink-0">
        <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 288px" />
        {isExclusive && (
          <div className="absolute top-4 left-4 bg-slate-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Weekend Go Exclusive
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{name}</h3>
              <p className="text-slate-500 flex items-center gap-1 text-sm">
                <MapPin size={14} /> {location}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 bg-slate-900 text-white px-2 py-1 rounded">
                <span className="font-bold">{rating}</span>
                <Star size={14} className="fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs text-slate-500 mt-1">{reviews} reviews</span>
            </div>
          </div>
          
          <div className="mt-4 flex gap-3 text-slate-400">
            <span className="flex items-center gap-1 text-sm"><Pool size={16} /> Pool</span>
            <span className="flex items-center gap-1 text-sm"><Wifi size={16} /> Free WiFi</span>
            <span className="flex items-center gap-1 text-sm"><Coffee size={16} /> Breakfast</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-end border-t border-slate-100 pt-4">
          <div>
            <p className="text-sm text-slate-500">Starting from</p>
            <p className="text-3xl font-bold text-slate-900">${price} <span className="text-sm font-normal text-slate-500">/ night</span></p>
          </div>
          <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors">
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
}
