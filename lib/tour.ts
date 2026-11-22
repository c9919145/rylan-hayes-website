import { ticketSearchUrl } from "./site";

export type TourStatus = "on-sale" | "low" | "sold-out";

export interface TourDate {
  id: string;
  date: string;
  city: string;
  region: string;
  venue: string;
  status: TourStatus;
  note?: string;
}

export const tourDates: TourDate[] = [
  {
    id: "2027-01-23-nashville",
    date: "2027-01-23",
    city: "Nashville",
    region: "TN",
    venue: "Ryman Auditorium",
    status: "low",
    note: "Neon Porch Lights Tour opener",
  },
  {
    id: "2027-02-06-atlanta",
    date: "2027-02-06",
    city: "Atlanta",
    region: "GA",
    venue: "Fox Theatre",
    status: "on-sale",
  },
  {
    id: "2027-02-13-charlotte",
    date: "2027-02-13",
    city: "Charlotte",
    region: "NC",
    venue: "Ovens Auditorium",
    status: "on-sale",
  },
  {
    id: "2027-02-20-birmingham",
    date: "2027-02-20",
    city: "Birmingham",
    region: "AL",
    venue: "BJCC Concert Hall",
    status: "on-sale",
  },
  {
    id: "2027-03-05-dallas",
    date: "2027-03-05",
    city: "Dallas",
    region: "TX",
    venue: "The Pavilion at Toyota Music Factory",
    status: "low",
  },
  {
    id: "2027-03-06-houston",
    date: "2027-03-06",
    city: "Houston",
    region: "TX",
    venue: "713 Music Hall",
    status: "on-sale",
  },
  {
    id: "2027-03-19-morrison",
    date: "2027-03-19",
    city: "Morrison",
    region: "CO",
    venue: "Red Rocks Amphitheatre",
    status: "on-sale",
    note: "Special guest: The Wilder Sons",
  },
  {
    id: "2027-04-02-phoenix",
    date: "2027-04-02",
    city: "Phoenix",
    region: "AZ",
    venue: "Arizona Financial Theatre",
    status: "on-sale",
  },
  {
    id: "2027-04-09-los-angeles",
    date: "2027-04-09",
    city: "Los Angeles",
    region: "CA",
    venue: "The Wiltern",
    status: "low",
  },
  {
    id: "2027-04-16-san-francisco",
    date: "2027-04-16",
    city: "San Francisco",
    region: "CA",
    venue: "The Masonic",
    status: "on-sale",
  },
  {
    id: "2027-04-30-chicago",
    date: "2027-04-30",
    city: "Chicago",
    region: "IL",
    venue: "Aragon Ballroom",
    status: "on-sale",
  },
  {
    id: "2027-05-07-detroit",
    date: "2027-05-07",
    city: "Detroit",
    region: "MI",
    venue: "Fox Theatre",
    status: "on-sale",
  },
  {
    id: "2027-05-14-cleveland",
    date: "2027-05-14",
    city: "Cleveland",
    region: "OH",
    venue: "Agora Theatre",
    status: "on-sale",
  },
  {
    id: "2027-05-21-boston",
    date: "2027-05-21",
    city: "Boston",
    region: "MA",
    venue: "MGM Music Hall at Fenway",
    status: "on-sale",
  },
  {
    id: "2027-06-04-new-york",
    date: "2027-06-04",
    city: "New York",
    region: "NY",
    venue: "Radio City Music Hall",
    status: "low",
    note: "Second night added by demand",
  },
  {
    id: "2027-06-11-philadelphia",
    date: "2027-06-11",
    city: "Philadelphia",
    region: "PA",
    venue: "The Met Philadelphia",
    status: "on-sale",
  },
  {
    id: "2027-06-18-raleigh",
    date: "2027-06-18",
    city: "Raleigh",
    region: "NC",
    venue: "Red Hat Amphitheater",
    status: "on-sale",
  },
  {
    id: "2027-07-17-cheyenne",
    date: "2027-07-17",
    city: "Cheyenne",
    region: "WY",
    venue: "Cheyenne Frontier Days",
    status: "on-sale",
    note: "Festival appearance",
  },
  {
    id: "2027-08-07-portland",
    date: "2027-08-07",
    city: "Portland",
    region: "OR",
    venue: "Theater of the Clouds",
    status: "on-sale",
  },
  {
    id: "2027-08-14-seattle",
    date: "2027-08-14",
    city: "Seattle",
    region: "WA",
    venue: "WaMu Theater",
    status: "on-sale",
  },
  {
    id: "2027-08-28-nashville-finale",
    date: "2027-08-28",
    city: "Nashville",
    region: "TN",
    venue: "Bridgestone Arena",
    status: "low",
    note: "Tour finale",
  },
];

export const pastTourDates: TourDate[] = [
  {
    id: "2026-10-17-nashville",
    date: "2026-10-17",
    city: "Nashville",
    region: "TN",
    venue: "Ascend Amphitheater",
    status: "sold-out",
    note: "Album release show",
  },
  {
    id: "2026-09-12-red-rocks",
    date: "2026-09-12",
    city: "Morrison",
    region: "CO",
    venue: "Red Rocks Amphitheatre",
    status: "sold-out",
  },
  {
    id: "2026-08-22-chicago",
    date: "2026-08-22",
    city: "Chicago",
    region: "IL",
    venue: "Huntington Bank Pavilion",
    status: "sold-out",
  },
  {
    id: "2026-07-18-cheyenne",
    date: "2026-07-18",
    city: "Cheyenne",
    region: "WY",
    venue: "Cheyenne Frontier Days",
    status: "sold-out",
  },
  {
    id: "2026-06-06-nashville",
    date: "2026-06-06",
    city: "Nashville",
    region: "TN",
    venue: "CMA Fest — Nissan Stadium",
    status: "sold-out",
  },
  {
    id: "2026-04-25-indio",
    date: "2026-04-25",
    city: "Indio",
    region: "CA",
    venue: "Stagecoach Festival",
    status: "sold-out",
  },
];

export const ticketUrlFor = (show: TourDate) =>
  ticketSearchUrl(`Rylan Hayes ${show.venue} ${show.city} ${show.region}`);

export const monthKey = (isoDate: string) => isoDate.slice(0, 7);
