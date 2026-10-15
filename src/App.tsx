import React, { useState, useEffect, useMemo } from 'react';
import { 
  FacebookPage, AdSlotOption, BookingOrder, CreatorWallet, 
  StandardizedProduct, CreatorStore, ThemePalette 
} from './types';
import { 
  INITIAL_FACEBOOK_PAGES, INITIAL_BOOKINGS, INITIAL_CREATOR_WALLET 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PageCard } from './components/PageCard';
import { PageDetailModal } from './components/PageDetailModal';
import { BookingModal } from './components/BookingModal';
import { YangoRideBookingModal } from './components/YangoRideBookingModal';
import { CreatorStorefront } from './components/CreatorStorefront';
import { AdvertiserDashboard } from './components/AdvertiserDashboard';
import { CreatorDashboard } from './components/CreatorDashboard';
import { ListNewPageModal } from './components/ListNewPageModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { VercelIntegrationModal } from './components/VercelIntegrationModal';
import { Footer } from './components/Footer';
import { 
  Search, SlidersHorizontal, CheckCircle2, ShieldCheck, 
  Store, Zap, ArrowRight, Share2, Sparkles 
} from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<'explore' | 'campaigns' | 'creator_hub' | 'how_it_works'>('explore');
  const [activeRole, setActiveRole] = useState<'advertiser' | 'creator'>('advertiser');

  // Modern Color Theme State (Cosmic Violet default, with quick palette picker)
  const [currentTheme, setCurrentTheme] = useState<ThemePalette>(() => {
    try {
      const saved = localStorage.getItem('adspace_theme');
      if (saved && ['violet', 'emerald', 'sapphire', 'amber', 'rose'].includes(saved)) {
        return saved as ThemePalette;
      }
    } catch (e) {
      console.warn(e);
    }
    return 'violet';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('adspace_theme', currentTheme);
  }, [currentTheme]);

  // Direct Storefront Route State (e.g. ?store=techpulse or user clicked on a creator's store link)
  const [activeStoreSlug, setActiveStoreSlug] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('store');
    } catch {
      return null;
    }
  });

  // Listen for browser popstate or manual URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const store = params.get('store');
      setActiveStoreSlug(store);
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Update browser URL query without reload when navigating to a store
  const navigateToStore = (slug: string | null) => {
    setActiveStoreSlug(slug);
    const url = new URL(window.location.href);
    if (slug) {
      url.searchParams.set('store', slug);
    } else {
      url.searchParams.delete('store');
    }
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persistence State
  const [pages, setPages] = useState<FacebookPage[]>(() => {
    try {
      const saved = localStorage.getItem('adspace_pages_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_FACEBOOK_PAGES;
  });

  const [bookings, setBookings] = useState<BookingOrder[]>(() => {
    try {
      const saved = localStorage.getItem('adspace_bookings_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_BOOKINGS;
  });

  const [wallet, setWallet] = useState<CreatorWallet>(() => {
    try {
      const saved = localStorage.getItem('adspace_wallet_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_CREATOR_WALLET;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('adspace_pages_v2', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('adspace_bookings_v2', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('adspace_wallet_v2', JSON.stringify(wallet));
  }, [wallet]);

  // Modals State
  const [selectedPageForDetail, setSelectedPageForDetail] = useState<FacebookPage | null>(null);
  
  // Yango Ride-Style Instant Booking State
  const [yangoBookingContext, setYangoBookingContext] = useState<{
    page: FacebookPage;
    product?: StandardizedProduct;
  } | null>(null);

  const [showListModal, setShowListModal] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showVercelModal, setShowVercelModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'followers' | 'engagement' | 'price_low' | 'speed'>('recommended');

  const categories = [
    'All',
    'Tech & AI',
    'Food & Dining',
    'Fitness & Wellness',
    'Business & Finance',
    'Home & Living',
    'Gaming & Esports'
  ];

  // Active Store Page if viewing a specific creator's store
  const currentStorePage = useMemo(() => {
    if (!activeStoreSlug) return null;
    return pages.find(p => p.store.storeSlug.toLowerCase() === activeStoreSlug.toLowerCase()) || null;
  }, [activeStoreSlug, pages]);

  // Filtered & Sorted Pages for directory
  const filteredPages = useMemo(() => {
    return pages
      .filter((page) => {
        if (selectedCategory !== 'All' && page.category !== selectedCategory) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = page.name.toLowerCase().includes(q);
          const matchHandle = page.handle.toLowerCase().includes(q);
          const matchBio = page.bio.toLowerCase().includes(q);
          const matchCountry = page.demographics.topCountry.toLowerCase().includes(q);
          const matchTagline = page.store?.tagline?.toLowerCase().includes(q);
          if (!matchName && !matchHandle && !matchBio && !matchCountry && !matchTagline) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'followers') return b.followerCount - a.followerCount;
        if (sortBy === 'engagement') return b.engagementRate - a.engagementRate;
        if (sortBy === 'speed') return (a.store?.responseTimeMinutes || 30) - (b.store?.responseTimeMinutes || 30);
        if (sortBy === 'price_low') {
          const minA = Math.min(...(a.store?.products?.map(p => p.price) || [500]));
          const minB = Math.min(...(b.store?.products?.map(p => p.price) || [500]));
          return minA - minB;
        }
        return b.completedBookings - a.completedBookings; // recommended
      });
  }, [pages, selectedCategory, searchQuery, sortBy]);

  // Booking & Escrow Handlers
  const handleConfirmBooking = (newBooking: BookingOrder) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update creator pending escrow wallet
    setWallet((prev) => ({
      ...prev,
      escrowPendingBalance: prev.escrowPendingBalance + newBooking.slotPrice
    }));

    showToast(`Order ${newBooking.id} dispatched! $${newBooking.totalPaid.toFixed(2)} secured in Escrow.`);
  };

  const handleReleaseEscrow = (bookingId: string) => {
    const order = bookings.find((b) => b.id === bookingId);
    if (!order) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, escrowStatus: 'released_to_creator', status: 'completed_payout' }
          : b
      )
    );

    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + order.slotPrice,
      escrowPendingBalance: Math.max(0, prev.escrowPendingBalance - order.slotPrice),
      totalEarned: prev.totalEarned + order.slotPrice
    }));

    showToast(`Escrow of $${order.slotPrice.toFixed(2)} released to ${order.pageName}!`);
  };

  const handleRequestRevision = (bookingId: string, note: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'revision_requested',
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'advertiser',
              senderName: b.businessName,
              message: `Revision Request: ${note}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      })
    );
    showToast('Revision request sent to creator.');
  };

  const handleSendMessage = (bookingId: string, messageText: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'advertiser',
              senderName: b.businessName,
              message: messageText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      })
    );
  };

  // Creator Actions
  const handleAcceptBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'accepted',
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'creator',
              senderName: `${b.pageName} Team`,
              message: 'Booking accepted! Ride in progress: we are drafting your content.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      })
    );
    showToast('Booking accepted! Content draft in progress.');
  };

  const handleSubmitDraft = (bookingId: string, draftNote: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'draft_submitted',
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'creator',
              senderName: `${b.pageName} Team`,
              message: `Draft ready for review: ${draftNote}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      })
    );
    showToast('Draft sent to advertiser for verification.');
  };

  const handleSubmitLiveProof = (bookingId: string, postUrl: string, reachNumber: number) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'published_live',
          livePostUrl: postUrl,
          metrics: {
            impressions: Math.round(reachNumber * 1.25),
            reach: reachNumber,
            clicks: Math.round(reachNumber * 0.038),
            reactions: Math.round(reachNumber * 0.046),
            comments: Math.round(reachNumber * 0.005),
            shares: Math.round(reachNumber * 0.007)
          },
          messages: [
            ...b.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'creator',
              senderName: `${b.pageName} Team`,
              message: `Broadcast live on Facebook at ${postUrl} with initial reach of ${reachNumber.toLocaleString()}!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      })
    );
    showToast('Proof submitted! Post marked live on Facebook.');
  };

  const handleUpdateStore = (pageId: string, updatedStore: CreatorStore) => {
    setPages((prev) =>
      prev.map((p) => (p.id === pageId ? { ...p, store: updatedStore } : p))
    );
    showToast('Storefront configuration saved!');
  };

  const handleAddPage = (newPage: FacebookPage) => {
    setPages((prev) => [newPage, ...prev]);
    showToast(`Store for "${newPage.name}" is now live!`);
  };

  const handleWithdrawFunds = () => {
    setWallet((prev) => ({
      ...prev,
      availableBalance: 0
    }));
  };

  const activeBookingsCount = bookings.filter((b) => b.status !== 'completed_payout').length;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-neutral-800 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          navigateToStore(null); // Return to standard view if in single store mode
          setActiveTab(tab);
        }}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenListModal={() => setShowListModal(true)}
        activeBookingsCount={activeBookingsCount}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* VIEW ROUTE 1: Dedicated Standalone Creator Store View (via ?store=slug) */}
      {currentStorePage ? (
        <main className="flex-1">
          <CreatorStorefront
            page={currentStorePage}
            onBookProduct={(page, product) => {
              setYangoBookingContext({ page, product });
            }}
            onBackToMarketplace={() => navigateToStore(null)}
            isStandaloneView={true}
          />
        </main>
      ) : (
        /* VIEW ROUTE 2: Main Platform Views */
        <>
          {activeTab === 'explore' && (
            <main className="flex-1 space-y-10">
              {/* Hero Section */}
              <Hero
                onExploreClick={() => {
                  const el = document.getElementById('marketplace-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenHowItWorks={() => setShowHowItWorksModal(true)}
                onOpenCreateStore={() => setShowListModal(true)}
              />

              {/* Creator Stores Directory */}
              <section id="marketplace-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                
                {/* Search & Filter Header */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                        <Store className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
                        <span className="text-slate-600 font-bold">Verified Digital Stores</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mt-1">
                        Book Advertising Space On Demand
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        {filteredPages.length} Facebook page stores with fixed-price packages & instant booking
                      </p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full md:w-80 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search page, niche, or store handle..."
                        className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 shadow-2xs transition-all"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        style={selectedCategory === cat ? { 
                          background: 'linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-to))',
                          boxShadow: 'var(--theme-glow)'
                        } : {}}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedCategory === cat
                            ? 'text-white shadow-xs font-bold'
                            : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Sort Controls */}
                  <div className="pt-1 flex items-center justify-between gap-4 text-xs">
                    <div className="text-neutral-500 text-[11px] font-mono">
                      Ride-style instant booking: Pick your tier, set brief, escrow locked instantly.
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 font-medium">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 font-medium cursor-pointer focus:outline-hidden text-xs"
                      >
                        <option value="recommended">Top Rated Creators</option>
                        <option value="speed">Fastest Response SLA</option>
                        <option value="followers">Largest Audience</option>
                        <option value="engagement">Highest Engagement Rate</option>
                        <option value="price_low">Lowest Upfront Fare</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Marketplace Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {filteredPages.map((page) => (
                    <PageCard
                      key={page.id}
                      page={page}
                      onSelect={(p) => setSelectedPageForDetail(p)}
                      onOpenStore={(p) => navigateToStore(p.store.storeSlug)}
                      onQuickBook={(p) => {
                        const defaultProduct = p.store.products.find(x => x.isPopular) || p.store.products[0];
                        setYangoBookingContext({ page: p, product: defaultProduct });
                      }}
                    />
                  ))}
                </div>

                {filteredPages.length === 0 && (
                  <div className="p-12 text-center bg-white border border-neutral-200 rounded-2xl space-y-3">
                    <div className="text-neutral-400 text-sm">
                      No Facebook page stores match your criteria.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 rounded-lg hover:bg-neutral-200 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

              </section>
            </main>
          )}

          {activeTab === 'campaigns' && (
            <main className="flex-1">
              <AdvertiserDashboard
                bookings={bookings}
                onReleaseEscrow={handleReleaseEscrow}
                onRequestRevision={handleRequestRevision}
                onSendMessage={handleSendMessage}
                onExploreMore={() => setActiveTab('explore')}
              />
            </main>
          )}

          {activeTab === 'creator_hub' && (
            <main className="flex-1">
              <CreatorDashboard
                wallet={wallet}
                pages={pages}
                bookings={bookings}
                onAcceptBooking={handleAcceptBooking}
                onSubmitDraft={handleSubmitDraft}
                onSubmitLiveProof={handleSubmitLiveProof}
                onOpenListNewPage={() => setShowListModal(true)}
                onWithdrawFunds={handleWithdrawFunds}
                onUpdateStore={handleUpdateStore}
                onPreviewStore={(p) => navigateToStore(p.store.storeSlug)}
              />
            </main>
          )}

          {activeTab === 'how_it_works' && (
            <main className="flex-1">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 font-mono">
                    Instant Facebook Ad Space Marketplace
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950">
                    How Instant Facebook Ad Space Booking Works
                  </h1>
                  <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                    Page owners turn informal DM price negotiation into standardized products. Businesses book instantly with upfront fixed pricing and escrow protection.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs">
                  <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                    <div className="text-neutral-950 font-extrabold font-mono text-xl">01. Standardized Product Menu</div>
                    <h3 className="font-bold text-base text-neutral-900">No Messy DM Haggling</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Every creator has an official storefront link (e.g. <code>adspace.app/@handle</code>). Instead of back-and-forth messages, you pick a standardized package (Economy Story, Comfort Post, Premier Reel).
                    </p>
                  </div>

                  <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                    <div className="text-neutral-950 font-extrabold font-mono text-xl">02. Upfront Fare & Escrow Lock</div>
                    <h3 className="font-bold text-base text-neutral-900">Fixed Upfront Fare Guarantee</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Zero hidden price fluctuations. You see the total upfront fare. The payment is held in AdSpace Escrow until the post is published live and verified.
                    </p>
                  </div>

                  <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                    <div className="text-neutral-950 font-extrabold font-mono text-xl">03. Fast Acceptance & Drafting</div>
                    <h3 className="font-bold text-base text-neutral-900">Broadcast Window SLA</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Page admins have an average response time of ~14 minutes. They prepare editorial copy tailored to their audience, which you inspect before broadcast.
                    </p>
                  </div>

                  <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs">
                    <div className="text-neutral-950 font-extrabold font-mono text-xl">04. Live Proof & Payout</div>
                    <h3 className="font-bold text-base text-neutral-900">Verified Facebook Live Link</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      The creator submits their live Facebook link and organic reach. Once verified, escrow releases payment to the creator wallet.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-neutral-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-bold text-lg">Are you a Facebook creator or page owner?</h3>
                    <p className="text-xs text-neutral-400 mt-1">Create your digital store and share the link on your page in 2 minutes.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowListModal(true)}
                    className="px-6 py-3 font-bold text-xs text-neutral-950 bg-white hover:bg-neutral-100 rounded-xl cursor-pointer transition-colors shrink-0"
                  >
                    Create Your Store (Get Link)
                  </button>
                </div>
              </div>
            </main>
          )}

          {/* Footer */}
          <Footer
            onExplore={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onHowItWorks={() => setShowHowItWorksModal(true)}
            onListModal={() => setShowListModal(true)}
            onVercelModal={() => setShowVercelModal(true)}
          />
        </>
      )}

      {/* Page Detail Modal (Traditional Profile Explorer) */}
      {selectedPageForDetail && (
        <PageDetailModal
          page={selectedPageForDetail}
          onClose={() => setSelectedPageForDetail(null)}
          onSelectSlotToBook={(page, slot) => {
            setSelectedPageForDetail(null);
            // Match corresponding store product or use slot
            const matchedProduct = page.store?.products?.find(p => p.format === slot.format) || {
              id: slot.id,
              format: slot.format,
              tier: 'standard',
              title: slot.name,
              description: slot.description,
              price: slot.price,
              turnaroundHours: slot.turnaroundDays * 24,
              estimatedBroadcastTime: `Broadcast within ${slot.turnaroundDays * 24} hours`,
              deliverables: slot.deliverables,
              bestFor: slot.bestFor
            };
            setYangoBookingContext({ page, product: matchedProduct });
          }}
        />
      )}

      {/* Yango-Style Instant Ride Booking Modal */}
      {yangoBookingContext && (
        <YangoRideBookingModal
          page={yangoBookingContext.page}
          initialProduct={yangoBookingContext.product}
          onClose={() => setYangoBookingContext(null)}
          onConfirmBooking={(booking) => {
            handleConfirmBooking(booking);
            setYangoBookingContext(null);
            setActiveRole('advertiser');
            setActiveTab('campaigns');
            navigateToStore(null);
          }}
        />
      )}

      {/* Create / List New Page Store Modal */}
      {showListModal && (
        <ListNewPageModal
          onClose={() => setShowListModal(false)}
          onAddPage={handleAddPage}
          onOpenStore={(page) => {
            setShowListModal(false);
            navigateToStore(page.store.storeSlug);
          }}
        />
      )}

      {/* How Escrow Works Modal */}
      {showHowItWorksModal && (
        <HowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
          onExplore={() => {
            setShowHowItWorksModal(false);
            setActiveTab('explore');
          }}
        />
      )}

      {/* Vercel Integration Modal */}
      {showVercelModal && (
        <VercelIntegrationModal
          onClose={() => setShowVercelModal(false)}
        />
      )}
    </div>
  );
}
