export type Region = 'All' | 'Kashmir' | 'Ladakh' | 'Vaishno Devi Katra' | 'Combo Circuits';

export type TravelStyle = 
  | 'All'
  | 'Family & Honeymoon' 
  | 'Spiritual & Pilgrimage' 
  | 'Adventure & High Passes' 
  | 'Houseboats & Shikara' 
  | 'Offbeat Valleys';

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string;
  lodging: string;
  activityHighlight: string;
}

export interface DepartureDate {
  id: string;
  startDate: string;
  endDate: string;
  spotsLeft: number;
  priceUSD: number;
  status: 'Available' | 'Few Spots Left' | 'Guaranteed Departure';
}

export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  region: Region;
  country: string;
  durationDays: number;
  groupSizeMax: number;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  difficulty: 'Leisurely' | 'Moderate' | 'Active';
  style: TravelStyle;
  badge?: string;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  departures: DepartureDate[];
}

export interface TravelerReview {
  id: string;
  tourId: string;
  tourTitle: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  verifiedTrip: boolean;
}

export interface CustomTripInquiry {
  destination: string;
  travelStyle: string;
  partyType: string;
  guestCount: number;
  durationDays: number;
  lodgingType: string;
  season: string;
  estimatedBudgetPerPerson: number;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface BookingDetails {
  tourId: string;
  departureId: string;
  adultsCount: number;
  childrenCount: number;
  singleRoomSupplement: boolean;
  airportChauffeur: boolean;
  vipLoungeAccess: boolean;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  totalPriceUSD: number;
  bookingRef: string;
}

export interface TravelLeadQuery {
  id: string;
  source: 'hero_form' | 'contact_form' | 'custom_planner' | 'booking_modal' | 'consultation';
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate?: string;
  duration?: string;
  travelers?: string;
  adults?: number;
  children?: number;
  cabType?: string;
  hotelCategory?: string;
  budget?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'archived';
  adminNotes?: string;
  createdAt: string;
  whatsappUrl: string;
}

export interface AdminStats {
  total: number;
  new: number;
  contacted: number;
  quoted: number;
  booked: number;
  emailAlertsTo: string;
  whatsappHotline: string;
}

