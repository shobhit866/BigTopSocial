"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./sidebar.css";

export default function SidebarNav() {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState({
    marketing: true,
    creative: true,
    solutions: false,
    company: false,
  });

  const toggleSection = (key: string) =>
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Close on ESC key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* MENU TOGGLE (HAMBURGER ONLY) */}
      {!open && (
  <button
    className="menu-toggle"
    aria-label="Open menu"
    aria-expanded={open}
    onClick={() => setOpen(true)}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  </button>
)}


      {/* OVERLAY — CLICK OUTSIDE TO CLOSE */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
<h2 className="heading-h3">
  BIGTOP<span className="heading-highlight">SOCIAL</span>
</h2>

          
        </div>

        <nav className="sidebar-nav">
                <Section
            title="Company"
            open={sections.company}
            onToggle={() => toggleSection("company")}
          >
       
            <Link href="/ourteam" onClick={() => setOpen(false)}>
              Our Team
            </Link>
            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link href="/contactus" onClick={() => setOpen(false)}>
              Connect
            </Link>
          </Section>
        
          <Section
            title="Creative Studio"
            open={sections.creative}
            onToggle={() => toggleSection("creative")}
          >
            <Link href="/content-creation" onClick={() => setOpen(false)}>
              Content Creation
            </Link>
            <Link href="/reels" onClick={() => setOpen(false)}>
              Video & Reels
            </Link>
            <Link href="/work" onClick={() => setOpen(false)}>
              Design & Creatives
            </Link>
          </Section>

          <Section
            title="Solutions"
            open={sections.solutions}
            onToggle={() => toggleSection("solutions")}
          >
            <Link href="/web-development" onClick={() => setOpen(false)}>
              Web Development
            </Link>
            <Link href="/landing-pages" onClick={() => setOpen(false)}>
              Landing Pages
            </Link>
            <Link href="/automation" onClick={() => setOpen(false)}>
              Marketing Automation
            </Link>
          </Section>

            <Section
            title="Marketing"
            open={sections.marketing}
            onToggle={() => toggleSection("marketing")}
          >
            <Link href="/social-media-marketing" onClick={() => setOpen(false)}>
              Social Media Marketing
            </Link>
            <Link href="/performance-marketing" onClick={() => setOpen(false)}>
              Performance Ads
            </Link>
            <Link href="/brand-strategy" onClick={() => setOpen(false)}>
              Brand Strategy
            </Link>
          </Section>


    
        </nav>
      </aside>
    </>
  );
}

/* ---------- Section Component ---------- */

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="sidebar-section">
      <button className="section-title" onClick={onToggle}>
        {title}
        <span className={`arrow ${open ? "open" : ""}`}>▸</span>
      </button>
      {open && <div className="section-links">{children}</div>}
    </div>
  );
}
