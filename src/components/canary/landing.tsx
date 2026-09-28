"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { brand } from "@/data/brand";
import { CanaryContactForm } from "./contact-form";

const services = [
  ["01", "Grounded AI assistants", "Give customers useful answers drawn from your approved website, documents, policies, and knowledge base — with sources when they matter."],
  ["02", "Internal knowledge", "Turn scattered operating knowledge into one clear, searchable assistant for your team."],
  ["03", "Connected workflows", "Link the assistant to the business tools you already use, with thoughtful approval steps and human handoffs."],
  ["04", "Lead intelligence", "Capture intent, ask the right follow-up questions, and route a better brief to the right person."],
  ["05", "Web & discovery", "Improve the path from search to conversation with focused website work and practical SEO support."],
];

const steps = ["Discover", "Map data", "Design the flow", "Build", "Test together", "Launch & improve"];

export function CanaryLanding() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="canary-site">
      <header className="canary-nav">
        <a className="brand-lockup" href="#top" aria-label={`${brand.name} home`}>
          <Image src="/canary/logo.png" width={48} height={48} alt="" priority />
          <span>{brand.name}</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#capabilities">Capabilities</a><a href="#system">The system</a><a href="#process">Process</a><Link href="/news">AI News</Link>
        </nav>
        <a className="nav-cta" href="#contact">Start a conversation <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu">{menu ? <X /> : <Menu />}</button>
        {menu && <div className="mobile-menu"><a onClick={() => setMenu(false)} href="#capabilities">Capabilities</a><a onClick={() => setMenu(false)} href="#system">The system</a><a onClick={() => setMenu(false)} href="#process">Process</a><Link onClick={() => setMenu(false)} href="/news">AI News</Link><a onClick={() => setMenu(false)} href="#contact">Start a conversation</a></div>}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-art" aria-hidden="true"><Image src="/canary/canary-hero.png" alt="" fill priority sizes="100vw" /></div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="overline"><span /> AI SYSTEMS FOR GROWING BUSINESSES</p>
            <h1>Your business<br />already knows<br /><em>the answer.</em></h1>
            <p className="hero-lede">We turn your company knowledge into useful AI assistants and connected workflows — so people get grounded answers and work keeps moving.</p>
            <div className="hero-actions"><a className="signal-button" href="#contact"><span>Discuss your AI workflow</span><b>↗</b></a><a className="quiet-link" href="#capabilities">Explore what we build <ArrowDown size={16} /></a></div>
          </div>
          <div className="hero-status"><span className="pulse" /><p><b>SYSTEMS, NOT STUNTS</b>Designed around your data, your tools, and the people who use them.</p></div>
          <div className="hero-index">CANARY / 001<br /><span>TORONTO · REMOTE</span></div>
        </section>

        <section className="manifesto reveal-section">
          <p className="section-kicker">THE SIGNAL</p>
          <h2>AI should know your business.<br /><span>Not make things up about it.</span></h2>
          <div className="manifesto-body"><p>Generic AI can sound confident. Useful business AI needs context: the right source material, sensible boundaries, clear actions, and a path to a human when needed.</p><p>That is what we build — grounded systems shaped around the way your business actually works.</p></div>
        </section>

        <section id="system" className="system-section reveal-section">
          <div className="section-top"><p className="section-kicker">HOW VALUE MOVES</p><span>FROM KNOWLEDGE → ACTION</span></div>
          <div className="system-map">
            <svg className="flow-lines" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true"><path d="M120 150 C310 150 260 260 475 260 S700 145 870 250 S1010 355 1110 355"/><path d="M120 370 C290 370 300 260 475 260"/><circle cx="475" cy="260" r="6"/></svg>
            <article className="node node-source"><small>01 / INPUT</small><h3>Your knowledge</h3><ul><li>Website & FAQs</li><li>Documents & policies</li><li>Approved business data</li></ul></article>
            <div className="core-node"><div className="core-orbit"/><span>GROUNDED<br/>AI CORE</span><small>RETRIEVE · REASON · CITE</small></div>
            <article className="node node-tools"><small>03 / CONNECT</small><h3>Your tools</h3><ul><li>CRM & inbox</li><li>Calendar & forms</li><li>Human review</li></ul></article>
            <article className="node node-result"><small>04 / OUTCOME</small><h3>Useful action</h3><p>Answer a question. Qualify a lead. Prepare the next step.</p></article>
          </div>
        </section>

        <section id="capabilities" className="capabilities reveal-section">
          <div className="section-top"><div><p className="section-kicker">WHAT WE BUILD</p><h2>One intelligent layer.<br />Many practical uses.</h2></div><p>Start with a costly question, a repetitive handoff, or knowledge that is too hard to find. We’ll help shape the right system around it.</p></div>
          <div className="service-stack">{services.map(([n,t,d]) => <article className="service-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><b>↗</b></article>)}</div>
        </section>

        <section className="demo-section reveal-section">
          <div className="demo-copy"><p className="section-kicker">A GROUNDED ANSWER</p><h2>Helpful on the front.<br />Traceable underneath.</h2><p>A useful assistant can answer in plain English, show where the answer came from, collect missing context, and hand off cleanly when judgment is required.</p><div className="demo-points"><span><Check size={15}/> Answers from approved sources</span><span><Check size={15}/> Clear human handoffs</span><span><Check size={15}/> Built for ongoing improvement</span></div></div>
          <div className="chat-demo">
            <div className="chat-head"><div><Image src="/canary/logo.png" width={32} height={32} alt=""/><span>Canary assistant<small>Grounded in your knowledge</small></span></div><span className="online">ONLINE</span></div>
            <div className="chat-body"><div className="message user">Can you install the system without replacing our current CRM?</div><div className="message bot"><span>C</span><div><p>Yes. The assistant can sit alongside your current tools. We would first map the CRM’s available integrations, the data it should access, and which actions need team approval.</p><div className="source-chip">↳ Implementation guide · Integration scope</div></div></div></div>
            <div className="chat-compose">Ask a question… <button aria-label="Send sample message">↑</button></div>
          </div>
        </section>

        <section id="process" className="process-section reveal-section"><div className="section-top"><div><p className="section-kicker">A CLEAR BUILD PATH</p><h2>From first question<br />to working system.</h2></div><p>No mystery box. Each stage turns assumptions into something your team can review, test, and improve.</p></div><div className="process-grid">{steps.map((step,i)=><article key={step}><span>0{i+1}</span><div className="step-dot"/><h3>{step}</h3><p>{["Choose a real workflow and define what success should look like.","Review sources, permissions, tools, and the points where people step in.","Shape the conversation, actions, safeguards, and handoffs.","Create the assistant and connect only what the use case needs.","Test answers, edge cases, citations, and failure paths with your team.","Release carefully, observe real use, and improve what matters."][i]}</p></article>)}</div></section>

        <section className="use-cases reveal-section"><p className="section-kicker">BUILT FOR REAL WORK</p><h2>Where could your team<br />use a sharper signal?</h2><div className="ticker"><span>HOME SERVICES</span><i>✦</i><span>PROFESSIONAL FIRMS</span><i>✦</i><span>CLINICS</span><i>✦</i><span>EDUCATION</span><i>✦</i><span>LOCAL RETAIL</span></div><div className="case-grid"><article><small>ANSWER</small><h3>“Which service fits my situation?”</h3><p>Guide a visitor using your actual service rules, then pass a concise brief to your team.</p></article><article><small>FIND</small><h3>“What is our process for this?”</h3><p>Help staff search approved manuals, policies, and internal guidance without digging through folders.</p></article><article><small>ACT</small><h3>“Can we move this forward?”</h3><p>Collect the missing details, prepare the next action, and ask for approval before anything sensitive happens.</p></article></div></section>

        <section id="faq" className="faq-section reveal-section"><div><p className="section-kicker">FAQ</p><h2>Good questions,<br />plain answers.</h2></div><div className="faq-list">{[
          ["What can the assistant learn from?","Approved website pages, documents, FAQs, product or service information, policies, and structured business data. We scope sources and permissions before building."],
          ["Can it connect to our existing apps?","Often, yes. The exact options depend on each tool’s API and your account access. We map the useful connections and keep human approval where it belongs."],
          ["Does AI replace human review?","Not where judgment, safety, or accountability matters. We design explicit handoffs and approval steps instead of pretending every task should be autonomous."],
          ["What happens after launch?","We can review real usage, improve source coverage, refine prompts and workflows, and help keep the system aligned as your business changes."],
          ["How do you scope a project?","We start with one practical workflow, the people involved, the source data, the desired outcome, and the edge cases. That creates a clear first build rather than a vague AI initiative."],
        ].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

        <section id="contact" className="contact-section reveal-section"><div className="contact-intro"><p className="section-kicker">START WITH THE BOTTLENECK</p><h2>Tell us where work<br />gets <em>stuck.</em></h2><p>You don’t need an AI specification. Bring the repeated question, slow handoff, or scattered knowledge. We’ll help you find the useful first move.</p><a href={`mailto:${brand.email}`}>{brand.email} <ArrowUpRight size={16}/></a></div><CanaryContactForm/></section>
      </main>
      <footer className="canary-footer"><div className="footer-brand"><Image src="/canary/logo.png" width={56} height={56} alt=""/><span>{brand.name}</span></div><p>AI systems that connect knowledge, tools, and people.</p><div><a href="#capabilities">Capabilities</a><Link href="/news">AI News</Link><Link href="/privacy">Privacy</Link></div><small>© {new Date().getFullYear()} {brand.name}. Brand spelling pending final confirmation.</small></footer>
    </div>
  );
}
