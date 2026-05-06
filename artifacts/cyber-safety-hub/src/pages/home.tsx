import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Shield, AlertTriangle, BookOpen, ChevronRight,
  CheckCircle2, Lock, Users, Zap, ArrowRight,
} from "lucide-react";
import CyberMatrixHero from "@/components/ui/cyber-matrix-hero";
import { Button } from "@/components/ui/button";
import { CyberShieldAnimation } from "@/components/animation/CyberShieldAnimation";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

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
      transition={{ duration: 0.3, delay: 0.2, ease }}
      style={{ transform: `rotate(${rotMap[pos]})` }}
    >
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M2 16 L2 2 L16 2" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      </svg>
    </motion.div>
  );
}

export default function Home() {
  const { t } = useTranslation();

  const STATS = [
    { icon: Users,         value: "142K+", label: t('home.stats_citizens'),           color: "text-primary" },
    { icon: AlertTriangle, value: "8.5K",  label: t('home.stats_scams'),             color: "text-destructive" },
    { icon: Lock,          value: "₹12M+", label: t('home.stats_losses'),           color: "text-green-400" },
  ];

  const FEATURES = [
    {
      icon: BookOpen, title: t('home.feat1_title'),
      desc: t('home.feat1_desc'),
      points: [t('home.feat1_p1'), t('home.feat1_p2'), t('home.feat1_p3')],
      href: "/learn", cta: t('home.feat1_cta'),
    },
    {
      icon: Shield, title: t('home.feat2_title'),
      desc: t('home.feat2_desc'),
      points: [t('home.feat2_p1'), t('home.feat2_p2'), t('home.feat2_p3')],
      href: "/trainer", cta: t('home.feat2_cta'),
    },
    {
      icon: Zap, title: t('home.feat3_title'),
      desc: t('home.feat3_desc'),
      points: [t('home.feat3_p1'), t('home.feat3_p2'), t('home.feat3_p3')],
      href: "/dashboard", cta: t('home.feat3_cta'),
    },
  ];

  return (
    <div className="w-full flex-1 bg-background">

      {/* ════════════ HERO ════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] flex flex-col overflow-hidden">

        {/* 1 ▸ VIDEO — fades in immediately from black */}
        <motion.div
          className="absolute inset-0 z-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-full h-full">
            <CyberShieldAnimation />
          </div>
        </motion.div>

        {/* 2 ▸ GRADIENT VIGNETTE — appears with video */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
            transition={{ duration: 0.5, delay: 0.1, ease }}
          />
        ))}

        {/* 4 ▸ CORNER BRACKETS — text layer, 0.6s */}
        <div className="absolute inset-5 z-20 pointer-events-none">
          {(["tl","tr","bl","br"] as const).map(p => <CornerMark key={p} pos={p} />)}
        </div>

        {/* ── TOP CONTENT — 0.15s delay ── */}
        <motion.div
          className="relative z-20 flex flex-col items-center text-center pt-24 md:pt-28 px-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
          }}
        >
          {/* Badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } } }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-7 text-primary border border-primary/25"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(18px)" }}
          >
            <Shield className="w-3.5 h-3.5" />
            {t('home.hero_badge')}
          </motion.div>
        </motion.div>

        {/* ── SPACER ── */}
        <div className="flex-1" />

        {/* ── BOTTOM CONTENT — 0.2s delay ── */}
        <motion.div
          className="relative z-20 flex flex-col items-center gap-5 pb-10 px-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
          }}
        >
          {/* Sub-headline */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } } }}
            className="text-base md:text-lg text-white/65 max-w-md text-center leading-relaxed"
          >
            {t('home.hero_subtitle')}
          </motion.p>

          {/* CTA pill */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease } } }}
            className="flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-2xl"
            style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <Link href="/signup">
              <Button size="lg" className="h-11 px-7 text-sm font-bold rounded-xl shadow-lg shadow-primary/20 group">
                {t('home.cta_start')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/report">
              <Button size="lg" variant="ghost" className="h-11 px-7 text-sm font-bold rounded-xl text-white/70 hover:text-white hover:bg-white/10">
                {t('home.cta_report')}
                <AlertTriangle className="ml-2 w-4 h-4 text-destructive" />
              </Button>
            </Link>
          </motion.div>

          {/* Live stat chips */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3, ease } } }}
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

      {/* ════════════ VIDEO SHOWCASE ════════════ */}
      <section className="px-6 py-24 bg-secondary/5 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {t('home.showcase_badge')}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                {t('home.showcase_title_1')} <span className="text-primary">{t('home.showcase_title_2')}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t('home.showcase_desc')}
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border group hover:border-primary/30 transition-all cursor-default shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t('home.showcase_feat1_t')}</h4>
                    <p className="text-xs text-muted-foreground">{t('home.showcase_feat1_d')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border group hover:border-primary/30 transition-all cursor-default shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t('home.showcase_feat2_t')}</h4>
                    <p className="text-xs text-muted-foreground">{t('home.showcase_feat2_d')}</p>
                  </div>
                </div>
              </div>
              <Link href="/cyber-surakshit-video/">
                <Button size="lg" className="mt-10 h-14 px-8 text-base font-bold rounded-2xl shadow-xl shadow-primary/20 group">
                  {t('home.showcase_cta')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              onClick={() => window.location.href = '/cyber-surakshit-video/'}
            >
              <div className="absolute -inset-4 bg-primary/10 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-video rounded-[32px] overflow-hidden border border-border/50 shadow-2xl">
                <img 
                  src="/neighborhood.png" 
                  alt="Cyber Surakshit Video" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-10 h-10 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{t('home.showcase_coming')}</p>
                      <h4 className="font-bold text-sm">{t('home.showcase_mod1')}</h4>
                    </div>
                    <Badge variant="outline" className="text-white border-white/30 px-3 py-1 text-[10px]">
                      12:45
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <div className="px-6 pb-32 pt-20">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            className="text-center mb-14 mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.15em] mb-5 border border-primary/20">
              {t('home.features_badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{t('home.features_title')}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              {t('home.features_subtitle')}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, points, href, cta }, i) => (
              <motion.div
                key={title}
                className="group relative rounded-[28px] p-7 flex flex-col overflow-hidden bg-card border border-border hover:border-primary/35 transition-all duration-400 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-1.5 shadow-sm"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04, ease }}
              >
                {/* hover glow */}
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300 shrink-0 shadow-inner">
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
