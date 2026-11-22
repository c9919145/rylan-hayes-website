import { streamingLinksFor } from "./site";

export type CoverArt = "neon" | "dust" | "long-way" | "backroad" | "whiskey" | "carolina";

export type ReleaseType = "Album" | "EP" | "Single";

export interface Track {
  number: number;
  title: string;
  duration: string;
}

export interface Release {
  slug: string;
  title: string;
  year: number;
  type: ReleaseType;
  art: CoverArt;
  description: string;
  tracks?: Track[];
  duration?: string;
  featured?: boolean;
  links: ReturnType<typeof streamingLinksFor>;
}

export const featuredAlbum = {
  slug: "neon-porch-lights",
  title: "Neon Porch Lights",
  year: 2026,
  type: "Album" as const,
  art: "neon" as const,
  description:
    "Twelve songs about the people, places and late-night conversations that make a life. Recorded live to tape in East Nashville, Neon Porch Lights is the most personal record Rylan Hayes has made yet.",
  releaseDate: "October 16, 2026",
  duration: "43 min",
  tracks: [
    { number: 1, title: "Neon Porch Lights", duration: "3:42" },
    { number: 2, title: "Whiskey Weather", duration: "3:18" },
    { number: 3, title: "County Line", duration: "3:51" },
    { number: 4, title: "Half Past Heaven", duration: "4:06" },
    { number: 5, title: "Carolina Blue", duration: "3:27" },
    { number: 6, title: "18 Wheels", duration: "3:36" },
    { number: 7, title: "Damn Good Dog", duration: "3:04" },
    { number: 8, title: "The Last Dance", duration: "3:58" },
    { number: 9, title: "Wildflower Smoke", duration: "3:44" },
    { number: 10, title: "Hometown Hymn", duration: "4:12" },
    { number: 11, title: "Long Way Back", duration: "3:49" },
    { number: 12, title: "Porch Light Reprise", duration: "2:55" },
  ],
  links: streamingLinksFor("Neon Porch Lights"),
};

export const releases: Release[] = [
  {
    ...featuredAlbum,
    featured: true,
    links: streamingLinksFor("Neon Porch Lights"),
  },
  {
    slug: "dust-and-diamonds",
    title: "Dust & Diamonds",
    year: 2024,
    type: "Album",
    art: "dust",
    description:
      "A wide-open record built for long drives and late nights. Featuring the No. 1 hit \"Whiskey Weather.\"",
    duration: "38 min",
    links: streamingLinksFor("Dust & Diamonds"),
  },
  {
    slug: "long-way-home",
    title: "Long Way Home",
    year: 2022,
    type: "Album",
    art: "long-way",
    description:
      "The sophomore album that took Rylan from honky-tonks to sold-out theaters — and earned his first ACM Award.",
    duration: "36 min",
    links: streamingLinksFor("Long Way Home"),
  },
  {
    slug: "backroad-gospel",
    title: "Backroad Gospel",
    year: 2020,
    type: "Album",
    art: "backroad",
    description:
      "The debut that started it all. Ten songs written between shifts, recorded in a converted garage outside Dalton.",
    duration: "34 min",
    links: streamingLinksFor("Backroad Gospel"),
  },
  {
    slug: "whiskey-weather",
    title: "Whiskey Weather",
    year: 2024,
    type: "Single",
    art: "whiskey",
    description:
      "The three-week No. 1 that became the defining song of the Dust & Diamonds era.",
    duration: "3:18",
    links: streamingLinksFor("Whiskey Weather"),
  },
  {
    slug: "carolina-blue",
    title: "Carolina Blue",
    year: 2026,
    type: "Single",
    art: "carolina",
    description:
      "A love letter to the coast, recorded in one take with a single microphone and a room full of friends.",
    duration: "3:27",
    links: streamingLinksFor("Carolina Blue"),
  },
];

export const albums = releases.filter((release) => release.type === "Album");
export const singles = releases.filter((release) => release.type === "Single");
