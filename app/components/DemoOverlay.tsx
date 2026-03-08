"use client";

import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface DemoOverlayProps {
  showDemo: boolean;
}

export function DemoOverlay({ showDemo }: DemoOverlayProps) {
  const [videoTime, setVideoTime] = useState(0); 
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API instantly on mount for preloading
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "yDGhNRkr158",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 1,
          loop: 1,
          playlist: "yDGhNRkr158"
        },
        events: {
          onReady: (event: any) => {
            // Player is ready but waiting for showDemo
          }
        }
      });
    };

    if (window.YT && window.YT.Player && !playerRef.current) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  // Trigger play only when showDemo becomes true
  useEffect(() => {
    if (showDemo && playerRef.current && playerRef.current.playVideo) {
      // Always start from the beginning
      if (playerRef.current.seekTo) {
        playerRef.current.seekTo(0, true);
      }
      setTimeout(() => {
        playerRef.current.playVideo();
      }, 300);
    }
  }, [showDemo]);

  const seekTo = (seconds: number) => {
    setVideoTime(seconds);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seconds, true);
    }
  };

  return (
    <div 
      className={`fixed inset-0 w-full h-full z-[100] bg-[#FDFCFB] flex items-center justify-center transition-all duration-1000 overflow-y-auto py-12 ${showDemo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div className="w-[90vw] max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center justify-center min-h-[700px]">
        {/* Left Side: Video iframe & Controls */}
        <div className="flex flex-col items-center gap-6 w-full max-w-[400px] mx-auto lg:ml-auto lg:mr-8">
          {/* Phone Bezel */}
          <div className={`w-full relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-[6px] border-[#111] bg-[#111] aspect-[9/16] ring-1 ring-black/10 transition-all duration-1000 delay-300 ${showDemo ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
             {/* YouTube Player Container - scaled perfectly to show the shorts ui correctly */}
             <div className="w-full h-full rounded-[1.6rem] overflow-hidden relative pointer-events-none">
                <div id="yt-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%]" />
             </div>
          </div>

          {/* Interactive Timeline Controls */}
          <div 
            className={`flex gap-3 w-full transition-all duration-700 delay-[600ms] ${showDemo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <button 
              onClick={() => seekTo(0)}
              className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold tracking-widest transition-all active:scale-95 ${videoTime === 0 ? 'bg-black/10 border-black/10 text-[#1D352F]' : 'bg-black/5 hover:bg-black/10 border-black/5 text-[#1D352F]/60'}`}
            >
              USER FLOW
            </button>
            <button 
              onClick={() => seekTo(30)}
              className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold tracking-widest transition-all active:scale-95 ${videoTime === 30 ? 'bg-black/10 border-black/10 text-[#1D352F]' : 'bg-black/5 hover:bg-black/10 border-black/5 text-[#1D352F]/60'}`}
            >
              ORGANIZER
            </button>
          </div>
        </div>

        {/* Right Side: Flow description layout */}
        <div className="space-y-8 text-left max-w-lg mx-auto lg:mr-auto lg:ml-8 w-full py-12">
           <div className={`mono text-sm tracking-[0.4em] text-[#7BB89A] font-bold transition-all duration-700 delay-[500ms] ${showDemo ? 'opacity-100' : 'opacity-0'}`}>
             THE EXPERIENCE
           </div>
           <h3 className={`text-5xl md:text-6xl italic font-medium tracking-tighter text-[#1D352F] leading-none transition-all duration-700 delay-[600ms] ${showDemo ? 'opacity-100' : 'opacity-0'}`}>
             {videoTime === 30 ? "Organizer Flow." : "Bettor Flow."}
           </h3>
           <div className="space-y-6 pt-4 relative">
             
             {/* ── BETTOR FLOW ── */}
             <div className={`transition-all duration-700 absolute inset-0 ${videoTime === 0 ? 'opacity-100 translate-y-0 pointer-events-auto delay-[1000ms]' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
               <div className="space-y-6">
                 {/* 0:02 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:02</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Viewing event info, total pool, and active bettors.</p>
                 </div>
                 {/* 0:07 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:07</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Entering email & nickname, selecting outcome and amount.</p>
                 </div>
                 {/* 0:17 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:17</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Rechecking estimated return, confirming, and paying.</p>
                 </div>
                 {/* 0:20 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:20</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Bet successfully placed. Enabling closure notifications.</p>
                 </div>
               </div>
             </div>

             {/* ── ORGANIZER FLOW ── */}
             <div className={`transition-all duration-700 absolute inset-0 ${videoTime === 30 ? 'opacity-100 translate-y-0 pointer-events-auto delay-[500ms]' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
               <div className="space-y-6">
                 {/* 0:30 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:30</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Viewing event info, total pool, and active bettors.</p>
                 </div>
                 {/* 0:33 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:33</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Signing in with Apple.</p>
                 </div>
                 {/* 0:35 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:35</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Agreeing with terms of service.</p>
                 </div>
                 {/* 0:37 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:37</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Defining event details, adding outcomes, and setting rules.</p>
                 </div>
                 {/* 0:57 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:57</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Previewing and creating market.</p>
                 </div>
                 {/* 1:02 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">1:02</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Market is live. QR code generated for sharing.</p>
                 </div>
                 {/* 1:08 */}
                 <div className="flex gap-4 items-start">
                   <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">1:08</span>
                   <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Managing dashboard, closing bets, and resolving payouts.</p>
                 </div>
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
