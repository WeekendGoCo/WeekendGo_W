
import { NextResponse } from 'next/server';
import { fetchHotelDetails, fetchHotelPhotos, fetchHotelRooms } from '@/lib/providers/booking';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get('hotelId');
  const checkIn = searchParams.get('checkIn') || '2026-10-15';
  const checkOut = searchParams.get('checkOut') || '2026-10-22';

  if (!hotelId) {
    return NextResponse.json({ success: false, message: "Hotel ID is required" }, { status: 400 });
  }

  try {
    // Parallel fetching for performance
    const [details, photos, rooms, policies] = await Promise.all([
      fetchHotelDetails(hotelId),
      fetchHotelPhotos(hotelId),
      fetchHotelRooms({ hotelId, checkin: checkIn, checkout: checkOut }),
      fetchHotelPolicies(hotelId)
    ]);

    // If details are empty (quota exceeded or not found), provide rich mock data
    if (!details || (details.message && details.message.includes("exceeded"))) {
      return NextResponse.json({
        success: true,
        isMock: true,
        data: getMockHotelDetails(hotelId),
        photos: getMockPhotos(),
        rooms: getMockRooms(),
        policies: getMockPolicies()
      });
    }

    return NextResponse.json({
      success: true,
      data: details,
      photos: photos,
      rooms: rooms,
      policies: policies
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

function getMockHotelDetails(id: string) {
  return {
    hotel_id: id,
    hotel_name: "The Royal Atlantis Resort & Residences",
    description: "Experience world-class service at The Royal Atlantis Resort & Residences. Located on the crescent of The Palm next to Atlantis, The Palm, this architectural masterpiece features 795 rooms, suites, and signature penthouses. With 17 restaurants and bars, including 8 by celebrity chefs, a 22nd-floor infinity pool, and a 2km private beach, it redefines luxury in Dubai.",
    address: "Palm Jumeirah, Dubai, UAE",
    stars: 5,
    rating: 9.7,
    review_nr: 1240,
    facilities: ["Swimming Pool", "Spa", "Fitness Center", "Beachfront", "Room Service", "Bar", "Free WiFi"],
    checkin: { from: "15:00" },
    checkout: { until: "12:00" }
  };
}

function getMockPhotos() {
  return [
    { url_max: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" },
    { url_max: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200" },
    { url_max: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200" },
    { url_max: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200" }
  ];
}

function getMockRooms() {
  return [
    {
      room_id: "R1",
      room_name: "Palm Seaview King Room",
      price: 1200,
      currency: "USD",
      facilities: ["Ocean View", "Balcony", "King Bed", "Minibar"],
      photos: [{ url_max: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800" }]
    },
    {
      room_id: "R2",
      room_name: "Royal Suite with Terrace",
      price: 2500,
      currency: "USD",
      facilities: ["Private Terrace", "Jacuzzi", "Butler Service", "Living Area"],
      photos: [{ url_max: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" }]
    }
  ];
}

function getMockPolicies() {
  return [
    { title: "Check-in", content: "From 15:00 hours" },
    { title: "Check-out", content: "Until 12:00 hours" },
    { title: "Cancellation", content: "Free cancellation until 48 hours before arrival." },
    { title: "Children", content: "Children of all ages are welcome." }
  ];
}
