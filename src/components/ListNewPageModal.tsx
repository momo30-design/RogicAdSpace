import React, { useState } from 'react';
import { FacebookPage, AdSlotFormat, AdSlotOption, StandardizedProduct } from '../types';
import { X, Plus, Trash2, CheckCircle2, Store, Copy, Check, Share2, ArrowRight } from 'lucide-react';

interface ListNewPageModalProps {
  onClose: () => void;
  onAddPage: (newPage: FacebookPage) => void;
  onOpenStore?: (page: FacebookPage) => void;
}

export const ListNewPageModal: React.FC<ListNewPageModalProps> = ({ onClose, onAddPage, onOpenStore }) => {
  const [step, setStep] = useState<'create' | 'success'>('create');
  const [name, setName] = useState('Silicon Valley Insider');
  const [handle, setHandle] = useState('@svinsider');
  const [storeSlug, setStoreSlug] = useState('svinsider');
  const [category, setCategory] = useState<FacebookPage['category']>('Tech & AI');
  const [followerCount, setFollowerCount] = useState('210000');
  const [engagementRate, setEngagementRate] = useState('4.4');
  const [bio, setBio] = useState('Covering venture funding rounds, tech culture, and founder interviews for 210k operators.');
  const [tagline, setTagline] = useState('Official Facebook Ad Space Store · Standardized Packages & Instant Booking');
  const [topCountry, setTopCountry] = useState('United States');
  const [countryShare, setCountryShare] = useState('65');
  const [responseTimeMinutes, setResponseTimeMinutes] = useState('15');

  // Standardized Products
  const [products, setProducts] = useState<{
    format: AdSlotFormat;
    title: string;
    price: number;
    hours: number;
    description: string;
  }[]>([
    {
      format: 'feed_post',
      title: 'Comfort: Dedicated Feed Post + Pinned Link',
      price: 350,
      hours: 24,
      description: 'Permanent technical editorial review on our feed with pinned UTM link in top comment.'
    },
    {
      format: 'reel_feature',
      title: 'Premier: 60s Studio Product Reel',
      price: 550,
      hours: 48,
      description: 'Hands-on vertical video demonstration with dynamic captions and link sticker.'
    },
    {
      format: 'story_swipe',
      title: 'Economy: 24h Story Flash Slide',
      price: 160,
      hours: 12,
      description: '3-part vertical story highlight with direct discount promo sticker.'
    }
  ]);

  const [createdPage, setCreatedPage] = useState<FacebookPage | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        format: 'bundle_blitz',
        title: 'Blitz Pack: 1 Reel + 1 Feed Post',
        price: 800,
        hours: 48,
        description: 'Multi-day campaign sequence across our page for maximum brand recall.'
      }
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (products.length <= 1) return;
    setProducts(products.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const followers = parseInt(followerCount.replace(/,/g, ''), 10) || 100000;
    const engagement = parseFloat(engagementRate) || 3.5;
    const avgReach = Math.round(followers * (engagement / 100) * 8);

    const generatedProducts: StandardizedProduct[] = products.map((p, idx) => ({
      id: `prod_new_${Date.now()}_${idx}`,
      format: p.format,
      tier: p.format === 'story_swipe' ? 'economy' : p.format === 'reel_feature' ? 'express_priority' : p.format === 'bundle_blitz' ? 'all_inclusive_bundle' : 'standard',
      title: p.title,
      badge: idx === 0 ? '🏆 Most Popular' : idx === 1 ? '🔥 Highest Reach' : '⚡ Instant Slot',
      description: p.description,
      price: p.price,
      turnaroundHours: p.hours,
      estimatedBroadcastTime: `Broadcast within ${p.hours} hours of booking`,
      deliverables: ['Custom content production', 'Direct tracking UTM link', 'Verified reach analytics sheet'],
      bestFor: 'Targeted brands & apps',
      isPopular: idx === 0
    }));

    const generatedSlots: AdSlotOption[] = products.map((p, idx) => ({
      id: `slot_new_${Date.now()}_${idx}`,
      format: p.format,
      name: p.title,
      description: p.description,
      price: p.price,
      turnaroundDays: Math.ceil(p.hours / 24),
      durationDays: p.format === 'story_swipe' ? 1 : 365,
      deliverables: ['Original editorial copy', 'Tagged brand page', 'Pinned comment link', 'Analytics report'],
      bestFor: 'Targeted brands'
    }));

    const newPage: FacebookPage = {
      id: `page_${Date.now()}`,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      category,
      verified: true,
      followerCount: followers,
      engagementRate: engagement,
      avgReachPerPost: avgReach,
      coverImage: '/src/assets/images/page_tech_pulse_1791543134510.jpg',
      avatarImage: '/src/assets/images/page_capital_insights_1791543165513.jpg',
      bio,
      rating: 5.0,
      completedBookings: 0,
      responseTimeHours: 1,
      pageCreationYear: 2022,
      demographics: {
        topCountry,
        countryShare: parseInt(countryShare, 10) || 65,
        primaryAgeBracket: '25-34',
        ageBracketShare: 55,
        genderRatio: { male: 62, female: 38 }
      },
      slots: generatedSlots,
      store: {
        storeSlug: storeSlug.trim() || handle.replace('@', '').toLowerCase(),
        storeTitle: `${name} Official Ad Space Store`,
        tagline: tagline || 'Book Facebook ad space instantly. Standardized packages, fixed fares.',
        announcement: '⚡ Store now open for direct brand bookings.',
        facebookPageUrl: `https://facebook.com/${handle.replace('@', '')}`,
        responseTimeMinutes: parseInt(responseTimeMinutes, 10) || 15,
        acceptanceRate: 100,
        products: generatedProducts
      }
    };

    setCreatedPage(newPage);
    onAddPage(newPage);
    setStep('success');
  };

  const storeUrl = createdPage 
    ? `${window.location.origin}?store=${createdPage.store.storeSlug}` 
    : '';

  const handleCopyLink = () => {
    if (!storeUrl) return;
    navigator.clipboard.writeText(storeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6 relative flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:px-6 bg-white border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Creator Storefront Generator
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
                {step === 'create' ? 'Create Your Digital Facebook Ad Store' : 'Your Ad Store is Live!'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'create' ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            {/* Step 1: Facebook Page Identity */}
            <div className="space-y-4">
              <h3 className="font-bold text-neutral-900 text-sm">1. Facebook Page & Store Link</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Facebook Page Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Page Handle (@handle)
                  </label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={e => {
                      setHandle(e.target.value);
                      setStoreSlug(e.target.value.replace('@', '').toLowerCase());
                    }}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Custom Store URL Slug
                  </label>
                  <div className="flex items-center">
                    <span className="px-2.5 py-2 bg-neutral-100 border border-r-0 border-neutral-300 rounded-l-lg text-neutral-500 font-mono text-[11px]">
                      adspace.app/store/
                    </span>
                    <input
                      type="text"
                      required
                      value={storeSlug}
                      onChange={e => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-r-lg font-mono focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Category / Niche
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white focus:outline-hidden"
                  >
                    <option value="Tech & AI">Tech & AI</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Fitness & Wellness">Fitness & Wellness</option>
                    <option value="Business & Finance">Business & Finance</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Gaming & Esports">Gaming & Esports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Followers Count
                  </label>
                  <input
                    type="text"
                    required
                    value={followerCount}
                    onChange={e => setFollowerCount(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Engagement (%)
                  </label>
                  <input
                    type="text"
                    required
                    value={engagementRate}
                    onChange={e => setEngagementRate(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Average Response (Mins)
                  </label>
                  <input
                    type="number"
                    required
                    value={responseTimeMinutes}
                    onChange={e => setResponseTimeMinutes(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Storefront Tagline / Headline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-hidden"
                />
              </div>
            </div>

            {/* Step 2: Standardized Bookable Products */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm">
                    2. Standardized Ad Products (Zero DM Haggling)
                  </h3>
                  <p className="text-neutral-500 text-[11px]">
                    Create fixed-fare products that businesses can book with 1-click escrow.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="px-3 py-1.5 font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="space-y-3">
                {products.map((p, idx) => (
                  <div key={idx} className="p-3.5 border border-neutral-200 rounded-xl bg-neutral-50 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-neutral-500">Package Title</label>
                          <input
                            type="text"
                            value={p.title}
                            onChange={e => {
                              const copy = [...products];
                              copy[idx].title = e.target.value;
                              setProducts(copy);
                            }}
                            className="w-full p-1.5 border border-neutral-300 rounded bg-white text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-500">Fixed Fare ($ USD)</label>
                          <input
                            type="number"
                            value={p.price}
                            onChange={e => {
                              const copy = [...products];
                              copy[idx].price = Number(e.target.value);
                              setProducts(copy);
                            }}
                            className="w-full p-1.5 border border-neutral-300 rounded bg-white text-xs font-mono font-bold"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(idx)}
                        disabled={products.length <= 1}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 disabled:opacity-20 cursor-pointer mt-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-500">Deliverables / Description</label>
                      <input
                        type="text"
                        value={p.description}
                        onChange={e => {
                          const copy = [...products];
                          copy[idx].description = e.target.value;
                          setProducts(copy);
                        }}
                        className="w-full p-1.5 border border-neutral-300 rounded bg-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="theme-btn-gradient px-6 py-2.5 font-bold rounded-xl cursor-pointer transition-all shadow-sm"
              >
                Launch Store & Generate Link
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Instant Success & Shareable Link */
          <div className="p-6 text-center space-y-6 flex-1 text-xs">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                Storefront Deployed
              </span>
              <h3 className="text-xl font-extrabold text-neutral-950 mt-1">
                {createdPage?.name}'s Ad Store is Live!
              </h3>
              <p className="text-neutral-600 mt-1 max-w-md mx-auto">
                Share this link on your Facebook Page. Inbound sponsors can now book your advertising products instantly with guaranteed upfront escrow!
              </p>
            </div>

            {/* Generated Shareable Link Box */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3 max-w-lg mx-auto text-left">
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Your Shareable Facebook Page Store Link:
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={storeUrl}
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg font-mono text-neutral-900"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg inline-flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on Facebook Page</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-neutral-700 hover:text-neutral-950 font-semibold cursor-pointer"
              >
                Close
              </button>

              {createdPage && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenStore) onOpenStore(createdPage);
                  }}
                  className="px-5 py-2.5 font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Preview My New Store</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
