import Image from "next/image";
import type { ProductVisual as Visual } from "@/lib/products";
import { featuredAlbum } from "@/lib/music";
import { AlbumArt } from "@/components/art/AlbumArt";
import { cn } from "@/lib/format";

export type ProductVisualView = "front" | "back" | "detail";

interface ProductVisualProps {
  visual: Visual;
  name: string;
  className?: string;
  /** Unique prefix for SVG IDs when the same visual renders more than once. */
  uid?: string;
  /** Optional alternate angle for visuals with a multi-image gallery. */
  view?: ProductVisualView;
}

function Scene({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "cream";
}) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden",
        tone === "dark"
          ? "bg-[radial-gradient(circle_at_50%_35%,#2a3030_0%,#161b1c_55%,#0c1011_100%)]"
          : "bg-[radial-gradient(circle_at_50%_35%,#f6efdf_0%,#e6d9c3_60%,#cdbda2_100%)]",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(90deg,transparent,transparent_3px,#000_4px)]" />
      {children}
    </div>
  );
}

function Vinyl({ art, name, uid }: { art: "neon" | "dust" | "long-way"; name: string; uid: string }) {
  return (
    <Scene>
      <div className="absolute left-[46%] top-1/2 aspect-square w-[62%] -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#101313,#262b2b,#0b0e0e,#202525,#0b0e0e)] shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-[6%] rounded-full border border-white/10" />
        <div className="absolute inset-[16%] rounded-full border border-white/[0.07]" />
        <div className="absolute inset-[26%] rounded-full border border-white/[0.05]" />
        <div className="absolute inset-[38%] rounded-full bg-[#b9854a]">
          <div className="absolute inset-[30%] rounded-full bg-[#0d1011]" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9a96c]" />
        </div>
      </div>
      <div className="absolute left-[12%] top-1/2 w-[48%] -translate-y-1/2 shadow-[18px_24px_50px_rgba(0,0,0,0.6)]">
        <AlbumArt art={art} uid={uid} />
      </div>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function Cd({ name, uid }: { name: string; uid: string }) {
  return (
    <Scene>
      <div className="absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] bg-white/10 p-[3%] shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur">
        <AlbumArt art="neon" uid={uid} />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.28),transparent_28%,transparent_70%,rgba(255,255,255,0.16))]" />
      </div>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function Tee({ lyric = false, name, uid }: { lyric?: boolean; name: string; uid: string }) {
  const prefix = `${uid}-tee`;
  return (
    <Scene tone={lyric ? "cream" : "dark"}>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-[8%]">
        <defs>
          <linearGradient id={`${prefix}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={lyric ? "#f6efdf" : "#222829"} />
            <stop offset="1" stopColor={lyric ? "#d9cbb4" : "#14191a"} />
          </linearGradient>
        </defs>
        <path
          d="M137 56 91 78 52 128l42 34 26-20-8 172c0 10 8 18 18 18h150c10 0 18-8 18-18l-8-172 26 20 42-34-39-50-46-22c-8 18-25 30-45 30s-37-12-45-30Z"
          fill={`url(#${prefix}-fill)`}
          stroke={lyric ? "#b9a98f" : "#3d4445"}
          strokeWidth="2"
        />
        <path d="M155 60c6 16 25 26 45 26s39-10 45-26" fill="none" stroke={lyric ? "#b9a98f" : "#3d4445"} strokeWidth="2" />
        {lyric ? (
          <g fill="#5b4a37" textAnchor="middle" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            <text x="200" y="186" fontSize="13" letterSpacing="3">HOMETOWN</text>
            <text x="200" y="210" fontSize="24" fontStyle="italic">hymn</text>
            <text x="200" y="236" fontSize="8" letterSpacing="2">RYLAN HAYES</text>
          </g>
        ) : (
          <g fill="#e8d1b2" textAnchor="middle" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
            <text x="200" y="178" fontSize="11" letterSpacing="4" opacity="0.75">NEON PORCH</text>
            <text x="200" y="196" fontSize="11" letterSpacing="4" opacity="0.75">LIGHTS</text>
            <path d="M172 212h56" stroke="#d9a96c" strokeWidth="1" />
            <text x="200" y="232" fontSize="7" letterSpacing="3" opacity="0.55">2027 TOUR</text>
          </g>
        )}
      </svg>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function TracklistTee({
  name,
  uid,
  view = "front",
}: {
  name: string;
  uid: string;
  view?: ProductVisualView;
}) {
  const p = `${uid}-tracklist-${view}`;
  const tracks = featuredAlbum.tracks ?? [];
  const columns = [tracks.slice(0, 6), tracks.slice(6, 12)];
  const teePath =
    "M137 56 91 78 52 128l42 34 26-20-8 172c0 10 8 18 18 18h150c10 0 18-8 18-18l-8-172 26 20 42-34-39-50-46-22c-8 18-25 30-45 30s-37-12-45-30Z";

  const defs = (
    <defs>
      <linearGradient id={`${p}-body`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0" stopColor="#5c524a" />
        <stop offset="0.5" stopColor="#3b3531" />
        <stop offset="1" stopColor="#282320" />
      </linearGradient>
      <radialGradient id={`${p}-sheen`} cx="40%" cy="22%" r="75%">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
        <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.02" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
      </radialGradient>
      <pattern id={`${p}-grain`} width="5" height="5" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.5" fill="#ffffff" opacity="0.055" />
        <circle cx="3.5" cy="3.2" r="0.45" fill="#000000" opacity="0.08" />
      </pattern>
      <filter id={`${p}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
    </defs>
  );

  const shirtBase = (
    <>
      <ellipse cx="200" cy="352" rx="98" ry="12" fill="#000000" opacity="0.22" filter={`url(#${p}-shadow)`} />
      <path d={teePath} fill={`url(#${p}-body)`} stroke="#6b6058" strokeWidth="1.6" />
      <path d={teePath} fill={`url(#${p}-sheen)`} />
      <path d={teePath} fill={`url(#${p}-grain)`} />
      <path d="M91 78 52 128l42 34 26-20-29-64Z" fill="#151211" opacity="0.22" />
      <path d="M309 78 348 128l-42 34-26-20 29-64Z" fill="#151211" opacity="0.24" />
      <path d="M137 56 91 78M263 56l46 22" stroke="#7b6f65" strokeWidth="1.4" opacity="0.35" fill="none" />
      <path d="M112 312h176" stroke="#171413" strokeWidth="3" opacity="0.5" />
      <path d="M112 318h176" stroke="#7b6f65" strokeWidth="1" opacity="0.3" />
      <path d="M155 60c6 16 25 26 45 26s39-10 45-26" fill="none" stroke="#6b6058" strokeWidth="3.5" />
      <path
        d="M158 63c7 13 24 22 42 22s35-9 42-22"
        fill="none"
        stroke="#241f1d"
        strokeWidth="1.4"
        strokeDasharray="2 2"
        opacity="0.7"
      />
      <path
        d="M124 178c14 7 24 6 34 1M276 186c-12 6-22 6-31 1M130 264c12-6 22-7 31-3M270 272c-10-5-19-5-28-2"
        fill="none"
        stroke="#0f0d0c"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.16"
      />
    </>
  );

  const backPrint = (
    <g fill="#f4ecdd" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
      <text x="200" y="117" fontSize="11" letterSpacing="2.2" textAnchor="middle">
        NEON PORCH LIGHTS
      </text>
      <path d="M128 127h144" stroke="#d9a96c" strokeWidth="1.2" />
      <text x="200" y="139" fontSize="6" letterSpacing="3" textAnchor="middle" opacity="0.65">
        THE TRACKLIST · 2026
      </text>
      {columns.map((column, columnIndex) => {
        const x = columnIndex === 0 ? 118 : 226;
        return (
          <g key={x}>
            {column.map((track) => {
              const y = 158 + (columnIndex === 0 ? track.number - 1 : track.number - 7) * 23;
              return (
                <g key={track.number}>
                  <text x={x} y={y} fontSize="7.5" textAnchor="end" opacity="0.6">
                    {String(track.number).padStart(2, "0")}
                  </text>
                  <text x={x + 8} y={y} fontSize="8">
                    {track.title.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <path d="M128 296h144" stroke="#d9a96c" strokeWidth="1.2" />
      <text x="200" y="311" fontSize="6.5" letterSpacing="2" textAnchor="middle" opacity="0.72">
        RYLAN HAYES · NASHVILLE, TN
      </text>
    </g>
  );

  return (
    <Scene tone="cream">
      {view === "detail" ? (
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-[6%]">
          <defs>
            <linearGradient id={`${p}-fabric`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5d534b" />
              <stop offset="1" stopColor="#2e2926" />
            </linearGradient>
            <pattern id={`${p}-weave`} width="7" height="7" patternUnits="userSpaceOnUse">
              <path d="M0 7 7 0M-2 2 2 -2M5 9 9 5" stroke="#ffffff" strokeOpacity="0.045" strokeWidth="1.2" />
              <path d="M0 3.5h7M3.5 0v7" stroke="#000000" strokeOpacity="0.05" strokeWidth="0.7" />
            </pattern>
          </defs>
          <g transform="rotate(-3 200 200)">
            <rect x="44" y="44" width="312" height="312" fill={`url(#${p}-fabric)`} stroke="#6b6058" strokeWidth="2" />
            <rect x="44" y="44" width="312" height="312" fill={`url(#${p}-weave)`} />
            <rect x="52" y="52" width="296" height="296" fill="none" stroke="#f4ecdd" strokeOpacity="0.12" strokeDasharray="3 4" />
            <path d="M44 300 356 260v96H44Z" fill="#191514" opacity="0.32" />
            <path d="M44 300 356 260" stroke="#8a7d70" strokeWidth="1.5" opacity="0.55" />
            <g fill="#f4ecdd" textAnchor="middle">
              <text x="200" y="129" fontSize="9" letterSpacing="5" opacity="0.72" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                THE TWELVE SONGS
              </text>
              <text x="200" y="179" fontSize="33" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Neon Porch
              </text>
              <text x="200" y="217" fontSize="33" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                Lights
              </text>
            </g>
            <path d="M110 238h180" stroke="#d9a96c" strokeWidth="1.5" />
            <g fill="#e9d9c5" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
              <text x="126" y="270" fontSize="10" letterSpacing="2">01  NEON PORCH LIGHTS</text>
              <text x="126" y="293" fontSize="10" letterSpacing="2">02  WHISKEY WEATHER</text>
              <text x="126" y="316" fontSize="10" letterSpacing="2">03  COUNTY LINE</text>
            </g>
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-[8%]">
          {defs}
          {shirtBase}
          {view === "front" ? (
            <g textAnchor="middle" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
              <rect x="160" y="158" width="80" height="60" fill="none" stroke="#d9a96c" strokeOpacity="0.7" />
              <rect x="163" y="161" width="74" height="54" fill="none" stroke="#f4ecdd" strokeOpacity="0.16" />
              <circle cx="200" cy="174" r="4.5" fill="#d9a96c" opacity="0.9" />
              <path d="M196 174h8M200 170v8" stroke="#2b2522" strokeWidth="0.9" />
              <text x="200" y="193" fontSize="10" letterSpacing="2.4" fill="#f4ecdd">RYLAN</text>
              <text x="200" y="206" fontSize="10" letterSpacing="2.4" fill="#f4ecdd">HAYES</text>
              <text x="200" y="213" fontSize="4.6" letterSpacing="1.8" fill="#d9a96c">NEON PORCH LIGHTS</text>
            </g>
          ) : (
            <>
              {backPrint}
              <rect x="120" y="112" width="160" height="202" fill={`url(#${p}-grain)`} opacity="0.5" />
            </>
          )}
        </svg>
      )}
      <span className="sr-only">{name}{view !== "front" ? ` — ${view} view` : ""}</span>
    </Scene>
  );
}

function Hoodie({ name, uid }: { name: string; uid: string }) {
  const prefix = `${uid}-hoodie`;
  return (
    <Scene>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-[6%]">
        <defs>
          <linearGradient id={`${prefix}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b3131" />
            <stop offset="1" stopColor="#171c1d" />
          </linearGradient>
        </defs>
        <path
          d="M143 66c8-24 30-38 57-38s49 14 57 38l42 20 36 62-38 30-20-26v168c0 10-8 18-18 18H143c-10 0-18-8-18-18V152l-20 26-38-30 36-62 40-20Z"
          fill={`url(#${prefix}-fill)`}
          stroke="#3d4445"
          strokeWidth="2"
        />
        <path d="M143 66c12 26 33 38 57 38s45-12 57-38" fill="none" stroke="#454c4c" strokeWidth="2" />
        <path d="M156 150h88v52h-88z" fill="none" stroke="#3d4445" strokeWidth="2" />
        <path d="M170 78v60M230 78v60" stroke="#d9a96c" strokeWidth="2" opacity="0.55" />
        <g fill="#e8d1b2" textAnchor="middle" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
          <text x="200" y="124" fontSize="9" letterSpacing="4" opacity="0.8">RYLAN</text>
          <text x="200" y="138" fontSize="9" letterSpacing="4" opacity="0.8">HAYES</text>
        </g>
      </svg>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function Hat({ name, uid }: { name: string; uid: string }) {
  const prefix = `${uid}-hat`;
  return (
    <Scene>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-[8%]">
        <defs>
          <linearGradient id={`${prefix}-crown`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a4141" />
            <stop offset="1" stopColor="#1b2021" />
          </linearGradient>
          <pattern id={`${prefix}-mesh`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 0h8v8H0z" fill="#1b2021" />
            <path d="M0 4h8M4 0v8" stroke="#3a4141" strokeWidth="1" />
          </pattern>
        </defs>
        <path d="M95 230c0-76 40-128 105-128s105 52 105 128H95Z" fill={`url(#${prefix}-crown)`} stroke="#4a5251" strokeWidth="2" />
        <path d="M95 230h210v34H95z" fill="#141819" />
        <path d="M60 264h280c22 0 30 18 8 26-46 16-110 24-148 24s-102-8-148-24c-22-8-14-26 8-26Z" fill="#202627" stroke="#4a5251" strokeWidth="2" />
        <path d="M110 264h180" stroke="#d9a96c" strokeWidth="3" opacity="0.6" />
        <rect x="158" y="150" width="84" height="50" fill="#0f1415" stroke="#d9a96c" strokeOpacity="0.55" />
        <g fill="#e8d1b2" textAnchor="middle" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
          <text x="200" y="172" fontSize="8" letterSpacing="3">RYLAN</text>
          <text x="200" y="185" fontSize="8" letterSpacing="3">HAYES</text>
        </g>
      </svg>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function Poster({ name, uid }: { name: string; uid: string }) {
  return (
    <Scene>
      <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] bg-[#f4ecdd] p-[4%] shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
        <AlbumArt art="neon" uid={`${uid}-poster`} />
        <p className="mt-[5%] text-center font-condensed text-[0.55rem] uppercase tracking-[0.3em] text-ink/70">
          Rylan Hayes · 2026
        </p>
      </div>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function Tote({ name, uid }: { name: string; uid: string }) {
  const prefix = `${uid}-tote`;
  return (
    <Scene tone="cream">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-[8%]">
        <defs>
          <linearGradient id={`${prefix}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2e6d2" />
            <stop offset="1" stopColor="#d8c6aa" />
          </linearGradient>
        </defs>
        <path d="M108 128h184l14 220H94l14-220Z" fill={`url(#${prefix}-fill)`} stroke="#b09a7b" strokeWidth="2" />
        <path d="M150 128c0-48 22-72 50-72s50 24 50 72" fill="none" stroke="#8c7355" strokeWidth="9" />
        <g fill="#3b3128" textAnchor="middle" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
          <text x="200" y="232" fontSize="20" letterSpacing="2">RYLAN</text>
          <text x="200" y="258" fontSize="20" letterSpacing="2">HAYES</text>
          <text x="200" y="282" fontSize="8" letterSpacing="4" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>NASHVILLE, TN</text>
        </g>
      </svg>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function Pins({ name }: { name: string }) {
  return (
    <Scene tone="cream">
      <div className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 rotate-[2deg] bg-[#f7f0e2] p-[6%] shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
        <p className="mb-[7%] text-center font-condensed text-[0.5rem] uppercase tracking-[0.28em] text-ink/60">
          Rylan Hayes · Pin Set
        </p>
        <div className="flex items-center justify-center gap-[8%]">
          <div className="flex aspect-square w-[28%] items-center justify-center rounded-full border-[3px] border-[#b9854a] bg-[#1a1f20]">
            <div className="h-3 w-3 rounded-full bg-[#d9a96c] shadow-[0_0_12px_#d9a96c]" />
          </div>
          <div className="flex aspect-square w-[28%] items-center justify-center rounded-full border-[3px] border-[#b9854a] bg-[#1a1f20]">
            <svg viewBox="0 0 40 40" className="w-1/2 text-[#d9a96c]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 5 27 18 20 35 13 18Z" />
            </svg>
          </div>
          <div className="flex aspect-square w-[28%] items-center justify-center rounded-full border-[3px] border-[#b9854a] bg-[#1a1f20]">
            <svg viewBox="0 0 40 40" className="w-1/2 text-[#d9a96c]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="20" cy="20" r="4" />
              <path d="M20 8v8M20 24v8M8 20h8M24 20h8M11 11l6 6M23 23l6 6M29 11l-6 6M17 23l-6 6" />
            </svg>
          </div>
        </div>
        <p className="mt-[7%] text-center font-condensed text-[0.45rem] uppercase tracking-[0.24em] text-ink/45">
          Hard enamel · Antique brass
        </p>
      </div>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

function Photo({ name }: { name: string }) {
  return (
    <Scene>
      <div className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 rotate-[2deg] bg-[#f4ecdd] p-[3%] pb-[12%] shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink-3">
          <Image
            src="/images/portrait-bw.webp"
            alt={name}
            fill
            sizes="(max-width: 768px) 60vw, 320px"
            className="object-cover object-top grayscale"
          />
        </div>
        <p className="mt-[4%] text-center font-display text-lg italic text-ink/80">Rylan Hayes</p>
      </div>
      <span className="sr-only">{name}</span>
    </Scene>
  );
}

export function ProductVisual({ visual, name, className, uid, view = "front" }: ProductVisualProps) {
  const prefix = uid ?? visual;
  const inner =
    visual === "vinyl-neon" ? <Vinyl art="neon" name={name} uid={prefix} /> :
    visual === "vinyl-dust" ? <Vinyl art="dust" name={name} uid={prefix} /> :
    visual === "vinyl-long" ? <Vinyl art="long-way" name={name} uid={prefix} /> :
    visual === "cd" ? <Cd name={name} uid={prefix} /> :
    visual === "tee" ? <Tee name={name} uid={prefix} /> :
    visual === "lyric-tee" ? <Tee lyric name={name} uid={prefix} /> :
    visual === "tracklist-tee" ? <TracklistTee name={name} uid={prefix} view={view} /> :
    visual === "hoodie" ? <Hoodie name={name} uid={prefix} /> :
    visual === "hat" ? <Hat name={name} uid={prefix} /> :
    visual === "poster" ? <Poster name={name} uid={prefix} /> :
    visual === "tote" ? <Tote name={name} uid={prefix} /> :
    visual === "pins" ? <Pins name={name} /> :
    <Photo name={name} />;

  return <div className={className}>{inner}</div>;
}