export interface Project {
  title: string;
  slug: string;
  category: string;
  image: string;
  client: string;
  services: string;
  year: string;
  description: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    title: "Mamaearth – #BeautifulIndeed",
    slug: "mamaearth-beautiful-indeed",
    category: "Production",
    image: "/projects/mamaearth/cover.jpg",
    client: "Mamaearth",
    services: "Video Production, Creative Direction",
    year: "2024",
    description:
      "A culturally resonant production-led campaign celebrating real beauty stories across digital platforms.",
    gallery: [
      "/projects/mamaearth/1.jpg",
      "/projects/mamaearth/2.jpg",
      "/projects/mamaearth/3.jpg",
    ],
  },
  {
    title: "Nestaway – Brand Films",
    slug: "nestaway-brand-films",
    category: "Production",
    image: "/projects/nestaway/cover.jpg",
    client: "Nestaway",
    services: "Campaign Films, Social Media",
    year: "2023",
    description:
      "High-impact brand films designed for performance-driven social platforms.",
    gallery: [
      "/projects/nestaway/1.jpg",
      "/projects/nestaway/2.jpg",
    ],
  },
];

