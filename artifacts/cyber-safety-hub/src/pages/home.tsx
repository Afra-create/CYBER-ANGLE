import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Shield, AlertTriangle, BookOpen, ChevronRight,
  CheckCircle2, Lock, Users, Zap, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── data ─────────────────────────────────────────────────── */
const STATS = [
  { icon: Users,         value: "142K+", label: "Citizens Trained",           color: "text-primary" },
  { icon: AlertTriangle, value: "8.5K",  label: "Scams Reported",             color: "text-destructive" },
  { icon: Lock,          value: "₹12M+", label: "Losses Prevented",           color: "text-green-400" },
];

const FEATURES = [
  {
    icon: BookOpen, title: "Interactive Modules",
    desc: "Bite-sized lessons on phishing, OTP frauds & social engineering — tailored to the Indian context.",
    points: ["Recognize red flags instantly", "Understand scammer psychology", "Secure your digital identity"],
    href: "/learn", cta: "Explore Modules",
  },
  {
    icon: Shield, title: "Live Scam Trainer",
    desc: "Test your instincts against simulated scam messages, emails & calls in a safe environment.",
    points: ["Simulated WhatsApp/SMS scams", "Instant feedback & explanations", "Progress tracking & badges"],
    href: "/trainer", cta: "Try the Trainer",
  },
  {
    icon: Zap, title: "Threat Dashboard",
    desc: "Track emerging scam trends in your region and stay one step ahead with live community data.",
    points: ["Real-time scam trend charts", "XP & achievement system", "Personalised safety tips"],
    href: "/dashboard", cta: "Open Dashboard",
  },
];

/* ─── tiny helpers ──────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

/** Corner bracket mark — top-left, top-right, bottom-left, bottom-right */
function CornerMark({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const horiz = pos.endsWith("l") ? "left-0" : "right-0";
  const vert  = pos.startsWith("t") ? "top-0" : "bottom-0";
  const rotMap = { tl: "0deg", tr: "90deg", br: "180deg", bl: "270deg" };
  return (
    <motion.div
      className={`absolute ${vert} ${horiz} w-8 h-8 pointer-events-none`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 0.35, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease }}
      style={{ transform: `rotate(${rotMap[pos]})` }}
    >
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M2 16 L2 2 L16 2" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      </svg>
    </motion.div>
  );
}

/* ─── page ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="w-full flex-1 bg-background">

      {/* ════════════ HERO ════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] flex flex-col overflow-hidden">

        {/* 1 ▸ VIDEO — fades in immediately from black */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <iframe
            src="/cyber-surakshit-video/"
            title="Cyber Shield Animation"
            className="w-full h-full border-0"
            style={{ display: "block" }}
            tabIndex={-1}
            aria-hidden="true"
          />
        </motion.div>

        {/* 2 ▸ GRADIENT VIGNETTE — appears with video */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(to bottom," +
              "rgba(0,0,0,0.78) 0%," +
              "rgba(0,0,0,0.12) 30%," +
              "rgba(0,0,0,0.05) 55%," +
              "rgba(0,0,0,0.70) 82%," +
              "rgba(0,0,0,0.92) 100%)",
          }}
        />

        {/* 3 ▸ SIDE SCAN LINES — appear with video */}
        {["left-0", "right-0"].map((side) => (
          <motion.div
            key={side}
            className={`absolute top-0 bottom-0 ${side} z-10 w-px pointer-events-none`}
            style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 100%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
          />
        ))}

        {/* 4 ▸ CORNER BRACKETS — text layer, 0.6s */}
        <div className="absolute inset-5 z-20 pointer-events-none">
          {(["tl","tr","bl","br"] as const).map(p => <CornerMark key={p} pos={p} />)}
        </div>

        {/* ── TOP CONTENT — 0.5s delay ── */}
        <motion.div
          className="relative z-20 flex flex-col items-center text-center pt-24 md:pt-28 px-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
          }}
        >
          {/* Badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-7 text-primary border border-primary/25"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(18px)" }}
          >
            <Shield className="w-3.5 h-3.5" />
            National Cyber Awareness Initiative
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } } }}
            className="text-6xl sm:text-7xl md:text-[96px] font-extrabold tracking-tight leading-[0.95] drop-shadow-2xl"
          >
            <span className="text-white">Think Before</span>
            <br />
            <span className="text-white">You </span>
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(48,100%,70%), hsl(var(--primary)))" }}
            >
              Click
            </span>
          </motion.h1>
        </motion.div>

        {/* ── SPACER ── */}
        <div className="flex-1" />

        {/* ── BOTTOM CONTENT — 0.65s delay ── */}
        <motion.div
          className="relative z-20 flex flex-col items-center gap-5 pb-10 px-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.65 } },
          }}
        >
          {/* Sub-headline */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="text-base md:text-lg text-white/65 max-w-md text-center leading-relaxed"
          >
            Empowering Indian families to recognize, resist, and report digital threats.
          </motion.p>

          {/* CTA pill */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } } }}
            className="flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-2xl"
            style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <Link href="/learn">
              <Button size="lg" className="h-11 px-7 text-sm font-bold rounded-xl shadow-lg shadow-primary/20 group">
                Start Learning
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/report">
              <Button size="lg" variant="ghost" className="h-11 px-7 text-sm font-bold rounded-xl text-white/70 hover:text-white hover:bg-white/10">
                Report a Scam
                <AlertTriangle className="ml-2 w-4 h-4 text-destructive" />
              </Button>
            </Link>
          </motion.div>

          {/* Live stat chips */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7, ease } } }}
            className="flex items-center gap-3 flex-wrap justify-center"
          >
            {STATS.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white/60"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                <span className="font-bold text-white/85">{value}</span>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Page blend */}
        <div className="absolute bottom-0 inset-x-0 h-28 z-20 pointer-events-none bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <div className="px-6 pb-32 pt-6">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            className="text-center mb-14 mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.15em] mb-5 border border-primary/20">
              What you get
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Your Defense Arsenal</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              Master the tools and knowledge needed to protect yourself and your family.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc, points, href, cta }, i) => (
              <motion.div
                key={title}
                className="group relative rounded-[28px] p-7 flex flex-col overflow-hidden bg-card border border-border hover:border-primary/35 transition-all duration-400 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-1.5"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09, ease }}
              >
                {/* hover glow */}
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300 shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-lg font-bold mb-2 tracking-tight">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>

                <ul className="space-y-2 mb-7 flex-1">
                  {points.map(pt => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-foreground/75">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <Link href={href}>
                  <Button variant="outline" className="w-full rounded-xl font-semibold group/btn text-sm">
                    {cta}
                    <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
