import { NextResponse } from 'next/server';

// Simulating the Backend Aggregator Logic
export async function POST(request: Request) {
  try {
    const { destination, checkIn, checkOut, guests } = await request.json();

    // 1. Simulate API Call to WebBeds (Live Pricing & Availability)
    const webBedsData = await simulateWebBedsAPI(destination);

    // 2. Simulate API Call to Booking.com (Taxonomy & Ratings)
    const bookingData = await simulateBookingAPI(destination);

    // 3. Simulate DB Call to Local Contracts (Micro-Extranet Exclusives)
    const localContracts = await fetchLocalContracts(destination);

    // 4. Mapping & De-duplication Engine
    // In a real app, we use GIATA IDs or fuzzy name matching. Here we simulate the merge.
    const mergedResults = mergeAndDeduplicate(webBedsData, bookingData, localContracts);

    // 5. Apply ranking/sorting (e.g., prioritize local contracts)
    const sortedResults = mergedResults.sort((a, b) => {
      if (a.isExclusive && !b.isExclusive) return -1;
      if (!a.isExclusive && b.isExclusive) return 1;
      return a.price - b.price; // Default sort by price
    });

    return NextResponse.json({
      success: true,
      count: sortedResults.length,
      data: sortedResults
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// --- Stub Functions to Simulate Architecture ---

async function simulateWebBedsAPI(destination: string) {
  return [
    { providerId: 'WB001', name: 'Atlantis The Royal', price: 900, available: true },
    { providerId: 'WB002', name: 'Burj Al Arab', price: 1250, available: true }
  ];
}

async function simulateBookingAPI(destination: string) {
  return [
    { providerId: 'BKG101', name: 'Atlantis The Royal', rating: 4.9, reviews: 1200, amenities: ['Pool', 'Spa'] },
    { providerId: 'BKG102', name: 'Burj Al Arab Jumeirah', rating: 5.0, reviews: 800, amenities: ['Beach', 'Butler'] }
  ];
}

async function fetchLocalContracts(destination: string) {
  // Simulating our Prisma DB query
  return [
    { id: 'LC_001', hotelName: 'Atlantis The Royal', price: 850, isExclusive: true }
  ];
}

function mergeAndDeduplicate(webbeds: any[], booking: any[], local: any[]) {
  // Simplified deduplication based on exact name match for demonstration
  const finalHotels = [];

  const allNames = new Set([
    ...webbeds.map(h => h.name),
    ...booking.map(h => h.name.replace(' Jumeirah', '')), // Simulating fuzzy match
    ...local.map(h => h.hotelName)
  ]);

  for (const name of allNames) {
    const wData = webbeds.find(h => h.name === name) || { price: 9999 };
    const bData = booking.find(h => h.name.includes(name)) || { rating: 4.5, reviews: 100, amenities: [] };
    const lData = local.find(h => h.hotelName === name);

    // Local contract price overrides WebBeds if available
    const finalPrice = lData ? lData.price : wData.price;
    const isExclusive = !!lData;

    finalHotels.push({
      name,
      price: finalPrice,
      rating: bData.rating,
      reviews: bData.reviews,
      amenities: bData.amenities,
      isExclusive,
      image: '/dest-dubai.png' // Fallback to TBO cached image
    });
  }

  return finalHotels;
}
