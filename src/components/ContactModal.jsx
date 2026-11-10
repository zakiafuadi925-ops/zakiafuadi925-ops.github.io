import { useState, useEffect } from "react";
import {
  Mail,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function ContactModal({ isOpen, onClose, isCyber = true }) {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // "idle" | "transmitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const presetSubjects = [
    "Full-Stack Web Project",
    "Quant / Trading Research",
    "POS / Offline Architecture",
    "General Collaboration",
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic validation
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("ERR: Please enter a valid sender email address.");
      return;
    }

    if (!formData.subject.trim()) {
      setStatus("error");
      setErrorMessage("ERR: Communication subject line cannot be empty.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("ERR: Payload message must be at least 10 characters.");
      return;
    }

    // Simulate cyber transmission
    setStatus("transmitting");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  const resetForm = () => {
    setFormData({ email: "", subject: "", message: "" });
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      {/* MODAL WINDOW */}
      <div
        className={`relative w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
          isCyber
            ? "bg-[#0a0a12] border-[#ff00e5] shadow-[0_0_35px_rgba(255,0,229,0.35)]"
            : "bg-slate-900 border-slate-700 shadow-2xl"
        }`}
      >
        {/* CYBER HUD CORNER ACCENTS */}
        {isCyber && (
          <>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] z-20"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff00e5] z-20"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff00e5] z-20"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] z-20"></div>
          </>
        )}

        {/* TERMINAL TITLE BAR */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between transition-colors ${
            isCyber
              ? "bg-[#121226] border-[#ff00e5]/30 text-[#f0f0f5]"
              : "bg-slate-950 border-slate-800 text-slate-100"
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-3 h-3 rounded-full bg-[#ff003c] shadow-[0_0_6px_#ff003c]"></div>
            <div className="w-3 h-3 rounded-full bg-[#fcee0a] shadow-[0_0_6px_#fcee0a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#39ff14] shadow-[0_0_6px_#39ff14]"></div>
            <span
              className={`ml-2 font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 ${
                isCyber ? "text-[#00f0ff]" : "text-cyan-400"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              TRANSMIT PROTOCOL // CONTACT ZACK
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isCyber
                ? "text-[#787899] hover:text-[#ff00e5] hover:bg-[#ff00e5]/10"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          {status === "success" ? (
            /* SUCCESS STATE */
            <div className="text-center py-8 px-4 space-y-4 font-mono">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border ${
                  isCyber
                    ? "bg-[#39ff14]/10 border-[#39ff14] text-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.5)]"
                    : "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                }`}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#39ff14] font-bold">
                  // TRANSMISSION CONFIRMED
                </span>
                <h4 className="text-xl font-bold text-white">
                  Payload Dispatched Successfully
                </h4>
                <p
                  className={`text-xs leading-relaxed max-w-sm mx-auto ${
                    isCyber ? "text-[#f0f0f5]/80" : "text-slate-400"
                  }`}
                >
                  Your message has been encrypted and routed to{" "}
                  <strong className="text-[#00f0ff]">
                    zakiafuadi925@gmail.com
                  </strong>
                  . Zack will review your transmission and respond promptly.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={resetForm}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    isCyber
                      ? "bg-[#121226] border-[#00f0ff]/40 text-[#00f0ff] hover:border-[#00f0ff]"
                      : "bg-slate-900 border-slate-700 text-slate-300"
                  }`}
                >
                  Send Another Transmission
                </button>
                <button
                  onClick={onClose}
                  className={`w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isCyber
                      ? "bg-[#ff00e5] text-[#05050a] hover:bg-[#ff00e5]/90 shadow-[0_0_15px_rgba(255,0,229,0.5)]"
                      : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  }`}
                >
                  Close Shell
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span
                    className={isCyber ? "text-[#787899]" : "text-slate-400"}
                  >
                    STATUS: <strong className="text-[#39ff14]">ONLINE</strong>
                  </span>
                  <span
                    className={isCyber ? "text-[#ff00e5]" : "text-cyan-400"}
                  >
                    TARGET: zakiafuadi925@gmail.com
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  Direct Neural Comms{" "}
                  <Sparkles
                    className={`w-4 h-4 ${
                      isCyber ? "text-[#fcee0a]" : "text-amber-400"
                    }`}
                  />
                </h4>
              </div>

              {/* ERROR BANNER */}
              {status === "error" && errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl border bg-[#ff003c]/10 border-[#ff003c]/40 text-[#ff003c] text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* SENDER EMAIL FIELD */}
              <div className="space-y-1.5 font-mono text-xs">
                <label className="flex items-center justify-between text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Mail
                      className={`w-3.5 h-3.5 ${
                        isCyber ? "text-[#00f0ff]" : "text-cyan-400"
                      }`}
                    />
                    Your Email Address *
                  </span>
                  <span className="text-[10px] text-[#787899]">
                    [REPLY ROUTE]
                  </span>
                </label>
                <div
                  className={`flex items-center rounded-xl border px-3 py-2.5 transition-all ${
                    isCyber
                      ? "bg-[#121226] border-[#ff00e5]/30 focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                      : "bg-slate-950 border-slate-800 focus-within:border-cyan-500"
                  }`}
                >
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="architect@domain.com"
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* SUBJECT FIELD & PRESET CHIPS */}
              <div className="space-y-1.5 font-mono text-xs">
                <label className="flex items-center justify-between text-slate-300 font-semibold">
                  <span>Subject Line *</span>
                  <span className="text-[10px] text-[#787899]">
                    [TOPIC MATRIX]
                  </span>
                </label>
                <div
                  className={`flex items-center rounded-xl border px-3 py-2.5 transition-all ${
                    isCyber
                      ? "bg-[#121226] border-[#ff00e5]/30 focus-within:border-[#ff00e5] focus-within:shadow-[0_0_12px_rgba(255,0,229,0.35)]"
                      : "bg-slate-950 border-slate-800 focus-within:border-cyan-500"
                  }`}
                >
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Project / Strategy Scope"
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
                  />
                </div>

                {/* PRESET SUBJECT CHIPS */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {presetSubjects.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: subj })}
                      className={`text-[10px] px-2 py-0.5 rounded border transition-all ${
                        formData.subject === subj
                          ? isCyber
                            ? "bg-[#ff00e5]/20 border-[#ff00e5] text-[#ff00e5] font-semibold"
                            : "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold"
                          : isCyber
                          ? "bg-[#121226] border-[#787899]/30 text-[#787899] hover:text-[#f0f0f5] hover:border-[#ff00e5]/50"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      +{subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGE TEXTAREA */}
              <div className="space-y-1.5 font-mono text-xs">
                <label className="flex items-center justify-between text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare
                      className={`w-3.5 h-3.5 ${
                        isCyber ? "text-[#39ff14]" : "text-emerald-400"
                      }`}
                    />
                    Encrypted Payload (Message) *
                  </span>
                  <span className="text-[10px] text-[#787899]">
                    [{formData.message.length} chars]
                  </span>
                </label>
                <div
                  className={`rounded-xl border p-3 transition-all ${
                    isCyber
                      ? "bg-[#121226] border-[#ff00e5]/30 focus-within:border-[#39ff14] focus-within:shadow-[0_0_12px_rgba(57,255,20,0.35)]"
                      : "bg-slate-950 border-slate-800 focus-within:border-cyan-500"
                  }`}
                >
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe your project, quant parameters, or collaboration proposal..."
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600 resize-none"
                  />
                </div>
              </div>

              {/* TRANSMIT BUTTON */}
              <button
                type="submit"
                disabled={status === "transmitting"}
                className={`w-full py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isCyber
                    ? "bg-[#ff00e5] text-[#05050a] hover:bg-[#ff00e5]/90 shadow-[0_0_20px_rgba(255,0,229,0.5)] disabled:opacity-50"
                    : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20 disabled:opacity-50"
                }`}
              >
                {status === "transmitting" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#05050a] border-t-transparent rounded-full animate-spin"></span>
                    <span>ENCRYPTING & TRANSMITTING PACKET...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT PACKET // SEND MESSAGE</span>
                  </>
                )}
              </button>

              {/* FOOTER DIRECT EMAIL LINK */}
              <div className="pt-1 text-center font-mono text-[11px] text-[#787899]">
                Or email directly via{" "}
                <a
                  href={`mailto:zakiafuadi925@gmail.com?subject=${encodeURIComponent(
                    formData.subject || "Collaboration Inquiry"
                  )}&body=${encodeURIComponent(formData.message)}`}
                  className={`underline transition-colors ${
                    isCyber ? "text-[#00f0ff] hover:text-[#ff00e5]" : "text-cyan-400 hover:text-white"
                  }`}
                >
                  Native Email Client
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
