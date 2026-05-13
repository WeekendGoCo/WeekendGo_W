
import { NextResponse } from 'next/server';
import { fetchDestinationSuggestions } from '@/lib/providers/booking';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query || query.length < 2) {
    return NextResponse.json({ data: [] });
  }

  try {
    const suggestions = await fetchDestinationSuggestions(query);
    
    // Map to a simpler format for the frontend
    const formatted = suggestions.map((s: any) => ({
      id: s.dest_id,
      name: s.label || s.name,
      type: s.dest_type,
      cityName: s.city_name,
      country: s.country
    }));

    return NextResponse.json({ data: formatted });
  } catch (error) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
