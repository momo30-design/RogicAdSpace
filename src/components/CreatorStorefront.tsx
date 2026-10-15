import React, { useState } from 'react';
import { FacebookPage, StandardizedProduct } from '../types';
import { 
  CheckCircle2, Star, Clock, Users, ArrowUpRight, 
  Share2, Copy, Check, ExternalLink, ShieldCheck, 
  Sparkles, Zap, Flame, Award, QrCode
} from 'lucide-react';

interface CreatorStorefrontProps {
  page: FacebookPage;
  onBookProduct: (page: FacebookPage, product: StandardizedProduct) => void;
  onBackToMarketplace?: () => void;
  isStandaloneView?: boolean;
}

export const CreatorStorefront: React.FC<CreatorStorefrontProps> = ({
  page,
  onBookProduct,
  onBackToMarketplace,
  isStandaloneView = false
}) => {
  const store = page.store;
  const storeUrl = `${window.location.origin}?store=${store.storeSlug}`;
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareFacebook = () => {
    const text = encodeURIComponent(`Book advertising space on our official Facebook Page directly via AdSpace: ${storeUrl}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeUrl)}&quote=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-16">
      
      {/* Top Banner for Standalone Store Mode */}
      <div className="bg-neutral-900 text-neutral-300 text-xs px-4 py-2.5 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-medium text-white">
              Official Facebook Advertising Storefront
            </span>
            <span className="text-neutral-500 hidden sm:inline">·</span>
            <span className="text-neutral-400 hidden sm:inline">Powered by AdSpace Escrow</span>
          </div>

          <div className="flex items-center gap-3">
            {onBackToMarketplace && (
              <button
                type="button"
                onClick={onBackToMarketplace}
                className="text-white hover:underline text-xs cursor-pointer font-medium"
              >
                ← Browse All Creator Stores
              </button>
            )}
            <a
              href={page.handle ? `https://facebook.com/${page.handle.replace('@', '')}` : '#'}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
            >
              <span>Visit Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Creator Store Header Banner Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs">
          
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-64 bg-neutral-950">
            <img
              src={page.coverImage}
              alt={page.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* Quick Share Link pill on cover */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Store Link'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
                title="Store QR Code"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>

            {/* Storefront Identity Lockup */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={page.avatarImage}
                  alt={page.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-3 border-white shadow-md shrink-0"
                />
                <div className="text-white">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      {store.storeTitle || `${page.name} Ad Store`}
                    </h1>
                    {page.verified && (
                      <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/90 font-medium mt-0.5">
                    <span className="font-mono">{page.handle}</span>
                    <span>·</span>
                    <span>{page.category}</span>
                    <span>·</span>
                    <span>{page.followerCount.toLocaleString()} Verified Followers</span>
                  </div>
                </div>
              </div>

              {/* Creator Response SLA & Rating */}
              <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-mono text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{page.rating.toFixed(2)}</span>
                  <span className="text-white/70">({page.completedBookings})</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{store.responseTimeMinutes}m reply</span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Subheader: Tagline & Shareable URL bar */}
          <div className="p-4 sm:p-6 bg-white space-y-4">
            <p className="text-sm text-neutral-700 leading-relaxed font-medium">
              {store.tagline || page.bio}
            </p>

            {/* Creator's Direct Store Link Banner */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 shrink-0">
                  Store Link:
                </span>
                <code className="px-2 py-1 bg-white border border-neutral-200 rounded text-neutral-800 font-mono truncate max-w-xs sm:max-w-md">
                  {storeUrl}
                </code>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareFacebook}
                  className="px-3 py-1.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on Facebook</span>
                </button>
              </div>
            </div>

            {/* QR Code Expansion */}
            {showQr && (
              <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200 flex items-center gap-4 text-xs">
                <div className="w-20 h-20 bg-white p-2 rounded-lg border border-neutral-300 flex items-center justify-center font-mono font-bold text-center text-neutral-400">
                  [QR Code]
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Direct Storefront QR Code</div>
                  <p className="text-neutral-500 text-[11px] mt-0.5">
                    Include this QR code on your live streams or YouTube descriptions to allow brands to book advertising on your Facebook page in seconds.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Announcement or Store Notice */}
        {store.announcement && (
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{store.announcement}</span>
            </div>
            <span className="font-mono text-[11px] text-amber-800 font-bold shrink-0">
              Live Availability
            </span>
          </div>
        )}

        {/* Standardized Bookable Products: Turn Informal DM Negotiations Into Fixed Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-950 tracking-tight">
                Standardized Bookable Ad Packages
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Fixed prices, explicit deliverables, and guaranteed broadcast timeframes. Select a package to book immediately.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Escrow Protected</span>
            </div>
          </div>

          {/* Standardized Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {store.products.map((prod) => (
              <div
                key={prod.id}
                className={`p-5 rounded-2xl border bg-white transition-all hover:border-neutral-400 flex flex-col justify-between space-y-4 shadow-xs relative ${
                  prod.isPopular ? 'border-neutral-900 ring-1 ring-neutral-900/10' : 'border-neutral-200'
                }`}
              >
                <div>
                  {/* Badge & Fare */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-100">
                    <div>
                      {prod.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                          {prod.badge}
                        </span>
                      )}
                      <h3 className="font-bold text-base text-neutral-950 mt-1">
                        {prod.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-2xl font-extrabold text-neutral-950 font-mono tabular-nums leading-none">
                        ${prod.price}
                      </div>
                      <div className="text-[10px] text-neutral-400 uppercase font-mono mt-1">Fixed Price</div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Standardized Deliverables List */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5 text-xs">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Standard Deliverables Included:
                    </div>
                    {prod.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-neutral-700">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Estimated Pickup & Broadcast SLA */}
                  <div className="mt-4 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500">Broadcast Timeframe:</span>
                    <span className="text-neutral-900 font-bold">{prod.estimatedBroadcastTime}</span>
                  </div>
                </div>

                {/* Instant Book Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onBookProduct(page, prod)}
                    className="theme-btn-gradient w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Book Ad Slot (${prod.price})</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audited Audience Demographic Matrix */}
        <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-neutral-950 flex items-center gap-2">
              <Users className="w-4 h-4 text-neutral-600" />
              <span>Audience Demographic Distribution</span>
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              Verified via Meta Graph Insights
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Top Country</div>
              <div className="text-base font-bold text-neutral-900 mt-1">
                {page.demographics.topCountry} ({page.demographics.countryShare}%)
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Prime Age Group</div>
              <div className="text-base font-bold text-neutral-900 mt-1">
                {page.demographics.primaryAgeBracket} ({page.demographics.ageBracketShare}%)
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Gender Ratio</div>
              <div className="text-base font-bold text-neutral-900 mt-1 font-mono">
                {page.demographics.genderRatio.male}% M / {page.demographics.genderRatio.female}% F
              </div>
            </div>
          </div>
        </div>

        {/* Escrow Peace of Mind Guarantee */}
        <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 leading-relaxed">
            <div className="font-bold text-sm">AdSpace Escrow Guarantee:</div>
            <p className="mt-0.5 text-neutral-700">
              When booking on {page.name}'s store, your fare is securely held in AdSpace Escrow. The page admin only receives payment after providing verified proof of live Facebook broadcast. If the post is not delivered according to the agreed schedule, 100% of your deposit is refunded instantly.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
