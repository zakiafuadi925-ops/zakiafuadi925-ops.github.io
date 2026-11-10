import { Languages } from "lucide-react";

/**
 * Cyberpunk-themed Language Toggle Component
 * Allows seamless switching between English ('en') and Indonesian ('id')
 * Styled with high-contrast neon accents, glowing states, and terminal telemetry.
 */
export default function LanguageToggle({
  lang = "en",
  onToggleLanguage,
  isCyber = true,
  className = "",
}) {
  const isEn = lang === "en";

  const handleSelect = (newLang) => {
    if (newLang !== lang && onToggleLanguage) {
      onToggleLanguage(newLang);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-lg p-0.5 border font-mono text-xs transition-all duration-300 ${
        isCyber
          ? "bg-[#121226]/90 border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:border-[#00f0ff]"
          : "bg-slate-900 border-slate-700 hover:border-cyan-500/50"
      } ${className}`}
    >
      {/* Visual Icon */}
      <div
        className={`flex items-center justify-center pl-1.5 pr-1 py-1 transition-colors ${
          isCyber ? "text-[#00f0ff]" : "text-cyan-400"
        }`}
        title={`Current Language: ${isEn ? "English" : "Bahasa Indonesia"}`}
      >
        <Languages className="w-3.5 h-3.5" />
      </div>

      {/* Segmented English Toggle */}
      <button
        type="button"
        onClick={() => handleSelect("en")}
        aria-pressed={isEn}
        className={`px-2 py-1 rounded font-bold tracking-wider transition-all duration-200 text-[11px] ${
          isEn
            ? isCyber
              ? "bg-[#00f0ff] text-[#05050a] shadow-[0_0_10px_#00f0ff] font-extrabold"
              : "bg-cyan-500 text-slate-950 font-extrabold shadow-sm"
            : isCyber
            ? "text-[#787899] hover:text-[#f0f0f5] hover:bg-[#ff00e5]/10"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        }`}
      >
        EN
      </button>

      {/* Divider */}
      <span
        className={`text-[10px] select-none px-0.5 ${
          isCyber ? "text-[#787899]/50" : "text-slate-600"
        }`}
      >
        /
      </span>

      {/* Segmented Indonesian Toggle */}
      <button
        type="button"
        onClick={() => handleSelect("id")}
        aria-pressed={!isEn}
        className={`px-2 py-1 rounded font-bold tracking-wider transition-all duration-200 text-[11px] ${
          !isEn
            ? isCyber
              ? "bg-[#ff00e5] text-[#05050a] shadow-[0_0_10px_#ff00e5] font-extrabold"
              : "bg-emerald-400 text-slate-950 font-extrabold shadow-sm"
            : isCyber
            ? "text-[#787899] hover:text-[#f0f0f5] hover:bg-[#00f0ff]/10"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        }`}
      >
        ID
      </button>
    </div>
  );
}
