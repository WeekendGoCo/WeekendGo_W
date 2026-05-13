import Link from "next/link";
import { Plane, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0D1B2A] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <Plane className="w-8 h-8 text-[#A3E635] transform -rotate-12" />
              <span className="text-xl font-black tracking-tight text-white uppercase">
                WEEKEND <span className="text-[#A3E635]">GO</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Your gateway to extraordinary travel experiences. We curate the world's most exclusive stays for the discerning traveler.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><FooterLink href="/search">Explore Destinations</FooterLink></li>
              <li><FooterLink href="#">Our Collections</FooterLink></li>
              <li><FooterLink href="#">Travel Concierge</FooterLink></li>
              <li><FooterLink href="#">Partner with Us</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Destinations</h4>
            <ul className="space-y-4">
              <li><FooterLink href="#">Saudi Arabia</FooterLink></li>
              <li><FooterLink href="#">United Arab Emirates</FooterLink></li>
              <li><FooterLink href="#">Maldives & Islands</FooterLink></li>
              <li><FooterLink href="#">European Getaways</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Concierge</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/40 hover:text-[#A3E635] transition-colors cursor-pointer">
                <Mail size={16} />
                <span className="text-xs font-bold">vip@weekendgo.travel</span>
              </div>
              <div className="flex items-center gap-4 text-white/40 hover:text-[#A3E635] transition-colors cursor-pointer">
                <Phone size={16} />
                <span className="text-xs font-bold">+966 500 000 000</span>
              </div>
              <div className="flex items-start gap-4 text-white/40">
                <MapPin size={16} className="shrink-0" />
                <span className="text-xs font-bold">King Fahd Road, Riyadh, KSA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            © 2026 Weekend Go. All rights reserved. 
            <span className="mx-4 text-white/5">|</span>
            Designed for Excellence
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-[#A3E635] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#A3E635] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="text-xs font-bold text-white/40 hover:text-[#A3E635] transition-colors flex items-center gap-2 group">
      <span className="w-0 h-[1px] bg-[#A3E635] transition-all group-hover:w-4" />
      {children}
    </Link>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#A3E635] hover:text-[#0D1B2A] hover:border-[#A3E635] transition-all">
      {icon}
    </a>
  );
}
