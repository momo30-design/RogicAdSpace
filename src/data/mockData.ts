import { FacebookPage, BookingOrder } from '../types';

export const HERO_IMAGE = '/src/assets/images/adspace_hero_workspace_1791543122669.jpg';

export const INITIAL_FACEBOOK_PAGES: FacebookPage[] = [
  {
    id: 'page_tech_pulse',
    name: 'TechPulse Weekly',
    handle: '@techpulseweekly',
    category: 'Tech & AI',
    verified: true,
    followerCount: 485000,
    engagementRate: 4.8,
    avgReachPerPost: 142000,
    coverImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    avatarImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    bio: 'Deep dives on consumer technology, generative AI tools, developer ecosystems, and silicon breakthroughs. Over 480k founders and tech enthusiasts.',
    rating: 4.95,
    completedBookings: 64,
    responseTimeHours: 1,
    pageCreationYear: 2018,
    demographics: {
      topCountry: 'United States',
      countryShare: 62,
      primaryAgeBracket: '25-34',
      ageBracketShare: 54,
      genderRatio: { male: 72, female: 28 }
    },
    featuredPostPreview: {
      caption: 'The next wave of local AI hardware has arrived. We tested 5 accelerators on real-world developer benchmarks. Full breakdown inside...',
      likes: '14.2K',
      comments: '890',
      shares: '1.4K'
    },
    slots: [
      {
        id: 'tp_feed_standard',
        format: 'feed_post',
        name: 'Dedicated Feed Post + First Comment Link',
        description: 'Single high-engagement image or carousel post written in our technical editorial style with your product as the featured solution.',
        price: 450,
        turnaroundDays: 1,
        durationDays: 365,
        deliverables: ['Original 250-word editorial copy', 'Tagged brand page', 'Direct tracking UTM link in post and top pinned comment', '30-day analytics report'],
        bestFor: 'SaaS products, Developer tools, Hardware launches'
      },
      {
        id: 'tp_reel_feature',
        format: 'reel_feature',
        name: '60-Second Hands-On Video Reel',
        description: 'High-production 9:16 vertical video review and workflow demonstration recorded in our 4K studio setup.',
        price: 750,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['4K vertical video production', 'Custom on-screen captions & call-to-action', 'Permanent placement on Reels tab', 'Link sticker & description mention'],
        bestFor: 'Physical tech gadgets, AI productivity apps, Visual software'
      },
      {
        id: 'tp_story_swipe',
        format: 'story_swipe',
        name: '24-Hour Story Sequence (3 Frames)',
        description: 'A 3-part interactive story sequence detailing the problem, your solution, and direct swipe/link sticker.',
        price: 220,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['3 bespoke graphic/video frames', 'Interactive poll or question sticker', 'Direct link sticker', '24h screenshot analytics'],
        bestFor: 'Flash sales, Webinar registrations, Early bird signups'
      },
      {
        id: 'tp_cover_takeover',
        format: 'cover_takeover',
        name: '14-Day Page Header Banner Takeover',
        description: 'Prime billboard real estate across our 480k-follower Facebook page header with clickable callout description.',
        price: 980,
        turnaroundDays: 2,
        durationDays: 14,
        deliverables: ['Custom co-branded banner design', 'Pinned top link in cover photo description', 'Seen by ~65k weekly organic profile visitors'],
        bestFor: 'Major brand repositioning, Annual conference announcements'
      }
    ],
    store: {
      storeSlug: 'techpulse',
      storeTitle: 'TechPulse Weekly Ad Space Store',
      tagline: 'Instant fixed-price Facebook advertising slots. Zero DM haggling, guaranteed broadcast times.',
      announcement: '⚡ Q4 Promotion: Bookings placed this week broadcast at peak 6:00 PM EST slots.',
      facebookPageUrl: 'https://facebook.com/techpulseweekly',
      responseTimeMinutes: 14,
      acceptanceRate: 99,
      bioNotice: 'Standardized rate card. All payments held in AdSpace Escrow until verified live.',
      products: [
        {
          id: 'tp_prod_story',
          format: 'story_swipe',
          tier: 'economy',
          title: 'Economy: 24h Story Flash Link',
          badge: '⚡ Instant Slot',
          description: 'A punchy 3-frame sequence with direct link sticker to drive immediate weekend traffic or signups.',
          price: 220,
          turnaroundHours: 12,
          estimatedBroadcastTime: 'Ready to broadcast in ~12 hours',
          deliverables: ['3 branded vertical slides', 'Interactive swipe link sticker', '24h analytics proof'],
          bestFor: 'Flash discounts, webinar invites, quick announcements'
        },
        {
          id: 'tp_prod_feed',
          format: 'feed_post',
          tier: 'standard',
          title: 'Comfort: Dedicated Editorial Post + Pinned Link',
          badge: '🏆 Most Popular',
          description: 'Original technical deep-dive review featuring your platform, tagged page, and pinned UTM link.',
          price: 450,
          turnaroundHours: 24,
          estimatedBroadcastTime: 'Broadcast tomorrow at 6:00 PM EST (Peak)',
          deliverables: ['250-word editorial review', 'Tagged page & pinned link', 'Permanent feed archival', '30-day performance sheet'],
          bestFor: 'SaaS products, Developer tools, Product Hunt launches',
          isPopular: true
        },
        {
          id: 'tp_prod_reel',
          format: 'reel_feature',
          tier: 'express_priority',
          title: 'Premier: 60-Second 4K Studio Hands-On Reel',
          badge: '🔥 Highest Reach',
          description: '4K studio review and screen demonstration highlighting key features with custom captions.',
          price: 750,
          turnaroundHours: 48,
          estimatedBroadcastTime: 'Broadcast in 48 hours at 7:30 PM EST',
          deliverables: ['Full 4K vertical production', 'Studio sound design & hook', 'Permanent Reels tab video', 'Active comment moderation for 48h'],
          bestFor: 'AI tools, physical tech gadgets, design apps'
        },
        {
          id: 'tp_prod_bundle',
          format: 'bundle_blitz',
          tier: 'all_inclusive_bundle',
          title: 'Blitz Pack: 1 Reel + 1 Feed Post + 3 Stories',
          badge: '💎 Save $220',
          description: 'Multi-touchpoint broadcast across our entire page ecosystem over a 7-day conversion campaign.',
          price: 1200,
          turnaroundHours: 48,
          estimatedBroadcastTime: 'Sequence kicks off in 48h',
          deliverables: ['1x 60s Studio Reel', '1x Dedicated Feed Post', '3x Story sequences', 'Complete UTM attribution report'],
          bestFor: 'Major product announcements & Series A/B marketing pushes'
        }
      ]
    }
  },
  {
    id: 'page_urban_gastronomy',
    name: 'Urban Gastronomy',
    handle: '@urbangastronomy',
    category: 'Food & Dining',
    verified: true,
    followerCount: 320000,
    engagementRate: 5.6,
    avgReachPerPost: 118000,
    coverImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    avatarImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    bio: 'Celebrating modern dining, artisanal kitchens, farm-to-table culinary techniques, and specialty pantry essentials.',
    rating: 4.92,
    completedBookings: 42,
    responseTimeHours: 2,
    pageCreationYear: 2019,
    demographics: {
      topCountry: 'United States',
      countryShare: 68,
      primaryAgeBracket: '25-44',
      ageBracketShare: 61,
      genderRatio: { male: 44, female: 56 }
    },
    featuredPostPreview: {
      caption: 'The secret to silky emulsion sauces starts with stone-pressed single-estate olive oil. Here is why temperature matters more than whisking speed...',
      likes: '19.8K',
      comments: '1.2K',
      shares: '3.1K'
    },
    slots: [
      {
        id: 'ug_feed_recipe',
        format: 'feed_post',
        name: 'Recipe Integration Feed Post',
        description: 'We develop a custom seasonal recipe incorporating your ingredient or kitchen tool with step-by-step imagery.',
        price: 380,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Custom recipe development', 'High-res food photography', 'Direct shopping link in caption & comments', 'Full commercial usage rights'],
        bestFor: 'Artisanal foods, Cookware, Specialty sauces, Wine & beverages'
      },
      {
        id: 'ug_reel_prep',
        format: 'reel_feature',
        name: 'Culinary ASMR & Prep Reel (45s)',
        description: 'Sensory cooking reel showing knife prep, sizzling, and final plating with your product naturally integrated.',
        price: 620,
        turnaroundDays: 3,
        durationDays: 365,
        deliverables: ['Studio sound-engineered cooking reel', 'Ingredient callout overlay', 'Permanent Reels placement', 'Direct buy link'],
        bestFor: 'Chef knives, Kitchen appliances, Meal kits'
      },
      {
        id: 'ug_story_swipe',
        format: 'story_swipe',
        name: 'Chef Tasting Story Feature (2 Frames)',
        description: 'Authentic kitchen taste test and unboxing with direct promo code sticker.',
        price: 180,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['Unboxing reaction frame', 'Tasting notes frame with link sticker', 'Discount code distribution'],
        bestFor: 'Food box subscriptions, Gourmet snacks'
      }
    ],
    store: {
      storeSlug: 'urbangastronomy',
      storeTitle: 'Urban Gastronomy Ad Space Store',
      tagline: 'Book authentic culinary spots on our 320k foodie page. No messy DMs.',
      announcement: '🍳 Weekend recipe slots open for artisan pantry & chef tools.',
      facebookPageUrl: 'https://facebook.com/urbangastronomy',
      responseTimeMinutes: 20,
      acceptanceRate: 98,
      products: [
        {
          id: 'ug_prod_story',
          format: 'story_swipe',
          tier: 'economy',
          title: 'Tasting Notes Story Feature',
          badge: '⚡ Fast Drop',
          description: 'Chef unboxing and tasting review with direct discount promo sticker.',
          price: 180,
          turnaroundHours: 18,
          estimatedBroadcastTime: 'Ready to broadcast within 18 hours',
          deliverables: ['Unboxing reaction frame', 'Tasting notes frame with link sticker', 'Direct promo code'],
          bestFor: 'Food box subscriptions, specialty snacks'
        },
        {
          id: 'ug_prod_recipe',
          format: 'feed_post',
          tier: 'standard',
          title: 'Original Recipe Development Feed Post',
          badge: '🏆 Most Popular',
          description: 'Custom recipe featuring your gourmet ingredient or cookware with photography.',
          price: 380,
          turnaroundHours: 36,
          estimatedBroadcastTime: 'Broadcast Saturday morning at 10:00 AM',
          deliverables: ['Custom recipe development', 'High-res food photography', 'Direct shopping link in caption & comments'],
          bestFor: 'Artisanal foods, Cookware, Specialty sauces',
          isPopular: true
        },
        {
          id: 'ug_prod_reel',
          format: 'reel_feature',
          tier: 'express_priority',
          title: 'Culinary ASMR & Plating Reel (45s)',
          badge: '🔥 Viral Reach',
          description: 'Sensory cooking reel with sizzling audio, knife prep, and product callout.',
          price: 620,
          turnaroundHours: 48,
          estimatedBroadcastTime: 'Broadcast Sunday evening at 6:30 PM',
          deliverables: ['ASMR sound-engineered reel', 'Permanent placement', 'Direct buy link'],
          bestFor: 'Chef appliances, cutlery, kitchen gadgets'
        }
      ]
    }
  },
  {
    id: 'page_apex_athletics',
    name: 'Apex Athletics',
    handle: '@apexathleticshq',
    category: 'Fitness & Wellness',
    verified: true,
    followerCount: 615000,
    engagementRate: 4.2,
    avgReachPerPost: 185000,
    coverImage: '/src/assets/images/page_apex_athletics_1791543155459.jpg',
    avatarImage: '/src/assets/images/page_apex_athletics_1791543155459.jpg',
    bio: 'Evidence-based strength conditioning, athletic longevity, recovery protocols, and training gear for dedicated lifters.',
    rating: 4.88,
    completedBookings: 51,
    responseTimeHours: 1,
    pageCreationYear: 2017,
    demographics: {
      topCountry: 'United States',
      countryShare: 58,
      primaryAgeBracket: '20-35',
      ageBracketShare: 66,
      genderRatio: { male: 64, female: 36 }
    },
    featuredPostPreview: {
      caption: '3 overlooked mechanics that fix your posterior chain hip hinge. Save this cue sheet before your next heavy deadlift session.',
      likes: '28.4K',
      comments: '1.6K',
      shares: '4.8K'
    },
    slots: [
      {
        id: 'aa_feed_breakdown',
        format: 'feed_post',
        name: 'Training Protocol Infographic + Sponsor Mention',
        description: 'Carousel or single technical infographic breaking down training physiology featuring your brand recommendation.',
        price: 520,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Co-branded graphic design', 'Long-form educational post copy', 'Direct coupon code in caption', 'Targeted fitness audience engagement'],
        bestFor: 'Supplements, Recovery gear, Fitness trackers, Activewear'
      },
      {
        id: 'aa_reel_workout',
        format: 'reel_feature',
        name: 'Workout Execution & Gear Spotlight Reel',
        description: 'Dynamic workout routine showing real coach testing of your equipment or apparel during high-intensity training.',
        price: 840,
        turnaroundDays: 3,
        durationDays: 365,
        deliverables: ['Professional gym videography', 'Active gear demonstration', 'Pinned comment link', 'Engagement response management for 48h'],
        bestFor: 'Footwear, Weightlifting accessories, Gym tech'
      },
      {
        id: 'aa_group_pinned',
        format: 'group_pinned',
        name: '7-Day Pinned Post in Apex VIP Community (95k Members)',
        description: 'Pinned announcement at the very top of our highly active Facebook private group for strength athletes.',
        price: 490,
        turnaroundDays: 1,
        durationDays: 7,
        deliverables: ['Sticky pinned announcement for 7 days', 'Admin endorsement note', 'Direct discussion moderation'],
        bestFor: 'Community software, Challenges, High-ticket gear'
      }
    ],
    store: {
      storeSlug: 'apexathletics',
      storeTitle: 'Apex Athletics Official Ad Space Store',
      tagline: 'Direct access to 615,000 verified athletes & lifters. Pick your ride, book instantly.',
      announcement: '💪 Verified US lifting demographic (64% male, 20-35 prime demographic).',
      facebookPageUrl: 'https://facebook.com/apexathleticshq',
      responseTimeMinutes: 15,
      acceptanceRate: 97,
      products: [
        {
          id: 'aa_prod_feed',
          format: 'feed_post',
          tier: 'standard',
          title: 'Training Breakdown Feed Post',
          badge: '🏆 High Engagement',
          description: 'Educational workout carousel with dedicated sponsor integration and promo code.',
          price: 520,
          turnaroundHours: 24,
          estimatedBroadcastTime: 'Broadcast tomorrow at 5:30 PM (Pre-Workout peak)',
          deliverables: ['Co-branded graphic slide', 'Direct tracking code', 'Pinned comment link'],
          bestFor: 'Supplements, fitness recovery, training apps',
          isPopular: true
        },
        {
          id: 'aa_prod_reel',
          format: 'reel_feature',
          tier: 'express_priority',
          title: 'Dynamic Gym Workout Spotlight Reel',
          badge: '🔥 180k+ Avg Reach',
          description: 'Coach test & workout execution reel demonstrating your gear under heavy load.',
          price: 840,
          turnaroundHours: 48,
          estimatedBroadcastTime: 'Broadcast in 48 hours at 6:00 PM',
          deliverables: ['Professional 4K gym shoot', 'Gear in active use', 'Pinned discussion link'],
          bestFor: 'Footwear, apparel, heavy lifting accessories'
        },
        {
          id: 'aa_prod_pinned',
          format: 'group_pinned',
          tier: 'economy',
          title: '7-Day Pinned Post in 95k VIP Group',
          badge: '📌 Sticky Billboard',
          description: 'Pinned top announcement in our high-intent private Facebook athlete community.',
          price: 490,
          turnaroundHours: 12,
          estimatedBroadcastTime: 'Pins within 12 hours of booking',
          deliverables: ['Sticky position for 7 days', 'Admin endorsement badge', 'Community moderation'],
          bestFor: 'High-ticket coaching, gear challenges'
        }
      ]
    }
  },
  {
    id: 'page_capital_insights',
    name: 'Capital Insights',
    handle: '@capitalinsightsmedia',
    category: 'Business & Finance',
    verified: true,
    followerCount: 245000,
    engagementRate: 6.4,
    avgReachPerPost: 92000,
    coverImage: '/src/assets/images/page_capital_insights_1791543165513.jpg',
    avatarImage: '/src/assets/images/page_capital_insights_1791543165513.jpg',
    bio: 'Macro trends, venture market data, enterprise software teardowns, and wealth architecture for operators and investors.',
    rating: 4.98,
    completedBookings: 38,
    responseTimeHours: 1,
    pageCreationYear: 2020,
    demographics: {
      topCountry: 'United States',
      countryShare: 71,
      primaryAgeBracket: '30-49',
      ageBracketShare: 58,
      genderRatio: { male: 68, female: 32 }
    },
    featuredPostPreview: {
      caption: 'Why recurring revenue multiples shifted by 42% over the last 18 months, and what high-growth businesses are doing to counter rising CAC.',
      likes: '11.5K',
      comments: '640',
      shares: '1.9K'
    },
    slots: [
      {
        id: 'ci_feed_analysis',
        format: 'feed_post',
        name: 'Executive Case Study & Market Breakdown',
        description: 'In-depth analytical breakdown highlighting your company’s customer success story or market data.',
        price: 420,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Comprehensive 300-word business analysis', 'Custom chart/infographic design', 'Clear CTA for B2B decision makers', 'Lifetime post archive'],
        bestFor: 'B2B SaaS, Fintech, Executive recruiting, Venture funds'
      },
      {
        id: 'ci_story_swipe',
        format: 'story_swipe',
        name: 'Market Brief Story Takeover (3 Frames)',
        description: 'Morning market briefing sequence with sponsor branding on slide 1 and direct download link on slide 3.',
        price: 210,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['Whitepaper/Report link sticker', 'Executive-targeted morning timing', 'Detailed reach metrics'],
        bestFor: 'Industry whitepapers, B2B report downloads'
      },
      {
        id: 'ci_cover_takeover',
        format: 'cover_takeover',
        name: '7-Day Editorial Cover Banner Sponsorship',
        description: 'Featured header banner on Capital Insights desktop & mobile pages seen by daily executives.',
        price: 580,
        turnaroundDays: 2,
        durationDays: 7,
        deliverables: ['Dedicated co-branded banner', 'Pinned link in cover description', 'Estimated 45k impressions'],
        bestFor: 'Enterprise software rollouts, Series A/B funding announcements'
      }
    ],
    store: {
      storeSlug: 'capitalinsights',
      storeTitle: 'Capital Insights Ad Space Store',
      tagline: 'Standardized B2B and Fintech advertising. Reach 245k founders & executives.',
      announcement: '📊 71% US operator audience with high purchase authority.',
      facebookPageUrl: 'https://facebook.com/capitalinsightsmedia',
      responseTimeMinutes: 10,
      acceptanceRate: 100,
      products: [
        {
          id: 'ci_prod_brief',
          format: 'story_swipe',
          tier: 'economy',
          title: 'Morning Executive Brief Story',
          badge: '⚡ Morning Drop',
          description: 'Featured slide in our 8:00 AM market update with direct whitepaper/lead gen link.',
          price: 210,
          turnaroundHours: 12,
          estimatedBroadcastTime: 'Broadcast tomorrow at 8:00 AM EST',
          deliverables: ['Executive brief slide', 'Direct link sticker', '24h conversion stats'],
          bestFor: 'Whitepapers, webinars, enterprise demos'
        },
        {
          id: 'ci_prod_teardown',
          format: 'feed_post',
          tier: 'standard',
          title: 'Executive Case Study Teardown',
          badge: '🏆 B2B Top Pick',
          description: 'Long-form analytical post with custom charts showcasing your ROI and client outcomes.',
          price: 420,
          turnaroundHours: 24,
          estimatedBroadcastTime: 'Broadcast Tuesday at 9:30 AM EST',
          deliverables: ['300-word case breakdown', 'Custom chart visualization', 'Pinned CTA comment link'],
          bestFor: 'Enterprise SaaS, Fintech, Venture capital',
          isPopular: true
        },
        {
          id: 'ci_prod_takeover',
          format: 'cover_takeover',
          tier: 'express_priority',
          title: '7-Day Page Cover Billboard Takeover',
          badge: '👑 Header Billboard',
          description: 'Featured banner across our top page header seen by every visiting executive.',
          price: 580,
          turnaroundHours: 24,
          estimatedBroadcastTime: 'Goes live within 24 hours of brief check',
          deliverables: ['Custom co-branded banner', 'Pinned link in cover description', 'Estimated 45k impressions'],
          bestFor: 'Series funding news, annual software rollouts'
        }
      ]
    }
  },
  {
    id: 'page_greenhaven',
    name: 'GreenHaven Living',
    handle: '@greenhavenhome',
    category: 'Home & Living',
    verified: false,
    followerCount: 198000,
    engagementRate: 5.8,
    avgReachPerPost: 74000,
    coverImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    avatarImage: '/src/assets/images/page_urban_gastronomy_1791543144909.jpg',
    bio: 'Biophilic interior architecture, urban gardening, sustainable textiles, and calming domestic aesthetics.',
    rating: 4.89,
    completedBookings: 29,
    responseTimeHours: 2,
    pageCreationYear: 2021,
    demographics: {
      topCountry: 'United States',
      countryShare: 65,
      primaryAgeBracket: '25-40',
      ageBracketShare: 62,
      genderRatio: { male: 28, female: 72 }
    },
    slots: [
      {
        id: 'gh_feed_style',
        format: 'feed_post',
        name: 'Interior Styling Showcase Post',
        description: 'Photoshoot styling your home decor or sustainable lifestyle item in a sunlit architectural setting.',
        price: 290,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['3 styled photos', 'Care & usage description in caption', 'Direct affiliate or store link in caption'],
        bestFor: 'Home decor, Bedding, Plants, Eco-friendly goods'
      },
      {
        id: 'gh_story_swipe',
        format: 'story_swipe',
        name: 'Weekend Refresh Story Feature',
        description: 'Featured slide in our popular Saturday morning room makeover story series.',
        price: 140,
        turnaroundDays: 1,
        durationDays: 1,
        deliverables: ['2 custom styled story slides', 'Direct product link sticker'],
        bestFor: 'Lifestyle accessories, Home fragrances'
      }
    ],
    store: {
      storeSlug: 'greenhaven',
      storeTitle: 'GreenHaven Living Ad Space Store',
      tagline: 'Standardized home & eco-living ad packages. Instant escrow booking.',
      announcement: '🌿 72% female audience, prime US homeowners & renters.',
      facebookPageUrl: 'https://facebook.com/greenhavenhome',
      responseTimeMinutes: 25,
      acceptanceRate: 96,
      products: [
        {
          id: 'gh_prod_story',
          format: 'story_swipe',
          tier: 'economy',
          title: 'Weekend Refresh Story Slide',
          badge: '⚡ Low Cost',
          description: 'Room makeover slide highlighting your decor item with direct shopping sticker.',
          price: 140,
          turnaroundHours: 12,
          estimatedBroadcastTime: 'Ready to broadcast within 12 hours',
          deliverables: ['2 styled story slides', 'Direct link sticker', '24h reach stats'],
          bestFor: 'Home fragrance, lighting, plants'
        },
        {
          id: 'gh_prod_showcase',
          format: 'feed_post',
          tier: 'standard',
          title: 'Architectural Styling Feed Post',
          badge: '🏆 Best Performer',
          description: 'Sunlit interior shoot styling your product in a clean modern living room.',
          price: 290,
          turnaroundHours: 36,
          estimatedBroadcastTime: 'Broadcast Saturday morning at 11:00 AM',
          deliverables: ['3 styled photos', 'Care & usage description', 'Direct store link in caption'],
          bestFor: 'Bedding, ceramics, sustainable home goods',
          isPopular: true
        }
      ]
    }
  },
  {
    id: 'page_nextgen_gaming',
    name: 'NextGen Gaming Hub',
    handle: '@nextgengaminghub',
    category: 'Gaming & Esports',
    verified: true,
    followerCount: 890000,
    engagementRate: 4.5,
    avgReachPerPost: 260000,
    coverImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    avatarImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    bio: 'The home of competitive esports clips, PC hardware battlestations, indie game discoveries, and gaming culture.',
    rating: 4.91,
    completedBookings: 88,
    responseTimeHours: 1,
    pageCreationYear: 2017,
    demographics: {
      topCountry: 'United States',
      countryShare: 54,
      primaryAgeBracket: '18-29',
      ageBracketShare: 71,
      genderRatio: { male: 82, female: 18 }
    },
    slots: [
      {
        id: 'ng_feed_spotlight',
        format: 'feed_post',
        name: 'Game/Hardware Spotlight Feed Post',
        description: 'Engaging gameplay snapshot or hardware breakdown with custom graphics crafted for gamers.',
        price: 580,
        turnaroundDays: 1,
        durationDays: 365,
        deliverables: ['High-contrast gaming creative', 'Pinned link with special gamer discount code', 'Over 200k estimated reach'],
        bestFor: 'Indie game studios, Peripherals, Energy drinks, Monitors'
      },
      {
        id: 'ng_reel_clip',
        format: 'reel_feature',
        name: 'Viral Gameplay / Setup Reel Integration',
        description: 'Integration in our daily top highlight reel with sponsored bumper and pinned comment.',
        price: 890,
        turnaroundDays: 2,
        durationDays: 365,
        deliverables: ['Dedicated sponsor segment in highlight clip', 'Tag & link sticker', 'Permanent Reel archive'],
        bestFor: 'Gaming chairs, Keyboards, Steam games'
      }
    ],
    store: {
      storeSlug: 'nextgengaming',
      storeTitle: 'NextGen Gaming Hub Ad Space Store',
      tagline: '890,000 gaming enthusiasts. Standardized sponsored posts & clips with instant booking.',
      announcement: '🎮 High engagement peak between 7:00 PM - 11:00 PM EST daily.',
      facebookPageUrl: 'https://facebook.com/nextgengaminghub',
      responseTimeMinutes: 10,
      acceptanceRate: 99,
      products: [
        {
          id: 'ng_prod_spotlight',
          format: 'feed_post',
          tier: 'standard',
          title: 'Gaming Spotlight Feed Post',
          badge: '🏆 High Velocity',
          description: 'High-energy graphic with discount code pinned in top comment for 890k gamers.',
          price: 580,
          turnaroundHours: 24,
          estimatedBroadcastTime: 'Broadcast tomorrow at 8:00 PM EST (Peak)',
          deliverables: ['Custom graphic design', 'Pinned comment link', 'Estimated 200k+ reach'],
          bestFor: 'Indie games, steam keys, PC components',
          isPopular: true
        },
        {
          id: 'ng_prod_reel',
          format: 'reel_feature',
          tier: 'express_priority',
          title: 'Viral Highlight Reel Integration (60s)',
          badge: '🔥 Highest Views',
          description: 'Sponsor bumper in our daily viral clip compilation with active link in bio.',
          price: 890,
          turnaroundHours: 36,
          estimatedBroadcastTime: 'Broadcast in 36 hours at 9:00 PM EST',
          deliverables: ['Dedicated video segment', 'Tag & link sticker', 'Permanent Reel archive'],
          bestFor: 'Gaming chairs, monitors, headsets'
        }
      ]
    }
  }
];

export const INITIAL_BOOKINGS: BookingOrder[] = [
  {
    id: 'BK-94021',
    pageId: 'page_tech_pulse',
    pageName: 'TechPulse Weekly',
    pageHandle: '@techpulseweekly',
    pageAvatar: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    storeSlug: 'techpulse',
    slotId: 'tp_feed_standard',
    slotName: 'Comfort: Dedicated Feed Post + Pinned Link',
    slotFormat: 'feed_post',
    tier: 'standard',
    businessName: 'Synthetix AI Lab',
    businessEmail: 'growth@synthetixlab.io',
    websiteUrl: 'https://synthetixlab.io',
    campaignGoal: 'Website Traffic',
    captionDraft: 'Writing clean SQL shouldn’t require hours of trial-and-error schema debugging. Synthetix AI generates and explains complex database queries in seconds. Built by developers, for developers.',
    talkingPoints: 'Highlight zero setup required, native PostgreSQL integration, and 14-day free trial without credit card.',
    targetDate: '2026-10-15',
    estimatedBroadcastTime: 'Broadcast at 6:00 PM EST (Completed)',
    slotPrice: 450,
    escrowFee: 13.50,
    platformFee: 22.50,
    totalPaid: 486.00,
    escrowStatus: 'held_in_escrow',
    status: 'published_live',
    createdAt: '2026-10-06T14:20:00Z',
    publishedAt: '2026-10-08T18:00:00Z',
    livePostUrl: 'https://facebook.com/techpulseweekly/posts/94827103829',
    proofScreenshotUrl: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
    metrics: {
      impressions: 114200,
      reach: 98400,
      clicks: 3410,
      reactions: 4230,
      comments: 312,
      shares: 480
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'advertiser',
        senderName: 'Synthetix AI Team',
        message: 'Booked via TechPulse Storefront! Please be sure to tag @SynthetixLab in the first paragraph.',
        timestamp: '2026-10-06 14:25'
      },
      {
        id: 'msg-2',
        sender: 'creator',
        senderName: 'TechPulse Weekly Editor',
        message: 'Booking confirmed & published. Post is now live on Facebook with pinned UTM link!',
        timestamp: '2026-10-08 18:05'
      }
    ]
  },
  {
    id: 'BK-94022',
    pageId: 'page_capital_insights',
    pageName: 'Capital Insights',
    pageHandle: '@capitalinsightsmedia',
    pageAvatar: '/src/assets/images/page_capital_insights_1791543165513.jpg',
    storeSlug: 'capitalinsights',
    slotId: 'ci_feed_analysis',
    slotName: 'Comfort: Executive Case Study Teardown',
    slotFormat: 'feed_post',
    tier: 'standard',
    businessName: 'VentureScale ERP',
    businessEmail: 'marketing@venturescale.co',
    websiteUrl: 'https://venturescale.co',
    campaignGoal: 'Lead Generation',
    captionDraft: 'How mid-market CFOs are automating multi-entity financial consolidation while cutting close times from 14 days down to 48 hours.',
    talkingPoints: 'Emphasize real audit trail compliance and SOC2 Type II certification.',
    targetDate: '2026-10-18',
    estimatedBroadcastTime: 'Estimated Tuesday at 9:30 AM EST',
    slotPrice: 420,
    escrowFee: 12.60,
    platformFee: 21.00,
    totalPaid: 453.60,
    escrowStatus: 'held_in_escrow',
    status: 'draft_submitted',
    createdAt: '2026-10-08T09:15:00Z',
    messages: [
      {
        id: 'msg-3',
        sender: 'creator',
        senderName: 'Capital Insights Team',
        message: 'Draft completed and uploaded for your approval before scheduled Tuesday broadcast.',
        timestamp: '2026-10-08 17:30'
      }
    ]
  }
];

export const INITIAL_CREATOR_WALLET = {
  availableBalance: 1240.00,
  escrowPendingBalance: 870.00,
  totalEarned: 18450.00,
  payoutAccount: 'Stripe Connect (•••• 4892)'
};
