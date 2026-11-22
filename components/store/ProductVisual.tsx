import Image from "next/image";
import type { ProductVisual as Visual } from "@/lib/products";
import { AlbumArt } from "@/components/art/AlbumArt";
import { cn } from "@/lib/format";

interface ProductVisualProps {
  visual: Visual;
  name: string;
  className?: string;
  /** Unique prefix for SVG IDs when the same visual renders more than once. */
  uid?: string;
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

export function ProductVisual({ visual, name, className, uid }: ProductVisualProps) {
  const prefix = uid ?? visual;
  const inner =
    visual === "vinyl-neon" ? <Vinyl art="neon" name={name} uid={prefix} /> :
    visual === "vinyl-dust" ? <Vinyl art="dust" name={name} uid={prefix} /> :
    visual === "vinyl-long" ? <Vinyl art="long-way" name={name} uid={prefix} /> :
    visual === "cd" ? <Cd name={name} uid={prefix} /> :
    visual === "tee" ? <Tee name={name} uid={prefix} /> :
    visual === "lyric-tee" ? <Tee lyric name={name} uid={prefix} /> :
    visual === "hoodie" ? <Hoodie name={name} uid={prefix} /> :
    visual === "hat" ? <Hat name={name} uid={prefix} /> :
    visual === "poster" ? <Poster name={name} uid={prefix} /> :
    visual === "tote" ? <Tote name={name} uid={prefix} /> :
    visual === "pins" ? <Pins name={name} /> :
    <Photo name={name} />;

  return <div className={className}>{inner}</div>;
}
