import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Code2,
  Cpu,
  GitBranch,
  Mail,
  Phone,
  ChevronRight,
  Layers,
  ShieldCheck,
  Activity,
  Copy,
  Check,
  Palette,
} from "lucide-react";
import { PROJECTS } from "./data/projects";
import ProjectGallery from "./components/ProjectGallery";

// --- CUSTOM SVG BRAND ICONS ---
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

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

// --- DATA DEFINITIONS ---

const TECH_STACK = [
  {
    name: "Python",
    category: "languages",
    color: "from-amber-500 to-yellow-600",
    cpColor: "from-[#fcee0a] to-[#ff003c]",
    badge:
      "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
  },
  {
    name: "TypeScript",
    category: "languages",
    color: "from-blue-500 to-cyan-600",
    cpColor: "from-[#00f0ff] to-[#9d00ff]",
    badge:
      "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
  },
  {
    name: "JavaScript",
    category: "languages",
    color: "from-yellow-400 to-amber-500",
    cpColor: "from-[#fcee0a] to-[#ff00e5]",
    badge:
      "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
  },
  {
    name: "PHP",
    category: "languages",
    color: "from-indigo-400 to-purple-600",
    cpColor: "from-[#9d00ff] to-[#ff00e5]",
    badge:
      "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
  },
  {
    name: "Next.js",
    category: "frameworks",
    color: "from-slate-700 to-slate-900",
    cpColor: "from-[#121226] to-[#00f0ff]",
    badge:
      "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
  },
  {
    name: "React",
    category: "frameworks",
    color: "from-cyan-400 to-blue-500",
    cpColor: "from-[#00f0ff] to-[#ff00e5]",
    badge:
      "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black",
  },
  {
    name: "Svelte",
    category: "frameworks",
    color: "from-orange-500 to-red-600",
    cpColor: "from-[#ff003c] to-[#fcee0a]",
    badge:
      "https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white",
  },
  {
    name: "Laravel",
    category: "frameworks",
    color: "from-red-500 to-rose-700",
    cpColor: "from-[#ff003c] to-[#ff00e5]",
    badge:
      "https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white",
  },
  {
    name: "Tailwind CSS",
    category: "frameworks",
    color: "from-teal-400 to-cyan-500",
    cpColor: "from-[#00f0ff] to-[#39ff14]",
    badge:
      "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
  },
  {
    name: "PostgreSQL",
    category: "infrastructure",
    color: "from-blue-600 to-indigo-800",
    cpColor: "from-[#00f0ff] to-[#9d00ff]",
    badge:
      "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
  },
  {
    name: "Supabase",
    category: "infrastructure",
    color: "from-emerald-400 to-teal-600",
    cpColor: "from-[#39ff14] to-[#00f0ff]",
    badge:
      "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white",
  },
  {
    name: "MariaDB",
    category: "infrastructure",
    color: "from-cyan-700 to-blue-900",
    cpColor: "from-[#00f0ff] to-[#121226]",
    badge:
      "https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white",
  },
  {
    name: "Docker",
    category: "infrastructure",
    color: "from-blue-400 to-cyan-600",
    cpColor: "from-[#00f0ff] to-[#9d00ff]",
    badge:
      "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
  },
  {
    name: "Git",
    category: "infrastructure",
    color: "from-orange-600 to-red-600",
    cpColor: "from-[#ff003c] to-[#fcee0a]",
    badge:
      "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
  },
  {
    name: "Linux CLI",
    category: "infrastructure",
    color: "from-yellow-500 to-amber-700",
    cpColor: "from-[#fcee0a] to-[#39ff14]",
    badge:
      "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
  },
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("zack_theme") || "cyberpunk";
  });
  const [techCategory, setTechCategory] = useState("all");
  const [copiedLink, setCopiedLink] = useState(false);

  const isCyber = theme === "cyberpunk";

  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: "system",
      content: "Kitty Terminal // Zack Cyberpunk Shell v2.5.0 (x86_64-pc-linux-gnu)",
    },
    {
      type: "system",
      content:
        'Theme active: CYBERPUNK NEON PINK (#ff00e5). Type "help" or click prompts below.',
    },
  ]);
  const [commandInput, setCommandInput] = useState("");
  const terminalEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("zack_theme", theme);
  }, [theme]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const toggleTheme = () => {
    const nextTheme = theme === "cyberpunk" ? "tokyo" : "cyberpunk";
    setTheme(nextTheme);
    setTerminalHistory((prev) => [
      ...prev,
      {
        type: "output",
        content: `[THEME CHANGED] Active Mode: ${
          nextTheme === "cyberpunk"
            ? "CYBERPUNK NEON PINK (#ff00e5 / #00f0ff / #0a0a12)"
            : "TOKYO NIGHT SLATE (#00f0ff / #10b981 / #020617)"
        }`,
      },
    ]);
  };

  const handleCommand = (cmdText) => {
    const rawCmd = (cmdText || commandInput).trim().toLowerCase();
    if (!rawCmd) return;

    const newHistory = [...terminalHistory, { type: "user", content: rawCmd }];

    switch (rawCmd) {
      case "help":
        newHistory.push({
          type: "output",
          content: `Available CLI Commands:
  • help       : Display command matrix
  • theme      : Toggle between Cyberpunk Neon Pink and Tokyo Slate
  • about      : Summary of background & core focus
  • skills     : Overview of stack capabilities
  • projects   : List highlighted repository links
  • palette    : Show Kitty Cyberpunk 16-color configuration
  • contact    : Output direct communication channels
  • clear      : Flush current shell window
  • date       : Output current ISO timestamp`,
        });
        break;
      case "theme":
        {
          const newTheme = theme === "cyberpunk" ? "tokyo" : "cyberpunk";
          setTheme(newTheme);
          newHistory.push({
            type: "output",
            content: `Switched palette to: ${
              newTheme === "cyberpunk"
                ? "CYBERPUNK NEON PINK (#ff00e5 / #00f0ff / #0a0a12)"
                : "TOKYO NIGHT SLATE (#00f0ff / #10b981 / #020617)"
            }`,
          });
        }
        break;
      case "palette":
        newHistory.push({
          type: "output",
          content: `Cyberpunk Kitty Palette:
  Background : #0a0a12 (Deep Night)
  Foreground : #f0f0f5 (White Glow)
  Neon Pink  : #ff00e5 (Accent)
  Neon Cyan  : #00f0ff (Primary)
  Laser Red  : #ff003c (Error)
  Phosphor Gr: #39ff14 (Success)
  Warning Ylw: #fcee0a (Alert)
  Subsurface : #121226 (Surface)`,
        });
        break;
      case "about":
        newHistory.push({
          type: "output",
          content: `Ahmad Zakkia Fu'adi (Zack)\nRole: Full-Stack Developer & Quantitative Trading Researcher\nMotto: "Data without analysis is just noise. Efficient code is the bridge to clarity."\nSpecialties: Building high-performance offline-first web solutions, POS applications, and quantitative trading backtest algorithms (GRU/LSTM).`,
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          content: `Core Tech Stack:\nLanguages  : Python, TypeScript, JavaScript, PHP\nFrameworks : Next.js, React, Svelte, Laravel, Tailwind CSS\nStorage/DB : PostgreSQL, Supabase, MariaDB, Client-side IndexedDB/LocalData\nDevOps/Env : Docker, Git, Linux Terminal, Tailscale, VirtualBox`,
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          content: `Projects Loaded:\n1. Oh My Cashier! (F&B POS PWA, Capacitor Android)\n2. Siklusku (100% Client-Side Privacy Tracker)\n3. Crypto Quant (GRU/LSTM Volatility ATR Engine)\n4. Personal Finance (Next.js + Supabase RLS)\n5. WNI Monopoly (Svelte Reactive Game)\n6. Math Boxing WEB (Fast Real-time Arithmetic Game)\n7. Nama Living (Luxury Interior Showcase)`,
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          content: `Direct Communication Links:\nGitHub   : https://github.com/zakiafuadi925-ops\nEmail    : zakiafuadi925@gmail.com\nWhatsApp : https://wa.me/628123456789\nLinkedIn : https://linkedin.com/in/zakiafuadi`,
        });
        break;
      case "date":
        newHistory.push({ type: "output", content: new Date().toISOString() });
        break;
      case "clear":
        setTerminalHistory([]);
        setCommandInput("");
        return;
      default:
        newHistory.push({
          type: "error",
          content: `zsh: command not found: ${rawCmd}. Type "help" or click prompts.`,
        });
        break;
    }

    setTerminalHistory(newHistory);
    setCommandInput("");
  };

  const filteredTech = TECH_STACK.filter((t) => {
    if (techCategory === "all") return true;
    return t.category === techCategory;
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("zakiafuadi925@gmail.com");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans ${
        isCyber
          ? "bg-[#0a0a12] text-[#f0f0f5] selection:bg-[#00f0ff] selection:text-[#05050a]"
          : "bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950"
      }`}
    >
      {/* Background Ambience Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-700 ${
            isCyber ? "bg-[#ff00e5]/15" : "bg-cyan-500/10"
          }`}
        ></div>
        <div
          className={`absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full blur-3xl transition-all duration-700 ${
            isCyber ? "bg-[#00f0ff]/15" : "bg-purple-600/10"
          }`}
        ></div>
        <div
          className={`absolute bottom-10 left-10 w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-700 ${
            isCyber ? "bg-[#9d00ff]/15" : "bg-emerald-500/10"
          }`}
        ></div>
        <div
          className={`absolute inset-0 bg-[size:4rem_4rem] ${
            isCyber
              ? "bg-[linear-gradient(to_right,#ff00e50d_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0d_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)]"
          }`}
        ></div>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isCyber
            ? "bg-[#0a0a12]/85 border-[#ff00e5]/25"
            : "bg-slate-950/80 border-slate-800/80"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded flex items-center justify-center font-mono font-bold text-slate-950 shadow-lg transition-all duration-300 ${
                isCyber
                  ? "bg-gradient-to-tr from-[#ff00e5] via-[#00f0ff] to-[#39ff14] shadow-[#ff00e5]/40"
                  : "bg-gradient-to-tr from-cyan-500 to-emerald-400 shadow-cyan-500/20"
              }`}
            >
              Z
            </div>
            <span className="font-mono text-sm tracking-widest font-semibold uppercase">
              zack
              <span
                className={`transition-colors ${
                  isCyber ? "text-[#ff00e5]" : "text-cyan-400"
                }`}
              >
                .dev
              </span>
            </span>
          </div>

          <div
            className={`hidden md:flex items-center space-x-6 text-sm font-mono transition-colors ${
              isCyber ? "text-[#787899]" : "text-slate-400"
            }`}
          >
            <a
              href="#about"
              className={`transition-colors ${
                isCyber ? "hover:text-[#ff00e5]" : "hover:text-cyan-400"
              }`}
            >
              /about
            </a>
            <a
              href="#skills"
              className={`transition-colors ${
                isCyber ? "hover:text-[#00f0ff]" : "hover:text-cyan-400"
              }`}
            >
              /skills
            </a>
            <a
              href="#projects"
              className={`transition-colors ${
                isCyber ? "hover:text-[#ff00e5]" : "hover:text-cyan-400"
              }`}
            >
              /projects
            </a>
            <a
              href="#github-stats"
              className={`transition-colors ${
                isCyber ? "hover:text-[#fcee0a]" : "hover:text-cyan-400"
              }`}
            >
              /stats
            </a>
            <a
              href="#contact"
              className={`transition-colors ${
                isCyber ? "hover:text-[#39ff14]" : "hover:text-cyan-400"
              }`}
            >
              /contact
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              title="Switch between Cyberpunk Neon Pink and Tokyo Slate"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all duration-300 ${
                isCyber
                  ? "bg-[#ff00e5]/15 border-[#ff00e5] text-[#ff00e5] shadow-[0_0_15px_rgba(255,0,229,0.35)] hover:bg-[#ff00e5]/25"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-400"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isCyber ? "NEON PINK" : "CYBERPUNK"}
              </span>
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isCyber
                    ? "bg-[#ff00e5] shadow-[0_0_8px_#ff00e5]"
                    : "bg-cyan-400"
                }`}
              ></span>
            </button>

            <a
              href="https://github.com/zakiafuadi925-ops"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-lg border transition-all ${
                isCyber
                  ? "bg-[#121226] border-[#ff00e5]/30 hover:border-[#ff00e5] hover:text-[#ff00e5]"
                  : "bg-slate-900 border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400"
              }`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shadow-md ${
                isCyber
                  ? "bg-[#ff00e5] text-[#05050a] hover:bg-[#ff00e5]/90 shadow-[0_0_15px_rgba(255,0,229,0.4)]"
                  : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20"
              }`}
            >
              <span>CONNECT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-8 pb-20">
        {/* HERO SECTION */}
        <section
          id="about"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6"
        >
          <div className="lg:col-span-6 space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
                isCyber
                  ? "border-[#ff00e5]/40 bg-[#ff00e5]/10 text-[#ff00e5]"
                  : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-ping ${
                  isCyber ? "bg-[#39ff14]" : "bg-emerald-400"
                }`}
              ></span>
              Available for Full-Stack & Quant Projects
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                👋 Hi, I'm{" "}
                <span
                  className={`text-transparent bg-clip-text ${
                    isCyber
                      ? "bg-gradient-to-r from-[#ff00e5] via-[#00f0ff] to-[#fcee0a]"
                      : "bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400"
                  }`}
                >
                  Zack
                </span>
              </h1>
              <p
                className={`text-lg font-mono font-semibold transition-colors ${
                  isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                }`}
              >
                Full-Stack Developer & Quant Trading Researcher
              </p>
            </div>

            <p
              className={`leading-relaxed text-sm sm:text-base transition-colors ${
                isCyber ? "text-[#f0f0f5]/80" : "text-slate-400"
              }`}
            >
              Building high-performance web applications, specialized POS
              solutions, offline-first architectures, and quantitative trading
              model algorithms.
            </p>

            <blockquote
              className={`p-4 rounded-xl border-l-4 italic text-xs sm:text-sm font-mono transition-colors ${
                isCyber
                  ? "border-[#ff00e5] bg-[#121226]/80 text-[#f0f0f5]"
                  : "border-cyan-400 bg-slate-900/60 text-slate-300"
              }`}
            >
              "Data without analysis is just noise. Efficient code is the bridge
              to clarity."
            </blockquote>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/zakiafuadi925-ops"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-mono text-xs ${
                  isCyber
                    ? "bg-[#121226] border-[#ff00e5]/30 hover:border-[#ff00e5] text-[#f0f0f5] hover:text-[#ff00e5] shadow-[0_0_10px_rgba(255,0,229,0.15)]"
                    : "bg-slate-900 border-slate-700 hover:border-cyan-500 hover:text-cyan-400 text-slate-200"
                }`}
              >
                <GithubIcon
                  className={`w-4 h-4 ${
                    isCyber ? "text-[#ff00e5]" : "text-cyan-400"
                  }`}
                />
                <span>GitHub Profile</span>
              </a>

              <a
                href="mailto:zakiafuadi925@gmail.com"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-mono text-xs ${
                  isCyber
                    ? "bg-[#121226] border-[#00f0ff]/30 hover:border-[#00f0ff] text-[#f0f0f5] hover:text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                    : "bg-slate-900 border-slate-700 hover:border-emerald-500 hover:text-emerald-400 text-slate-200"
                }`}
              >
                <Mail
                  className={`w-4 h-4 ${
                    isCyber ? "text-[#00f0ff]" : "text-emerald-400"
                  }`}
                />
                <span>Email Me</span>
              </a>

              <button
                onClick={copyEmail}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all text-xs font-mono ${
                  isCyber
                    ? "bg-[#121226] border-[#787899]/30 hover:border-[#ff00e5] text-[#787899] hover:text-[#ff00e5]"
                    : "bg-slate-900 border-slate-800 hover:border-purple-500 text-slate-400 hover:text-purple-400"
                }`}
              >
                {copiedLink ? (
                  <Check
                    className={`w-4 h-4 ${
                      isCyber ? "text-[#39ff14]" : "text-emerald-400"
                    }`}
                  />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedLink ? "Copied" : "Copy Mail"}</span>
              </button>
            </div>
          </div>

          {/* INTERACTIVE TERMINAL */}
          <div className="lg:col-span-6">
            <div
              className={`rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                isCyber
                  ? "border-[#ff00e5]/40 bg-[#121226]/95 shadow-[0_0_30px_rgba(255,0,229,0.15)]"
                  : "border-slate-800 bg-slate-900/90 shadow-2xl"
              }`}
            >
              <div
                className={`px-4 py-3 border-b flex items-center justify-between transition-colors ${
                  isCyber
                    ? "bg-[#0a0a12] border-[#ff00e5]/20"
                    : "bg-slate-950/80 border-slate-800/80"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff003c] shadow-[0_0_6px_#ff003c]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#fcee0a] shadow-[0_0_6px_#fcee0a]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#39ff14] shadow-[0_0_6px_#39ff14]"></div>
                  <span
                    className={`ml-2 font-mono text-xs flex items-center gap-1.5 ${
                      isCyber ? "text-[#f0f0f5]" : "text-slate-400"
                    }`}
                  >
                    <Terminal
                      className={`w-3.5 h-3.5 ${
                        isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                      }`}
                    />
                    zack@kitty-cyber:~ (zsh)
                  </span>
                </div>
                <div
                  className={`text-[10px] font-mono ${
                    isCyber ? "text-[#ff00e5]" : "text-slate-500"
                  }`}
                >
                  {isCyber ? "CYBERPUNK // ACTIVE" : "v2.5.0-release"}
                </div>
              </div>

              <div
                className={`p-4 font-mono text-xs h-72 overflow-y-auto space-y-2.5 transition-colors ${
                  isCyber ? "text-[#f0f0f5]" : "text-slate-300"
                }`}
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    {item.type === "user" && (
                      <div className="flex items-center">
                        <span className="text-[#39ff14] font-bold mr-2">➜</span>
                        <span className="text-[#ff00e5] font-semibold mr-2">
                          ~
                        </span>
                        <span
                          className={
                            isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                          }
                        >
                          {item.content}
                        </span>
                      </div>
                    )}
                    {item.type === "system" && (
                      <div
                        className={`border-l-2 pl-2 ${
                          isCyber
                            ? "border-[#ff00e5] text-[#787899]"
                            : "border-slate-700 text-slate-400"
                        }`}
                      >
                        {item.content}
                      </div>
                    )}
                    {item.type === "output" && (
                      <pre
                        className={`font-mono whitespace-pre-wrap leading-relaxed pl-4 p-2 rounded border ${
                          isCyber
                            ? "bg-[#0a0a12]/70 text-[#39ff14] border-[#00f0ff]/30"
                            : "bg-slate-950/50 text-emerald-300 border-slate-800/50"
                        }`}
                      >
                        {item.content}
                      </pre>
                    )}
                    {item.type === "error" && (
                      <div className="text-[#ff003c] pl-4 font-mono">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              <div
                className={`px-4 py-2 border-t flex flex-wrap gap-1.5 transition-colors ${
                  isCyber
                    ? "bg-[#0a0a12]/80 border-[#ff00e5]/20"
                    : "bg-slate-950/40 border-slate-800/50"
                }`}
              >
                <span
                  className={`text-[10px] font-mono self-center mr-1 ${
                    isCyber ? "text-[#787899]" : "text-slate-500"
                  }`}
                >
                  Prompts:
                </span>
                {[
                  "help",
                  "theme",
                  "about",
                  "skills",
                  "projects",
                  "palette",
                  "contact",
                  "clear",
                ].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className={`px-2 py-0.5 rounded border text-[10px] font-mono transition-all ${
                      isCyber
                        ? "bg-[#121226] border-[#ff00e5]/30 hover:border-[#ff00e5] hover:text-[#ff00e5] text-[#f0f0f5]"
                        : "bg-slate-800/60 hover:bg-cyan-500/20 hover:text-cyan-300 border-slate-700/60 text-slate-400"
                    }`}
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand();
                }}
                className={`px-4 py-3 border-t flex items-center gap-2 transition-colors ${
                  isCyber
                    ? "bg-[#0a0a12] border-[#ff00e5]/30"
                    : "bg-slate-950 border-slate-800"
                }`}
              >
                <span className="text-[#39ff14] font-bold">➜</span>
                <span className="text-[#ff00e5] font-semibold">~</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Type CLI command or 'theme'..."
                  className={`flex-1 bg-transparent font-mono text-xs focus:outline-none transition-colors ${
                    isCyber
                      ? "text-[#f0f0f5] placeholder-[#787899]"
                      : "text-slate-100 placeholder-slate-600"
                  }`}
                />
                <button
                  type="submit"
                  className={`transition-colors ${
                    isCyber
                      ? "text-[#ff00e5] hover:text-[#00f0ff]"
                      : "text-slate-400 hover:text-cyan-400"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ENGINEERING PRINCIPLES */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2
              className={`text-xs font-mono uppercase tracking-widest ${
                isCyber ? "text-[#ff00e5]" : "text-cyan-400"
              }`}
            >
              // ARCHITECTURE & FOCUS
            </h2>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              Engineering Principles{" "}
              <Cpu
                className={`w-5 h-5 ${
                  isCyber ? "text-[#00f0ff]" : "text-emerald-400"
                }`}
              />
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isCyber
                  ? "bg-[#121226]/90 border-[#ff00e5]/30 hover:border-[#ff00e5] hover:shadow-[0_0_15px_rgba(255,0,229,0.2)]"
                  : "bg-slate-900/60 border-slate-800 hover:border-cyan-500/40"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isCyber
                    ? "bg-[#ff00e5]/10 border-[#ff00e5]/30 text-[#ff00e5]"
                    : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                }`}
              >
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base">Full-Stack Web Apps</h4>
              <p
                className={`text-xs leading-relaxed ${
                  isCyber ? "text-[#f0f0f5]/70" : "text-slate-400"
                }`}
              >
                Modern responsive client and server architectures built with
                Next.js, React, Svelte, Laravel, and Tailwind CSS.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isCyber
                  ? "bg-[#121226]/90 border-[#39ff14]/30 hover:border-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]"
                  : "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isCyber
                    ? "bg-[#39ff14]/10 border-[#39ff14]/30 text-[#39ff14]"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base">
                Offline-First Architecture
              </h4>
              <p
                className={`text-xs leading-relaxed ${
                  isCyber ? "text-[#f0f0f5]/70" : "text-slate-400"
                }`}
              >
                Prioritizing local data storage, client-side execution, zero-lag
                POS operations, and data privacy without external DB dependency.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isCyber
                  ? "bg-[#121226]/90 border-[#00f0ff]/30 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : "bg-slate-900/60 border-slate-800 hover:border-purple-500/40"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isCyber
                    ? "bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]"
                    : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                }`}
              >
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base">Quant Research & ML</h4>
              <p
                className={`text-xs leading-relaxed ${
                  isCyber ? "text-[#f0f0f5]/70" : "text-slate-400"
                }`}
              >
                Designing algorithmic trading strategies using Python (GRU/LSTM
                neural networks, ATR volatility bands, & trade slippage
                simulations).
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isCyber
                  ? "bg-[#121226]/90 border-[#fcee0a]/30 hover:border-[#fcee0a] hover:shadow-[0_0_15px_rgba(252,238,10,0.2)]"
                  : "bg-slate-900/60 border-slate-800 hover:border-amber-500/40"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isCyber
                    ? "bg-[#fcee0a]/10 border-[#fcee0a]/30 text-[#fcee0a]"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}
              >
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-base">Terminal-Centric DevOps</h4>
              <p
                className={`text-xs leading-relaxed ${
                  isCyber ? "text-[#f0f0f5]/70" : "text-slate-400"
                }`}
              >
                Operating smoothly across Linux environments, Git pipelines,
                Docker containers, Tailscale mesh networks, and VirtualBox
                nodes.
              </p>
            </div>
          </div>
        </section>

        {/* STACK CAPABILITIES */}
        <section id="skills" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2
                className={`text-xs font-mono uppercase tracking-widest ${
                  isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                }`}
              >
                // STACK CAPABILITIES
              </h2>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                Tech Stack Matrix{" "}
                <Layers
                  className={`w-5 h-5 ${
                    isCyber ? "text-[#ff00e5]" : "text-purple-400"
                  }`}
                />
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { id: "all", label: "All Stack" },
                { id: "languages", label: "Languages" },
                { id: "frameworks", label: "Frameworks" },
                { id: "infrastructure", label: "Infra & DB" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTechCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    techCategory === cat.id
                      ? isCyber
                        ? "bg-[#ff00e5]/20 border-[#ff00e5] text-[#ff00e5] shadow-[0_0_10px_rgba(255,0,229,0.3)]"
                        : "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                      : isCyber
                      ? "bg-[#121226] border-[#787899]/30 text-[#787899] hover:border-[#ff00e5]/50 hover:text-[#f0f0f5]"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredTech.map((item) => (
              <div
                key={item.name}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between group ${
                  isCyber
                    ? "bg-[#121226]/90 border-[#ff00e5]/20 hover:border-[#ff00e5] hover:shadow-[0_0_10px_rgba(255,0,229,0.25)]"
                    : "bg-slate-900/80 border-slate-800 hover:border-cyan-500/50"
                }`}
              >
                <span
                  className={`font-mono text-xs font-medium transition-colors ${
                    isCyber
                      ? "text-[#f0f0f5] group-hover:text-[#ff00e5]"
                      : "text-slate-300 group-hover:text-cyan-400"
                  }`}
                >
                  {item.name}
                </span>
                <div
                  className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r shadow-sm ${
                    isCyber ? item.cpColor : item.color
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* FULL-STACK & QUANT TRADING PROJECT GALLERY */}
        <ProjectGallery isCyber={isCyber} projects={PROJECTS} />

        {/* GITHUB REPOSITORY METRICS */}
        <section id="github-stats" className="space-y-6">
          <div className="space-y-1">
            <h2
              className={`text-xs font-mono uppercase tracking-widest ${
                isCyber ? "text-[#39ff14]" : "text-cyan-400"
              }`}
            >
              // REPOSITORY METRICS
            </h2>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              GitHub Insights{" "}
              <GitBranch
                className={`w-5 h-5 ${
                  isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                }`}
              />
            </h3>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-6 transition-all ${
              isCyber
                ? "bg-[#121226]/90 border-[#ff00e5]/30 shadow-[0_0_20px_rgba(255,0,229,0.15)]"
                : "bg-slate-900/60 border-slate-800"
            }`}
          >
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

        {/* DEPLOYMENT & SHELL SPEC */}
        <section
          className={`p-6 rounded-2xl border space-y-3 transition-all ${
            isCyber
              ? "bg-[#121226]/90 border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              : "bg-slate-900/80 border-slate-800"
          }`}
        >
          <div
            className={`flex items-center gap-2 font-mono text-sm font-semibold ${
              isCyber ? "text-[#00f0ff]" : "text-cyan-400"
            }`}
          >
            <Terminal className="w-4 h-4" /> Deploying to GitHub Pages (Static
            Hosting)
          </div>
          <p
            className={`text-xs leading-relaxed font-mono ${
              isCyber ? "text-[#f0f0f5]/70" : "text-slate-400"
            }`}
          >
            This portfolio app is optimized as a Single Page Application (SPA)
            with dual-theme architecture. Build and deploy effortlessly:
          </p>
          <pre
            className={`p-3 rounded-lg font-mono text-xs overflow-x-auto border ${
              isCyber
                ? "bg-[#0a0a12] text-[#39ff14] border-[#00f0ff]/30"
                : "bg-slate-950 text-emerald-400 border-slate-800"
            }`}
          >
            {`npm install
npm run build
npx gh-pages -d dist`}
          </pre>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className={`pt-10 border-t space-y-8 ${
            isCyber ? "border-[#ff00e5]/30" : "border-slate-800"
          }`}
        >
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h3 className="text-3xl font-bold">
              Let's Connect & Collaborate
            </h3>
            <p
              className={`text-sm ${
                isCyber ? "text-[#f0f0f5]/70" : "text-slate-400"
              }`}
            >
              Open for full-stack web applications, point-of-sale engineering,
              or algorithmic trading research opportunities.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://github.com/zakiafuadi925-ops"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all font-mono text-xs ${
                isCyber
                  ? "bg-[#121226] border-[#ff00e5]/40 hover:border-[#ff00e5] text-[#f0f0f5] hover:text-[#ff00e5] shadow-[0_0_12px_rgba(255,0,229,0.25)]"
                  : "bg-slate-900 border-slate-800 hover:border-cyan-500 hover:text-cyan-400 text-slate-200"
              }`}
            >
              <GithubIcon
                className={`w-4 h-4 ${
                  isCyber ? "text-[#ff00e5]" : "text-cyan-400"
                }`}
              />
              <span>GitHub</span>
            </a>

            <a
              href="mailto:zakiafuadi925@gmail.com"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all font-mono text-xs ${
                isCyber
                  ? "bg-[#121226] border-[#00f0ff]/40 hover:border-[#00f0ff] text-[#f0f0f5] hover:text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                  : "bg-slate-900 border-slate-800 hover:border-emerald-500 hover:text-emerald-400 text-slate-200"
              }`}
            >
              <Mail
                className={`w-4 h-4 ${
                  isCyber ? "text-[#00f0ff]" : "text-emerald-400"
                }`}
              />
              <span>zakiafuadi925@gmail.com</span>
            </a>

            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all font-mono text-xs ${
                isCyber
                  ? "bg-[#121226] border-[#39ff14]/40 hover:border-[#39ff14] text-[#f0f0f5] hover:text-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.25)]"
                  : "bg-slate-900 border-slate-800 hover:border-emerald-400 hover:text-emerald-300 text-slate-200"
              }`}
            >
              <Phone
                className={`w-4 h-4 ${
                  isCyber ? "text-[#39ff14]" : "text-emerald-400"
                }`}
              />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://linkedin.com/in/zakiafuadi"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all font-mono text-xs ${
                isCyber
                  ? "bg-[#121226] border-[#9d00ff]/40 hover:border-[#9d00ff] text-[#f0f0f5] hover:text-[#9d00ff] shadow-[0_0_12px_rgba(157,0,255,0.25)]"
                  : "bg-slate-900 border-slate-800 hover:border-blue-500 hover:text-blue-400 text-slate-200"
              }`}
            >
              <LinkedinIcon
                className={`w-4 h-4 ${
                  isCyber ? "text-[#9d00ff]" : "text-blue-400"
                }`}
              />
              <span>LinkedIn</span>
            </a>
          </div>

          <div
            className={`text-center text-xs font-mono pt-6 transition-colors ${
              isCyber ? "text-[#787899]" : "text-slate-500"
            }`}
          >
            © {new Date().getFullYear()} Ahmad Zakkia Fu'adi (Zack). Powered by
            Cyberpunk Neon Pink & Tokyo Night Palettes.
          </div>
        </section>
      </main>
    </div>
  );
}
