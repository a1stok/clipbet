"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

        </div>

        {/* Right Side: Flow description layout */}
        <div className="flex flex-col h-full max-w-lg mx-auto lg:mr-auto lg:ml-0 w-full py-12">
           <div className={`mono text-sm tracking-[0.4em] text-[#7BB89A] font-bold transition-all duration-700 delay-[500ms] ${showDemo ? 'opacity-100' : 'opacity-0'}`}>
             THE EXPERIENCE
           </div>
           
           <div className="flex flex-col flex-1 min-h-[500px]">
             <h3 className={`text-5xl md:text-6xl italic font-medium tracking-tighter text-[#1D352F] leading-none mt-4 transition-all duration-700 delay-[600ms] ${showDemo ? 'opacity-100' : 'opacity-0'}`}>
               {videoTime >= 30 ? "Organizer Flow." : "Bettor Flow."}
             </h3>

             <div className="relative flex-1 mt-8">
               <AnimatePresence mode="wait">
                 {videoTime < 30 ? (
                   <motion.div
                     key="bettor"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.4 }}
                     className="space-y-6"
                   >
                     {/* 0:02 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:02</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Fan scans QR/NFC. Clip launches with event info and live pool stats.</p>
                     </div>
                     {/* 0:07 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:07</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Quick entry: Email, optional nickname, and outcome selection.</p>
                     </div>
                     {/* 0:17 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:17</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">One-tap payment via Apple Pay after checking estimated returns.</p>
                     </div>
                     {/* 0:20 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:20</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Success! Fan opts into closure notifications for the final result.</p>
                     </div>
                   </motion.div>
                 ) : (
                   <motion.div
                     key="organizer"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.4 }}
                     className="space-y-6"
                   >
                     {/* 0:30 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:30</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Organizer launches `/discover` to create or manage markets.</p>
                     </div>
                     {/* 0:33 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:33</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Secure Sign In with Apple and agreement to platform terms.</p>
                     </div>
                     {/* 0:37 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">0:37</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Market creation: Upload photo, set outcomes, time, and fees.</p>
                     </div>
                     {/* 1:02 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">1:02</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Market goes live. Share unique QR code for immediate fan engagement.</p>
                     </div>
                     {/* 1:08 */}
                     <div className="flex gap-4 items-start">
                       <span className="mono text-sm tracking-widest text-[#7BB89A] font-bold shrink-0 mt-2 w-16">1:08</span>
                       <p className="text-xl md:text-2xl text-black/80 font-serif leading-relaxed">Dashboard: Track real-time bets, close market, or resolve the event.</p>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             {/* Interactive Timeline Controls moved here for better layout */}
             <div 
               className={`flex gap-3 w-full max-w-[400px] mt-12 transition-all duration-700 delay-[800ms] ${showDemo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
             >
               <button 
                 onClick={() => seekTo(0)}
                 className={`flex-1 py-4 px-6 rounded-2xl border text-sm font-bold tracking-widest transition-all active:scale-95 ${videoTime < 30 ? 'bg-[#1D352F] border-[#1D352F] text-white shadow-lg' : 'bg-black/5 hover:bg-black/10 border-black/5 text-[#1D352F]/60'}`}
               >
                 BETTOR FLOW
               </button>
               <button 
                 onClick={() => seekTo(30)}
                 className={`flex-1 py-4 px-6 rounded-2xl border text-sm font-bold tracking-widest transition-all active:scale-95 ${videoTime >= 30 ? 'bg-[#1D352F] border-[#1D352F] text-white shadow-lg' : 'bg-black/5 hover:bg-black/10 border-black/5 text-[#1D352F]/60'}`}
               >
                 OPERATOR
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
