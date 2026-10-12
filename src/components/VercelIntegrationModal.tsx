import React, { useState } from 'react';
import { X, CheckCircle2, Copy, Check, ExternalLink, Terminal, Shield, Zap } from 'lucide-react';

interface VercelIntegrationModalProps {
  onClose: () => void;
}

export const VercelIntegrationModal: React.FC<VercelIntegrationModalProps> = ({ onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const copyConfig = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:px-6 bg-white border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Vercel Iconic Triangle Logo */}
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-xs">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 1155 1000">
                <path d="m577.3 0 577.4 1000H0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Deployment & Infrastructure
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
                Vercel Integration Status
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

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>vercel.json Configured</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Vite SPA rewrites, clean URLs & security headers set.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Zap className="w-4 h-4" />
                <span>Vercel Analytics</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                @vercel/analytics & speed insights activated.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Shield className="w-4 h-4" />
                <span>Edge Caching Ready</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Immutable 1-year asset cache rules applied.
              </p>
            </div>
          </div>

          {/* Quick Deployment Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-neutral-950 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neutral-700" />
              <span>Deploying with Vercel CLI</span>
            </h3>

            <div className="bg-neutral-950 text-neutral-100 rounded-xl p-4 font-mono text-xs space-y-2 relative">
              <div className="text-neutral-400 text-[11px] font-sans">
                Run this command in your project terminal:
              </div>
              <div className="flex items-center justify-between gap-2 bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800">
                <span className="text-emerald-400">npx vercel --prod</span>
                <button
                  type="button"
                  onClick={() => copyCommand('npx vercel --prod')}
                  className="text-neutral-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                  title="Copy command"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 font-sans">
                Vercel will auto-detect the Vite framework configuration from <code className="text-neutral-200 font-mono">vercel.json</code> and output to <code className="text-neutral-200 font-mono">dist/</code>.
              </p>
            </div>
          </div>

          {/* Environment Variables on Vercel */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-neutral-950">
              Environment Variables for Vercel Project
            </h3>
            <p className="text-neutral-600 leading-relaxed text-xs">
              In your <strong>Vercel Dashboard → Project Settings → Environment Variables</strong>, add your Gemini API key so the AI copy generation functions seamlessly in production:
            </p>

            <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50">
              <div className="grid grid-cols-12 px-3 py-2 bg-neutral-100 text-[11px] font-semibold text-neutral-600 border-b border-neutral-200">
                <div className="col-span-6">Key Name</div>
                <div className="col-span-6">Description</div>
              </div>
              <div className="grid grid-cols-12 px-3 py-2.5 text-xs font-mono text-neutral-900 border-b border-neutral-200">
                <div className="col-span-6 font-bold text-neutral-950">GEMINI_API_KEY</div>
                <div className="col-span-6 font-sans text-neutral-600 text-[11px]">Server-side AI copy generation</div>
              </div>
              <div className="grid grid-cols-12 px-3 py-2.5 text-xs font-mono text-neutral-900">
                <div className="col-span-6 font-bold text-neutral-950">VITE_GEMINI_API_KEY</div>
                <div className="col-span-6 font-sans text-neutral-600 text-[11px]">Client-side AI copy generator fallback</div>
              </div>
            </div>
          </div>

          {/* Vercel JSON Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-neutral-950">
                Included <code className="font-mono text-xs">vercel.json</code>
              </h3>
              <button
                type="button"
                onClick={() => copyConfig(`{\n  "$schema": "https://openapi.vercel.sh/vercel.json",\n  "framework": "vite",\n  "buildCommand": "npm run build",\n  "outputDirectory": "dist"\n}`)}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                {copiedConfig ? 'Copied!' : 'Copy Summary'}
              </button>
            </div>
            <pre className="p-3 bg-neutral-100 rounded-xl text-[11px] font-mono text-neutral-800 overflow-x-auto border border-neutral-200">
{`{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`}
            </pre>
          </div>

        </div>

        {/* Modal Bottom Controls */}
        <div className="p-4 sm:px-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
          <div className="text-[11px] text-neutral-500">
            AdSpace is 100% compliant with Vercel Edge & Static Hosting.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-black hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>Open Vercel Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-white border border-neutral-300 rounded-lg cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
