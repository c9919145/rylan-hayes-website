export type ProductCategory = "Music" | "Apparel" | "Accessories" | "Posters";

export type ProductVisual =
  | "vinyl-neon"
  | "vinyl-dust"
  | "vinyl-long"
  | "cd"
  | "tee"
  | "lyric-tee"
  | "hoodie"
  | "hat"
  | "poster"
  | "tote"
  | "pins"
  | "photo";

export interface ProductVariant {
  label: string;
  options: string[];
  defaultValue: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  visual: ProductVisual;
  shortDescription: string;
  description: string;
  details: string[];
  badge?: string;
  variant?: ProductVariant;
}

export const productCategories: Array<"All" | ProductCategory> = [
  "All",
  "Music",
  "Apparel",
  "Accessories",
  "Posters",
];

export const products: Product[] = [
  {
    slug: "neon-porch-lights-vinyl",
    name: "Neon Porch Lights — Limited Vinyl",
    price: 3499,
    category: "Music",
    visual: "vinyl-neon",
    shortDescription: "180-gram amber smoke vinyl in a gatefold jacket.",
    description:
      "The new album pressed on 180-gram amber smoke vinyl. Housed in a full-color gatefold jacket with a printed inner sleeve and a download card. Limited to 2,000 numbered copies.",
    details: [
      "180-gram amber smoke vinyl",
      "Gatefold jacket with matte finish",
      "Printed inner sleeve and download card",
      "Limited to 2,000 numbered copies",
    ],
    badge: "Limited",
    variant: {
      label: "Edition",
      options: ["Amber Smoke", "Classic Black"],
      defaultValue: "Amber Smoke",
    },
  },
  {
    slug: "neon-porch-lights-cd",
    name: "Neon Porch Lights — CD",
    price: 1499,
    category: "Music",
    visual: "cd",
    shortDescription: "The new album on CD with a 16-page booklet.",
    description:
      "The new album on CD, packaged in a six-panel digipak with a 16-page lyric booklet and exclusive studio photographs.",
    details: [
      "Six-panel digipak",
      "16-page lyric booklet",
      "Includes all 12 album tracks",
    ],
  },
  {
    slug: "neon-porch-lights-tee",
    name: "Neon Porch Lights Tour Tee",
    price: 3999,
    category: "Apparel",
    visual: "tee",
    shortDescription: "Heavyweight cotton tee with the 2027 tour artwork.",
    description:
      "A heavyweight cotton tee with a soft hand feel and a slightly boxy fit. Front features the Neon Porch Lights tour mark; back carries the full 2027 routing.",
    details: [
      "100% heavyweight cotton (220 gsm)",
      "Relaxed, slightly boxy fit",
      "Screen printed in Nashville",
      "Machine wash cold, tumble dry low",
    ],
    badge: "New",
    variant: {
      label: "Size",
      options: ["S", "M", "L", "XL", "XXL"],
      defaultValue: "M",
    },
  },
  {
    slug: "tour-hoodie",
    name: "Porch Light Vintage Hoodie",
    price: 6999,
    category: "Apparel",
    visual: "hoodie",
    shortDescription: "Washed fleece hoodie with an embroidered porch light.",
    description:
      "A garment-dyed fleece hoodie in a washed charcoal finish. Embroidered porch light on the chest, printed wordmark down the sleeve, and a lined hood for cold load-ins.",
    details: [
      "80% cotton / 20% recycled polyester fleece",
      "Garment-dyed, pre-shrunk",
      "Embroidered chest mark",
      "Kangaroo pocket and lined hood",
    ],
    variant: {
      label: "Size",
      options: ["S", "M", "L", "XL", "XXL"],
      defaultValue: "M",
    },
  },
  {
    slug: "embroidered-trucker-hat",
    name: "Embroidered Trucker Hat",
    price: 3499,
    category: "Accessories",
    visual: "hat",
    shortDescription: "Structured cap with a woven patch and rope detail.",
    description:
      "A classic structured trucker with a soft mesh back, rope detail and a woven Rylan Hayes patch. Adjustable snap closure for a one-size-fits-most fit.",
    details: [
      "Cotton front panels with polyester mesh back",
      "Woven patch and rope detail",
      "Adjustable snap closure",
      "One size fits most",
    ],
    variant: {
      label: "Color",
      options: ["Black / Tan", "Cream / Brown"],
      defaultValue: "Black / Tan",
    },
  },
  {
    slug: "porch-light-poster",
    name: "Porch Light Screen Print",
    price: 2499,
    category: "Posters",
    visual: "poster",
    shortDescription: "Hand-pulled two-color screen print on heavy stock.",
    description:
      "A hand-pulled two-color screen print of the Neon Porch Lights artwork. Printed on 100 lb archival paper with a subtle warm white finish. Ships rolled in a kraft tube.",
    details: [
      "Two-color hand-pulled screen print",
      "100 lb archival paper",
      "Signed and numbered edition of 300",
      "Ships rolled in a kraft tube",
    ],
    variant: {
      label: "Size",
      options: ["18 × 24 in", "24 × 36 in"],
      defaultValue: "18 × 24 in",
    },
  },
  {
    slug: "dust-and-diamonds-vinyl",
    name: "Dust & Diamonds — Vinyl",
    price: 3299,
    category: "Music",
    visual: "vinyl-dust",
    shortDescription: "The 2024 album on translucent sand-colored vinyl.",
    description:
      "Dust & Diamonds pressed on translucent sand-colored vinyl with a printed inner sleeve. Includes the No. 1 single \"Whiskey Weather.\"",
    details: [
      "Translucent sand-colored vinyl",
      "Single-pocket jacket",
      "Printed inner sleeve",
      "Includes download card",
    ],
  },
  {
    slug: "canvas-tote",
    name: "Backroad Canvas Tote",
    price: 2299,
    category: "Accessories",
    visual: "tote",
    shortDescription: "Heavy canvas tote with a screen-printed wordmark.",
    description:
      "A sturdy 12 oz canvas tote with reinforced handles and a screen-printed wordmark. Built for records, groceries and everything in between.",
    details: [
      "12 oz natural canvas",
      "Reinforced shoulder handles",
      "Interior slip pocket",
      "15 × 16 in",
    ],
  },
  {
    slug: "enamel-pin-set",
    name: "Porch Light Enamel Pin Set",
    price: 1699,
    category: "Accessories",
    visual: "pins",
    shortDescription: "Three hard enamel pins on a branded backing card.",
    description:
      "A set of three hard enamel pins — the porch light, a guitar pick and a wildflower — finished in antique brass and mounted on a letterpress backing card.",
    details: [
      "Three hard enamel pins",
      "Antique brass finish",
      "Rubber clutch backs",
      "Letterpress backing card",
    ],
    badge: "New",
  },
  {
    slug: "long-way-home-vinyl",
    name: "Long Way Home — Vinyl",
    price: 2999,
    category: "Music",
    visual: "vinyl-long",
    shortDescription: "The sophomore album on deep forest green vinyl.",
    description:
      "Long Way Home on deep forest green vinyl. The album that earned Rylan his first ACM Award, remastered for vinyl and packaged with a printed inner sleeve.",
    details: [
      "Deep forest green vinyl",
      "Remastered for vinyl",
      "Printed inner sleeve",
      "Includes download card",
    ],
  },
  {
    slug: "hometown-lyric-tee",
    name: "Hometown Hymn Lyric Tee",
    price: 3799,
    category: "Apparel",
    visual: "lyric-tee",
    shortDescription: "Cream tee with hand-lettered lyrics on the back.",
    description:
      "A soft cream tee with the chorus of \"Hometown Hymn\" hand-lettered across the back and a small chest mark. Printed with water-based ink for a broken-in feel.",
    details: [
      "100% combed cotton",
      "Water-based print",
      "Unisex fit",
      "Machine wash cold, inside out",
    ],
    variant: {
      label: "Size",
      options: ["S", "M", "L", "XL", "XXL"],
      defaultValue: "M",
    },
  },
  {
    slug: "signed-album-photo",
    name: "Signed Album Photo",
    price: 1999,
    category: "Posters",
    visual: "photo",
    shortDescription: "8 × 10 archival print, hand-signed by Rylan.",
    description:
      "An 8 × 10 archival pigment print from the Neon Porch Lights album shoot, hand-signed by Rylan Hayes. Each print is packaged in a protective sleeve with a rigid backing board.",
    details: [
      "8 × 10 archival pigment print",
      "Hand-signed by Rylan Hayes",
      "Protective sleeve and backing board",
      "Ships flat",
    ],
  },
];

export const productBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const productsByCategory = (category: ProductCategory) =>
  products.filter((product) => product.category === category);

export const relatedProducts = (product: Product, limit = 3) =>
  products
    .filter(
      (candidate) =>
        candidate.slug !== product.slug && candidate.category === product.category,
    )
    .concat(products.filter((candidate) => candidate.slug !== product.slug))
    .filter(
      (candidate, index, list) =>
        list.findIndex((item) => item.slug === candidate.slug) === index,
    )
    .slice(0, limit);
