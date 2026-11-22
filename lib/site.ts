export const site = {
  name: "Rylan Hayes",
  displayName: "RYLAN HAYES",
  tagline: "Country music, straight from the heart.",
  description:
    "The official home of country artist Rylan Hayes — new album Neon Porch Lights, 2027 tour dates, music, videos, merchandise and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rylanhayes.com",
  email: "hello@rylanhayes.com",
  bookingEmail: "booking@rylanhayes.com",
  pressEmail: "press@rylanhayes.com",
  location: "Nashville, Tennessee",
  copyrightYear: 2026,
  announcement: {
    label: "New album",
    text: "Neon Porch Lights is out now",
    href: "/music",
    cta: "Listen",
  },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Tour", href: "/tour" },
  { label: "Music", href: "/music" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
  { label: "Sign Up", href: "/sign-up" },
  { label: "Store", href: "/store" },
] as const;

export const socials = [
  {
    label: "Instagram",
    handle: "@rylanhayes",
    href: "https://www.instagram.com/explore/search/keyword/?q=rylanhayes",
    icon: "instagram",
  },
  {
    label: "TikTok",
    handle: "@rylanhayes",
    href: "https://www.tiktok.com/search?q=rylanhayes",
    icon: "tiktok",
  },
  {
    label: "YouTube",
    handle: "Rylan Hayes",
    href: "https://www.youtube.com/results?search_query=rylan+hayes+country",
    icon: "youtube",
  },
  {
    label: "Facebook",
    handle: "Rylan Hayes Music",
    href: "https://www.facebook.com/search/top?q=rylan%20hayes%20music",
    icon: "facebook",
  },
  {
    label: "X",
    handle: "@rylanhayes",
    href: "https://twitter.com/search?q=rylan%20hayes",
    icon: "x",
  },
] as const;

export type SocialIcon = (typeof socials)[number]["icon"];

const spotifySearch = (term: string) =>
  `https://open.spotify.com/search/${encodeURIComponent(term)}`;
const appleSearch = (term: string) =>
  `https://music.apple.com/us/search?term=${encodeURIComponent(term)}`;
const amazonSearch = (term: string) =>
  `https://music.amazon.com/search/?filter=IsLibrary%3Dfalse&keywords=${encodeURIComponent(term)}`;
const youtubeSearch = (term: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(term)}`;

export const streaming = [
  {
    label: "Spotify",
    href: spotifySearch("Rylan Hayes"),
    icon: "spotify",
  },
  {
    label: "Apple Music",
    href: appleSearch("Rylan Hayes"),
    icon: "apple",
  },
  {
    label: "Amazon Music",
    href: amazonSearch("Rylan Hayes"),
    icon: "amazon",
  },
  {
    label: "YouTube",
    href: youtubeSearch("Rylan Hayes"),
    icon: "youtube",
  },
] as const;

export const streamingLinksFor = (title: string) => ({
  spotify: spotifySearch(`Rylan Hayes ${title}`),
  apple: appleSearch(`Rylan Hayes ${title}`),
  amazon: amazonSearch(`Rylan Hayes ${title}`),
  youtube: youtubeSearch(`Rylan Hayes ${title}`),
});

export const ticketSearchUrl = (query: string) =>
  `https://www.ticketmaster.com/search?q=${encodeURIComponent(query)}`;

export const youtubeSearchUrl = (query: string) =>
  youtubeSearch(query);

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact", href: "/contact" },
] as const;
