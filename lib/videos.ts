export type VideoCategory = "Music Video" | "Visualizer" | "Live Session";

export interface Video {
  slug: string;
  title: string;
  category: VideoCategory;
  year: number;
  duration: string;
  youtubeId: string;
  thumbnail: string;
  description: string;
  featured?: boolean;
}

/**
 * Demo video content. The YouTube IDs below are public, embeddable scenic /
 * acoustic visualizers used as placeholders. Swap them for the artist's own
 * official videos in this single file.
 */
export const videos: Video[] = [
  {
    slug: "neon-porch-lights",
    title: "Neon Porch Lights",
    category: "Visualizer",
    year: 2026,
    duration: "3:42",
    youtubeId: "IoTPmatDACc",
    thumbnail: "/videos/neon-porch-lights.webp",
    description:
      "The title track, shot along the coast at last light. A quiet meditation on the places that call us home.",
    featured: true,
  },
  {
    slug: "whiskey-weather",
    title: "Whiskey Weather",
    category: "Visualizer",
    year: 2026,
    duration: "3:18",
    youtubeId: "2OCN2gEZC9A",
    thumbnail: "/videos/whiskey-weather.webp",
    description:
      "Golden hour over the high country — the visual companion to the album's second single.",
  },
  {
    slug: "county-line",
    title: "County Line",
    category: "Live Session",
    year: 2026,
    duration: "3:51",
    youtubeId: "815ai6HEnQ4",
    thumbnail: "/videos/county-line.webp",
    description:
      "Recorded live on the front porch with an acoustic guitar, a single microphone and no second takes.",
  },
  {
    slug: "carolina-blue",
    title: "Carolina Blue",
    category: "Music Video",
    year: 2026,
    duration: "3:27",
    youtubeId: "9pknMyELRXg",
    thumbnail: "/videos/carolina-blue.webp",
    description:
      "A sun-soaked drive through the fields and backroads that inspired the song.",
  },
  {
    slug: "long-way-back",
    title: "Long Way Back",
    category: "Live Session",
    year: 2025,
    duration: "3:49",
    youtubeId: "yCl2vqwyfJY",
    thumbnail: "/videos/long-way-back.webp",
    description:
      "An intimate sunset session from the Long Way Home tour, captured on the road.",
  },
  {
    slug: "dust-and-diamonds",
    title: "Dust & Diamonds",
    category: "Music Video",
    year: 2024,
    duration: "3:58",
    youtubeId: "OnrbjIA1bg4",
    thumbnail: "/videos/dust-and-diamonds.webp",
    description:
      "The cinematic visual for the Dust & Diamonds title track, filmed across the American West.",
  },
];

export const featuredVideo = videos.find((video) => video.featured) ?? videos[0];

export const videoCategories: Array<"All" | VideoCategory> = [
  "All",
  "Music Video",
  "Visualizer",
  "Live Session",
];
