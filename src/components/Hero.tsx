import React from 'react';
import { HERO_IMAGE } from '../data/mockData';
import { ShieldCheck, ArrowRight, CheckCircle2, Store, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenHowItWorks: () => void;
  onOpenCreateStore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenHowItWorks, onOpenCreateStore }) => {
  return (
    <section className="border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden transition-colors">
      {/* Modern ambient radial glow effects responding to theme */}
      <div 
        style={{ background: 'var(--theme-ring)' }}
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-60" 
      />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* 2-Column Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Top Prompt Badge */}
            <div className="inline-flex items-center gap-2 p-1 pl-2.5 pr-3.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs w-fit max-w-full">
              <span 
                style={{ background: 'var(--theme-primary)' }}
                className="w-2 h-2 rounded-full animate-ping shrink-0"
              />
              <span className="truncate">
                Book social ads in minutes. On-demand social advertising .Find advertising space. Book it. Get see.
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.12]" style={{ textWrap: 'balance' }}>
              Turn Informal Facebook Sponsorships Into Instant Bookable Stores
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Stop losing days in messy Messenger and WhatsApp price haggling. Every creator and Facebook page owner gets their own digital advertising store with a shareable link. Businesses book posts, reels, and stories with upfront fixed pricing and guaranteed broadcast times.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreClick}
                className="theme-btn-gradient px-6 py-3.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Book Advertising Space</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenCreateStore}
                className="px-5 py-3.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex items-center gap-2 border border-slate-300 shadow-2xs hover:border-slate-400"
              >
                <Store className="w-4 h-4 text-slate-700" />
                <span>Create Your Page Store (Get Link)</span>
              </button>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Each creator has their own shareable link</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fixed standardized products & ETA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Escrow deposit protection</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Modern Overlay Box */}
          <div className="lg:col-span-5 relative">
            <div className="h-full min-h-[340px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg relative group bg-slate-950">
              <img
                src={HERO_IMAGE}
                alt="AdSpace Digital Media Marketing Workspace"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
              
              {/* Modern Frosted Glass Simulation Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 shadow-xl text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Instant On-Demand Booking</span>
                  </div>
                  <span className="font-mono text-emerald-700 font-bold">$450.00 Fixed Fare</span>
                </div>

                <div className="space-y-1.5 text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Selected Product:</span>
                    <span className="font-semibold text-slate-900">Comfort: Dedicated Feed Post</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Page Dispatch:</span>
                    <span className="font-semibold text-slate-900">TechPulse Weekly (@techpulseweekly)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Broadcast Window:</span>
                    <span className="font-mono font-bold" style={{ color: 'var(--theme-primary)' }}>
                      Tomorrow at 6:00 PM EST
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Funds safely held in Escrow</span>
                  </span>
                  <span className="font-bold font-mono" style={{ color: 'var(--theme-primary)' }}>
                    adspace.app/@techpulse
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4-Column KPI Strip Full-Width Row Below Split */}
      <div className="border-t border-slate-200/80 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
                850+
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                Active Creator Digital Stores
              </div>
            </div>

            <div className="p-2">
              <div 
                style={{ color: 'var(--theme-primary)' }}
                className="text-2xl sm:text-3xl font-extrabold tabular-nums font-mono"
              >
                14 Mins
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                Average Booking Acceptance Time
              </div>
            </div>

            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tabular-nums font-mono">
                $2.4M+
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                Escrow Protected Ad Dollars
              </div>
            </div>

            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-mono">
                0 DMs
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                Zero Price Haggling or Delays
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
