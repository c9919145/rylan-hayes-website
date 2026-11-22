import type { CoverArt } from "@/lib/music";
import { cn } from "@/lib/format";

interface AlbumArtProps {
  art: CoverArt;
  title?: string;
  className?: string;
  rounded?: boolean;
  /** Unique prefix for SVG gradient/filter IDs when the same art renders more than once. */
  uid?: string;
}

const titles: Record<CoverArt, { title: string; artist: string }> = {
  neon: { title: "NEON PORCH LIGHTS", artist: "RYLAN HAYES" },
  dust: { title: "DUST & DIAMONDS", artist: "RYLAN HAYES" },
  "long-way": { title: "LONG WAY HOME", artist: "RYLAN HAYES" },
  backroad: { title: "BACKROAD GOSPEL", artist: "RYLAN HAYES" },
  whiskey: { title: "WHISKEY WEATHER", artist: "RYLAN HAYES" },
  carolina: { title: "CAROLINA BLUE", artist: "RYLAN HAYES" },
};

function Grain({ id }: { id: string }) {
  return (
    <>
      <filter id={`${id}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="1000"
        height="1000"
        filter={`url(#${id}-grain)`}
        opacity="0.09"
        style={{ mixBlendMode: "screen" }}
      />
    </>
  );
}

export function AlbumArt({ art, className, rounded = false, uid }: AlbumArtProps) {
  const meta = titles[art];
  const id = `art-${uid ?? art}`;

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden bg-ink-3",
        rounded && "rounded-sm",
        className,
      )}
      role="img"
      aria-label={`${meta.title} album artwork`}
    >
      <svg viewBox="0 0 1000 1000" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
            {art === "neon" && (
              <>
                <stop offset="0" stopColor="#0a1414" />
                <stop offset="0.55" stopColor="#12201f" />
                <stop offset="1" stopColor="#0a0f10" />
              </>
            )}
            {art === "dust" && (
              <>
                <stop offset="0" stopColor="#2a120c" />
                <stop offset="0.45" stopColor="#8c3f22" />
                <stop offset="0.72" stopColor="#d98c4c" />
                <stop offset="1" stopColor="#1a0d0a" />
              </>
            )}
            {art === "long-way" && (
              <>
                <stop offset="0" stopColor="#0b1714" />
                <stop offset="0.5" stopColor="#16332a" />
                <stop offset="1" stopColor="#07100e" />
              </>
            )}
            {art === "backroad" && (
              <>
                <stop offset="0" stopColor="#e7d6b8" />
                <stop offset="0.6" stopColor="#c8a878" />
                <stop offset="1" stopColor="#8a633c" />
              </>
            )}
            {art === "whiskey" && (
              <>
                <stop offset="0" stopColor="#1a0d06" />
                <stop offset="0.5" stopColor="#8a4a18" />
                <stop offset="1" stopColor="#2a1308" />
              </>
            )}
            {art === "carolina" && (
              <>
                <stop offset="0" stopColor="#08141e" />
                <stop offset="0.5" stopColor="#1f4b63" />
                <stop offset="1" stopColor="#0a1a24" />
              </>
            )}
          </linearGradient>

          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.95" />
            <stop offset="0.28" stopColor="#f0b062" stopOpacity="0.55" />
            <stop offset="1" stopColor="#f0b062" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="0.6" stopColor="#000" stopOpacity="0.45" />
            <stop offset="1" stopColor="#000" stopOpacity="0.85" />
          </linearGradient>

          <filter id={`${id}-blur`}>
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        <rect width="1000" height="1000" fill={`url(#${id}-bg)`} />

        {art === "neon" && (
          <>
            {Array.from({ length: 14 }).map((_, index) => (
              <rect
                key={index}
                x={index * 74}
                y="0"
                width="2"
                height="1000"
                fill="#d9a96c"
                opacity="0.07"
              />
            ))}
            <circle cx="500" cy="250" r="270" fill={`url(#${id}-glow)`} />
            <circle cx="500" cy="205" r="34" fill="#ffe4b5" />
            <circle cx="500" cy="205" r="58" fill="#ffc87a" opacity="0.28" filter={`url(#${id}-blur)`} />
            <path d="M500 228v72" stroke="#d9a96c" strokeWidth="2" opacity="0.6" />
            <path d="M120 720h760v12H120z" fill="#060a0a" opacity="0.9" />
            {Array.from({ length: 9 }).map((_, index) => (
              <rect
                key={index}
                x={140 + index * 84}
                y="732"
                width="10"
                height="190"
                fill="#060a0a"
                opacity="0.9"
              />
            ))}
            <path d="M120 760h760" stroke="#d9a96c" strokeWidth="5" opacity="0.35" />
            <rect y="520" width="1000" height="480" fill={`url(#${id}-fade)`} />
          </>
        )}

        {art === "dust" && (
          <>
            <circle cx="680" cy="330" r="210" fill="#ffcf87" opacity="0.35" filter={`url(#${id}-blur)`} />
            <circle cx="680" cy="330" r="112" fill="#ffdca8" opacity="0.8" />
            <path d="M0 600c180-45 330-30 500 5s300 25 500-10v405H0Z" fill="#5d2a17" opacity="0.55" />
            <path d="M0 700c160-30 330-10 500 18s320 8 500-15v297H0Z" fill="#2a120c" opacity="0.75" />
            <path d="M0 810c200-25 340-8 500 8s330 5 500-12v194H0Z" fill="#120807" />
            <rect y="560" width="1000" height="440" fill={`url(#${id}-fade)`} />
          </>
        )}

        {art === "long-way" && (
          <>
            <circle cx="500" cy="300" r="250" fill="#d9a96c" opacity="0.1" filter={`url(#${id}-blur)`} />
            <path d="M0 560 250 430l210 70 220-120 320 150v470H0Z" fill="#0a1512" opacity="0.65" />
            <path d="M430 1000 480 660l40 0 60 340Z" fill="#d9cdba" opacity="0.5" />
            <path d="M470 1000 495 660" stroke="#0b1714" strokeWidth="4" strokeDasharray="22 26" />
            <path d="M500 620 500 540" stroke="#d9cdba" strokeWidth="3" opacity="0.4" />
            <rect y="560" width="1000" height="440" fill={`url(#${id}-fade)`} />
          </>
        )}

        {art === "backroad" && (
          <>
            <circle cx="760" cy="210" r="150" fill="#f7e8c8" opacity="0.6" filter={`url(#${id}-blur)`} />
            <path d="M0 610c180-50 340-30 500 0s300 10 500-30v420H0Z" fill="#8a633c" opacity="0.55" />
            <path d="M0 720c200-30 360-10 500 15s300 5 500-20v285H0Z" fill="#6d4a2a" opacity="0.6" />
            {Array.from({ length: 7 }).map((_, index) => (
              <rect key={index} x={90 + index * 140} y="700" width="9" height="120" fill="#3b2a18" opacity="0.65" />
            ))}
            <path d="M80 720h850" stroke="#3b2a18" strokeWidth="8" opacity="0.6" />
            <rect y="480" width="1000" height="520" fill={`url(#${id}-fade)`} opacity="0.6" />
          </>
        )}

        {art === "whiskey" && (
          <>
            <circle cx="500" cy="380" r="300" fill="#e6a24c" opacity="0.18" filter={`url(#${id}-blur)`} />
            <rect x="330" y="300" width="340" height="430" fill="#c27a2d" opacity="0.2" stroke="#e6b46c" strokeOpacity="0.35" />
            <rect x="350" y="520" width="300" height="190" fill="#b56a24" opacity="0.45" />
            {Array.from({ length: 22 }).map((_, index) => (
              <path
                key={index}
                d={`M${60 + index * 45} 120 l-22 220`}
                stroke="#e8d1b2"
                strokeWidth="2"
                opacity="0.12"
              />
            ))}
            <rect y="520" width="1000" height="480" fill={`url(#${id}-fade)`} />
          </>
        )}

        {art === "carolina" && (
          <>
            <circle cx="500" cy="360" r="280" fill="#7db4d0" opacity="0.16" filter={`url(#${id}-blur)`} />
            <path d="M0 600h1000v400H0Z" fill="#0a202c" opacity="0.8" />
            <path d="M0 600c160-14 330-6 500 4s340 2 500-8" stroke="#d9cdba" strokeWidth="2" opacity="0.3" />
            {Array.from({ length: 9 }).map((_, index) => (
              <path
                key={index}
                d={`M${100 + index * 100} 660h${40 + index * 6}`}
                stroke="#b9d6e2"
                strokeWidth="2"
                opacity="0.18"
              />
            ))}
            <rect y="480" width="1000" height="520" fill={`url(#${id}-fade)`} />
          </>
        )}

        <Grain id={id} />

        <g
          fill={art === "backroad" ? "#24170c" : "#f4ecdd"}
          textAnchor="middle"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          <text
            x="500"
            y="120"
            fontSize="19"
            letterSpacing="9"
            opacity="0.72"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 600 }}
          >
            {meta.artist}
          </text>
          <text x="500" y="190" fontSize="13" letterSpacing="7" opacity="0.45">
            {art === "neon" ? "THE NEW ALBUM" : art === "dust" ? "2024" : art === "long-way" ? "2022" : art === "backroad" ? "2020" : "2026"}
          </text>
          <text x="500" y="800" fontSize="74" letterSpacing="2" fontWeight="400">
            {meta.title.split(" ").slice(0, Math.ceil(meta.title.split(" ").length / 2)).join(" ")}
          </text>
          <text x="500" y="878" fontSize="74" letterSpacing="2" fontWeight="400">
            {meta.title.split(" ").slice(Math.ceil(meta.title.split(" ").length / 2)).join(" ")}
          </text>
          <text
            x="500"
            y="935"
            fontSize="12"
            letterSpacing="6"
            opacity="0.55"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 600 }}
          >
            RYLAN HAYES
          </text>
        </g>

        <rect x="24" y="24" width="952" height="952" fill="none" stroke="#f4ecdd" strokeOpacity="0.14" />
      </svg>
    </div>
  );
}
