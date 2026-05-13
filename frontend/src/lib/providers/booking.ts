
const RAPIDAPI_BASE_URL = 'https://booking-com15.p.rapidapi.com/api/v1';

export interface BookingHotel {
  hotel_id: string;
  hotel_name: string;
  review_score?: number;
  review_nr?: number;
  stars?: number;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  currency?: string;
  price?: number;
  url?: string;
  image?: string;
}

export async function fetchDestinationSuggestions(query: string) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) return [];

  try {
    const res = await fetch(`${RAPIDAPI_BASE_URL}/hotels/searchDestination?query=${encodeURIComponent(query)}`, {
      headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost! }
    });
    const data = await res.json();
    
    if (data.message && data.message.includes("exceeded")) {
      console.warn("RapidAPI Quota Exceeded. Using fallback mock suggestions.");
      return [
        { dest_id: '1', label: 'Dubai, UAE', cityName: 'Dubai', country: 'United Arab Emirates' },
        { dest_id: '2', label: 'London, UK', cityName: 'London', country: 'United Kingdom' }
      ];
    }
    
    return data.data || [];
  } catch (error) {
    console.error("Autocomplete Error:", error);
    return [];
  }
}

export async function fetchHotelDetails(hotelId: string) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) return null;

  try {
    const res = await fetch(`${RAPIDAPI_BASE_URL}/hotels/getHotelDetails?hotel_id=${hotelId}`, {
      headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost! }
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Fetch Hotel Details Error:", error);
    return null;
  }
}

export async function fetchHotelPhotos(hotelId: string) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) return [];

  try {
    const res = await fetch(`${RAPIDAPI_BASE_URL}/hotels/getHotelPhotos?hotel_id=${hotelId}`, {
      headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost! }
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch Hotel Photos Error:", error);
    return [];
  }
}

export async function fetchHotelRooms(params: { hotelId: string, checkin: string, checkout: string, adults?: number }) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) return [];

  try {
    const url = new URL(`${RAPIDAPI_BASE_URL}/hotels/getHotelRooms`);
    url.searchParams.append('hotel_id', params.hotelId);
    url.searchParams.append('arrival_date', params.checkin);
    url.searchParams.append('departure_date', params.checkout);
    url.searchParams.append('adults_number', (params.adults || 2).toString());
    url.searchParams.append('units', 'metric');

    const res = await fetch(url.toString(), {
      headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost! }
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch Hotel Rooms Error:", error);
    return [];
  }
}

export async function fetchHotelPolicies(hotelId: string) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) return [];

  try {
    const res = await fetch(`${RAPIDAPI_BASE_URL}/hotels/getHotelPolicies?hotel_id=${hotelId}`, {
      headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost! }
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch Hotel Policies Error:", error);
    return [];
  }
}

export async function fetchBookingHotels(params: {
  destinationName?: string;
  destId?: string;
  checkin: string;
  checkout: string;
  guests?: number;
}) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) return mockBookingData();

  try {
    let destId = params.destId;
    
    if (!destId && params.destinationName) {
      const searchRes = await fetch(`${RAPIDAPI_BASE_URL}/hotels/searchDestination?query=${encodeURIComponent(params.destinationName)}`, {
        headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost! }
      });
      const searchData = await searchRes.json();
      if (searchData.status && searchData.data && searchData.data.length > 0) {
        destId = searchData.data[0].dest_id;
      }
    }

    if (!destId) {
       console.warn("No destination ID found. Using mock data.");
       return mockBookingData();
    }

    const url = new URL(`${RAPIDAPI_BASE_URL}/hotels/searchHotels`);
    url.searchParams.append('dest_id', destId);
    url.searchParams.append('search_type', 'CITY');
    url.searchParams.append('arrival_date', params.checkin);
    url.searchParams.append('departure_date', params.checkout);
    url.searchParams.append('adults_number', (params.guests || 2).toString());
    url.searchParams.append('units', 'metric');
    url.searchParams.append('room_number', '1');
    url.searchParams.append('page_number', '1');
    url.searchParams.append('rows', '50'); 

    const response = await fetch(url.toString(), {
      headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost! }
    });

    const data = await response.json();
    
    if (data.message && data.message.includes("exceeded")) {
       console.error("RapidAPI Quota Exceeded:", data.message);
       return mockBookingData();
    }

    const results = data.data?.hotels || data.data || [];
    
    if (results.length === 0) return mockBookingData();

    return results.map((h: any) => {
      const property = h.property || h;
      
      let price = 0;
      let currency = 'USD';

      const pricePath1 = property.priceBreakdown?.grossAmount;
      const pricePath2 = h.price_breakdown?.gross_amount;
      const pricePath3 = h.price_breakdown;

      if (pricePath1?.value) {
        price = pricePath1.value;
        currency = pricePath1.currency || 'USD';
      } else if (pricePath2?.value) {
        price = pricePath2.value;
        currency = pricePath2.currency || 'USD';
      } else if (pricePath3?.all_inclusive_amount) {
        price = pricePath3.all_inclusive_amount;
        currency = h.currency || 'USD';
      } else if (h.price) {
        price = h.price;
      }

      return {
        hotel_id: property.id || h.hotel_id,
        hotel_name: property.name || h.hotel_name || "Luxury Stay",
        review_score: property.reviewScore || h.review_score || 4.5,
        review_nr: property.reviewCount || h.review_nr || 0,
        price: Math.round(price),
        currency: currency,
        image: property.photoUrls?.[0] || property.mainPhotoUrl || h.image_url,
        address: property.wishlistName || h.address || "Prime Location",
        stars: property.accuratePropertyClass || h.stars
      };
    });

  } catch (error) {
    console.error("Booking Fetch Error:", error);
    return mockBookingData();
  }
}

function mockBookingData(): BookingHotel[] {
  return [
    { 
      hotel_id: 'M1', 
      hotel_name: 'Burj Al Arab Jumeirah', 
      review_score: 9.8, 
      price: 1890, 
      currency: 'USD', 
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
      address: 'Jumeirah Street, Dubai',
      stars: 5
    },
    { 
      hotel_id: 'M2', 
      hotel_name: 'Atlantis The Royal', 
      review_score: 9.7, 
      price: 1200, 
      currency: 'USD', 
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
      address: 'Palm Jumeirah, Dubai',
      stars: 5
    },
    { 
      hotel_id: 'M3', 
      hotel_name: 'The Ritz-Carlton, London', 
      review_score: 9.6, 
      price: 950, 
      currency: 'USD', 
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
      address: 'Piccadilly, London',
      stars: 5
    }
  ];
}
