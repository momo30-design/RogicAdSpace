import React from 'react';
import { FacebookPage, StandardizedProduct } from '../types';
import { CheckCircle2, Star, Users, ArrowUpRight, Clock, Store, Zap } from 'lucide-react';

interface PageCardProps {
  page: FacebookPage;
  onSelect: (page: FacebookPage) => void;
  onQuickBook: (page: FacebookPage) => void;
  onOpenStore?: (page: FacebookPage) => void;
}

export const PageCard: React.FC<PageCardProps> = ({ page, onSelect, onQuickBook, onOpenStore }) => {
  // Lowest starting price among slots or store products
  const lowestPrice = page.store?.products?.length 
    ? Math.min(...page.store.products.map(p => p.price))
    : Math.min(...page.slots.map(s => s.price));

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col group shadow-xs">
      {/* Cover / Feature Visual */}
      <div className="relative aspect-16/10 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelect(page)}>
        <img
          src={page.coverImage}
          alt={page.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Category & Status Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow-md">
          <span className="font-bold text-white/95 tracking-wider uppercase text-[10px] px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md border border-white/15">
            {page.category}
          </span>
          <div className="flex items-center gap-1 font-mono tabular-nums text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/15">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
            <span className="font-bold">{page.rating.toFixed(2)}</span>
            <span className="text-white/70">({page.completedBookings})</span>
          </div>
        </div>

        {/* Page Identity on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
          <img
            src={page.avatarImage}
            alt={page.name}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md shrink-0"
          />
          <div className="min-w-0 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-base truncate leading-tight drop-shadow-xs">
                {page.name}
              </h3>
              {page.verified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0 inline" />
              )}
            </div>
            <p className="text-xs text-white/85 font-mono truncate">
              {page.handle}
            </p>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Bio / Store Tagline */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {page.store?.tagline || page.bio}
        </p>

        {/* Audience & Performance Metrics */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-left">
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Followers</div>
            <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
              {formatFollowers(page.followerCount)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Engagement</div>
            <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
              {page.engagementRate}%
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Avg Reach</div>
            <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
              {formatFollowers(page.avgReachPerPost)}
            </div>
          </div>
        </div>

        {/* Store SLA & Response Time */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
            <Clock className="w-3 h-3 text-emerald-600" />
            <span>Replies in ~{page.store?.responseTimeMinutes || 15}m</span>
          </div>
          <div className="text-[11px] text-slate-500">
            {page.demographics.topCountry} ({page.demographics.countryShare}%)
          </div>
        </div>

        {/* Available Standardized Products Preview */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(page.store?.products || page.slots).slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-medium truncate max-w-[170px]"
            >
              {'format' in item && item.format === 'feed_post' ? 'Feed Post' :
               'format' in item && item.format === 'reel_feature' ? 'Video Reel' :
               'format' in item && item.format === 'story_swipe' ? 'Story (24h)' : 
               'format' in item && item.format === 'bundle_blitz' ? 'Campaign Blitz' : 'Header Takeover'}
            </span>
          ))}
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-400 leading-none font-mono uppercase font-semibold">Upfront Fare</div>
            <div className="text-base font-extrabold text-slate-950 font-mono tabular-nums leading-tight mt-0.5">
              ${lowestPrice}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenStore ? onOpenStore(page) : onSelect(page)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Store</span>
            </button>
            <button
              type="button"
              onClick={() => onQuickBook(page)}
              className="theme-btn-gradient px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>Book Slot</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
