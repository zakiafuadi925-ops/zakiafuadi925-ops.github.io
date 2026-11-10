import { useState, useMemo } from "react";
import {
  Zap,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Code2,
  Activity,
  Terminal,
  Maximize2,
  X,
  LayoutGrid,
  BarChart3,
  Cpu,
} from "lucide-react";
import { PROJECTS as DEFAULT_PROJECTS } from "../data/projects";

// Custom Github Icon
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ProjectGallery({
  isCyber = true,
  projects = DEFAULT_PROJECTS,
  lang = "en",
}) {
  const isId = lang === "id";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "detailed"
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: "all", label: isId ? "Semua Repositori" : "All Repositories", icon: LayoutGrid },
    { id: "quant", label: isId ? "Kuantitatif & Trading" : "Quant & Trading", icon: TrendingUp },
    { id: "fullstack", label: isId ? "Web Full-Stack" : "Full-Stack Web", icon: Code2 },
    { id: "pos", label: isId ? "POS & Offline" : "POS & Offline", icon: Terminal },
    { id: "utilities", label: isId ? "Utilitas & Privasi" : "Utilities & Privacy", icon: Activity },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCategory =
        activeCategory === "all" || proj.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        proj.title.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query) ||
        proj.tags.some((t) => t.toLowerCase().includes(query)) ||
        proj.architecture.toLowerCase().includes(query) ||
        (proj.type && proj.type.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Quick stats
  const quantCount = projects.filter((p) => p.category === "quant").length;
  const liveCount = projects.filter((p) => Boolean(p.live)).length;
  const totalCount = projects.length;

  return (
    <section id="projects" className="space-y-8">
      {/* HEADER & SECTION TITLE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono uppercase tracking-widest ${
                isCyber ? "text-[#ff00e5]" : "text-cyan-400"
              }`}
            >
              // {isId ? "MATRIKS PROYEK & RISET REPOSITORI" : "PROJECT MATRIX & RESEARCH REPOSITORIES"}
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isCyber
                  ? "bg-[#ff00e5]/10 text-[#ff00e5] border-[#ff00e5]/30"
                  : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
              }`}
            >
              {isId ? "PROYEK TERDEPLOY & ALGORITMA" : "LIVE DEPLOYMENTS & ALGORITHMS"}
            </span>
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            {isId ? "Galeri Full-Stack & Quant" : "Full-Stack & Quant Gallery"}{" "}
            <Zap
              className={`w-6 h-6 ${
                isCyber ? "text-[#fcee0a]" : "text-yellow-400"
              }`}
            />
          </h3>

          <p
            className={`text-xs sm:text-sm font-mono max-w-2xl ${
              isCyber ? "text-[#787899]" : "text-slate-400"
            }`}
          >
            {isId
              ? "Kurasi aplikasi web produksi, arsitektur kasir offline-first, dan model trading kuantitatif."
              : "Curated selection of production web applications, offline-first F&B architectures, and quantitative trading algorithms."}
          </p>
        </div>

        {/* METRICS HUD COUNTERS */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 ${
              isCyber
                ? "bg-[#121226]/80 border-[#00f0ff]/30 text-[#00f0ff]"
                : "bg-slate-900 border-slate-800 text-cyan-400"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>
              <strong className="text-white font-bold">{totalCount}</strong>{" "}
              {isId ? "Proyek" : "Projects"}
            </span>
          </div>

          <div
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 ${
              isCyber
                ? "bg-[#121226]/80 border-[#ff00e5]/30 text-[#ff00e5]"
                : "bg-slate-900 border-slate-800 text-purple-400"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              <strong className="text-white font-bold">{quantCount}</strong>{" "}
              {isId ? "Model Quant" : "Quant Algo"}
            </span>
          </div>

          <div
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 ${
              isCyber
                ? "bg-[#121226]/80 border-[#39ff14]/30 text-[#39ff14]"
                : "bg-slate-900 border-slate-800 text-emerald-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></span>
            <span>
              <strong className="text-white font-bold">{liveCount}</strong> {isId ? "Aktif" : "Live"}
            </span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS & SEARCH BAR */}
      <div
        className={`p-4 rounded-2xl border backdrop-blur-md space-y-3.5 transition-colors ${
          isCyber
            ? "bg-[#121226]/90 border-[#ff00e5]/25 shadow-[0_0_20px_rgba(255,0,229,0.08)]"
            : "bg-slate-900/80 border-slate-800"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                    isActive
                      ? isCyber
                        ? "bg-[#ff00e5]/20 border-[#ff00e5] text-[#ff00e5] shadow-[0_0_12px_rgba(255,0,229,0.35)] font-semibold"
                        : "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold"
                      : isCyber
                      ? "bg-[#0a0a12] border-[#787899]/30 text-[#787899] hover:border-[#ff00e5]/50 hover:text-[#f0f0f5]"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* SEARCH & VIEW SWITCHER */}
          <div className="flex items-center gap-2">
            <div
              className={`relative flex-1 sm:w-64 flex items-center px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
                isCyber
                  ? "bg-[#0a0a12] border-[#00f0ff]/30 focus-within:border-[#00f0ff] focus-within:shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                  : "bg-slate-950 border-slate-800 focus-within:border-cyan-500"
              }`}
            >
              <Search
                className={`w-3.5 h-3.5 mr-2 shrink-0 ${
                  isCyber ? "text-[#00f0ff]" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isId ? "Cari stack, judul, teknologi..." : "Search stack, title, tag..."
                }
                className={`w-full bg-transparent focus:outline-none font-mono ${
                  isCyber
                    ? "text-[#f0f0f5] placeholder-[#787899]"
                    : "text-slate-100 placeholder-slate-600"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#787899] hover:text-[#ff00e5]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* VIEW MODE TOGGLE */}
            <div
              className={`flex items-center p-1 rounded-xl border ${
                isCyber
                  ? "bg-[#0a0a12] border-[#787899]/30"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <button
                onClick={() => setViewMode("grid")}
                title="Grid Card View"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? isCyber
                      ? "bg-[#ff00e5]/20 text-[#ff00e5]"
                      : "bg-cyan-500/20 text-cyan-300"
                    : "text-[#787899] hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("detailed")}
                title="Detailed Spec View"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "detailed"
                    ? isCyber
                      ? "bg-[#00f0ff]/20 text-[#00f0ff]"
                      : "bg-cyan-500/20 text-cyan-300"
                    : "text-[#787899] hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EMPTY RESULTS STATE */}
      {filteredProjects.length === 0 && (
        <div
          className={`text-center py-16 px-4 rounded-2xl border font-mono space-y-3 ${
            isCyber
              ? "bg-[#121226]/50 border-[#ff00e5]/30 text-[#787899]"
              : "bg-slate-900/50 border-slate-800 text-slate-400"
          }`}
        >
          <Terminal className="w-8 h-8 mx-auto text-[#ff003c]" />
          <p className="text-sm">
            No matching projects found for query:{" "}
            <span className="text-white">"{searchQuery}"</span>
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="text-xs text-[#00f0ff] hover:underline"
          >
            Reset active filters
          </button>
        </div>
      )}

      {/* PROJECT CARDS: GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const isQuant = proj.category === "quant";

            return (
              <div
                key={proj.id}
                className={`group relative rounded-2xl border flex flex-col justify-between overflow-hidden backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 ${
                  isCyber
                    ? isQuant
                      ? "bg-[#121226]/95 border-[#00f0ff]/40 hover:border-[#00f0ff] hover-pulse-cyan"
                      : "bg-[#121226]/90 border-[#ff00e5]/30 hover:border-[#ff00e5] hover-pulse-pink"
                    : "bg-slate-900/70 border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.45)]"
                }`}
              >
                {/* CYBER HUD CORNER ACCENTS */}
                {isCyber && (
                  <>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff00e5]"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff00e5]"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]"></div>
                  </>
                )}

                <div className="p-6 space-y-4">
                  {/* TOP BADGE ROW */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                        isCyber
                          ? isQuant
                            ? "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/40 font-semibold"
                            : "bg-[#0a0a12] text-[#00f0ff] border-[#00f0ff]/40"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      {proj.architecture}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isQuant && (
                        <span
                          className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border ${
                            isCyber
                              ? "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/40 animate-pulse"
                              : "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
                          }`}
                        >
                          <TrendingUp className="w-3 h-3" /> QUANT
                        </span>
                      )}

                      {proj.featured && (
                        <span
                          className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border ${
                            isCyber
                              ? "text-[#fcee0a] bg-[#fcee0a]/10 border-[#fcee0a]/40"
                              : "text-amber-400 bg-amber-400/10 border-amber-400/20"
                          }`}
                        >
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PROJECT TITLE & TYPE */}
                  <div>
                    <h4
                      className={`text-xl font-bold transition-colors ${
                        isCyber
                          ? isQuant
                            ? "text-[#00f0ff] group-hover:text-[#39ff14]"
                            : "text-[#f0f0f5] group-hover:text-[#ff00e5]"
                          : "text-slate-100 group-hover:text-cyan-400"
                      }`}
                    >
                      {proj.title}
                    </h4>
                    {proj.type && (
                      <p
                        className={`text-[11px] font-mono pt-0.5 ${
                          isCyber ? "text-[#787899]" : "text-slate-400"
                        }`}
                      >
                        // {proj.type}
                      </p>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <p
                    className={`text-xs leading-relaxed ${
                      isCyber ? "text-[#f0f0f5]/75" : "text-slate-400"
                    }`}
                  >
                    {proj.description}
                  </p>

                  {/* QUANT METRIC HUD PREVIEW (IF QUANT) */}
                  {isQuant && proj.metrics && (
                    <div
                      className={`p-3 rounded-xl border grid grid-cols-2 gap-2 text-[10px] font-mono ${
                        isCyber
                          ? "bg-[#0a0a12]/90 border-[#00f0ff]/25 text-[#00f0ff]"
                          : "bg-slate-950/80 border-slate-800 text-cyan-400"
                      }`}
                    >
                      {proj.metrics.slice(0, 4).map((m, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span
                            className={
                              isCyber ? "text-[#787899]" : "text-slate-500"
                            }
                          >
                            {m.label}:
                          </span>
                          <span className="font-semibold text-white">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* HIGHLIGHTS */}
                  <div className="space-y-1.5 pt-1">
                    {proj.highlights.slice(0, 3).map((h, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 text-[11px] font-mono ${
                          isCyber ? "text-[#f0f0f5]" : "text-slate-300"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isCyber
                              ? isQuant
                                ? "text-[#00f0ff]"
                                : "text-[#39ff14]"
                              : "text-emerald-400"
                          }`}
                        />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* TAGS CHIPS */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isCyber
                            ? isQuant
                              ? "bg-[#0a0a12] text-[#00f0ff] border-[#00f0ff]/30"
                              : "bg-[#0a0a12] text-[#ff00e5] border-[#ff00e5]/30"
                            : "bg-slate-950 text-cyan-300 border border-slate-800"
                        }`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CARD FOOTER WITH BUTTONS & SPEC TRIGGER */}
                <div
                  className={`px-6 py-3.5 border-t flex items-center justify-between transition-colors ${
                    isCyber
                      ? "bg-[#0a0a12]/80 border-[#ff00e5]/20"
                      : "bg-slate-950/60 border-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-mono transition-colors ${
                        isCyber
                          ? "text-[#787899] hover:text-[#ff00e5]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>

                    <button
                      onClick={() => setSelectedProject(proj)}
                      className={`flex items-center gap-1 text-xs font-mono transition-colors ${
                        isCyber
                          ? "text-[#00f0ff] hover:underline"
                          : "text-cyan-400 hover:underline"
                      }`}
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Specs</span>
                    </button>
                  </div>

                  {proj.live ? (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-1 text-xs font-mono font-semibold transition-colors ${
                        isCyber
                          ? "text-[#39ff14] hover:text-[#39ff14]/80 drop-shadow-[0_0_6px_#39ff14]"
                          : "text-emerald-400 hover:text-emerald-300"
                      }`}
                    >
                      <span>Live App</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span
                      className={`text-[10px] font-mono italic ${
                        isCyber ? "text-[#787899]" : "text-slate-500"
                      }`}
                    >
                      {isQuant ? "⚡ Algorithmic Sim" : "Local / Private"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PROJECT CARDS: DETAILED SPEC MODE */}
      {viewMode === "detailed" && (
        <div className="space-y-4">
          {filteredProjects.map((proj) => {
            const isQuant = proj.category === "quant";

            return (
              <div
                key={proj.id}
                className={`p-6 rounded-2xl border transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 ${
                  isCyber
                    ? isQuant
                      ? "bg-[#121226]/95 border-[#00f0ff]/40 hover:border-[#00f0ff] hover-pulse-cyan"
                      : "bg-[#121226]/90 border-[#ff00e5]/30 hover:border-[#ff00e5] hover-pulse-pink"
                    : "bg-slate-900/70 border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isCyber
                            ? isQuant
                              ? "text-[#00f0ff]"
                              : "text-[#ff00e5]"
                            : "text-cyan-400"
                        }`}
                      >
                        [{proj.architecture}]
                      </span>
                      {proj.featured && (
                        <span className="text-[10px] font-mono text-[#fcee0a] bg-[#fcee0a]/10 px-2 py-0.5 rounded border border-[#fcee0a]/30">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold text-white">
                      {proj.title}
                    </h4>
                    <p
                      className={`text-xs font-mono ${
                        isCyber ? "text-[#787899]" : "text-slate-400"
                      }`}
                    >
                      {proj.type}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 ${
                        isCyber
                          ? "bg-[#0a0a12] border-[#ff00e5]/30 hover:border-[#ff00e5] text-[#f0f0f5]"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Repository</span>
                    </a>

                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md ${
                          isCyber
                            ? "bg-[#39ff14] text-[#05050a] shadow-[0_0_12px_rgba(57,255,20,0.4)]"
                            : "bg-emerald-500 text-slate-950"
                        }`}
                      >
                        <span>Launch App</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                  <div className="md:col-span-7 space-y-3">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isCyber ? "text-[#f0f0f5]/85" : "text-slate-300"
                      }`}
                    >
                      {proj.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {proj.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs font-mono text-slate-300"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isCyber
                                ? isQuant
                                  ? "text-[#00f0ff]"
                                  : "text-[#39ff14]"
                                : "text-emerald-400"
                            }`}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            isCyber
                              ? isQuant
                                ? "bg-[#0a0a12] text-[#00f0ff] border-[#00f0ff]/30"
                                : "bg-[#0a0a12] text-[#ff00e5] border-[#ff00e5]/30"
                              : "bg-slate-950 text-cyan-300 border border-slate-800"
                          }`}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    {proj.metrics ? (
                      <div
                        className={`p-4 rounded-xl border space-y-2.5 font-mono text-xs ${
                          isCyber
                            ? "bg-[#0a0a12] border-[#00f0ff]/30"
                            : "bg-slate-950 border-slate-800"
                        }`}
                      >
                        <div
                          className={`text-[10px] uppercase font-bold tracking-wider ${
                            isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                          }`}
                        >
                          // PERFORMANCE & TELEMETRY SPECS
                        </div>
                        <div className="space-y-2">
                          {proj.metrics.map((m, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between border-b border-slate-800/60 pb-1.5"
                            >
                              <span className="text-[#787899]">{m.label}</span>
                              <span className="font-semibold text-white">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center p-6 border rounded-xl border-dashed border-slate-800 text-xs font-mono text-[#787899]">
                        Full-Stack Single Page Architecture
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SPECIFICATION MODAL DIALOG */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
              isCyber
                ? "bg-[#0a0a12] border-[#ff00e5] shadow-[0_0_35px_rgba(255,0,229,0.3)]"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            {/* MODAL HEADER */}
            <div
              className={`px-6 py-4 border-b flex items-center justify-between ${
                isCyber
                  ? "bg-[#121226] border-[#ff00e5]/30 text-[#f0f0f5]"
                  : "bg-slate-950 border-slate-800 text-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Cpu
                  className={`w-4 h-4 ${
                    isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                  }`}
                />
                <span className="font-mono text-xs font-bold tracking-widest uppercase">
                  SYSTEM SPECIFICATION // {selectedProject.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-[#787899] hover:text-[#ff00e5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider">
                  {selectedProject.architecture}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-[#787899]">
                  {selectedProject.type}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* METRICS GRID */}
              {selectedProject.metrics && (
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 text-xs font-mono ${
                    isCyber
                      ? "bg-[#121226] border-[#00f0ff]/30 text-[#00f0ff]"
                      : "bg-slate-950 border-slate-800 text-cyan-400"
                  }`}
                >
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] text-[#787899]">
                        {m.label}
                      </span>
                      <span className="font-bold text-white text-sm">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* HIGHLIGHTS */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase text-[#fcee0a] tracking-wider">
                  // Core Engineering Milestones:
                </h5>
                <div className="space-y-1.5">
                  {selectedProject.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs font-mono text-slate-300"
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isCyber ? "text-[#39ff14]" : "text-emerald-400"
                        }`}
                      />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECH TAGS */}
              <div className="space-y-1.5">
                <h5 className="text-xs font-mono uppercase text-[#787899] tracking-wider">
                  // Stack Manifest:
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121226] text-[#ff00e5] border border-[#ff00e5]/30"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              className={`px-6 py-4 border-t flex items-center justify-between ${
                isCyber
                  ? "bg-[#121226] border-[#ff00e5]/30"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#f0f0f5] hover:text-[#ff00e5] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Open Source Repository</span>
              </a>

              {selectedProject.live ? (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#39ff14] text-[#05050a] shadow-[0_0_12px_rgba(57,255,20,0.5)] hover:bg-[#39ff14]/90 transition-all"
                >
                  <span>Launch Live Instance</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-xs font-mono text-[#787899] italic">
                  Local Simulation Engine
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
