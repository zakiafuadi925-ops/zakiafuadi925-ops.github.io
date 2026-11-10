import { useState, useEffect, useCallback } from "react";
import {
  GitBranch,
  Star,
  GitFork,
  ExternalLink,
  RefreshCw,
  FolderGit2,
  Calendar,
  TrendingUp,
} from "lucide-react";

// Curated live snapshot fallback in case GitHub API rate limits (HTTP 403)
const FALLBACK_REPOS = [
  {
    id: 1,
    name: "Quant_Trading_System",
    html_url: "https://github.com/zakiafuadi925-ops/Quant_Trading_System",
    description:
      "Quantitative trading strategy research engine, backtest models, and volatility algorithms for crypto pairs.",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-11-07T00:56:09Z",
    neonBorder: "pink",
    category: "FINTECH / QUANT",
  },
  {
    id: 2,
    name: "oh-my-cashier",
    html_url: "https://github.com/zakiafuadi925-ops/oh-my-cashier",
    description:
      "Terminal-shell themed F&B Point of Sale PWA with zero-lag offline caching, table split bills, and Capacitor Android pipeline.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-11-09T20:03:28Z",
    neonBorder: "cyan",
    category: "POS / PWA",
  },
  {
    id: 3,
    name: "Math_Boxing_WEB",
    html_url: "https://github.com/zakiafuadi925-ops/Math_Boxing_WEB",
    description:
      "Fast-paced real-time arithmetic calculation game with combo multipliers and highscores engine.",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: "2026-11-10T10:42:58Z",
    neonBorder: "yellow",
    category: "WEB GAME",
  },
  {
    id: 4,
    name: "monopoliwni-gas",
    html_url: "https://github.com/zakiafuadi925-ops/monopoliwni-gas",
    description:
      "Indonesian-themed Monopoly web game built in Svelte featuring reactive board state and localized lore.",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: "2026-10-30T23:40:51Z",
    neonBorder: "cyan",
    category: "SVELTE 5",
  },
  {
    id: 5,
    name: "siklusku",
    html_url: "https://github.com/zakiafuadi925-ops/siklusku",
    description:
      "Ultra privacy-first menstrual cycle & health tracker built with 100% client-side data persistence. Zero cloud telemetry.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-10-31T01:40:16Z",
    neonBorder: "pink",
    category: "PRIVACY UTILITY",
  },
  {
    id: 6,
    name: "Nama-Living",
    html_url: "https://github.com/zakiafuadi925-ops/Nama-Living",
    description:
      "Luxury living space catalog and architectural interior property showcase platform.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-10-30T14:56:01Z",
    neonBorder: "green",
    category: "CLIENT APP",
  },
  {
    id: 7,
    name: "zakiafuadi925-ops.github.io",
    html_url: "https://github.com/zakiafuadi925-ops/zakiafuadi925-ops.github.io",
    description:
      "Official developer portfolio SPA built with Vite, Tailwind CSS, and Cyberpunk dual-theme design system.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-11-10T11:31:22Z",
    neonBorder: "violet",
    category: "PORTFOLIO",
  },
];

const LANGUAGE_COLORS = {
  TypeScript: {
    color: "#00f0ff",
    bg: "bg-[#00f0ff]/10",
    border: "border-[#00f0ff]/40",
    dot: "bg-[#00f0ff]",
  },
  Python: {
    color: "#fcee0a",
    bg: "bg-[#fcee0a]/10",
    border: "border-[#fcee0a]/40",
    dot: "bg-[#fcee0a]",
  },
  JavaScript: {
    color: "#fcee0a",
    bg: "bg-[#fcee0a]/10",
    border: "border-[#fcee0a]/40",
    dot: "bg-[#fcee0a]",
  },
  HTML: {
    color: "#ff00e5",
    bg: "bg-[#ff00e5]/10",
    border: "border-[#ff00e5]/40",
    dot: "bg-[#ff00e5]",
  },
  "C#": {
    color: "#9d00ff",
    bg: "bg-[#9d00ff]/10",
    border: "border-[#9d00ff]/40",
    dot: "bg-[#9d00ff]",
  },
  "Jupyter Notebook": {
    color: "#ff00e5",
    bg: "bg-[#ff00e5]/10",
    border: "border-[#ff00e5]/40",
    dot: "bg-[#ff00e5]",
  },
  default: {
    color: "#00f0ff",
    bg: "bg-[#00f0ff]/10",
    border: "border-[#00f0ff]/40",
    dot: "bg-[#00f0ff]",
  },
};

const BORDER_PALETTES = [
  {
    border: "border-[#ff00e5]/50 hover:border-[#ff00e5]",
    shadow: "shadow-[0_0_15px_rgba(255,0,229,0.25)] hover:shadow-[0_0_25px_rgba(255,0,229,0.5)]",
    tag: "text-[#ff00e5] bg-[#ff00e5]/10 border-[#ff00e5]/30",
    hoverPulse: "hover-pulse-pink",
  },
  {
    border: "border-[#00f0ff]/50 hover:border-[#00f0ff]",
    shadow: "shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]",
    tag: "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/30",
    hoverPulse: "hover-pulse-cyan",
  },
  {
    border: "border-[#39ff14]/50 hover:border-[#39ff14]",
    shadow: "shadow-[0_0_15px_rgba(57,255,20,0.25)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]",
    tag: "text-[#39ff14] bg-[#39ff14]/10 border-[#39ff14]/30",
    hoverPulse: "hover-pulse-cyan",
  },
  {
    border: "border-[#fcee0a]/50 hover:border-[#fcee0a]",
    shadow: "shadow-[0_0_15px_rgba(252,238,10,0.25)] hover:shadow-[0_0_25px_rgba(252,238,10,0.5)]",
    tag: "text-[#fcee0a] bg-[#fcee0a]/10 border-[#fcee0a]/30",
    hoverPulse: "hover-pulse-pink",
  },
  {
    border: "border-[#9d00ff]/50 hover:border-[#9d00ff]",
    shadow: "shadow-[0_0_15px_rgba(157,0,255,0.25)] hover:shadow-[0_0_25px_rgba(157,0,255,0.5)]",
    tag: "text-[#9d00ff] bg-[#9d00ff]/10 border-[#9d00ff]/30",
    hoverPulse: "hover-pulse-pink",
  },
];

export default function GithubStatsSection({ isCyber = true, lang = "en" }) {
  const isId = lang === "id";
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [profile, setProfile] = useState({
    public_repos: 12,
    followers: 1,
    following: 0,
    updated_at: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  const applyFetchedData = useCallback((repoData, profData) => {
    if (Array.isArray(repoData) && repoData.length > 0) {
      const curated = repoData
        .filter((r) => r.name !== "zakiafuadi925-ops") // profile README repo
        .slice(0, 8)
        .map((r, idx) => ({
          id: r.id,
          name: r.name,
          html_url: r.html_url,
          description:
            r.description ||
            FALLBACK_REPOS.find((f) => f.name.toLowerCase() === r.name.toLowerCase())?.description ||
            "Production software repository engineered by Zack.",
          language: r.language || (r.name.includes("Quant") ? "Python" : "TypeScript"),
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          pushed_at: r.pushed_at,
          category: r.name.toLowerCase().includes("quant")
            ? "FINTECH / QUANT"
            : r.name.toLowerCase().includes("cashier")
            ? "POS / OFFLINE"
            : r.name.toLowerCase().includes("monopoli") || r.name.toLowerCase().includes("boxing")
            ? "WEB GAME"
            : "FULL-STACK",
          paletteIndex: idx % BORDER_PALETTES.length,
        }));

      setRepos(curated);
      setIsLiveApi(true);
    }

    if (profData) {
      setProfile({
        public_repos: profData.public_repos || 12,
        followers: profData.followers || 1,
        following: profData.following || 0,
        updated_at: profData.updated_at || new Date().toISOString(),
      });
    }

    setLastFetched(new Date().toLocaleTimeString());
  }, []);

  const handleManualRefresh = useCallback(async () => {
    setLoading(true);
    try {
      const [reposRes, profileRes] = await Promise.all([
        fetch("https://api.github.com/users/zakiafuadi925-ops/repos?sort=pushed&per_page=30"),
        fetch("https://api.github.com/users/zakiafuadi925-ops"),
      ]);

      const repoData = reposRes.ok ? await reposRes.json() : null;
      const profData = profileRes.ok ? await profileRes.json() : null;

      if (repoData) {
        applyFetchedData(repoData, profData);
      }
    } catch {
      setIsLiveApi(false);
      setRepos(FALLBACK_REPOS);
      setLastFetched(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  }, [applyFetchedData]);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const [reposRes, profileRes] = await Promise.all([
          fetch("https://api.github.com/users/zakiafuadi925-ops/repos?sort=pushed&per_page=30"),
          fetch("https://api.github.com/users/zakiafuadi925-ops"),
        ]);

        if (!active) return;
        const repoData = reposRes.ok ? await reposRes.json() : null;
        const profData = profileRes.ok ? await profileRes.json() : null;

        if (!active) return;
        if (repoData) {
          applyFetchedData(repoData, profData);
        }
      } catch {
        if (!active) return;
        setIsLiveApi(false);
        setRepos(FALLBACK_REPOS);
        setLastFetched(new Date().toLocaleTimeString());
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      active = false;
    };
  }, [applyFetchedData]);

  // Aggregate stats
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

  const formatDate = (isoString) => {
    if (!isoString) return "Recently";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Active";
    }
  };

  return (
    <section id="github-stats" className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono uppercase tracking-widest ${
                isCyber ? "text-[#39ff14]" : "text-cyan-400"
              }`}
            >
              // {isId ? "TELEMETRI REPOSITORI & STATISTIK GITHUB" : "LIVE REPOSITORY METRICS & GITHUB STATS"}
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1.5 ${
                isLiveApi
                  ? isCyber
                    ? "bg-[#39ff14]/10 text-[#39ff14] border-[#39ff14]/30"
                    : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : isCyber
                  ? "bg-[#fcee0a]/10 text-[#fcee0a] border-[#fcee0a]/30"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLiveApi ? "bg-[#39ff14] animate-pulse" : "bg-[#fcee0a]"
                }`}
              ></span>
              {isId
                ? isLiveApi
                  ? "SINKRONISASI API: TERHUBUNG"
                  : "ALIRAN DATA: SNAPSHOT CACHE"
                : isLiveApi
                ? "API SYNC: CONNECTED"
                : "DATA STREAM: CACHED SNAPSHOT"}
            </span>
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            {isId ? "Repositori GitHub Teratas" : "Top GitHub Repositories"}{" "}
            <GitBranch
              className={`w-6 h-6 ${
                isCyber ? "text-[#00f0ff]" : "text-cyan-400"
              }`}
            />
          </h3>

          <p
            className={`text-xs sm:text-sm font-mono max-w-2xl ${
              isCyber ? "text-[#787899]" : "text-slate-400"
            }`}
          >
            {isId
              ? "Aktivitas waktu-nyata dan data repositori kode publik diambil langsung dari GitHub REST API untuk "
              : "Real-time activity and public code repository stats fetched directly from the GitHub REST API for "}
            <strong className="text-white font-mono">
              @zakiafuadi925-ops
            </strong>
            .
          </p>
        </div>

        {/* RE-FETCH BUTTON & TIMESTAMP */}
        <div className="flex items-center gap-3">
          {lastFetched && (
            <span className="text-[10px] font-mono text-[#787899] hidden sm:inline">
              {isId ? "Diperbarui" : "Updated"}: {lastFetched}
            </span>
          )}
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            title={isId ? "Segarkan data GitHub" : "Refresh GitHub stats"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
              isCyber
                ? "bg-[#121226] border-[#00f0ff]/40 text-[#00f0ff] hover:border-[#00f0ff] hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] disabled:opacity-50"
                : "bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400 disabled:opacity-50"
            }`}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
            />
            <span>
              {loading
                ? isId
                  ? "MENYINKRONKAN..."
                  : "SYNCING..."
                : isId
                ? "SEGARKAN"
                : "REFRESH"}
            </span>
          </button>
        </div>
      </div>

      {/* OVERVIEW HUD METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 font-mono">
        {/* TOTAL REPOSITORIES CARD */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all transform hover:-translate-y-1 ${
            isCyber
              ? "bg-[#121226]/90 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_22px_rgba(0,240,255,0.45)]"
              : "bg-slate-900/80 border-cyan-500/40 hover:border-cyan-400"
          }`}
        >
          <div className="flex items-center justify-between text-[#00f0ff] mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {isId ? "TOTAL REPOS" : "TOTAL REPOS"}
            </span>
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {profile.public_repos || repos.length}
          </div>
          <p className="text-[10px] text-[#787899] mt-1">
            {isId ? "Repositori publik" : "Public code repositories"}
          </p>
        </div>

        {/* STARS & WATCHERS */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all transform hover:-translate-y-1 ${
            isCyber
              ? "bg-[#121226]/90 border-[#fcee0a] shadow-[0_0_15px_rgba(252,238,10,0.25)] hover:shadow-[0_0_22px_rgba(252,238,10,0.45)]"
              : "bg-slate-900/80 border-amber-500/40 hover:border-amber-400"
          }`}
        >
          <div className="flex items-center justify-between text-[#fcee0a] mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {isId ? "TOTAL BINTANG" : "TOTAL STARS"}
            </span>
            <Star className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalStars}{" "}
            <span className="text-xs text-[#787899] font-normal">
              {isId ? "Bintang" : "Stars"}
            </span>
          </div>
          <p className="text-[10px] text-[#787899] mt-1">
            {isId ? "Stargazer komunitas" : "Community stargazers"}
          </p>
        </div>

        {/* COMMUNITY FORKS */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all transform hover:-translate-y-1 ${
            isCyber
              ? "bg-[#121226]/90 border-[#ff00e5] shadow-[0_0_15px_rgba(255,0,229,0.25)] hover:shadow-[0_0_22px_rgba(255,0,229,0.45)]"
              : "bg-slate-900/80 border-purple-500/40 hover:border-purple-400"
          }`}
        >
          <div className="flex items-center justify-between text-[#ff00e5] mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {isId ? "TOTAL FORK" : "FORKS & CLONES"}
            </span>
            <GitFork className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalForks}{" "}
            <span className="text-xs text-[#787899] font-normal">
              {isId ? "Fork" : "Forks"}
            </span>
          </div>
          <p className="text-[10px] text-[#787899] mt-1">
            {isId ? "Fork repositori" : "Repository forks"}
          </p>
        </div>

        {/* ACTIVE STATUS */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all transform hover:-translate-y-1 ${
            isCyber
              ? "bg-[#121226]/90 border-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.25)] hover:shadow-[0_0_22px_rgba(57,255,20,0.45)]"
              : "bg-slate-900/80 border-emerald-500/40 hover:border-emerald-400"
          }`}
        >
          <div className="flex items-center justify-between text-[#39ff14] mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {isId ? "AKTIVITAS TERBARU" : "LATEST COMMIT"}
            </span>
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white truncate">
            {formatDate(profile.updated_at || repos[0]?.pushed_at)}
          </div>
          <p className="text-[10px] text-[#39ff14] mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-ping"></span>
            Active Developer
          </p>
        </div>
      </div>

      {/* TOP REPOSITORIES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, idx) => {
          const borderStyle = BORDER_PALETTES[idx % BORDER_PALETTES.length];
          const langInfo =
            LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default;

          return (
            <div
              key={repo.id || repo.name}
              className={`group relative rounded-2xl border p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1.5 ${
                isCyber
                  ? `bg-[#121226]/95 ${borderStyle.border} ${borderStyle.shadow} ${borderStyle.hoverPulse}`
                  : "bg-slate-900/70 border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              }`}
            >
              {/* CYBER HUD CORNER ACCENTS */}
              {isCyber && (
                <>
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff]"></div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff00e5]"></div>
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff00e5]"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]"></div>
                </>
              )}

              <div className="space-y-4">
                {/* TOP ROW: CATEGORY + ACTIVITY */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span
                    className={`px-2 py-0.5 rounded border font-semibold ${
                      isCyber
                        ? borderStyle.tag
                        : "bg-slate-950 text-cyan-300 border-slate-700"
                    }`}
                  >
                    {repo.category || "REPOSITORY"}
                  </span>

                  <span className="text-[#787899] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(repo.pushed_at)}
                  </span>
                </div>

                {/* REPO TITLE */}
                <div className="space-y-1">
                  <h4
                    className={`text-lg font-bold font-mono tracking-tight flex items-center gap-2 group-hover:underline transition-colors ${
                      isCyber ? "text-[#f0f0f5]" : "text-white"
                    }`}
                  >
                    <FolderGit2
                      className={`w-4 h-4 shrink-0 ${
                        isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                      }`}
                    />
                    <span className="truncate">{repo.name}</span>
                  </h4>

                  <p
                    className={`text-xs leading-relaxed line-clamp-2 ${
                      isCyber ? "text-[#f0f0f5]/75" : "text-slate-400"
                    }`}
                  >
                    {repo.description || "Open source software project hosted on GitHub."}
                  </p>
                </div>

                {/* LANGUAGE + TELEMETRY */}
                <div className="flex items-center gap-2 font-mono text-[11px] pt-1">
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                      isCyber
                        ? `${langInfo.bg} ${langInfo.border}`
                        : "bg-slate-950 border-slate-800 text-slate-300"
                    }`}
                    style={{ color: isCyber ? langInfo.color : undefined }}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${langInfo.dot}`}
                    ></span>
                    <span className="font-semibold">{repo.language || "Code"}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[#787899] text-xs ml-auto">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#fcee0a]" />
                      <span>{repo.stargazers_count || 0}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>{repo.forks_count || 0}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER ACTION */}
              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono transition-colors ${
                  isCyber ? "border-[#ff00e5]/20" : "border-slate-800"
                }`}
              >
                <span className="text-[10px] text-[#787899]">
                  STATUS: <strong className="text-[#39ff14]">PUBLIC</strong>
                </span>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 font-semibold transition-colors ${
                    isCyber
                      ? "text-[#00f0ff] hover:text-[#ff00e5]"
                      : "text-cyan-400 hover:text-white"
                  }`}
                >
                  <span>Open GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPACT GITHUB STATS BADGES (STREAK & TOKYO NIGHT CARDS) */}
      <div
        className={`p-6 rounded-2xl border space-y-6 transition-all ${
          isCyber
            ? "bg-[#121226]/90 border-[#ff00e5]/30 shadow-[0_0_20px_rgba(255,0,229,0.15)]"
            : "bg-slate-900/60 border-slate-800"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-[#39ff14]" />
            <span>Activity Telemetry & Streak Graphs</span>
          </div>
          <span className="text-[10px] font-mono text-[#787899]">
            @zakiafuadi925-ops
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api?username=zakiafuadi925-ops&show_icons=true&theme=tokyonight&hide_border=true&count_private=true"
              alt="Zack's GitHub Stats"
              className={`w-full max-w-md rounded-xl border shadow-lg ${
                isCyber ? "border-[#ff00e5]/30" : "border-slate-800"
              }`}
            />
          </div>

          <div className="flex justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=zakiafuadi925-ops&layout=compact&theme=tokyonight&hide_border=true&hide=html,css"
              alt="Top Languages"
              className={`w-full max-w-md rounded-xl border shadow-lg ${
                isCyber ? "border-[#00f0ff]/30" : "border-slate-800"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=zakiafuadi925-ops&theme=tokyonight&hide_border=true"
            alt="GitHub Streak"
            className={`w-full max-w-xl rounded-xl border shadow-lg ${
              isCyber ? "border-[#39ff14]/30" : "border-slate-800"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
