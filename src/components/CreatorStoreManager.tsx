import React, { useState } from 'react';
import { FacebookPage, StandardizedProduct, CreatorStore, AdSlotFormat, ProductTier } from '../types';
import { 
  Store, Copy, Check, Share2, Plus, Trash2, ExternalLink, 
  Eye, Zap, ShieldCheck, ArrowRight, Settings, Sparkles 
} from 'lucide-react';

interface CreatorStoreManagerProps {
  page: FacebookPage;
  onUpdateStore: (pageId: string, updatedStore: CreatorStore) => void;
  onPreviewStore: (page: FacebookPage) => void;
}

export const CreatorStoreManager: React.FC<CreatorStoreManagerProps> = ({
  page,
  onUpdateStore,
  onPreviewStore
}) => {
  const [store, setStore] = useState<CreatorStore>(page.store);
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const storeUrl = `${window.location.origin}?store=${store.storeSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStore(page.id, store);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleAddProduct = () => {
    const newProd: StandardizedProduct = {
      id: `prod_custom_${Date.now()}`,
      format: 'reel_feature',
      tier: 'standard',
      title: 'Standard: Sponsored Product Reel',
      badge: '✨ New Offer',
      description: 'Hands-on video review and demonstration with link pinned in description.',
      price: 500,
      turnaroundHours: 48,
      estimatedBroadcastTime: 'Broadcast in 48 hours at peak time',
      deliverables: ['Custom video production', 'Pinned link in description', '24h analytics proof'],
      bestFor: 'Targeted brands'
    };

    setStore({
      ...store,
      products: [...store.products, newProd]
    });
  };

  const handleRemoveProduct = (index: number) => {
    if (store.products.length <= 1) return;
    setStore({
      ...store,
      products: store.products.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Store Header & Direct Link Hub */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <Store className="w-4 h-4 text-blue-600" />
            <span>Digital Advertising Storefront</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-950 mt-1">
            {page.name}'s Bookable Store
          </h2>
          <p className="text-xs text-neutral-500">
            Share this link on your Facebook page bio, pinned post, or messenger auto-replies to let businesses book standard ad slots instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPreviewStore(page)}
            className="px-4 py-2 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Public Store</span>
          </button>
        </div>
      </div>

      {/* Share Link Card */}
      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-900">
            Your Public Facebook Store Link
          </span>
          <span className="text-[11px] font-mono text-emerald-700 font-semibold">
            ⚡ Instant Escrow Ready
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={storeUrl}
            className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg font-mono text-neutral-800"
          />
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-4 py-2 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <p className="text-[11px] text-neutral-500">
          Tip: Add this link to your Facebook Page's <strong>"Book Now"</strong> action button or include it in your Page About bio to automate inbound sponsorship requests.
        </p>
      </div>

      {/* Store Settings Form */}
      <form onSubmit={handleSaveStore} className="space-y-6 text-xs">
        
        {/* Basic Store Customization */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-neutral-900">1. Store Branding & Identity</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Store Title
              </label>
              <input
                type="text"
                value={store.storeTitle}
                onChange={e => setStore({ ...store, storeTitle: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Store URL Handle (Slug)
              </label>
              <input
                type="text"
                value={store.storeSlug}
                onChange={e => setStore({ ...store, storeSlug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
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
              value={store.tagline}
              onChange={e => setStore({ ...store, tagline: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Estimated Inbound Response Time (Minutes)
              </label>
              <input
                type="number"
                value={store.responseTimeMinutes}
                onChange={e => setStore({ ...store, responseTimeMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Store Announcement / Peak Season Note
              </label>
              <input
                type="text"
                value={store.announcement || ''}
                onChange={e => setStore({ ...store, announcement: e.target.value })}
                placeholder="e.g. 🚀 Q4 booking slots now open"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Standardized Products / Price Menu */}
        <div className="space-y-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-neutral-900">
                2. Standardized Ad Space Products (No DM Haggling)
              </h3>
              <p className="text-neutral-500 text-[11px]">
                Define clear packages like ride types (Economy, Comfort, Premier, Bundle) with fixed pricing.
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
            {store.products.map((prod, idx) => (
              <div
                key={prod.id}
                className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/70 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-neutral-500 mb-0.5">Product Title</label>
                      <input
                        type="text"
                        value={prod.title}
                        onChange={e => {
                          const copy = [...store.products];
                          copy[idx].title = e.target.value;
                          setStore({ ...store, products: copy });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-0.5">Price (USD)</label>
                      <input
                        type="number"
                        value={prod.price}
                        onChange={e => {
                          const copy = [...store.products];
                          copy[idx].price = Number(e.target.value);
                          setStore({ ...store, products: copy });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(idx)}
                    disabled={store.products.length <= 1}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 disabled:opacity-20 cursor-pointer mt-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Estimated Broadcast SLA</label>
                    <input
                      type="text"
                      value={prod.estimatedBroadcastTime}
                      onChange={e => {
                        const copy = [...store.products];
                        copy[idx].estimatedBroadcastTime = e.target.value;
                        setStore({ ...store, products: copy });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Badge / Highlight</label>
                    <input
                      type="text"
                      value={prod.badge || ''}
                      onChange={e => {
                        const copy = [...store.products];
                        copy[idx].badge = e.target.value;
                        setStore({ ...store, products: copy });
                      }}
                      placeholder="e.g. ⚡ Fast 24h Delivery"
                      className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-neutral-500 mb-0.5">Product Description</label>
                  <textarea
                    rows={2}
                    value={prod.description}
                    onChange={e => {
                      const copy = [...store.products];
                      copy[idx].description = e.target.value;
                      setStore({ ...store, products: copy });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            {saveToast && <span className="text-emerald-700 font-bold">✓ Storefront settings updated successfully!</span>}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPreviewStore(page)}
              className="px-4 py-2 font-bold text-neutral-700 hover:text-neutral-950 cursor-pointer"
            >
              Test Live Storefront
            </button>
            <button
              type="submit"
              className="theme-btn-gradient px-5 py-2.5 font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Save Store Changes
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
