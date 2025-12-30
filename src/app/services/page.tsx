"use client";

import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import "./services.module.css";

export default function ServicesPage() {
  const [active, setActive] = useState<string | null>(null);

  const services = [
    {
      title: "Search Engine Optimization",
      image: "/Gemini_Generated_Image_i5jvkwi5jvkwi5jv.png"
    },
    {
      title: "Web Development",
      image: "/Gemini_Generated_Image_961hir961hir961h.png"
    },
    {
      title: "Influencer Marketing",
      image: "/Gemini_Generated_Image_m1sgntm1sgntm1sg.png"
    },
    {
      title: "Photography & Videography",
      image: "/Gemini_Generated_Image_a4h6cra4h6cra4h6.png"
    },
    {
      title: "Performance Marketing",
      image: "/Gemini_Generated_Image_c99sj4c99sj4c99s.png"
    },
    {
      title: "Social Media Marketing",
      image: "/Gemini_Generated_Image_dbamktdbamktdbam.png"
    }
  ];

  return (
    <>
         <h3 className="services-h1">
          Our Core<br />Services
        </h3>
    <main className="services-page">
        <ScrollStack>
          {services.map((s) => (
            <ScrollStackItem
              key={s.title}
              onClick={() => setActive(s.title)}
            >
              <div className="stack-card-image">
                <img src={s.image} alt={s.title} />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
     
    </main>
    </>
  );
}
