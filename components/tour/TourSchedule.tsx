"use client";

import { useMemo, useState } from "react";
import {
  pastTourDates,
  ticketUrlFor,
  tourDates,
  type TourDate,
} from "@/lib/tour";
import { cn, dayOfMonth, formatMonth, monthAbbreviation } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

type Tab = "upcoming" | "past";

const statusLabel: Record<TourDate["status"], string> = {
  "on-sale": "On sale",
  low: "Low tickets",
  "sold-out": "Sold out",
};

function groupByMonth(shows: TourDate[]) {
  const groups = new Map<string, TourDate[]>();
  shows.forEach((show) => {
    const key = show.date.slice(0, 7);
    const list = groups.get(key) ?? [];
    list.push(show);
    groups.set(key, list);
  });
  return Array.from(groups.entries());
}

export function TourSchedule() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const shows = tab === "upcoming" ? tourDates : pastTourDates;
  const groups = useMemo(() => groupByMonth(shows), [shows]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Tour dates">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "upcoming"}
          onClick={() => setTab("upcoming")}
          className={cn(
            "min-h-11 border px-5 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors",
            tab === "upcoming"
              ? "border-gold bg-gold text-ink"
              : "border-line text-cream-2 hover:border-cream hover:text-cream",
          )}
        >
          2027 dates
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "past"}
          onClick={() => setTab("past")}
          className={cn(
            "min-h-11 border px-5 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors",
            tab === "past"
              ? "border-gold bg-gold text-ink"
              : "border-line text-cream-2 hover:border-cream hover:text-cream",
          )}
        >
          Past shows
        </button>
      </div>

      <div className="mt-10">
        {groups.map(([month, monthShows]) => (
          <div key={month} className="mb-10 last:mb-0">
            <div className="flex items-center gap-4">
              <h2 className="font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold">
                {formatMonth(month)}
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>

            <div>
              {monthShows.map((show) => {
                const soldOut = show.status === "sold-out";
                return (
                  <div
                    key={show.id}
                    className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 border-b border-line py-5 sm:grid-cols-[auto_1.4fr_1fr_auto] sm:gap-x-8"
                  >
                    <div className="w-14 shrink-0 text-center">
                      <p className="font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-gold">
                        {monthAbbreviation(show.date)}
                      </p>
                      <p className="font-display text-[2.1rem] leading-none text-cream">
                        {dayOfMonth(show.date)}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="font-display text-xl leading-tight text-cream">
                        {show.city}, {show.region}
                      </p>
                      <p className="mt-0.5 text-[0.84rem] text-cream-2">{show.venue}</p>
                    </div>

                    <div className="col-span-2 flex flex-wrap items-center gap-x-4 gap-y-1 sm:col-span-1">
                      <span
                        className={cn(
                          "font-condensed text-[0.62rem] font-semibold uppercase tracking-[0.18em]",
                          show.status === "low" && "text-gold",
                          show.status === "on-sale" && "text-cream-3",
                          soldOut && "text-cream-3/60",
                        )}
                      >
                        {statusLabel[show.status]}
                      </span>
                      {show.note && (
                        <span className="text-[0.76rem] text-cream-3">{show.note}</span>
                      )}
                    </div>

                    <div className="col-span-2 sm:col-span-1 sm:justify-self-end">
                      {soldOut ? (
                        <span className="inline-flex min-h-10 w-full items-center justify-center border border-line px-5 font-condensed text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cream-3 sm:w-auto">
                          Sold out
                        </span>
                      ) : (
                        <a
                          href={ticketUrlFor(show)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm w-full sm:w-auto"
                        >
                          Tickets
                          <Icon name="arrow-up-right" size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <p className="border border-line px-6 py-12 text-center text-cream-2">
            No shows announced right now. Sign up for the mailing list to hear first.
          </p>
        )}
      </div>

      <p className="mt-8 text-[0.75rem] leading-relaxed text-cream-3">
        Dates and venues are subject to change. Ticket links open the official Ticketmaster
        search for each show.
      </p>
    </div>
  );
}
