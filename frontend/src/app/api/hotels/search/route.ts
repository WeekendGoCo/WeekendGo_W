
import { NextResponse } from 'next/server';
import { fetchBookingHotels } from '@/lib/providers/booking';

/**
 * Search API Route
 * Handles hotel searches across multiple providers and merges results.
 */
export async function POST(request: Request) {
  try {
    const { destination, destId, checkIn, checkOut, guests } = await request.json();

    if (!destination && !destId) {
      return NextResponse.json({ success: false, message: "Destination or ID is required" }, { status: 400 });
    }

    // 1. Fetch from Booking.com API (Primary Provider via RapidAPI)
    const bookingResults = await fetchBookingHotels({
      destinationName: destination,
      destId: destId, // Pass the direct ID if available
      checkin: checkIn,
      checkout: checkOut,
      guests: guests || 2
    });

    // 2. Map Provider Data to Internal Format
    // This normalization ensures the frontend gets a consistent object structure.
    const normalizedResults = bookingResults.map((h: any) => ({
      providerId: `BKG_${h.hotel_id}`,
      name: h.hotel_name,
      rating: h.review_score ? (h.review_score > 10 ? h.review_score / 20 : h.review_score / 2) : 4.5,
      reviews: h.review_nr || 0,
      price: h.price,
      currency: h.currency || 'USD',
      image: h.image,
      location: h.address || h.city || destination,
      isExclusive: h.price < 500, // Simulating an "exclusive" logic for UI demo
    }));

    // 3. Sorting (Default: Recommended / Best Rated)
    const sortedResults = normalizedResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    console.log(`[API Search] Found ${sortedResults.length} results for ${destination}`);

    return NextResponse.json({
      success: true,
      count: sortedResults.length,
      data: sortedResults
    });

  } catch (error: any) {
    console.error("[API Search Error]:", error.message);
    return NextResponse.json({ 
      success: false, 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  }
}
