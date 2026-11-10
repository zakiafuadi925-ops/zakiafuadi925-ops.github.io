import { Sparkles } from "lucide-react";

const MARQUEE_TECH = [
  {
    name: "React 19",
    category: "FRONTEND",
    neon: "cyan",
    color: "#00f0ff",
    bgDark: "bg-[#00f0ff]/10",
    border: "border-[#00f0ff]",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.35)] hover:shadow-[0_0_22px_rgba(0,240,255,0.7)]",
    tokyoBorder: "border-cyan-500/50 hover:border-cyan-400 text-cyan-300",
  },
  {
    name: "Python",
    category: "QUANT & AI",
    neon: "yellow",
    color: "#fcee0a",
    bgDark: "bg-[#fcee0a]/10",
    border: "border-[#fcee0a]",
    shadow: "shadow-[0_0_12px_rgba(252,238,10,0.35)] hover:shadow-[0_0_22px_rgba(252,238,10,0.7)]",
    tokyoBorder: "border-yellow-500/50 hover:border-yellow-400 text-yellow-300",
  },
  {
    name: "Tailwind CSS",
    category: "STYLING",
    neon: "cyan",
    color: "#00f0ff",
    bgDark: "bg-[#00f0ff]/10",
    border: "border-[#00f0ff]",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.35)] hover:shadow-[0_0_22px_rgba(0,240,255,0.7)]",
    tokyoBorder: "border-teal-500/50 hover:border-teal-400 text-teal-300",
  },
  {
    name: "TypeScript",
    category: "CORE",
    neon: "pink",
    color: "#ff00e5",
    bgDark: "bg-[#ff00e5]/10",
    border: "border-[#ff00e5]",
    shadow: "shadow-[0_0_12px_rgba(255,0,229,0.35)] hover:shadow-[0_0_22px_rgba(255,0,229,0.7)]",
    tokyoBorder: "border-blue-500/50 hover:border-blue-400 text-blue-300",
  },
  {
    name: "Next.js",
    category: "FULL-STACK",
    neon: "pink",
    color: "#ff00e5",
    bgDark: "bg-[#ff00e5]/10",
    border: "border-[#ff00e5]",
    shadow: "shadow-[0_0_12px_rgba(255,0,229,0.35)] hover:shadow-[0_0_22px_rgba(255,0,229,0.7)]",
    tokyoBorder: "border-slate-600 hover:border-slate-400 text-slate-200",
  },
  {
    name: "PostgreSQL",
    category: "DATABASE",
    neon: "violet",
    color: "#9d00ff",
    bgDark: "bg-[#9d00ff]/10",
    border: "border-[#9d00ff]",
    shadow: "shadow-[0_0_12px_rgba(157,0,255,0.35)] hover:shadow-[0_0_22px_rgba(157,0,255,0.7)]",
    tokyoBorder: "border-indigo-500/50 hover:border-indigo-400 text-indigo-300",
  },
  {
    name: "Supabase",
    category: "BACKEND / RLS",
    neon: "green",
    color: "#39ff14",
    bgDark: "bg-[#39ff14]/10",
    border: "border-[#39ff14]",
    shadow: "shadow-[0_0_12px_rgba(57,255,20,0.35)] hover:shadow-[0_0_22px_rgba(57,255,20,0.7)]",
    tokyoBorder: "border-emerald-500/50 hover:border-emerald-400 text-emerald-300",
  },
  {
    name: "Svelte 5",
    category: "FRONTEND",
    neon: "red",
    color: "#ff003c",
    bgDark: "bg-[#ff003c]/10",
    border: "border-[#ff003c]",
    shadow: "shadow-[0_0_12px_rgba(255,0,60,0.35)] hover:shadow-[0_0_22px_rgba(255,0,60,0.7)]",
    tokyoBorder: "border-orange-500/50 hover:border-orange-400 text-orange-300",
  },
  {
    name: "PyTorch / LSTM",
    category: "DEEP LEARNING",
    neon: "pink",
    color: "#ff00e5",
    bgDark: "bg-[#ff00e5]/10",
    border: "border-[#ff00e5]",
    shadow: "shadow-[0_0_12px_rgba(255,0,229,0.35)] hover:shadow-[0_0_22px_rgba(255,0,229,0.7)]",
    tokyoBorder: "border-rose-500/50 hover:border-rose-400 text-rose-300",
  },
  {
    name: "Docker",
    category: "DEVOPS",
    neon: "cyan",
    color: "#00f0ff",
    bgDark: "bg-[#00f0ff]/10",
    border: "border-[#00f0ff]",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.35)] hover:shadow-[0_0_22px_rgba(0,240,255,0.7)]",
    tokyoBorder: "border-cyan-500/50 hover:border-cyan-400 text-cyan-300",
  },
  {
    name: "Linux / Zsh",
    category: "ENVIRONMENT",
    neon: "yellow",
    color: "#fcee0a",
    bgDark: "bg-[#fcee0a]/10",
    border: "border-[#fcee0a]",
    shadow: "shadow-[0_0_12px_rgba(252,238,10,0.35)] hover:shadow-[0_0_22px_rgba(252,238,10,0.7)]",
    tokyoBorder: "border-amber-500/50 hover:border-amber-400 text-amber-300",
  },
  {
    name: "Capacitor PWA",
    category: "MOBILE",
    neon: "cyan",
    color: "#00f0ff",
    bgDark: "bg-[#00f0ff]/10",
    border: "border-[#00f0ff]",
    shadow: "shadow-[0_0_12px_rgba(0,240,255,0.35)] hover:shadow-[0_0_22px_rgba(0,240,255,0.7)]",
    tokyoBorder: "border-sky-500/50 hover:border-sky-400 text-sky-300",
  },
  {
    name: "IndexedDB",
    category: "OFFLINE-FIRST",
    neon: "green",
    color: "#39ff14",
    bgDark: "bg-[#39ff14]/10",
    border: "border-[#39ff14]",
    shadow: "shadow-[0_0_12px_rgba(57,255,20,0.35)] hover:shadow-[0_0_22px_rgba(57,255,20,0.7)]",
    tokyoBorder: "border-emerald-500/50 hover:border-emerald-400 text-emerald-300",
  },
  {
    name: "NumPy & Pandas",
    category: "DATA ANALYSIS",
    neon: "violet",
    color: "#9d00ff",
    bgDark: "bg-[#9d00ff]/10",
    border: "border-[#9d00ff]",
    shadow: "shadow-[0_0_12px_rgba(157,0,255,0.35)] hover:shadow-[0_0_22px_rgba(157,0,255,0.7)]",
    tokyoBorder: "border-purple-500/50 hover:border-purple-400 text-purple-300",
  },
  {
    name: "Laravel",
    category: "BACKEND",
    neon: "red",
    color: "#ff003c",
    bgDark: "bg-[#ff003c]/10",
    border: "border-[#ff003c]",
    shadow: "shadow-[0_0_12px_rgba(255,0,60,0.35)] hover:shadow-[0_0_22px_rgba(255,0,60,0.7)]",
    tokyoBorder: "border-red-500/50 hover:border-red-400 text-red-300",
  },
  {
    name: "Vite 8",
    category: "BUILD TOOL",
    neon: "yellow",
    color: "#fcee0a",
    bgDark: "bg-[#fcee0a]/10",
    border: "border-[#fcee0a]",
    shadow: "shadow-[0_0_12px_rgba(252,238,10,0.35)] hover:shadow-[0_0_22px_rgba(252,238,10,0.7)]",
    tokyoBorder: "border-yellow-500/50 hover:border-yellow-400 text-yellow-300",
  },
];

export default function TechMarquee({
  isCyber = true,
  items = MARQUEE_TECH,
  lang = "en",
}) {
  const isId = lang === "id";
  // Duplicate array for infinite seamless looping
  const marqueeItems = [...items, ...items];

  return (
    <div className="w-full pt-6 pb-2 space-y-3">
      {/* MARQUEE HEADER HUD INFO */}
      <div className="flex items-center justify-between px-2 text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full animate-ping ${
              isCyber ? "bg-[#ff00e5]" : "bg-cyan-400"
            }`}
          ></span>
          <span
            className={`tracking-widest uppercase font-semibold ${
              isCyber ? "text-[#00f0ff]" : "text-cyan-400"
            }`}
          >
            // {isId
              ? "TELEMETRI SISTEM : MATRIKS TEKNOLOGI AKTIF"
              : "SYSTEM TELEMETRY : ACTIVE TECH MATRIX"}
          </span>
        </div>

        <div
          className={`hidden sm:flex items-center gap-2 ${
            isCyber ? "text-[#787899]" : "text-slate-500"
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#fcee0a]" />
          <span>
            [{isId ? "ARAHKAN KURSOR UNTUK JEDA" : "HOVER TO PAUSE & INSPECT"}]
          </span>
        </div>
      </div>

      {/* MARQUEE TRACK CONTAINER WITH EDGE GRADIENTS */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Edge Fade Mask */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none transition-colors duration-500 ${
            isCyber
              ? "bg-gradient-to-r from-[#0a0a12] via-[#0a0a12]/80 to-transparent"
              : "bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"
          }`}
        ></div>

        {/* Right Edge Fade Mask */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none transition-colors duration-500 ${
            isCyber
              ? "bg-gradient-to-l from-[#0a0a12] via-[#0a0a12]/80 to-transparent"
              : "bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent"
          }`}
        ></div>

        {/* INFINITE SCROLLING BADGE TRACK */}
        <div className="animate-marquee-infinite flex gap-3.5 sm:gap-4 items-center">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className={`group select-none shrink-0 cursor-default px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 ${
                isCyber
                  ? `bg-[#121226]/90 ${tech.border} ${tech.shadow} hover:border-white`
                  : `bg-slate-900/90 ${tech.tokyoBorder} border`
              }`}
            >
              <div className="flex items-center gap-2.5">
                {/* CYBERPUNK NEON GLOWING DOT / ICON */}
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{
                    backgroundColor: isCyber ? tech.color : undefined,
                    boxShadow: isCyber
                      ? `0 0 8px ${tech.color}`
                      : undefined,
                  }}
                >
                  {!isCyber && (
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                  )}
                </div>

                {/* TECH NAME */}
                <span
                  className={`font-mono text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                    isCyber
                      ? "text-[#f0f0f5] group-hover:text-white"
                      : "text-slate-100 group-hover:text-white"
                  }`}
                >
                  {tech.name}
                </span>

                {/* CATEGORY TAG BADGE */}
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                    isCyber
                      ? `${tech.bgDark} border-current/40 group-hover:border-current`
                      : "bg-slate-950/70 border-slate-700 text-slate-400"
                  }`}
                  style={{
                    color: isCyber ? tech.color : undefined,
                  }}
                >
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBTLE SCANLINE BOTTOM ACCENT */}
      <div
        className={`h-px w-full transition-colors ${
          isCyber
            ? "bg-gradient-to-r from-transparent via-[#ff00e5]/30 to-transparent"
            : "bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
        }`}
      ></div>
    </div>
  );
}
