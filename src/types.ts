export type AdSlotFormat = 
  | 'feed_post'
  | 'reel_feature'
  | 'story_swipe'
  | 'group_pinned'
  | 'cover_takeover'
  | 'bundle_blitz';

export type ProductTier = 'economy' | 'standard' | 'express_priority' | 'all_inclusive_bundle';

export interface StandardizedProduct {
  id: string;
  format: AdSlotFormat;
  tier: ProductTier;
  title: string;
  badge?: string; // e.g. "⚡ Most Popular" or "🚀 Fast 24h Delivery"
  description: string;
  price: number; // in USD
  turnaroundHours: number; // e.g. 24, 48, 72
  estimatedBroadcastTime: string; // e.g. "Tomorrow at 6:00 PM (Peak Reach)"
  deliverables: string[];
  bestFor: string;
  isPopular?: boolean;
}

export interface AudienceDemographics {
  topCountry: string;
  countryShare: number; // e.g. 64%
  primaryAgeBracket: string; // e.g. "25-34"
  ageBracketShare: number; // e.g. 52%
  genderRatio: {
    male: number;
    female: number;
  };
}

export interface CreatorStore {
  storeSlug: string; // e.g. "techpulse" -> /store/techpulse
  storeTitle: string;
  tagline: string;
  announcement?: string;
  facebookPageUrl: string;
  responseTimeMinutes: number; // e.g. 15 (Average response time)
  acceptanceRate: number; // e.g. 98%
  products: StandardizedProduct[];
  bioNotice?: string;
}

export interface FacebookPage {
  id: string;
  name: string;
  handle: string; // e.g. "@techpulseweekly"
  category: 'Tech & AI' | 'Food & Dining' | 'Fitness & Wellness' | 'Business & Finance' | 'Home & Living' | 'Gaming & Esports';
  verified: boolean;
  followerCount: number;
  engagementRate: number; // e.g. 4.8%
  avgReachPerPost: number;
  coverImage: string;
  avatarImage: string;
  bio: string;
  rating: number;
  completedBookings: number;
  responseTimeHours: number;
  pageCreationYear: number;
  demographics: AudienceDemographics;
  slots: AdSlotOption[];
  store: CreatorStore;
  featuredPostPreview?: {
    caption: string;
    likes: string;
    comments: string;
    shares: string;
  };
}

export interface AdSlotOption {
  id: string;
  format: AdSlotFormat;
  name: string;
  description: string;
  price: number; // in USD
  turnaroundDays: number;
  durationDays: number; // e.g. permanent or 7 days
  deliverables: string[];
  bestFor: string;
}

export type BookingStatus =
  | 'pending_creator_review' // Dispatched to Creator
  | 'accepted'              // Driver Accepted
  | 'draft_submitted'       // En Route / Draft in review
  | 'revision_requested'
  | 'scheduled'
  | 'published_live'        // Arrived / Live on Facebook
  | 'completed_payout';     // Ride Finished & Paid

export interface CampaignMessage {
  id: string;
  sender: 'advertiser' | 'creator';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface BookingOrder {
  id: string;
  pageId: string;
  pageName: string;
  pageHandle: string;
  pageAvatar: string;
  storeSlug: string;
  slotId: string;
  slotName: string;
  slotFormat: AdSlotFormat;
  tier?: ProductTier;
  
  // Advertiser Info
  businessName: string;
  businessEmail: string;
  websiteUrl: string;
  
  // Brief & Creative
  campaignGoal: 'Website Traffic' | 'Lead Generation' | 'App Installs' | 'Brand Awareness';
  captionDraft: string;
  mediaUrl?: string;
  talkingPoints: string;
  targetDate: string;
  estimatedBroadcastTime?: string;
  
  // Escrow & Financials
  slotPrice: number;
  escrowFee: number;
  platformFee: number;
  totalPaid: number;
  escrowStatus: 'held_in_escrow' | 'released_to_creator' | 'refunded';
  
  // Execution & Verification
  status: BookingStatus;
  createdAt: string;
  livePostUrl?: string;
  proofScreenshotUrl?: string;
  publishedAt?: string;
  metrics?: {
    impressions: number;
    reach: number;
    clicks: number;
    reactions: number;
    comments: number;
    shares: number;
  };
  messages: CampaignMessage[];
}

export interface CreatorWallet {
  availableBalance: number;
  escrowPendingBalance: number;
  totalEarned: number;
  payoutAccount: string;
}

export type ThemePalette = 'violet' | 'emerald' | 'sapphire' | 'amber' | 'rose';

export interface ThemeOption {
  id: ThemePalette;
  name: string;
  primaryColor: string;
  gradient: string;
  dotClass: string;
}
