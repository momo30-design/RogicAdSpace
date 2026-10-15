import React, { useState } from 'react';
import { FacebookPage, StandardizedProduct, BookingOrder, ProductTier } from '../types';
import { generateAdCopy } from '../services/geminiService';
import { 
  X, ShieldCheck, Sparkles, Check, ArrowRight, 
  Clock, Zap, CheckCircle2, ChevronRight, Navigation,
  CreditCard, ExternalLink, AlertCircle
} from 'lucide-react';

interface YangoRideBookingModalProps {
  page: FacebookPage;
  initialProduct?: StandardizedProduct;
  onClose: () => void;
  onConfirmBooking: (booking: BookingOrder) => void;
}

export const YangoRideBookingModal: React.FC<YangoRideBookingModalProps> = ({
  page,
  initialProduct,
  onClose,
  onConfirmBooking
}) => {
  const store = page.store;
  const products = store.products.length > 0 ? store.products : [
    {
      id: 'default_feed',
      format: 'feed_post' as const,
      tier: 'standard' as const,
      title: 'Comfort: Dedicated Feed Post',
      description: 'Permanent technical review on feed with pinned comment UTM link.',
      price: page.slots[0]?.price || 400,
      turnaroundHours: 24,
      estimatedBroadcastTime: 'Tomorrow at 6:00 PM (Peak Reach)',
      deliverables: ['Editorial review', 'Pinned comment link', 'Analytics report'],
      bestFor: 'Targeted brands & apps'
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState<StandardizedProduct>(
    initialProduct || products.find(p => p.isPopular) || products[0]
  );

  // Steps: 1: Class Selection & Trip Info, 2: Payment Fare Lock, 3: Ride Dispatched / Live Tracker
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields (Ride style: Pickup location = Your Brand / Website, Destination = Target Outcome)
  const [businessName, setBusinessName] = useState('Acme Technologies');
  const [websiteUrl, setWebsiteUrl] = useState('https://acmetech.io/offer');
  const [campaignGoal, setCampaignGoal] = useState<'Website Traffic' | 'Lead Generation' | 'App Installs' | 'Brand Awareness'>('Website Traffic');
  const [talkingPoints, setTalkingPoints] = useState('Highlight instant time savings, modern UI, and special 20% discount with code ADSPACE.');
  const [captionDraft, setCaptionDraft] = useState('');
  
  // Fare Calculation
  const slotPrice = selectedProduct.price;
  const escrowFee = Number((slotPrice * 0.03).toFixed(2));
  const platformFee = Number((slotPrice * 0.05).toFixed(2));
  const totalFare = Number((slotPrice + escrowFee + platformFee).toFixed(2));

  // AI & Processing
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuccess, setAiSuccess] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchedOrder, setDispatchedOrder] = useState<BookingOrder | null>(null);

  const handleGenerateAi = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await generateAdCopy({
        brandName: businessName,
        websiteUrl,
        productDescription: talkingPoints,
        targetAudience: `${page.demographics.topCountry}, ages ${page.demographics.primaryAgeBracket}`,
        pageName: page.name,
        pageCategory: page.category,
        slotFormat: selectedProduct.title
      });
      setCaptionDraft(res.captionText);
      setAiSuccess(true);
      setTimeout(() => setAiSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleDispatchBooking = () => {
    setIsDispatching(true);

    setTimeout(() => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + Math.ceil(selectedProduct.turnaroundHours / 24));
      const formattedDate = targetDate.toISOString().split('T')[0];

      const newBooking: BookingOrder = {
        id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
        pageId: page.id,
        pageName: page.name,
        pageHandle: page.handle,
        pageAvatar: page.avatarImage,
        storeSlug: store.storeSlug,
        slotId: selectedProduct.id,
        slotName: selectedProduct.title,
        slotFormat: selectedProduct.format,
        tier: selectedProduct.tier,
        businessName,
        businessEmail: 'growth@acmetech.io',
        websiteUrl,
        campaignGoal,
        captionDraft: captionDraft || `Exclusive partnership with ${businessName}. Check out ${websiteUrl} for our special community offer!`,
        talkingPoints,
        targetDate: formattedDate,
        estimatedBroadcastTime: selectedProduct.estimatedBroadcastTime,
        slotPrice,
        escrowFee,
        platformFee,
        totalPaid: totalFare,
        escrowStatus: 'held_in_escrow',
        status: 'pending_creator_review',
        createdAt: new Date().toISOString(),
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'advertiser',
            senderName: businessName,
            message: `Instant ad space booking confirmed via ${page.name}'s store! Escrow locked: $${totalFare.toFixed(2)}. Target: ${selectedProduct.estimatedBroadcastTime}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };

      setDispatchedOrder(newBooking);
      setIsDispatching(false);
      setStep(3);
      onConfirmBooking(newBooking);
    }, 1100);
  };

  const getTierIcon = (tier: ProductTier) => {
    switch (tier) {
      case 'economy':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'express_priority':
        return <Clock className="w-4 h-4 text-purple-600" />;
      case 'all_inclusive_bundle':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6 relative flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="px-5 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div 
              style={{ background: 'linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-to))' }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xs"
            >
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Instant Ad Space Booking
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-semibold">
                  Escrow Protected
                </span>
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5 leading-tight">
                <span>{page.name}</span>
                <span className="text-slate-400 font-normal text-xs font-mono">({page.handle})</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Ride Class Selection & Passenger Details */}
        {step === 1 && (
          <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
            
            {/* Quick ETA Notification banner (like "Driver 2 mins away") */}
            <div className="p-3 bg-neutral-100 rounded-xl flex items-center justify-between border border-neutral-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-700" />
                <span className="text-neutral-800 font-medium">
                  Page Admin replies in <strong>~{store.responseTimeMinutes} mins</strong>
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">
                {store.acceptanceRate}% Acceptance Rate
              </span>
            </div>

            {/* Product / Ride Class Carousel (Economy -> Comfort -> Premier -> Blitz) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Choose Standardized Ad Product
              </label>

              <div className="space-y-2">
                {products.map((prod) => {
                  const isSelected = selectedProduct.id === prod.id;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected 
                          ? 'border-neutral-950 bg-neutral-50/80 shadow-xs ring-1 ring-neutral-950'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="mt-0.5 shrink-0">
                          {getTierIcon(prod.tier)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-950 text-xs truncate">
                              {prod.title}
                            </span>
                            {prod.badge && (
                              <span className="text-[10px] font-bold text-neutral-700 bg-neutral-200 px-1.5 py-0.2 rounded shrink-0">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {prod.description}
                          </p>
                          <div className="text-[10px] text-neutral-600 font-mono mt-1 flex items-center gap-2">
                            <span>⏱ {prod.estimatedBroadcastTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-extrabold font-mono tabular-nums text-neutral-950">
                          ${prod.price}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">Fixed Fare</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Passenger / Campaign Details (Pickup & Destination) */}
            <div className="space-y-3 pt-2 border-t border-neutral-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Campaign Pickup & Destination
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    Your Brand / Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Synthetix AI"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    Destination URL (Landing Page)
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={e => setWebsiteUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  What should {page.name} say to their audience? (Talking Points)
                </label>
                <textarea
                  rows={2}
                  value={talkingPoints}
                  onChange={e => setTalkingPoints(e.target.value)}
                  placeholder="Key product benefits, exclusive coupon code, or specific hook..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              {/* AI Copy Assistant Option */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-600">
                    Draft Post Caption (Optional or generate with AI)
                  </span>
                  <button
                    type="button"
                    onClick={handleGenerateAi}
                    disabled={isGeneratingAi}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingAi ? 'Synthesizing...' : 'Generate AI Hook'}</span>
                  </button>
                </div>

                {aiSuccess && (
                  <div className="text-[11px] text-emerald-700 font-medium">
                    ✓ Generated caption matching {page.name}'s audience style!
                  </div>
                )}

                <textarea
                  rows={3}
                  value={captionDraft}
                  onChange={e => setCaptionDraft(e.target.value)}
                  placeholder="Leave blank to let the creator craft original editorial copy from your talking points..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-hidden"
                />
              </div>
            </div>

          </div>
        )}

        {/* Step 2: Fare Breakdown & Escrow Hold */}
        {step === 2 && (
          <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Upfront Fixed Fare Guarantee
              </span>
              <h3 className="text-xl font-extrabold text-neutral-950 font-mono tabular-nums">
                ${totalFare.toFixed(2)} USD
              </h3>
              <p className="text-[11px] text-neutral-500">
                Zero surge pricing · Locked in AdSpace Escrow until verified live
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2.5">
              <div className="flex justify-between text-neutral-800 font-semibold pb-2 border-b border-neutral-200">
                <span>{selectedProduct.title}</span>
                <span className="font-mono tabular-nums">${slotPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Escrow Hold & Verification Guarantee (3%)</span>
                <span className="font-mono tabular-nums">${escrowFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>AdSpace Platform Protection (5%)</span>
                <span className="font-mono tabular-nums">${platformFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-neutral-950 text-sm">
                <span>Total Guaranteed Fare:</span>
                <span className="font-mono tabular-nums">${totalFare.toFixed(2)}</span>
              </div>
            </div>

            {/* Escrow Rule */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-2.5 text-blue-950">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>How the escrow works:</strong> Your money is held in a protected vault. The page creator only gets paid after publishing your post live on Facebook with verifiable reach. If the creator fails to broadcast, you get an immediate 100% refund.
              </p>
            </div>

            {/* Simulated Payment Card */}
            <div className="p-3.5 border border-neutral-200 rounded-xl space-y-2 bg-white">
              <div className="flex items-center justify-between text-neutral-700 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-neutral-800" />
                  <span>Instant Payment (Card / Apple Pay)</span>
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">•••• 4242</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Mock sandbox checkout enabled. No real credit card charge occurs.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Ride Dispatched / Live Tracker */}
        {step === 3 && dispatchedOrder && (
          <div className="p-6 text-center space-y-5 flex-1">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                Booking Dispatched Successfully
              </div>
              <h3 className="text-xl font-bold text-neutral-950 mt-1">
                Ad Slot Reserved on {page.name}!
              </h3>
              <p className="text-xs text-neutral-600 mt-1 font-mono">
                Booking ID: {dispatchedOrder.id} · Fare: ${dispatchedOrder.totalPaid.toFixed(2)}
              </p>
            </div>

            {/* Live Campaign Progress Tracker */}
            <div className="p-4 bg-neutral-950 text-white rounded-xl text-left space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold font-mono">LIVE CAMPAIGN DISPATCH</span>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">
                  ETA: {selectedProduct.estimatedBroadcastTime}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 text-neutral-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Fare deposited into Escrow Vault</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Brief received by {page.name} admin (Avg response: ~{store.responseTimeMinutes}m)</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <span className="w-5 h-5 rounded-full bg-neutral-700 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                  <span>Draft review & client verification</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <span className="w-5 h-5 rounded-full bg-neutral-700 text-white flex items-center justify-center text-[10px] font-bold">4</span>
                  <span>Broadcast live to {page.followerCount.toLocaleString()} followers & payout release</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-500">
              You can track your live broadcast progress anytime in <strong>My Campaigns</strong>.
            </p>
          </div>
        )}

        {/* Modal Bottom Controls */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3 shrink-0">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="theme-btn-gradient px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue to Fare Lock (${totalFare.toFixed(2)})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleDispatchBooking}
                disabled={isDispatching}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isDispatching ? 'Dispatching...' : `Confirm & Lock $${totalFare.toFixed(2)} in Escrow`}</span>
              </button>
            </>
          )}

          {step === 3 && (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                Track in My Campaigns
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
