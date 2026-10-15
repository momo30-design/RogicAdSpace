import React, { useState } from 'react';
import { Store, ShieldCheck, Sparkles, Palette, Check } from 'lucide-react';
import { ThemePalette, ThemeOption } from '../types';

interface NavbarProps {
  activeTab: 'explore' | 'campaigns' | 'creator_hub' | 'how_it_works';
  setActiveTab: (tab: 'explore' | 'campaigns' | 'creator_hub' | 'how_it_works') => void;
  activeRole: 'advertiser' | 'creator';
  setActiveRole: (role: 'advertiser' | 'creator') => void;
  onOpenListModal: () => void;
  activeBookingsCount: number;
  currentTheme?: ThemePalette;
  onSelectTheme?: (theme: ThemePalette) => void;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'violet', name: 'Cosmic Violet', primaryColor: '#6366F1', gradient: 'from-indigo-500 to-violet-500', dotClass: 'bg-indigo-500' },
  { id: 'emerald', name: 'Cyber Emerald', primaryColor: '#059669', gradient: 'from-emerald-500 to-teal-500', dotClass: 'bg-emerald-500' },
  { id: 'sapphire', name: 'Ocean Sapphire', primaryColor: '#0284C7', gradient: 'from-sky-500 to-blue-600', dotClass: 'bg-sky-500' },
  { id: 'amber', name: 'Sunset Amber', primaryColor: '#D97706', gradient: 'from-amber-500 to-orange-500', dotClass: 'bg-amber-500' },
  { id: 'rose', name: 'Neon Rose', primaryColor: '#E11D48', gradient: 'from-rose-500 to-pink-500', dotClass: 'bg-rose-500' }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  onOpenListModal,
  activeBookingsCount,
  currentTheme = 'violet',
  onSelectTheme
}) => {
  const [showThemePicker, setShowThemePicker] = useState(false);

  return (
    <div className="sticky top-0 z-40">
      {/* Top Banner on top of web app with modern radiant dark gradient */}
      <div 
        style={{ background: 'var(--banner-bg)', borderBottomColor: 'var(--banner-border)' }}
        className="text-white text-xs py-2 px-4 border-b text-center font-medium tracking-wide shadow-xs relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap relative z-10">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-white/90 border border-white/15">
            <Sparkles className="w-3 h-3 text-amber-300" />
            AdSpace Direct
          </span>
          <span className="font-semibold text-slate-100 drop-shadow-xs">
            Book social ads in minutes. On-demand social advertising .Find advertising space. Book it. Get see.
          </span>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Zone 1: Single text element Brand wordmark with vibrant theme icon */}
        <button
          type="button"
          onClick={() => setActiveTab('explore')}
          className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center gap-2.5 cursor-pointer"
        >
          <span 
            style={{ 
              background: 'linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-to))',
              boxShadow: 'var(--theme-glow)'
            }} 
            className="w-9 h-9 rounded-xl text-white flex items-center justify-center font-extrabold text-base shadow-md transition-all"
          >
            A
          </span>
          <div className="flex flex-col text-left">
            <span className="font-extrabold tracking-tight text-base sm:text-lg leading-tight">AdSpace</span>
            <span className="text-[10px] font-mono text-slate-400 font-normal leading-none">Creator Stores</span>
          </div>
        </button>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            style={activeTab === 'explore' ? { color: 'var(--theme-primary)', borderBottomColor: 'var(--theme-primary)' } : {}}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'explore'
                ? 'font-bold border-b-2'
                : 'hover:text-slate-900'
            }`}
          >
            Creator Stores
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('how_it_works')}
            style={activeTab === 'how_it_works' ? { color: 'var(--theme-primary)', borderBottomColor: 'var(--theme-primary)' } : {}}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'how_it_works'
                ? 'font-bold border-b-2'
                : 'hover:text-slate-900'
            }`}
          >
            How Escrow Works
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('advertiser');
              setActiveTab('campaigns');
            }}
            style={activeTab === 'campaigns' ? { color: 'var(--theme-primary)', borderBottomColor: 'var(--theme-primary)' } : {}}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'campaigns'
                ? 'font-bold border-b-2'
                : 'hover:text-slate-900'
            }`}
          >
            <span>My Bookings</span>
            {activeBookingsCount > 0 && (
              <span 
                style={{ 
                  backgroundColor: 'var(--theme-light)', 
                  color: 'var(--theme-text)',
                  borderColor: 'var(--theme-light-border)' 
                }}
                className="font-mono text-xs px-1.5 py-0.2 border rounded font-bold"
              >
                {activeBookingsCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('creator');
              setActiveTab('creator_hub');
            }}
            style={activeTab === 'creator_hub' ? { color: 'var(--theme-primary)', borderBottomColor: 'var(--theme-primary)' } : {}}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'creator_hub'
                ? 'font-bold border-b-2'
                : 'hover:text-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary)' }} />
            <span>Creator Store Hub</span>
          </button>
        </nav>

        {/* Zone 3: Actions + Color Palette Customizer */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Color Switcher Dropdown */}
          {onSelectTheme && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowThemePicker(!showThemePicker)}
                title="Change website color theme"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/80 flex items-center gap-1 text-xs font-medium"
              >
                <div 
                  style={{ background: 'var(--theme-primary)' }} 
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-2xs" 
                />
                <span className="hidden sm:inline text-[11px] text-slate-600 font-medium">Color</span>
              </button>

              {showThemePicker && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowThemePicker(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Website Color Theme
                    </div>
                    <div className="space-y-1 mt-1">
                      {THEME_OPTIONS.map((theme) => {
                        const isSelected = currentTheme === theme.id;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => {
                              onSelectTheme(theme.id);
                              setShowThemePicker(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-slate-100 text-slate-950 font-bold' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span 
                                style={{ backgroundColor: theme.primaryColor }} 
                                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs" 
                              />
                              <span>{theme.name}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-slate-900" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Create Page Store Button */}
          <button
            type="button"
            onClick={onOpenListModal}
            className="theme-btn-gradient px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Store className="w-3.5 h-3.5 text-white/90" />
            <span className="hidden sm:inline">Create Page Store</span>
            <span className="sm:hidden">New Store</span>
          </button>
        </div>

      </div>
    </header>
  </div>
  );
};
