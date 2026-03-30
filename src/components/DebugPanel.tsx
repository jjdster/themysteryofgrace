import { useState, useEffect } from 'react';
import { Bug, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { getGeminiApiKey } from '../lib/api';

export const DebugPanel = () => {
  const [show, setShow] = useState(false);
  const [logStatus, setLogStatus] = useState<{ 
    status?: string; 
    configured: boolean; 
    userEmail?: string; 
    error?: string;
    env?: any;
  } | null>(null);
  const apiKeyProcess = process.env.GEMINI_API_KEY;
  const apiKeyVite = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const apiKeyResolved = getGeminiApiKey();

  useEffect(() => {
    if (show) {
      fetch('/api/logs/status')
        .then(async res => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Status ${res.status}: ${text.substring(0, 30)}`);
          }
          return res.json();
        })
        .then(data => setLogStatus(data))
        .catch((err) => {
          setLogStatus({ configured: false, error: err.message });
        });
    }
  }, [show]);

  const mask = (key: string | undefined) => {
    if (!key || key === "undefined" || key === "") return "MISSING";
    if (key.length <= 8) return "****";
    return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
  };

  if (!show) {
    return (
      <button 
        onClick={() => setShow(true)}
        className="fixed bottom-4 right-4 z-[100] p-3 bg-primary text-secondary rounded-full shadow-lg opacity-30 hover:opacity-100 transition-all hover:scale-110 group"
        title="Open Debug Panel"
      >
        <Bug className="h-5 w-5" />
        <span className="absolute right-full mr-2 px-2 py-1 bg-primary text-secondary text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Debug Mode
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100] p-6 bg-primary text-secondary rounded-3xl shadow-2xl border border-white/10 max-w-sm w-full font-mono text-[11px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Bug className="h-4 w-4 text-accent" />
          <span className="font-bold tracking-widest uppercase">Environment Debug</span>
        </div>
        <button onClick={() => setShow(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <ChevronRight className="h-4 w-4 rotate-90" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="text-white/40 uppercase text-[9px] mb-1 tracking-tighter">process.env.GEMINI_API_KEY</div>
          <div className={`font-bold ${apiKeyProcess && apiKeyProcess !== "undefined" ? 'text-green-400' : 'text-red-400'}`}>
            {mask(apiKeyProcess)}
          </div>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="text-white/40 uppercase text-[9px] mb-1 tracking-tighter">import.meta.env.VITE_GEMINI_API_KEY</div>
          <div className={`font-bold ${apiKeyVite && apiKeyVite !== "undefined" ? 'text-green-400' : 'text-red-400'}`}>
            {mask(apiKeyVite)}
          </div>
        </div>

        <div className="bg-accent/10 p-3 rounded-xl border border-accent/20">
          <div className="text-accent uppercase text-[9px] mb-1 tracking-tighter font-bold">Resolved API Key (Used by App)</div>
          <div className={`font-bold ${apiKeyResolved ? 'text-green-400' : 'text-red-400'}`}>
            {mask(apiKeyResolved)}
          </div>
        </div>

        {/* Logging Status */}
        <div className={`p-3 rounded-xl border ${logStatus?.configured ? 'bg-green-400/10 border-green-400/20' : 'bg-red-400/10 border-red-400/20'}`}>
          <div className="flex items-center justify-between mb-1">
            <div className="text-white/40 uppercase text-[9px] tracking-tighter">Google Drive Logging</div>
            {logStatus?.configured ? <CheckCircle2 className="h-3 w-3 text-green-400" /> : <AlertCircle className="h-3 w-3 text-red-400" />}
          </div>
          
          <div className="flex flex-col gap-1">
            <div className={`font-bold ${logStatus?.configured ? 'text-green-400' : 'text-red-400'}`}>
              {logStatus?.configured ? 'CONFIGURED' : 'NOT CONFIGURED'}
            </div>
            
            {logStatus?.status && (
              <div className="text-[8px] text-white/60">Server Status: <span className="text-accent">{logStatus.status}</span></div>
            )}
            
            {logStatus?.error && (
              <div className="text-[8px] text-red-300 italic">Error: {logStatus.error}</div>
            )}

            {logStatus?.env && (
              <div className="text-[7px] text-white/20">Vercel: {String(logStatus.env.VERCEL)} | {logStatus.env.NODE_ENV}</div>
            )}
          </div>

          {logStatus?.configured && (
            <div className="text-[8px] text-white/40 mt-1 truncate">
              Sharing with: {logStatus.userEmail}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="text-white/40 uppercase text-[9px] mb-1 tracking-tighter">Node Env</div>
            <div className="text-accent">{process.env.NODE_ENV || 'development'}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="text-white/40 uppercase text-[9px] mb-1 tracking-tighter">Study Mode</div>
            <div className="text-accent">Active</div>
          </div>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="text-white/40 uppercase text-[9px] mb-1 tracking-tighter">Origin</div>
          <div className="truncate text-white/60">{window.location.origin}</div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 text-[9px] text-white/30 text-center">
        AI Studio Build Environment Diagnostics
      </div>
    </div>
  );
};
