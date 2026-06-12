// src/components/Audit.jsx
import React, { useEffect, useRef, useState } from "react";
import {
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ArrowPathIcon,
    ClipboardDocumentIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    CpuChipIcon,
    CloudArrowUpIcon,
    BoltIcon,
    CheckCircleIcon,
    UsersIcon,
    LockClosedIcon,
    IdentificationIcon,
    GlobeAltIcon,
    LinkIcon,
    ExclamationTriangleIcon,
    ArrowTrendingUpIcon,
    CheckIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
};

const Audit = () => {
    useEffect(() => {
        // initialise scroll reveal animations
        revealOnScroll();
    }, []);

    // Staggered list items for continuous vertical marquee in Problem section
    const painItems = [
        {
            icon: <ClipboardDocumentIcon className="w-5 h-5 text-primaryBlue" />,
            title: "Evidence collection is a bottleneck",
            desc: "Manually curating and sending evidence request lists to clients — repeatedly, for every engagement."
        },
        {
            icon: <MagnifyingGlassIcon className="w-5 h-5 text-primaryBlue" />,
            title: "Evaluation takes days, not hours",
            desc: "Reviewing evidence, drafting observations, findings and recommendations — all done from scratch each time."
        },
        {
            icon: <DocumentTextIcon className="w-5 h-5 text-primaryBlue" />,
            title: "Report formatting kills productivity",
            desc: "Assembling regulator‑friendly, well‑formatted reports consumes senior consultant time that should go to client value."
        },
        {
            icon: <ArrowPathIcon className="w-5 h-5 text-primaryBlue" />,
            title: "Inconsistency across the team",
            desc: "Every consultant applies a slightly different standard — leading to review cycles, rework, and quality variance."
        }
    ];

    // Double the array to create a continuous vertical loop
    const doublePainItems = [...painItems, ...painItems];

    // ── rAF-driven vertical scroll with active-card tracking ──
    const listRef = useRef(null);
    const offsetRef = useRef(0);          // current translateY in px
    const pausedRef = useRef(false);      // true while hovered
    const rafRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const SPEED = 0.6; // px per frame — adjust for desired pace

        const tick = () => {
            const ul = listRef.current;
            if (!ul) { rafRef.current = requestAnimationFrame(tick); return; }

            if (!pausedRef.current) {
                offsetRef.current += SPEED;

                // Total height of one set (half the duplicated list)
                const halfHeight = ul.scrollHeight / 2;
                if (offsetRef.current >= halfHeight) {
                    offsetRef.current -= halfHeight; // seamless loop
                }

                ul.style.transform = `translateY(-${offsetRef.current}px)`;

                // ── Determine which card is closest to the vertical center ──
                const containerEl = ul.parentElement;
                if (containerEl) {
                    const containerCenter = containerEl.offsetHeight / 2;
                    const items = ul.querySelectorAll('li');
                    let closestIdx = 0;
                    let closestDist = Infinity;

                    items.forEach((item, i) => {
                        // item top relative to container top, accounting for scroll offset
                        const itemCenter = item.offsetTop - offsetRef.current + item.offsetHeight / 2;
                        const dist = Math.abs(itemCenter - containerCenter);
                        if (dist < closestDist) {
                            closestDist = dist;
                            closestIdx = i % painItems.length; // map back to original 4
                        }
                    });

                    setActiveIndex(prev => prev !== closestIdx ? closestIdx : prev);
                }
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafRef.current);
    }, [painItems.length]);

    return (
        <div className="font-sans text-slate-800 bg-white min-h-screen overflow-x-hidden selection:bg-violet/30 selection:text-white">
            {/* HERO SECTION — two-column: left text, right globe */}
            <section className="hero relative overflow-hidden z-10 hero-moving-gradient min-h-screen">
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                <div className="hero-glow absolute inset-0 pointer-events-none" />

                {/* Decorative floating blobs */}
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '12s' }} />

                <div className="container mx-auto px-6 md:px-10 py-10 md:py-14 relative z-10 flex flex-col lg:flex-row items-center gap-12 min-h-screen">

                    {/* LEFT: Hero copy */}
                    <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
                        <div className="hero-badge inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 mb-6 font-medium backdrop-blur-md text-xs">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                            Now available for BFSI compliance teams
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl lg:text-5xl text-white mb-4 animate-fade-up font-extrabold tracking-tight leading-[1.05]" style={{ animationDelay: '0.1s' }}>
                            Compliance<br />Audits,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-blue-200">Reimagined.</span>
                        </h1>

                        <p className="hero-sub text-lg md:text-xl text-white/80 mb-3 animate-fade-up font-medium" style={{ animationDelay: '0.2s' }}>
                            From evidence request to final report — in a fraction of the time.
                        </p>

                        <p className="hero-desc text-white/65 text-sm md:text-base mb-6 animate-fade-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
                            Audit.AI eliminates the hours lost to drafting, formatting, and evidence chasing — so your team spends time on insights, not paperwork.
                        </p>

                        <div className="hero-actions flex gap-4 flex-wrap animate-fade-up" style={{ animationDelay: '0.4s' }}>
                            <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-[#0A1628] font-bold py-3 px-6 rounded-lg shadow-2xl hover:scale-105 hover:shadow-white/20 transition-all bg-white hover:bg-slate-100 text-sm">
                                Request a Demo <span>→</span>
                            </a>
                            <a href="#how-it-works" className="btn-ghost inline-flex items-center gap-2 border-2 border-white/30 text-white py-3 px-6 rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all text-sm">
                                See how it works
                            </a>
                        </div>

                        {/* Stat strip below CTAs */}
                        <div className="stat-strip grid grid-cols-2 sm:grid-cols-4 gap-0 border border-white/15 rounded-2xl overflow-hidden mt-8 bg-black/25 backdrop-blur-md animate-fade-up w-full" style={{ animationDelay: '0.5s' }}>
                            <div className="stat-item px-4 py-3.5 text-center border-r border-white/10">
                                <div className="stat-num text-white text-2xl font-bold mb-1">70%+</div>
                                <div className="stat-label text-[10px] text-white/50 uppercase tracking-wider">Effort saved</div>
                            </div>
                            <div className="stat-item px-4 py-0.5 text-center border-r border-white/10">
                                <div className="stat-num text-white text-6xl font-bold mb-1">∞</div>
                                <div className="stat-label text-[10px] text-white/50 uppercase tracking-wider">Unlimited audits</div>
                            </div>
                            <div className="stat-item px-4 py-3.5 text-center border-r border-white/10">
                                <div className="stat-num text-white text-2xl font-bold mb-1">1×</div>
                                <div className="stat-label text-[10px] text-white/50 uppercase tracking-wider">Jr. consultant cost</div>
                            </div>
                            <div className="stat-item px-4 py-3.5 text-center">
                                <div className="stat-num text-white text-2xl font-bold mb-1">BFSI</div>
                                <div className="stat-label text-[10px] text-white/50 uppercase tracking-wider">Specialised</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Threat Globe — transparent bg shows gradient */}
                    <div className="flex-1 flex items-center justify-center relative min-h-[500px] lg:min-h-[600px] w-full max-w-xl">
                        {/* Globe container */}
                        <div className="globe-container">
                            <div className="globe-ring"></div>
                            <div className="globe-ring"></div>
                            <div className="globe-ring"></div>
                            <div className="globe-ring"></div>

                            {/* Floating threat nodes — big icons, visible on gradient */}
                            <div className="threat-node danger" style={{ top: '4%', left: '50%', animationDelay: '0.5s' }}>
                                <LockClosedIcon className="w-5 h-5 text-white" />
                                <div className="node-label">RANSOMWARE</div>
                            </div>
                            <div className="threat-node warn" style={{ top: '65%', left: '10%', animationDelay: '1.2s' }}>
                                <IdentificationIcon className="w-5 h-5 text-white" />
                                <div className="node-label">CREDENTIALS</div>
                            </div>
                            <div className="threat-node info" style={{ top: '25%', left: '2%', animationDelay: '0.8s' }}>
                                <GlobeAltIcon className="w-5 h-5 text-white" />
                                <div className="node-label">ASM</div>
                            </div>
                            <div className="threat-node warn" style={{ top: '60%', right: '4%', animationDelay: '1.5s' }}>
                                <ShieldCheckIcon className="w-5 h-5 text-white" />
                                <div className="node-label">FAKE APPS</div>
                            </div>
                            <div className="threat-node danger" style={{ bottom: '2%', left: '42%', animationDelay: '2s' }}>
                                <LinkIcon className="w-5 h-5 text-white" />
                                <div className="node-label">SUPPLY CHAIN</div>
                            </div>

                            {/* Alert cards — glass style, big readable text */}
                            <div className="alert-card hidden lg:block" style={{ top: '17%', right: '-162px', animationDelay: '0s' }}>
                                <div className="flex items-center gap-2 font-bold text-rose-300 mb-1.5" style={{ fontSize: '11px' }}>
                                    <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" />
                                    CRITICAL DETECTED
                                </div>
                                <div className="text-white font-medium" style={{ fontSize: '11px', lineHeight: '1.4' }}>Credential leak discovered in darkweb forum</div>
                                <div className="text-white/60 mt-1 font-mono" style={{ fontSize: '9px' }}>→ T1078 · Valid Accounts · 2m ago</div>
                            </div>

                            <div className="alert-card hidden lg:block" style={{ bottom: '-12%', left: '-170px', animationDelay: '1.8s' }}>
                                <div className="flex items-center gap-2 font-bold text-amber-300 mb-1.5" style={{ fontSize: '11px' }}>
                                    <BoltIcon className="w-4 h-4 flex-shrink-0" />
                                    NEW IOC INGESTED
                                </div>
                                <div className="text-white font-medium" style={{ fontSize: '11px', lineHeight: '1.4' }}>C2 domain resolved to known LockBit affiliate</div>
                                <div className="text-white/60 mt-1 font-mono" style={{ fontSize: '9px' }}>→ T1071 · C2 Comms · 8m ago</div>
                            </div>

                            <div className="alert-card hidden lg:block" style={{ top: '101%', right: '-165px', animationDelay: '1s' }}>
                                <div className="flex items-center gap-2 font-bold text-blue-300 mb-1.5" style={{ fontSize: '11px' }}>
                                    <MagnifyingGlassIcon className="w-4 h-4 flex-shrink-0" />
                                    BRAND PROTECTION
                                </div>
                                <div className="text-white font-medium" style={{ fontSize: '11px', lineHeight: '1.4' }}>Phishing domain mimicking corporate portal found</div>
                                <div className="text-white/60 mt-1 font-mono" style={{ fontSize: '9px' }}>→ T1566 · Phishing · 14m ago</div>
                            </div>

                            <div className="globe-core"></div>
                        </div>

                    </div>

                    {/* Alert cards — glass style, visible on mobile */}
                    <div className="lg:hidden flex flex-col items-center space-y-4 w-full" style={{ position: 'relative', top: '-113px' }}>
                        <div className="alert-card" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-2 font-bold text-rose-300 mb-2" style={{ fontSize: '13px' }}>
                                <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                                CRITICAL DETECTED
                            </div>
                            <div className="text-white font-medium" style={{ fontSize: '13px', lineHeight: '1.5' }}>Credential leak discovered in darkweb forum</div>
                            <div className="text-white/60 mt-1.5 font-mono" style={{ fontSize: '11px' }}>→ T1078 · Valid Accounts · 2m ago</div>
                        </div>

                        <div className="alert-card" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-2 font-bold text-amber-300 mb-2" style={{ fontSize: '13px' }}>
                                <BoltIcon className="w-5 h-5 flex-shrunk-0" />
                                NEW IOC INGESTED
                            </div>
                            <div className="text-white font-medium" style={{ fontSize: '13px', lineHeight: '1.5' }}>C2 domain resolved to known LockBit affiliate</div>
                            <div className="text-white/60 mt-1.5 font-mono" style={{ fontSize: '11px' }}>→ T1071 · C2 Comms · 8m ago</div>
                        </div>

                        <div className="alert-card" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-2 font-bold text-blue-300 mb-2" style={{ fontSize: '13px' }}>
                                <MagnifyingGlassIcon className="w-5 h-5 flex-shrunk-0" />
                                BRAND PROTECTION
                            </div>
                            <div className="text-white font-medium" style={{ fontSize: '13px', lineHeight: '1.5' }}>Phishing domain mimicking corporate portal found</div>
                            <div className="text-white/60 mt-1.5 font-mono" style={{ fontSize: '11px' }}>→ T1566 · Phishing · 14m ago</div>
                        </div>
                    </div>

                </div>

            </section>

            {/* PROBLEM SECTION */}
            <section className="problem py-16 md:py-20 bg-white">
                <div className="container mx-auto px-5">
                    <div className="problem-layout grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal">
                            <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">The Problem</div>
                            <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6 leading-tight">
                                Quality compliance is drowning in <em className="italic text-violet">admin work</em>
                            </h2>
                            <p className="section-body text-slate-700 max-w-prose mb-8 leading-relaxed text-base">
                                Regulatory compliance audits should deliver insight and assurance. Instead, they consume hours in evidence chasing, report drafting, and formatting — tasks that don't move the needle for anyone.
                            </p>
                            <blockquote className="problem-quote border-l-4 border-violet bg-violet-50/50 pl-6 py-5 rounded-r-lg shadow-sm">
                                <p className="text-slate-800 italic text-base leading-relaxed">
                                    "Hours lost to drafting the report, formatting, and evidence evaluation — chasing tasks that don't actually move the needle for business."
                                </p>
                                <cite className="block mt-3 font-body font-medium text-violet not-italic text-sm">
                                    — The reality for every audit team today
                                </cite>
                            </blockquote>
                        </div>

                        {/* Vertical scrolling list container with left rounded borders and right gradient smudge */}
                        <div
                            className="reveal relative h-[420px] overflow-hidden rounded-l-2xl border-violet/20 backdrop-blur-sm"
                            onMouseEnter={() => { pausedRef.current = true; }}
                            onMouseLeave={() => { pausedRef.current = false; }}
                        >
                            {/* Gradient overlay for right-side smudged/faded look */}
                            <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
                            {/* Top & bottom overlays to soften edges */}
                            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

                            {/* rAF-driven list — no CSS animation class, JS controls transform */}
                            <ul ref={listRef} className="pain-list space-y-4 py-6 px-4" style={{ willChange: 'transform' }}>
                                {doublePainItems.map((item, index) => {
                                    const isActive = (index % painItems.length) === activeIndex;
                                    return (
                                        <li
                                            key={index}
                                            className={[
                                                "pain-item bg-white rounded-l-xl rounded-r-none p-5 flex gap-4 shadow-md",
                                                "border-y border-r border-slate-200",
                                                isActive
                                                    ? "border-l-4 border-l-violet/60 scale-[1.02] shadow-violet/10 shadow-lg"
                                                    : "border-l-4 border-l-slate-200",
                                                "transition-all duration-500"
                                            ].join(' ')}
                                        >
                                            <div className={[
                                                "pain-icon rounded-lg p-2.5 flex items-center justify-center h-11 w-11 flex-shrink-0",
                                                isActive ? "bg-violet/15" : "bg-violet/10"
                                            ].join(' ')}>
                                                {item.icon}
                                            </div>
                                            <div className="pain-text text-sm">
                                                <strong className={[
                                                    "block font-semibold mb-1.5 text-base",
                                                    isActive ? "text-violet" : "text-slate-950"
                                                ].join(' ')}>{item.title}</strong>
                                                <span className="text-slate-700 leading-relaxed">{item.desc}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section id="how-it-works" className="how py-16 md:py-20 bg-slate-50/50 border-y border-slate-100">
                <div className="container mx-auto px-5">
                    <div className="how-header text-center mb-12 reveal">
                        <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">How Audit.AI Works</div>
                        <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6">
                            Three steps. End‑to‑end <em className="italic text-violet">audit delivery.</em>
                        </h2>
                        <p className="section-body text-slate-700 max-w-2xl mx-auto text-base leading-relaxed">
                            From opening the engagement to shipping the final report — Audit.AI handles the heavy lifting at every stage.
                        </p>
                    </div>
                    <div className="steps grid md:grid-cols-3 gap-6 reveal">
                        {/* Step 1 */}
                        <div className="step bg-white border border-slate-200 p-6 rounded-xl relative transition-all duration-300 hover:translate-y-[-5px] shadow-lg shadow-slate-100/50 flex flex-col h-full">
                            <div className="step-number flex items-center gap-2 text-xs text-violet font-semibold tracking-wider mb-6">
                                STEP 01
                                <span className="flex-1 h-px bg-slate-100" />
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-primaryBlue/10 flex items-center justify-center mb-6">
                                <CloudArrowUpIcon className="w-6 h-6 text-primaryBlue" />
                            </div>
                            <h3 className="font-display text-xl text-slate-950 mb-3 font-bold">Evidence Request, Generated</h3>
                            <p className="text-slate-700 leading-relaxed text-sm mb-6 flex-1">Audit.AI produces a complete, regulation‑specific evidence checklist the moment you open an engagement. Share it directly with your client — no manual drafting.</p>
                            <div className="mt-auto pt-2">
                                <span className="step-tag text-xs font-semibold text-primaryBlue bg-primaryBlue/10 border border-primaryBlue/20 px-3 py-1.5 rounded-full inline-block">Client‑ready instantly</span>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="step bg-white border border-slate-200 p-6 rounded-xl relative transition-all duration-300 hover:translate-y-[-5px] shadow-lg shadow-slate-100/50 flex flex-col h-full">
                            <div className="step-number flex items-center gap-2 text-xs text-violet font-semibold tracking-wider mb-6">
                                STEP 02
                                <span className="flex-1 h-px bg-slate-100" />
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-[#D51776]/10 flex items-center justify-center mb-6">
                                <BoltIcon className="w-6 h-6 text-[#D51776]" />
                            </div>
                            <h3 className="font-display text-xl text-slate-950 mb-3 font-bold">Evidence Evaluated Automatically</h3>
                            <p className="text-slate-700 leading-relaxed text-sm mb-6 flex-1">Upload received documents. Audit.AI evaluates them against the applicable regulation and drafts observations, findings, and recommendations — ready for review.</p>
                            <div className="mt-auto pt-2">
                                <span className="step-tag text-xs font-semibold text-[#D51776] bg-[#D51776]/10 border border-[#D51776]/20 px-3 py-1.5 rounded-full inline-block">AI‑powered analysis</span>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="step bg-white border border-slate-200 p-6 rounded-xl relative transition-all duration-300 hover:translate-y-[-5px] shadow-lg shadow-slate-100/50 flex flex-col h-full">
                            <div className="step-number flex items-center gap-2 text-xs text-violet font-semibold tracking-wider mb-6">
                                STEP 03
                                <span className="flex-1 h-px bg-slate-100" />
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-violet/10 flex items-center justify-center mb-6">
                                <DocumentTextIcon className="w-6 h-6 text-violet" />
                            </div>
                            <h3 className="font-display text-xl text-slate-950 mb-3 font-bold">Regulator‑Ready Report, Drafted</h3>
                            <p className="text-slate-700 leading-relaxed text-sm mb-6 flex-1">A well‑formatted, regulator‑friendly report is assembled automatically. Structured, consistent, and ready to ship — without a single hour of manual formatting.</p>
                            <div className="mt-auto pt-2">
                                <span className="step-tag text-xs font-semibold text-violet bg-violet/10 border border-violet/20 px-3 py-1.5 rounded-full inline-block">Ship‑ready output</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HUMAN IN THE LOOP SECTION */}
            <section className="hitl py-16 md:py-20 bg-white">
                <div className="container mx-auto px-5">
                    <div className="hitl-card grid md:grid-cols-2 gap-12 items-center reveal">
                        <div>
                            <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">Human‑in‑the‑Loop</div>
                            <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6 leading-tight">
                                AI does the work.<br />
                                <em className="italic text-violet">Your team stays in control.</em>
                            </h2>
                            <p className="section-body text-slate-700 mb-6 leading-relaxed text-base">Audit.AI operates on a human‑in‑the‑loop model. Every output is reviewed, refined, and approved by your team before it reaches a client. The AI accelerates; your experts decide.</p>
                            <p className="section-body text-slate-700 leading-relaxed text-sm">This means your firm's judgment, reputation, and professional standards remain intact — while the grind of production work disappears.</p>
                        </div>

                        {/* Flow diagram updated with premium colors and animations */}
                        <div className="flow flex flex-col items-stretch gap-4 max-w-lg mx-auto w-full">
                            <div className="flow-node ai flex items-center gap-3 bg-violet-50 border border-violet-200 text-slate-800 p-4 rounded-xl shadow-md hover:border-violet/40 transition-all duration-300">
                                <div className="node-icon bg-violet/15 border border-violet/20 rounded-lg w-9 h-9 flex items-center justify-center">
                                    <CpuChipIcon className="w-5 h-5 text-violet" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">Audit.AI generates evidence list, evaluates documents, drafts report</span>
                            </div>
                            <div className="flow-arrow text-violet text-center animate-bounce flex justify-center">
                                <ChevronDownIcon className="w-6 h-6 text-violet" />
                            </div>

                            <div className="flow-node human flex items-center gap-3 bg-blue-50 border border-blue-200 text-slate-800 p-4 rounded-xl shadow-md hover:border-blue-400/40 transition-all duration-300">
                                <div className="node-icon bg-primaryBlue/15 border border-primaryBlue/20 rounded-lg w-9 h-9 flex items-center justify-center">
                                    <UsersIcon className="w-5 h-5 text-primaryBlue" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">Your team reviews, refines, and approves all outputs</span>
                            </div>
                            <div className="flow-arrow text-violet text-center animate-bounce flex justify-center" style={{ animationDelay: '0.2s' }}>
                                <ChevronDownIcon className="w-6 h-6 text-violet" />
                            </div>

                            <div className="flow-node output flex items-center gap-3 bg-rose-50/50 border border-rose-200 text-slate-800 p-4 rounded-xl shadow-md hover:border-rose-450/30 transition-all duration-300">
                                <div className="node-icon bg-rose-100 border border-rose-200 rounded-lg w-9 h-9 flex items-center justify-center">
                                    <CheckCircleIcon className="w-5 h-5 text-rose-500" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">Client discussions, final delivery, and insights — by your consultants</span>
                            </div>
                            <div className="flow-arrow text-violet text-center animate-bounce flex justify-center" style={{ animationDelay: '0.4s' }}>
                                <ChevronDownIcon className="w-6 h-6 text-violet" />
                            </div>

                            <div className="flow-node ai flex items-center gap-3 bg-blue-50 border border-blue-200 text-slate-800 p-4 rounded-xl shadow-md hover:border-blue-400/40 transition-all duration-300">
                                <div className="node-icon bg-primaryBlue/15 border border-primaryBlue/20 rounded-lg w-9 h-9 flex items-center justify-center">
                                    <CloudArrowUpIcon className="w-5 h-5 text-primaryBlue" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">Regulator‑ready report shipped to client</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REGULATIONS SECTION */}
            <section id="regulations" className="regs py-16 md:py-20 bg-slate-50/50 border-y border-slate-100">
                <div className="container mx-auto px-5">
                    <div className="regs-header text-center reveal max-w-3xl mx-auto mb-12">
                        <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">Regulatory Coverage</div>
                        <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6">Every major framework.<br /><em className="italic text-violet">One platform.</em></h2>
                        <p className="section-body text-slate-700 text-base leading-relaxed">Audit.AI is trained to handle India's primary financial regulators and a full suite of international frameworks — and is built to be regulator, geography, and risk‑area agnostic.</p>
                    </div>
                    <div className="reg-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 reveal">
                        <div className="reg-chip bg-white border border-slate-200 rounded-xl p-5 text-center hover:bg-violet-50/50 hover:border-violet/50 transition-all duration-300 group shadow-sm">
                            <div className="reg-name font-mono text-violet font-bold text-lg mb-1 group-hover:scale-110 transition-transform">RBI</div>
                            <div className="reg-scope text-xs text-slate-600">Reserve Bank of India guidelines</div>
                        </div>
                        <div className="reg-chip bg-white border border-slate-200 rounded-xl p-5 text-center hover:bg-[#3d63e2]/5 hover:border-[#3d63e2]/30 transition-all duration-300 group shadow-sm">
                            <div className="reg-name font-mono text-primaryBlue font-bold text-lg mb-1 group-hover:scale-110 transition-transform">SEBI</div>
                            <div className="reg-scope text-xs text-slate-600">Securities &amp; Exchange Board</div>
                        </div>
                        <div className="reg-chip bg-white border border-slate-200 rounded-xl p-5 text-center hover:bg-[#D51776]/5 hover:border-[#D51776]/30 transition-all duration-300 group shadow-sm">
                            <div className="reg-name font-mono text-[#D51776] font-bold text-lg mb-1 group-hover:scale-110 transition-transform">IRDAI</div>
                            <div className="reg-scope text-xs text-slate-600">Insurance Regulatory Authority</div>
                        </div>
                        <div className="reg-chip bg-white border border-slate-200 rounded-xl p-5 text-center hover:bg-violet-50/50 hover:border-violet/50 transition-all duration-300 group shadow-sm">
                            <div className="reg-name font-mono text-violet font-bold text-lg mb-1 group-hover:scale-110 transition-transform">ISO 27001</div>
                            <div className="reg-scope text-xs text-slate-600">Information security management</div>
                        </div>
                    </div>
                    <div className="agnostic-banner bg-gradient-to-r from-violet-500/5 via-transparent to-primaryBlue/5 border border-violet-100 rounded-2xl p-6 text-center text-sm md:text-base text-slate-800 mt-12 reveal max-w-4xl mx-auto shadow-sm leading-relaxed">
                        Audit.AI is <strong className="text-slate-950">regulator‑agnostic, geography‑agnostic, and risk‑area agnostic</strong> — trained specifically for BFSI sector compliance audits, with the ability to adapt to any standard your clients require.
                    </div>
                </div>
            </section>

            {/* OUTCOMES SECTION */}
            <section id="outcomes" className="outcomes py-16 md:py-20 bg-white">
                <div className="container mx-auto px-5">
                    <div className="outcomes-layout grid md:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">Business Outcomes</div>
                            <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6 leading-tight">More audits.<br />Same team.<br /><em className="italic text-violet">Better margins.</em></h2>
                            <p className="section-body text-slate-700 mb-6 leading-relaxed text-base">When your team spends far less time on paperwork and report writing, they spend more time on insights, client conversations, and delivery quality.</p>
                            <p className="section-body text-slate-700 leading-relaxed text-sm">That directly improves realization, utilization, and the ability to take on more work — without adding headcount.</p>
                        </div>

                        {/* Outcomes cards */}
                        <div className="outcome-cards grid grid-cols-2 gap-5 reveal">
                            <div className="outcome-card bg-white border border-slate-200 rounded-2xl p-6 hover:border-violet/50 shadow-xl shadow-slate-100 hover:scale-[1.03] transition-all duration-300">
                                <div className="outcome-num text-transparent bg-clip-text bg-gradient-to-r from-violet to-primaryBlue text-4xl font-display font-extrabold mb-3">70%+</div>
                                <div className="outcome-label text-sm text-slate-700 leading-relaxed"><strong className="text-slate-950">Effort saved per audit project.</strong> Firms report over 70% reduction in total hours per engagement.</div>
                            </div>
                            <div className="outcome-card bg-white border border-slate-200 rounded-2xl p-6 hover:border-violet/50 shadow-xl shadow-slate-100 hover:scale-[1.03] transition-all duration-300">
                                <div className="flex items-center mb-3">
                                    <ArrowTrendingUpIcon className="w-12 h-12 text-transparent stroke-[url(#grad1)]" style={{ stroke: 'url(#linearGrad)' }} />
                                    <svg width="0" height="0" aria-hidden="true">
                                        <defs>
                                            <linearGradient id="linearGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#9146FF" />
                                                <stop offset="100%" stopColor="rgb(61,99,226)" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="outcome-label text-sm text-slate-700 leading-relaxed"><strong className="text-slate-950">Higher realization</strong> and utilization rates per senior consultant.</div>
                            </div>
                            <div className="outcome-card bg-white border border-slate-200 rounded-2xl p-6 hover:border-violet/50 shadow-xl shadow-slate-100 hover:scale-[1.03] transition-all duration-300">
                                <div className="outcome-num text-transparent bg-clip-text bg-gradient-to-r from-violet to-primaryBlue text-4xl font-display font-extrabold mb-3">0</div>
                                <div className="outcome-label text-sm text-slate-700 leading-relaxed"><strong className="text-slate-950">Additional headcount</strong> needed to take on and scale engagements.</div>
                            </div>
                            <div className="outcome-card bg-white border border-slate-200 rounded-2xl p-6 hover:border-violet/50 shadow-xl shadow-slate-100 hover:scale-[1.03] transition-all duration-300">
                                <div className="flex items-center mb-3">
                                    <ArrowTrendingUpIcon className="w-12 h-12" style={{ stroke: 'url(#linearGrad)' }} />
                                </div>
                                <div className="outcome-label text-sm text-slate-700 leading-relaxed"><strong className="text-slate-950">Consistent quality</strong> across all internal and external engagements.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AUDIT & COMPLIANCE SOLUTIONS SECTION */}
            <section id="audit-compliance-solutions" className="audit-compliance py-16 md:py-20 bg-slate-50/50 border-y border-slate-100">
                <div className="container mx-auto px-5">
                    {/* Header styled as subtitle — smaller, lighter */}
                    <div className="text-center max-w-3xl mx-auto mb-8 reveal">
                        <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">Audit &amp; Compliance Solutions</div>
                        <h2 className="text-xl md:text-2xl font-display text-slate-800 font-semibold mb-4">
                            Strengthening Governance, Risk Management, and Regulatory Compliance
                        </h2>
                        <p className="text-slate-700 text-sm mb-3 leading-relaxed">
                            In today's highly regulated business environment, managing audits and monitoring compliance manually can be complex, slow, and error-prone.
                        </p>
                        <p className="text-slate-600 text-xs leading-relaxed">
                            Peopleclick Audit &amp; Compliance Solutions automate these processes, enabling organizations to detect risks early, maintain compliance, and improve operational transparency.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
                        <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-violet/40 hover:translate-y-[-5px] hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-md">
                            <div>
                                <div className="h-12 w-12 rounded-xl bg-violet/10 flex items-center justify-center mb-6">
                                    <Cog6ToothIcon className="w-6 h-6 text-violet" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-950 mb-3">Process Automation</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">Automate internal and external audit workflows, checklists, and document requests seamlessly.</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-[#3d63e2]/40 hover:translate-y-[-5px] hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-md">
                            <div>
                                <div className="h-12 w-12 rounded-xl bg-primaryBlue/10 flex items-center justify-center mb-6">
                                    <ChartBarIcon className="w-6 h-6 text-primaryBlue" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-950 mb-3">Compliance Monitoring</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">Monitor compliance with evolving regulatory standards and internal policy mandates dynamically.</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-[#D51776]/40 hover:translate-y-[-5px] hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-md">
                            <div>
                                <div className="h-12 w-12 rounded-xl bg-[#D51776]/10 flex items-center justify-center mb-6">
                                    <MagnifyingGlassIcon className="w-6 h-6 text-[#D51776]" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-950 mb-3">Risk Detection</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">Detect transaction anomalies, compliance risks, and control failures before they escalate.</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-violet/40 hover:translate-y-[-5px] hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-md md:col-span-2 lg:col-span-1 lg:max-w-none md:max-w-md md:mx-auto lg:mx-0">
                            <div>
                                <div className="h-12 w-12 rounded-xl bg-violet/10 flex items-center justify-center mb-6">
                                    <ShieldCheckIcon className="w-6 h-6 text-violet" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-950 mb-3">Governance Framework</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">Strengthen governance structure and internal control mechanisms across all operational departments.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AUDIT AI PLATFORM SECTION */}
            <section id="audit-ai-platform" className="audit-ai py-16 md:py-20 bg-white">
                <div className="container mx-auto px-5">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Interactive Live Audit Feed Mockup */}
                        <div className="reveal order-2 md:order-1">
                            <div className="intel-panel border border-violet/30 rounded-2xl overflow-hidden shadow-2xl bg-[#0D1E35]">
                                <div className="panel-titlebar bg-[#112240] px-5 py-4 flex items-center gap-2 border-b border-white/10 font-mono text-xs text-slate-300">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]"></span>
                                    <span className="ml-3 font-semibold text-white">Peopleclick · Live Audit AI Stream</span>
                                </div>
                                <div className="panel-body divide-y divide-white/5">
                                    <div className="ioc-row bg-violet/5 py-3.5 px-5 text-xs text-slate-300 grid grid-cols-4 font-mono font-bold tracking-wider">
                                        <div>MODULE</div>
                                        <div className="col-span-2">AUDIT ACTION DETAILS</div>
                                        <div className="text-right">STATUS</div>
                                    </div>
                                    <div className="ioc-row py-3 px-5 text-xs grid grid-cols-4 items-center">
                                        <div className="font-mono text-violet font-semibold">ENGAGEMENT</div>
                                        <div className="col-span-2 text-white">RBI Checklist Generated for BFSI Audit</div>
                                        <div className="text-right"><span className="bg-primaryBlue/15 text-primaryBlue border border-primaryBlue/30 text-[10px] px-2 py-0.5 rounded-full font-bold">COMPLETED</span></div>
                                    </div>
                                    <div className="ioc-row py-3 px-5 text-xs grid grid-cols-4 items-center">
                                        <div className="font-mono text-violet font-semibold">EVALUATE</div>
                                        <div className="col-span-2 text-white text-ellipsis overflow-hidden whitespace-nowrap">Evidence File Uploaded: "rbi_compliance_2025.pdf"</div>
                                        <div className="text-right"><span className="bg-primaryBlue/15 text-primaryBlue border border-primaryBlue/30 text-[10px] px-2 py-0.5 rounded-full font-bold">PARSING</span></div>
                                    </div>
                                    <div className="ioc-row py-3 px-5 text-xs grid grid-cols-4 items-center">
                                        <div className="font-mono text-violet font-semibold">ANOMALY</div>
                                        <div className="col-span-2 text-rose-400 font-medium">Control Gap Detected: Clause 4.2 missing in policy</div>
                                        <div className="text-right"><span className="bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">HIGH RISK</span></div>
                                    </div>
                                    <div className="ioc-row py-3 px-5 text-xs grid grid-cols-4 items-center">
                                        <div className="font-mono text-violet font-semibold">DRAFTING</div>
                                        <div className="col-span-2 text-white">AI Observations Auto‑drafted for Module 3</div>
                                        <div className="text-right"><span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">DRAFTED</span></div>
                                    </div>
                                    <div className="ioc-row py-3 px-5 text-xs grid grid-cols-4 items-center">
                                        <div className="font-mono text-violet font-semibold">REPORT</div>
                                        <div className="col-span-2 text-white">Regulator‑Ready PDF compiled and saved</div>
                                        <div className="text-right"><span className="bg-primaryBlue/15 text-primaryBlue border border-primaryBlue/30 text-[10px] px-2 py-0.5 rounded-full font-bold">READY</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Platform overview */}
                        <div className="reveal order-1 md:order-2">
                            <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">Audit AI Platform</div>
                            <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6 leading-tight">
                                Intelligent Audit Automation for Smarter Compliance
                            </h2>
                            <p className="section-body text-slate-700 mb-6 leading-relaxed text-base">
                                The Peopleclick Audit AI Platform brings machine intelligence to the regulatory framework. By monitoring transactions, detecting operational deviations, and drafting documentation, it transitions teams from periodic auditing to real-time compliance operations.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-slate-800">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primaryBlue/10 flex-shrink-0 mt-0.5">
                                        <CheckIcon className="w-4 h-4 text-primaryBlue" />
                                    </span>
                                    <span className="text-sm">Continuous real‑time operational transaction auditing</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-800">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primaryBlue/10 flex-shrink-0 mt-0.5">
                                        <CheckIcon className="w-4 h-4 text-primaryBlue" />
                                    </span>
                                    <span className="text-sm">AI anomaly detection matching global regulatory rules</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-800">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primaryBlue/10 flex-shrink-0 mt-0.5">
                                        <CheckIcon className="w-4 h-4 text-primaryBlue" />
                                    </span>
                                    <span className="text-sm">Instant mapping of internal controls to multiple compliance standards</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECURITY & THREAT INTELLIGENCE (ORGWATCH INTEGRATION) */}
            <section id="threat-intelligence" className="threats py-16 md:py-20 bg-slate-50/50 border-y border-slate-100">
                <div className="container mx-auto px-5">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left side: Threat Capabilities */}
                        <div className="reveal">
                            <div className="section-eyebrow text-primaryBlue font-semibold tracking-widest text-xs uppercase mb-4">Threat Intelligence (Powered by OrgWatch)</div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Attack Surface &amp; Threat Infrastructure Monitoring
                            </h2>
                            <p className="text-slate-700 mb-8 leading-relaxed text-base">
                                Audit compliance doesn't end with paperwork. OrgWatch actively monitors external threat vector assets, brand impersonation, ransomware leak risks, and supply chain exposure, providing a robust shield aligned with the MITRE ATT&amp;CK framework.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-[#D51776]/40 hover:shadow-lg transition-all shadow-sm">
                                    <div className="h-12 w-12 rounded-xl bg-[#D51776]/10 flex items-center justify-center mb-4">
                                        <LockClosedIcon className="w-6 h-6 text-[#D51776]" />
                                    </div>
                                    <h4 className="text-slate-950 font-bold mb-2 text-base">Ransomware Watch</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">Tracks threat groups and scans sector leak feeds continuously.</p>
                                </div>
                                <div className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-primaryBlue/40 hover:shadow-lg transition-all shadow-sm">
                                    <div className="h-12 w-12 rounded-xl bg-primaryBlue/10 flex items-center justify-center mb-4">
                                        <IdentificationIcon className="w-6 h-6 text-primaryBlue" />
                                    </div>
                                    <h4 className="text-slate-950 font-bold mb-2 text-base">Credential Detection</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">Darkweb credential compromise scanning to prevent initial breach access.</p>
                                </div>
                                <div className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-violet/40 hover:shadow-lg transition-all shadow-sm">
                                    <div className="h-12 w-12 rounded-xl bg-violet/10 flex items-center justify-center mb-4">
                                        <GlobeAltIcon className="w-6 h-6 text-violet" />
                                    </div>
                                    <h4 className="text-slate-950 font-bold mb-2 text-base">External ASM</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">Continuous discovery of subdomains, open ports, and vulnerable points.</p>
                                </div>
                                <div className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-[#D51776]/40 hover:shadow-lg transition-all shadow-sm">
                                    <div className="h-12 w-12 rounded-xl bg-[#D51776]/10 flex items-center justify-center mb-4">
                                        <LinkIcon className="w-6 h-6 text-[#D51776]" />
                                    </div>
                                    <h4 className="text-slate-950 font-bold mb-2 text-base">Supply Chain Risks</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">Vendor ecosystem intelligence checking for cascading breach vectors.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right side: NEW — Live Threat Intelligence Dashboard */}
                        <div className="reveal">
                            <div className="threat-feed-panel">
                                {/* Panel titlebar */}
                                <div className="feed-header">
                                    <div className="feed-dot" style={{ background: '#FF5F57', animationDelay: '0s' }}></div>
                                    <div className="feed-dot" style={{ background: '#FFBD2E', animationDelay: '0.4s' }}></div>
                                    <div className="feed-dot" style={{ background: '#28CA41', animationDelay: '0.8s' }}></div>
                                    <span className="ml-3 text-white/80 font-semibold text-sm">OrgWatch · Live Threat Monitor</span>
                                    <span className="ml-auto flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                        LIVE
                                    </span>
                                </div>

                                {/* Scan bar */}
                                <div className="scan-bar"></div>

                                {/* Column headers */}
                                <div className="feed-row" style={{ gridTemplateColumns: '1fr 2fr 1fr', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest">VECTOR</div>
                                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest">THREAT DETAILS</div>
                                    <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest text-right">SEVERITY</div>
                                </div>

                                {/* Feed row 1 */}
                                <div className="feed-row" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(213,23,118,0.15)', border: '1px solid rgba(213,23,118,0.4)' }}>
                                            <LockClosedIcon className="w-5 h-5" style={{ color: '#D51776' }} />
                                        </div>
                                        <span className="text-xs font-bold text-rose-400">RANSOM</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm mb-0.5">LockBit 3.0 affiliate active</div>
                                        <div className="text-white/45 text-xs font-mono">T1486 · Data Encrypted · 3m ago</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(213,23,118,0.2)', color: '#ff6b9d', border: '1px solid rgba(213,23,118,0.5)' }}>CRITICAL</span>
                                    </div>
                                </div>

                                {/* Feed row 2 */}
                                <div className="feed-row" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(145,70,255,0.15)', border: '1px solid rgba(145,70,255,0.4)' }}>
                                            <IdentificationIcon className="w-5 h-5" style={{ color: '#9146FF' }} />
                                        </div>
                                        <span className="text-xs font-bold text-violet">CREDS</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm mb-0.5">Credential leak in darkweb forum</div>
                                        <div className="text-white/45 text-xs font-mono">T1078 · Valid Accounts · 7m ago</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(145,70,255,0.2)', color: '#c084fc', border: '1px solid rgba(145,70,255,0.5)' }}>HIGH</span>
                                    </div>
                                </div>

                                {/* Feed row 3 */}
                                <div className="feed-row" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(61,99,226,0.15)', border: '1px solid rgba(61,99,226,0.4)' }}>
                                            <GlobeAltIcon className="w-5 h-5" style={{ color: '#3d63e2' }} />
                                        </div>
                                        <span className="text-xs font-bold text-blue-400">ASM</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm mb-0.5">7 new exposed subdomains found</div>
                                        <div className="text-white/45 text-xs font-mono">T1595 · Active Scanning · 12m ago</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(61,99,226,0.2)', color: '#93c5fd', border: '1px solid rgba(61,99,226,0.5)' }}>MEDIUM</span>
                                    </div>
                                </div>

                                {/* Feed row 4 */}
                                <div className="feed-row" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)' }}>
                                            <ExclamationTriangleIcon className="w-5 h-5" style={{ color: '#f59e0b' }} />
                                        </div>
                                        <span className="text-xs font-bold text-amber-400">BRAND</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm mb-0.5">Phishing domain mimicking portal</div>
                                        <div className="text-white/45 text-xs font-mono">T1566 · Phishing · 19m ago</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(245,158,11,0.2)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.5)' }}>HIGH</span>
                                    </div>
                                </div>

                                {/* Feed row 5 */}
                                <div className="feed-row" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(213,23,118,0.15)', border: '1px solid rgba(213,23,118,0.4)' }}>
                                            <LinkIcon className="w-5 h-5" style={{ color: '#D51776' }} />
                                        </div>
                                        <span className="text-xs font-bold text-rose-400">SUPPLY</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm mb-0.5">3rd-party vendor breach detected</div>
                                        <div className="text-white/45 text-xs font-mono">T1195 · Supply Chain · 28m ago</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(213,23,118,0.2)', color: '#ff6b9d', border: '1px solid rgba(213,23,118,0.5)' }}>CRITICAL</span>
                                    </div>
                                </div>

                                {/* Footer stats */}
                                <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <div className="text-white font-bold text-xl">247</div>
                                            <div className="text-white/40 text-[11px] uppercase tracking-wider">IOCs Today</div>
                                        </div>
                                        <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
                                        <div className="text-center">
                                            <div className="text-rose-400 font-bold text-xl">12</div>
                                            <div className="text-white/40 text-[11px] uppercase tracking-wider">Critical</div>
                                        </div>
                                        <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
                                        <div className="text-center">
                                            <div className="text-amber-400 font-bold text-xl">38</div>
                                            <div className="text-white/40 text-[11px] uppercase tracking-wider">High</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: 'blink 1.5s ease-in-out infinite' }}></span>
                                        MITRE ATT&CK Mapped
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section id="pricing" className="pricing py-16 md:py-20 bg-white">
                <div className="container mx-auto px-5">
                    <div className="pricing-header text-center reveal max-w-2xl mx-auto mb-12">
                        <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-3">Pricing</div>
                        <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6">Unlimited audits.<br /><em className="italic text-violet">One unbeatable cost.</em></h2>
                        <p className="section-body text-slate-700 text-base leading-relaxed">Simple, predictable pricing that makes the ROI self‑evident.</p>
                    </div>

                    {/* Modern pricing card design */}
                    <div className="pricing-card max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden mt-8 reveal shadow-2xl shadow-slate-200/50 hover:border-violet/60 transition-all duration-550 transform hover:scale-[1.02]">
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet to-primaryBlue"></div>

                        <div className="pricing-tag inline-block bg-gradient-to-r from-violet to-primaryBlue text-white text-xs font-bold uppercase rounded-full px-5 py-2 mb-6 tracking-widest shadow-lg">Annual Access</div>
                        <h3 className="pricing-headline font-display text-2xl text-slate-950 mb-3 font-bold">Unlimited Audits,<br />All Year Long</h3>
                        <p className="pricing-sub text-slate-700 text-sm mb-6 leading-relaxed">No per‑audit fees. No volume caps. No surprises.</p>

                        <div className="pricing-equiv bg-violet-50/50 border border-violet-200 rounded-xl p-5 mb-8">
                            <p className="text-sm text-slate-800 leading-relaxed"><strong>All at the cost of one junior consultant for the year</strong> — while delivering the output capacity of an entire augmented team.</p>
                        </div>
                        <ul className="pricing-features space-y-4 mb-8">
                            {[
                                "Unlimited compliance audit engagements",
                                "All supported regulations and frameworks",
                                "Evidence checklist generation",
                                "AI‑powered evidence evaluation",
                                "Auto‑drafted observations, findings & recommendations",
                                "Regulator‑ready formatted report output",
                                "Human‑in‑the‑loop review workflow",
                                "BFSI sector specialization"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-800 text-sm">
                                    <span className="check bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                                        <CheckIcon className="w-3.5 h-3.5" />
                                    </span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <a href="#contact" className="btn-primary w-full flex justify-center items-center py-4 bg-gradient-to-r from-violet to-primaryBlue text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all tracking-wider text-sm">Request Pricing &amp; Demo →</a>
                    </div>
                </div>
            </section>

            {/* CTA / CONTACT SECTION — Multi-field lead form */}
            <section id="contact" className="cta-section py-16 md:py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
                {/* Decorative gradient blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-violet/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primaryBlue/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />
                <div className="container mx-auto px-5 relative z-10">
                    <div className="text-center reveal max-w-2xl mx-auto mb-12">
                        <div className="section-eyebrow text-violet font-semibold tracking-widest text-xs uppercase mb-4">Get Started</div>
                        <h2 className="section-title text-3xl md:text-4xl font-display text-slate-950 mb-6 leading-tight">Ready to transform how your<br />team delivers <em className="italic text-violet">compliance audits?</em></h2>
                        <p className="cta-desc text-slate-700 mb-2 text-sm md:text-base leading-relaxed">Request a personalised demo and see Audit.AI handle a real audit workflow — end to end.</p>
                    </div>

                    {/* Multi-field lead form */}
                    <div className="reveal max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-200 p-6 md:p-8">
                        <h3 className="text-xl font-display font-bold text-slate-950 mb-2">Request a Demo</h3>
                        <p className="text-sm text-slate-600 mb-8">Fill in your details and our team will be in touch within one business day.</p>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            {/* Row 1: First Name + Last Name */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">First Name <span className="text-violet">*</span></label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="Ananya"
                                        className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-950 text-sm focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Last Name <span className="text-violet">*</span></label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Sharma"
                                        className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-950 text-sm focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Row 2: Work Email + Company */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="workEmail" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Work Email <span className="text-violet">*</span></label>
                                    <input
                                        id="workEmail"
                                        type="email"
                                        placeholder="ananya@company.com"
                                        className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-950 text-sm focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Company <span className="text-violet">*</span></label>
                                    <input
                                        id="company"
                                        type="text"
                                        placeholder="Acme Corp"
                                        className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-950 text-sm focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Row 3: Region + Industry */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="region" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Region</label>
                                    <select
                                        id="region"
                                        className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 text-sm focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/20 outline-none transition-all shadow-sm appearance-none"
                                    >
                                        <option value="">Select region…</option>
                                        <option>India</option>
                                        <option>South Asia</option>
                                        <option>Middle East</option>
                                        <option>Southeast Asia</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="industry" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Industry</label>
                                    <select
                                        id="industry"
                                        className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 text-sm focus:border-primaryBlue focus:ring-2 focus:ring-primaryBlue/20 outline-none transition-all shadow-sm appearance-none"
                                    >
                                        <option value="">Select industry…</option>
                                        <option>Banking</option>
                                        <option>Financial Services</option>
                                        <option>Insurance</option>
                                        <option>Audit Firm / Consultancy</option>
                                        <option>Fintech</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-violet to-primaryBlue text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 hover:scale-[1.01] transition-all tracking-wider text-sm"
                            >
                                Request My Demo →
                            </button>
                            <p className="text-center text-xs text-slate-500">
                                Or explore more at{' '}
                                <a href="https://www.people-click.com" className="text-violet hover:text-slate-800 underline transition-colors">www.people-click.com</a>
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-200 py-10 flex flex-col md:flex-row items-center justify-between px-10 bg-white">
                <div className="footer-brand text-sm text-slate-600 mb-4 md:mb-0">
                    © 2025 Peopleclick Technology Solutions. <a href="https://www.people-click.com" className="text-violet hover:text-slate-800 underline transition-colors">people-click.com</a>
                </div>
                <ul className="footer-links flex flex-wrap gap-6 text-sm">
                    <li><a href="https://www.people-click.com" className="text-slate-600 hover:text-violet transition-colors">Website</a></li>
                    <li><a href="#regulations" className="text-slate-600 hover:text-violet transition-colors">Coverage</a></li>
                    <li><a href="#contact" className="text-slate-600 hover:text-violet transition-colors">Contact</a></li>
                    <li><a href="https://www.people-click.com/privacy" className="text-slate-600 hover:text-violet transition-colors">Privacy</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Audit;
