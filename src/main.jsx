import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Code2,
  Cpu,
  Database,
  Server,
  GitBranch,
  Globe,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Phone,
  ChevronRight,
  Layers,
  ShieldCheck,
  Zap,
  Monitor,
  Activity,
  Command,
  Search,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Filter,
} from "lucide-react";

// --- DATA DEFINITIONS ---

const TECH_STACK = [
  {
    name: "Python",
    category: "languages",
    color: "from-amber-500 to-yellow-600",
    badge:
      "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
  },
  {
    name: "TypeScript",
    category: "languages",
    color: "from-blue-500 to-cyan-600",
    badge:
      "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
  },
  {
    name: "JavaScript",
    category: "languages",
    color: "from-yellow-400 to-amber-500",
    badge:
      "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
  },
  {
    name: "PHP",
    category: "languages",
    color: "from-indigo-400 to-purple-600",
    badge:
      "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
  },

  {
    name: "Next.js",
    category: "frameworks",
    color: "from-slate-700 to-slate-900",
    badge:
      "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
  },
  {
    name: "React",
    category: "frameworks",
    color: "from-cyan-400 to-blue-500",
    badge:
      "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black",
  },
  {
    name: "Svelte",
    category: "frameworks",
    color: "from-orange-500 to-red-600",
    badge:
      "https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white",
  },
  {
    name: "Laravel",
    category: "frameworks",
    color: "from-red-500 to-rose-700",
    badge:
      "https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white",
  },
  {
    name: "Tailwind CSS",
    category: "frameworks",
    color: "from-teal-400 to-cyan-500",
    badge:
      "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
  },

  {
    name: "PostgreSQL",
    category: "infrastructure",
    color: "from-blue-600 to-indigo-800",
    badge:
      "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
  },
  {
    name: "Supabase",
    category: "infrastructure",
    color: "from-emerald-400 to-teal-600",
    badge:
      "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white",
  },
  {
    name: "MariaDB",
    category: "infrastructure",
    color: "from-cyan-700 to-blue-900",
    badge:
      "https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white",
  },
  {
    name: "Docker",
    category: "infrastructure",
    color: "from-blue-400 to-cyan-600",
    badge:
      "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
  },
  {
    name: "Git",
    category: "infrastructure",
    color: "from-orange-600 to-red-600",
    badge:
      "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
  },
  {
    name: "Linux CLI",
    category: "infrastructure",
    color: "from-yellow-500 to-amber-700",
    badge:
      "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
  },
];

const PROJECTS = [
  {
    id: "oh-my-cashier",
    title: "Oh My Cashier!",
    category: "pos",
    tags: ["Offline-First", "PWA", "Capacitor", "Oh My Zsh Theme"],
    description:
      "Terminal-shell themed F&B Point of Sale PWA with table management, split bills, receipt printer integration, and Android Capacitor deployment capability.",
    featured: true,
    highlights: [
      "Zero-lag offline execution",
      "Capacitor Android Pipeline",
      "Custom POS Shell Interface",
    ],
    github: "https://github.com/zakiafuadi925-ops",
    live: "https://oh-my-cashier.vercel.app/",
    architecture: "Offline-First Local Storage Shell App",
  },
  {
    id: "siklusku",
    title: "Siklusku",
    category: "utilities",
    tags: ["Privacy-First", "Vanilla JS", "Tailwind CSS", "100% Client-Side"],
    description:
      "Ultra privacy-focused menstrual cycle & health tracker built with 100% client-side data persistence. No cloud telemetry, no database leaks.",
    featured: true,
    highlights: [
      "Zero External Database",
      "Complete Data Privacy",
      "Lightweight Vanilla JS",
    ],
    github: "https://github.com/zakiafuadi925-ops/siklusku",
    live: null,
    architecture: "100% Client-Side Local Storage",
  },
  {
    id: "crypto-quant",
    title: "Crypto Quant Research Engine",
    category: "quant",
    tags: ["Python", "LSTM / GRU", "ATR Thresholds", "Slippage Sim"],
    description:
      "Quantitative trading strategy backtesting engine for BTC models. Features GRU/LSTM neural prediction, dynamic volatility band ATR thresholds, and trade slippage modelling.",
    featured: true,
    highlights: [
      "Neural Net Signal Predictor",
      "Dynamic Volatility ATR",
      "Real-world Slippage Sim",
    ],
    github: "https://github.com/zakiafuadi925-ops",
    live: null,
    architecture: "Python Algorithmic Pipeline",
  },
  {
    id: "personal-finance",
    title: "Personal Finance Tracker",
    category: "web-apps",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Recharts"],
    description:
      "Full-stack personal asset & expenditure analysis web application featuring transaction logging, dynamic budget analytics, and SVG charts visualizer.",
    featured: false,
    highlights: [
      "Supabase Row-Level Security",
      "Recharts Visual Analytics",
      "Real-time Budget Sync",
    ],
    github: "https://github.com/zakiafuadi925-ops",
    live: "https://personal-finance-tracker-rust-phi.vercel.app/auth",
    architecture: "Next.js + Supabase Backend",
  },
  {
    id: "wni-monopoly",
    title: "WNI Monopoly Web",
    category: "web-apps",
    tags: ["Svelte", "Vite", "Tailwind CSS", "Web Game"],
    description:
      "Indonesian-themed Monopoly web application featuring interactive board movement, property purchasing logic, and custom event cards in Svelte.",
    featured: false,
    highlights: [
      "Svelte Reactive State Management",
      "Indonesian Property Lore",
      "Responsive Board UI",
    ],
    github: "https://github.com/zakiafuadi925-ops",
    live: "https://monopoliwni-gas.vercel.app/",
    architecture: "Svelte SPA State Engine",
  },
  {
    id: "math-boxing",
    title: "Math Boxing WEB",
    category: "web-apps",
    tags: ["React", "Express", "Supabase", "Real-time Game"],
    description:
      "Interactive real-time mathematical boxing game & logic challenge platform. Test your arithmetic calculation speed under intense round timers.",
    featured: false,
    highlights: [
      "Fast-paced Logic Engine",
      "Global Highscores",
      "React Sound & Combo Effects",
    ],
    github: "https://github.com/zakiafuadi925-ops",
    live: "https://math-boxing-web.vercel.app/",
    architecture: "React Client + Express/Supabase",
  },
  {
    id: "nama-living",
    title: "Nama Living",
    category: "web-apps",
    tags: ["React", "Vite", "Tailwind CSS", "Client Business"],
    description:
      "Modern property listing & curated interior living space showcase platform built with sleek, minimalist aesthetic for luxury living catalog.",
    featured: false,
    highlights: [
      "Client Showcase Design",
      "High-performance Image Grid",
      "Fluid Smooth Scrolling",
    ],
    github: "https://github.com/zakiafuadi925-ops",
    live: "https://nama-living.vercel.app/",
    architecture: "React Single Page App",
  },
];

export default function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("all");
  const [techCategory, setTechCategory] = useState("all");
  const [copiedLink, setCopiedLink] = useState(false);

  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "system", content: "Zack Shell v2.4.0 (x86_64-pc-linux-gnu)" },
    {
      type: "system",
      content:
        'Type "help" or click suggestions below to explore available commands.',
    },
  ]);
  const [commandInput, setCommandInput] = useState("");
  const terminalEndRef = useRef(null);

  // Auto Scroll Terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Terminal Handler
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
  • about      : Summary of background & core focus
  • skills     : Overview of stack capabilities
  • projects   : List highlighted repository links
  • contact    : Output direct communication channels
  • clear      : Flush current shell window
  • date       : Output current ISO timestamp`,
        });
        break;

      case "about":
        newHistory.push({
          type: "output",
          content: `Ahmad Zakkia Fu'adi (Zack)
Role: Full-Stack Developer & Quantitative Trading Researcher
Motto: "Data without analysis is just noise. Efficient code is the bridge to clarity."
Specialties: Building high-performance offline-first web solutions, POS applications, and quantitative trading backtest algorithms (GRU/LSTM).`,
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          content: `Core Tech Stack:
Languages  : Python, TypeScript, JavaScript, PHP
Frameworks : Next.js, React, Svelte, Laravel, Tailwind CSS
Storage/DB : PostgreSQL, Supabase, MariaDB, Client-side IndexedDB/LocalData
DevOps/Env : Docker, Git, Linux Terminal, Tailscale, VirtualBox`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          content: `Projects Loaded:
1. Oh My Cashier!   [https://oh-my-cashier.vercel.app/]
2. Siklusku          [Client-side Privacy Tracker]
3. Crypto Quant      [GRU/LSTM Slippage Backtester Engine]
4. Personal Finance  [https://personal-finance-tracker-rust-phi.vercel.app/auth]
5. WNI Monopoly      [https://monopoliwni-gas.vercel.app/]
6. Math Boxing WEB   [https://math-boxing-web.vercel.app/]`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          content: `Direct Communication Links:
GitHub   : https://github.com/zakiafuadi925-ops
Email    : zakiafuadi925@gmail.com
WhatsApp : https://wa.me/628123456789 (Available)
LinkedIn : https://linkedin.com/in/zakiafuadi`,
        });
        break;

      case "date":
        newHistory.push({
          type: "output",
          content: new Date().toISOString(),
        });
        break;

      case "clear":
        setTerminalHistory([]);
        setCommandInput("");
        return;

      default:
        newHistory.push({
          type: "error",
          content: `zsh: command not found: ${rawCmd}. Type "help" for valid options.`,
        });
        break;
    }

    setTerminalHistory(newHistory);
    setCommandInput("");
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-mono font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
              Z
            </div>
            <span className="font-mono text-sm tracking-widest text-slate-200 font-semibold uppercase">
              zack<span className="text-cyan-400">.dev</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-mono text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              /about
            </a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">
              /skills
            </a>
            <a
              href="#projects"
              className="hover:text-cyan-400 transition-colors"
            >
              /projects
            </a>
            <a
              href="#github-stats"
              className="hover:text-cyan-400 transition-colors"
            >
              /stats
            </a>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition-colors"
            >
              /contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/zakiafuadi925-ops"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>CONNECT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-8 pb-20">
        {/* HERO SECTION */}
        <section
          id="about"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6"
        >
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Available for Full-Stack & Quant Projects
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                👋 Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
                  Zack
                </span>
              </h1>
              <p className="text-lg font-mono text-cyan-400 font-semibold">
                Full-Stack Developer & Quant Trading Researcher
              </p>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Building high-performance web applications, specialized POS
              solutions, offline-first architectures, and quantitative trading
              model algorithms.
            </p>

            <blockquote className="p-4 rounded-xl border-l-4 border-cyan-400 bg-slate-900/60 text-slate-300 italic text-xs sm:text-sm font-mono">
              "Data without analysis is just noise. Efficient code is the bridge
              to clarity."
            </blockquote>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/zakiafuadi925-ops"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 transition-all font-mono text-xs text-slate-200"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Profile</span>
              </a>

              <a
                href="mailto:zakiafuadi925@gmail.com"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 transition-all font-mono text-xs text-slate-200"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Email Me</span>
              </a>

              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 text-slate-400 hover:text-purple-400 transition-all text-xs font-mono"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedLink ? "Copied" : "Copy Mail"}</span>
              </button>
            </div>
          </div>

          {/* INTERACTIVE TERMINAL WIDGET */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Terminal Top Bar */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />{" "}
                    zack@dev-shell:~ (zsh)
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  v2.4.0-release
                </div>
              </div>

              {/* Terminal Window Body */}
              <div className="p-4 font-mono text-xs h-72 overflow-y-auto space-y-2.5 text-slate-300 scrollbar-thin scrollbar-thumb-slate-700">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    {item.type === "user" && (
                      <div className="flex items-center text-cyan-400">
                        <span className="text-emerald-400 font-bold mr-2">
                          ➜
                        </span>
                        <span className="text-purple-400 font-semibold mr-2">
                          ~
                        </span>
                        <span>{item.content}</span>
                      </div>
                    )}

                    {item.type === "system" && (
                      <div className="text-slate-400 border-l-2 border-slate-700 pl-2">
                        {item.content}
                      </div>
                    )}

                    {item.type === "output" && (
                      <pre className="text-emerald-300 font-mono whitespace-pre-wrap leading-relaxed pl-4 bg-slate-950/50 p-2 rounded border border-slate-800/50">
                        {item.content}
                      </pre>
                    )}

                    {item.type === "error" && (
                      <div className="text-rose-400 pl-4 font-mono">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Quick CLI Buttons */}
              <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/50 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono text-slate-500 self-center mr-1">
                  Prompts:
                </span>
                {[
                  "help",
                  "about",
                  "skills",
                  "projects",
                  "contact",
                  "clear",
                ].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 rounded bg-slate-800/60 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700/60 text-[10px] font-mono text-slate-400 transition-all"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Command Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand();
                }}
                className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
              >
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-purple-400 font-semibold">~</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Type CLI command..."
                  className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder-slate-600"
                />
                <button
                  type="submit"
                  className="text-slate-400 hover:text-cyan-400"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* TECHNICAL FOCUS & CORE PHILOSOPHY */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              // ARCHITECTURE & FOCUS
            </h2>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Engineering Principles{" "}
              <Cpu className="w-5 h-5 text-emerald-400" />
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-200 text-base">
                Full-Stack Web Apps
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Modern responsive client and server architectures built with
                Next.js, React, Svelte, Laravel, and Tailwind CSS.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-200 text-base">
                Offline-First Architecture
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Prioritizing local data storage, client-side execution, zero-lag
                POS operations, and data privacy without external DB dependency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-200 text-base">
                Quant Research & ML
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Designing algorithmic trading strategies using Python (GRU/LSTM
                neural networks, ATR volatility bands, & trade slippage
                simulations).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-200 text-base">
                Terminal-Centric DevOps
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Operating smoothly across Linux environments, Git pipelines,
                Docker containers, Tailscale mesh networks, and VirtualBox
                nodes.
              </p>
            </div>
          </div>
        </section>

        {/* TECH STACK BADGES SECTION */}
        <section id="skills" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                // STACK CAPABILITIES
              </h2>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Tech Stack Matrix <Layers className="w-5 h-5 text-purple-400" />
              </h3>
            </div>

            {/* Filter Buttons */}
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
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
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
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group"
              >
                <span className="font-mono text-xs font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </span>
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                // SOFTWARE REPOSITORIES
              </h2>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Highlighted Projects <Zap className="w-5 h-5 text-yellow-400" />
              </h3>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { id: "all", label: "All Projects" },
                { id: "pos", label: "POS Solutions" },
                { id: "web-apps", label: "Web Applications" },
                { id: "utilities", label: "Utilities" },
                { id: "quant", label: "Quant Engine" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-500/5"
              >
                <div className="p-6 space-y-4">
                  {/* Top Bar Tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {proj.architecture}
                    </span>
                    {proj.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {proj.title}
                  </h4>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-2">
                    {proj.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[11px] font-mono text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>

                  {proj.live ? (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                    >
                      <span>Live App</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 italic">
                      Private / Local Engine
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB LIVE STATS INTEGRATION */}
        <section id="github-stats" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              // REPOSITORY METRICS
            </h2>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              GitHub Insights <GitBranch className="w-5 h-5 text-cyan-400" />
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* GitHub Stats Card 1 */}
              <div className="flex justify-center">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=zakiafuadi925-ops&show_icons=true&theme=tokyonight&hide_border=true&count_private=true"
                  alt="Zack's GitHub Stats"
                  className="w-full max-w-md rounded-xl border border-slate-800 shadow-lg"
                />
              </div>

              {/* Top Languages Card 2 */}
              <div className="flex justify-center">
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=zakiafuadi925-ops&layout=compact&theme=tokyonight&hide_border=true&hide=html,css"
                  alt="Top Languages"
                  className="w-full max-w-md rounded-xl border border-slate-800 shadow-lg"
                />
              </div>
            </div>

            {/* GitHub Streak Banner */}
            <div className="flex justify-center pt-2">
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=zakiafuadi925-ops&theme=tokyonight&hide_border=true"
                alt="GitHub Streak"
                className="w-full max-w-xl rounded-xl border border-slate-800 shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* DEPLOYMENT GUIDE NOTICE FOR GITHUB PAGES */}
        <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-semibold">
            <Terminal className="w-4 h-4" /> Deploying to GitHub Pages (Static
            Hosting)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            This portfolio app is optimized as a Single Page Application (SPA).
            You can build and deploy it effortlessly using standard static
            hosting:
          </p>
          <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
            {`# 1. Clone repository & install dependencies
npm install

# 2. Build static production bundle
npm run build

# 3. Push to gh-pages branch or configure GitHub Actions
npx gh-pages -d dist`}
          </pre>
        </section>

        {/* CONTACT & FOOTER */}
        <section
          id="contact"
          className="pt-10 border-t border-slate-800 space-y-8"
        >
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h3 className="text-3xl font-bold text-white">
              Let's Connect & Collaborate
            </h3>
            <p className="text-sm text-slate-400">
              Open for full-stack web applications, point-of-sale engineering,
              or algorithmic trading research opportunities.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://github.com/zakiafuadi925-ops"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 transition-all font-mono text-xs text-slate-200"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub</span>
            </a>

            <a
              href="mailto:zakiafuadi925@gmail.com"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition-all font-mono text-xs text-slate-200"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>zakiafuadi925@gmail.com</span>
            </a>

            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 hover:text-emerald-300 transition-all font-mono text-xs text-slate-200"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://linkedin.com/in/zakiafuadi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-blue-400 transition-all font-mono text-xs text-slate-200"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="text-center text-xs font-mono text-slate-500 pt-6">
            © {new Date().getFullYear()} Ahmad Zakkia Fu'adi (Zack). Designed
            with Cyberpunk Tokyo Night Aesthetic.
          </div>
        </section>
      </main>
    </div>
  );
}
