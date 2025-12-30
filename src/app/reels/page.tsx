"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./reels.module.css";

const AUTO_SCROLL_DELAY = 10000; // 10 seconds

interface Reel {
  id: number;
  src: string;
  title: string;
  featured?: boolean;
}

interface ReelStudioProps {
  reels?: Reel[];
  logos?: string[];
}

const defaultReels: Reel[] = [
  { id: 1, src: "/videos/INTRO.mp4", title: "Brand Blueprint" },
  { id: 2, src: "/videos/Banner-Video.mp4", title: "Culture & Trends", featured: true },
  { id: 3, src: "/videos/AQMiwJ-Ymtk2pYmyN-95umk16enFXpWVaFNdBgtWHA5pLmPGuB5pSSHfgYquQw823U-4-NwV7dasJOtlJPxG_Dp2UrVmNqOv.mp4", title: "Content Creation" },
  { id: 4, src: "/videos/INTRO.mp4", title: "Community Building" },
  { id: 5, src: "/videos/Banner-Video.mp4", title: "Creator Partnerships" },
  { id: 6, src: "/videos/INTRO.mp4", title: "Paid Performance" },
];

const defaultLogos: string[] = ["3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"];

export default function ReelStudio({
  reels = defaultReels,
  logos = defaultLogos,
}: ReelStudioProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = carouselRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < max - 5);
  };

  const scrollBySlide = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;

    const slide = el.querySelector(`.${styles.card}`) as HTMLElement;
    if (!slide) return;

    const gap = 16;
    const amount = slide.offsetWidth + gap;
    const max = el.scrollWidth - el.clientWidth;

    let target =
      el.scrollLeft + (direction === "right" ? amount : -amount);

    target = Math.max(0, Math.min(target, max));

    el.scrollTo({ left: target, behavior: "smooth" });

    setTimeout(updateScrollButtons, 250);
    restartAutoScroll();
  };

  const clearAutoScroll = () => {
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = null;
    }
  };

  const restartAutoScroll = () => {
    clearAutoScroll();
    autoScrollTimeout.current = setTimeout(() => {
      const el = carouselRef.current;
      if (!el) return;

      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollBySlide("right");
      }
    }, AUTO_SCROLL_DELAY);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollButtons();
    restartAutoScroll();

    el.addEventListener("scroll", updateScrollButtons, { passive: true });

    return () => {
      clearAutoScroll();
      el.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  return (
    <main className={styles.studioMain}>
  <h1 className={styles.headingh1}>
  WHAT WE CAN CREATE <span className={styles.highlight}>TOGETHER</span>
</h1>
      {/* Reel Carousel */}
       <section className={styles.wrapper}>
        <div className={styles.track}>
          {/* IMPORTANT: duplicate reels for seamless infinite loop */}
          <div className={styles.trackInner}>
            {[...reels, ...reels].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className={styles.card}
                whileHover={{ scale: 1.05 }}
              >
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.video}
                />
                <div className={styles.overlay}>
                  <h3>{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className={styles.logos}>
        <h3>Trusted by leading brands</h3>
        <div className={styles.logoGrid}>
          {logos.map((logo, index) => (
            <div key={index} className={styles.logoBox}>
              <img
                src={`/clientlogo/${logo}`}
                alt="Client logo"
                loading="lazy"
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className={styles.services}>
        <Service
          title="TikTok Brand Blueprint"
          subtitle="Find Your Authentic Voice"
          button="Find Your Voice"
        />

        <Service
          title="Culture & Trends"
          subtitle="Cultural Moments, Your Way"
          button="Get Started"
          reverse
        />

        <Service
          title="Content Creation"
          subtitle="Scroll-Stopping Content That Converts"
          button="Start Creating"
        />
      </section>
    </main>
  );
}

/* ---------- Helper Component ---------- */

function Service({
  title,
  subtitle,
  button,
  reverse = false,
}: {
  title: string;
  subtitle: string;
  button: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`${styles.serviceItem} ${
        reverse ? styles.serviceReverse : ""
      }`}
    >
      <div className={styles.serviceContent}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>
          We craft platform-native, high-performing TikTok strategies designed
          to engage, convert, and scale your brand presence authentically.
        </p>
        <button className={styles.ctaBtn}>{button}</button>
      </div>

      <div className={styles.serviceMedia}>
        <video
          src="/videos/AQMiwJ-Ymtk2pYmyN-95umk16enFXpWVaFNdBgtWHA5pLmPGuB5pSSHfgYquQw823U-4-NwV7dasJOtlJPxG_Dp2UrVmNqOv.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}
