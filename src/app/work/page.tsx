"use client";

import "./work.css";
import Link from "next/link";
import { useState } from "react";

const filters = [
  "ALL",
  "BRANDING",
  "CASE STUDIES",
  "CREATIVE HUB",
  "PERFORMANCE MARKETING",
  "PRODUCTION",
  "UI/UX",
];

const projects = [
  {
    title: "One Scan Can Save A Life",
    category: "CASE STUDIES",
    image: "/projects/manipal-1.jpg",
    bg: "#E3124C",
    slug: "one-scan-can-save-a-life",
  },
  {
    title: "Make A Heart Promise",
    category: "CASE STUDIES",
    image: "/projects/manipal-2.jpg",
    bg: "#120A7A",
    slug: "make-a-heart-promise",
  },
  {
    title: "Miniklub Furniture",
    category: "BRANDING",
    image: "/projects/miniklub.jpg",
    bg: "#5AC7C0",
    slug: "miniklub-branding",
  },
  {
    title: "Titan UI/UX System",
    category: "UI/UX",
    image: "/projects/titan.jpg",
    bg: "#63A87D",
    slug: "titan-uiux",
  },

];

export default function ProjectsPage() {
  const [active, setActive] = useState("ALL");

  const visible =
    active === "ALL"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <main className="projects-page">
            {/* FILTER */}
      <section className="projects-filter">
        <div className="filter-inner">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`filter-btn ${
                active === f ? "active" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>
      {/* HERO */}
      <section className="projects-hero">
        <h1>
          Our Brand
          <br />
          Raids
        </h1>

        <p>
BigTop Social: Where Social Media Magic Happens Under the Big Top
At BigTop Social, we don't just juggle posts—we orchestrate digital spectacles that captivate audiences and drive results. Picture our team as ringmasters of the social circus, spinning viral campaigns and ROI tricks that leave clients cheering. Client satisfaction is our center ring act; we chase nothing less than creative brilliance, blending strategy, creativity, and data-driven wizardry to elevate your brand's presence.
        </p>
      </section>

  

      {/* GRID */}
      <section className="projects-grid">
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="project-card"
            style={{ backgroundColor: p.bg }}
          >
            <div className="project-bg">
              <img src={p.image} alt={p.title} />
            </div>

            <div className="project-overlay" />

            <div className="project-info">
              <div className="project-category">{p.category}</div>
              <div className="project-title">{p.title}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
