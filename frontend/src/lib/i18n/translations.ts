
export const translations = {
  en: {
    nav: {
      destinations: "Destinations",
      collection: "Collection",
      concierge: "Concierge",
      joinClub: "Join Club",
      logout: "Logout",
      login: "Login",
    },
    hero: {
      subtitle: "Redefining Luxury Travel",
      title: "The World's Most Exclusive Stays",
      exclusive: "Exclusive Stays",
    },
    search: {
      destination: "Destination",
      placeholder: "Search city or hotel...",
      checkIn: "Check-in",
      checkOut: "Check-out",
      explore: "Explore",
      curating: "Curating...",
    },
    featured: {
      subtitle: "Hand-Picked Collections",
      title: "Trending Destinations",
      viewAll: "View All",
    },
    details: {
      back: "Back to Search",
      experience: "The Experience",
      facilities: "World-Class Facilities",
      available: "Available Collections",
      reserve: "Instant Reserve",
      perNight: "Per Night",
      from: "From",
      rating: "Exceptional",
    }
  },
  ar: {
    nav: {
      destinations: "الوجهات",
      collection: "المجموعات",
      concierge: "الكونسيرج",
      joinClub: "انضم للنادي",
      logout: "تسجيل الخروج",
      login: "دخول",
    },
    hero: {
      subtitle: "إعادة تعريف السفر الفاخر",
      title: "أكثر الإقامات حصرياً في العالم",
      exclusive: "إقامات حصرية",
    },
    search: {
      destination: "الوجهة",
      placeholder: "ابحث عن مدينة أو فندق...",
      checkIn: "وصول",
      checkOut: "مغادرة",
      explore: "استكشف",
      curating: "جاري البحث...",
    },
    featured: {
      subtitle: "مجموعات مختارة بعناية",
      title: "الوجهات الرائجة",
      viewAll: "عرض الكل",
    },
    details: {
      back: "العودة للبحث",
      experience: "التجربة",
      facilities: "مرافق عالمية المستوى",
      available: "المجموعات المتاحة",
      reserve: "حجز فوري",
      perNight: "لكل ليلة",
      from: "تبدأ من",
      rating: "استثنائي",
    }
  }
};

export type Language = 'en' | 'ar';
export type TranslationType = typeof translations.en;
