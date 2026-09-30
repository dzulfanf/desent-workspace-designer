import type {
  WorkspaceExtension,
  WorkspaceLocation,
  WorkspaceProduct,
  WorkspaceRental,
} from "@/types/workspace";

export const workspaceProducts: WorkspaceProduct[] = [
  {
    id: "desk-nordic-ascent",
    type: "desk",
    name: "Nordic Ascent Desk",
    pricePerWeek: 18,
    description:
      "Dual-motor sit/stand desk with a solid FSC white oak surface.",
    dimensions: "160 × 80 cm",
    image: "/workspace/desks/nordic-ascent.jpg",
    variants: [
      {
        id: "natural-oak",
        name: "Finish",
        value: "Natural Oak",
      },
      {
        id: "walnut",
        name: "Finish",
        value: "Walnut",
      },
      {
        id: "black",
        name: "Finish",
        value: "Black",
      },
    ],
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-05",
        bookedUntil: "2026-10-12",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-20",
        bookedUntil: "2026-10-26",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-10",
        bookedUntil: "2026-10-17",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-24",
        bookedUntil: "2026-10-30",
      },
    ],
  },

  {
    id: "desk-koto-studio",
    type: "desk",
    name: "Koto Studio Desk",
    pricePerWeek: 14,
    description:
      "Solid Nordic birch desk with an integrated cable trough.",
    dimensions: "140 × 75 cm",
    image: "/workspace/desks/koto-studio.jpg",
    variants: [
      {
        id: "birch-ash",
        name: "Finish",
        value: "Birch Ash",
      },
      {
        id: "natural-birch",
        name: "Finish",
        value: "Natural Birch",
      },
    ],
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-07",
        bookedUntil: "2026-10-14",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-18",
        bookedUntil: "2026-10-23",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-10",
        bookedUntil: "2026-10-16",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-24",
        bookedUntil: "2026-10-29",
      },
    ],
  },

  {
    id: "desk-soma-minimal",
    type: "desk",
    name: "Soma Minimal Pillar",
    pricePerWeek: 12,
    description:
      "Minimal workspace desk with a cast iron pillar base.",
    dimensions: "120 × 70 cm",
    image: "/workspace/desks/soma-minimal.jpg",
    variants: [
      {
        id: "cast-iron-ash",
        name: "Finish",
        value: "Cast Iron & Ash",
      },
    ],
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-14",
        bookedUntil: "2026-10-20",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-25",
        bookedUntil: "2026-10-30",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-06",
        bookedUntil: "2026-10-12",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-21",
        bookedUntil: "2026-10-27",
      },
    ],
  },

  {
    id: "desk-fjord-executive",
    type: "desk",
    name: "Fjord Executive Desk",
    pricePerWeek: 22,
    description:
      "Executive desk with oak veneer and concealed wire management.",
    dimensions: "180 × 85 cm",
    image: "/workspace/desks/fjord-executive.jpg",
    variants: [
      {
        id: "smoked-walnut",
        name: "Finish",
        value: "Smoked Walnut",
      },
    ],
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-09",
        bookedUntil: "2026-10-15",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-22",
        bookedUntil: "2026-10-28",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-12",
        bookedUntil: "2026-10-18",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-28",
        bookedUntil: "2026-10-30",
      },
    ],
  },

  {
    id: "chair-atlas-ergonomic",
    type: "chair",
    name: "Atlas Ergonomic Chair",
    pricePerWeek: 16,
    description:
      "Ergonomic task chair with adjustable lumbar support and breathable mesh.",
    dimensions: "68 × 68 × 110 cm",
    image: "/workspace/chairs/atlas-ergonomic.jpg",
    variants: [
      {
        id: "atlas-black",
        name: "Color",
        value: "Black",
      },
      {
        id: "atlas-grey",
        name: "Color",
        value: "Grey",
      },
      {
        id: "atlas-sand",
        name: "Color",
        value: "Sand",
      },
    ],
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-06",
        bookedUntil: "2026-10-13",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-17",
        bookedUntil: "2026-10-22",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-09",
        bookedUntil: "2026-10-15",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-23",
        bookedUntil: "2026-10-29",
      },
    ],
  },

  {
    id: "chair-form-task",
    type: "chair",
    name: "Form Task Chair",
    pricePerWeek: 12,
    description:
      "Minimal task chair with a supportive backrest and compact footprint.",
    dimensions: "62 × 60 × 96 cm",
    image: "/workspace/chairs/form-task.jpg",
    variants: [
      {
        id: "form-black",
        name: "Color",
        value: "Black",
      },
      {
        id: "form-cream",
        name: "Color",
        value: "Cream",
      },
    ],
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-11",
        bookedUntil: "2026-10-17",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-25",
        bookedUntil: "2026-10-30",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-07",
        bookedUntil: "2026-10-13",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-19",
        bookedUntil: "2026-10-25",
      },
    ],
  },

  {
    id: "chair-mono-executive",
    type: "chair",
    name: "Mono Executive Chair",
    pricePerWeek: 20,
    description:
      "Premium upholstered chair designed for long working sessions.",
    dimensions: "72 × 70 × 118 cm",
    image: "/workspace/chairs/mono-executive.jpg",
    variants: [
      {
        id: "mono-charcoal",
        name: "Color",
        value: "Charcoal",
      },
      {
        id: "mono-tan",
        name: "Color",
        value: "Tan",
      },
    ],
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-08",
        bookedUntil: "2026-10-14",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-21",
        bookedUntil: "2026-10-27",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-11",
        bookedUntil: "2026-10-17",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-26",
        bookedUntil: "2026-10-30",
      },
    ],
  },

  {
    id: "accessory-ultrawide-monitor",
    type: "accessory",
    name: "UltraWide Monitor",
    pricePerWeek: 9,
    description:
      "34-inch ultrawide monitor for a spacious multitasking setup.",
    image: "/workspace/accessories/ultrawide-monitor.jpg",
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-05",
        bookedUntil: "2026-10-11",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-16",
        bookedUntil: "2026-10-21",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-13",
        bookedUntil: "2026-10-19",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-27",
        bookedUntil: "2026-10-30",
      },
    ],
  },

  {
    id: "accessory-desk-lamp",
    type: "accessory",
    name: "Arc Desk Lamp",
    pricePerWeek: 4,
    description:
      "Adjustable desk lamp with a warm, focused light.",
    image: "/workspace/accessories/desk-lamp.jpg",
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-10",
        bookedUntil: "2026-10-16",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-18",
        bookedUntil: "2026-10-24",
      },
    ],
  },

  {
    id: "accessory-monitor-arm",
    type: "accessory",
    name: "Monitor Arm",
    pricePerWeek: 5,
    description:
      "Adjustable monitor arm that keeps the desk surface clear.",
    image: "/workspace/accessories/monitor-arm.jpg",
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-12",
        bookedUntil: "2026-10-18",
      },
      {
        locationId: "bali",
        bookedFrom: "2026-10-24",
        bookedUntil: "2026-10-29",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-06",
        bookedUntil: "2026-10-12",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-20",
        bookedUntil: "2026-10-26",
      },
    ],
  },

  {
    id: "accessory-indoor-plant",
    type: "accessory",
    name: "Indoor Plant",
    pricePerWeek: 3,
    description:
      "Low-maintenance indoor plant for a more natural workspace.",
    image: "/workspace/accessories/indoor-plant.jpg",
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-15",
        bookedUntil: "2026-10-21",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-09",
        bookedUntil: "2026-10-15",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-22",
        bookedUntil: "2026-10-28",
      },
    ],
  },

  {
    id: "accessory-desk-speaker",
    type: "accessory",
    name: "Desk Speaker",
    pricePerWeek: 6,
    description:
      "Compact desktop speaker with a clean, minimal design.",
    image: "/workspace/accessories/desk-speaker.jpg",
    availability: [
      {
        locationId: "bali",
        bookedFrom: "2026-10-17",
        bookedUntil: "2026-10-23",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-14",
        bookedUntil: "2026-10-20",
      },
      {
        locationId: "chiang-mai",
        bookedFrom: "2026-10-29",
        bookedUntil: "2026-10-30",
      },
    ],
  },
];

export const workspaceExtensions: WorkspaceExtension[] = [
  {
    id: "coffee-station",
    name: "Coffee Station",
    description:
      "Add a dedicated setup for coffee and refreshments.",
    items: [
      {
        id: "coffee-machine",
        name: "Coffee Machine",
        description:
          "Compact espresso machine for everyday coffee.",
        pricePerWeek: 10,
      },
      {
        id: "coffee-grinder",
        name: "Coffee Grinder",
        description:
          "Electric grinder for freshly ground coffee.",
        pricePerWeek: 5,
      },
      {
        id: "coffee-kettle",
        name: "Electric Kettle",
        description:
          "Temperature-controlled kettle for tea and pour-over coffee.",
        pricePerWeek: 4,
      },
    ],
  },

  {
    id: "outdoor-gear",
    name: "Outdoor Gear",
    description:
      "Create space for bikes, bags, and outdoor equipment.",
    items: [
      {
        id: "outdoor-motorcycle-rack",
        name: "Motorcycle Rack",
        description:
          "Compact rack for storing a motorcycle safely.",
        pricePerWeek: 8,
      },
      {
        id: "outdoor-bike-rack",
        name: "Bike Rack",
        description:
          "Wall-mounted rack for bicycles.",
        pricePerWeek: 4,
      },
      {
        id: "outdoor-storage-bench",
        name: "Outdoor Storage Bench",
        description:
          "Storage bench for helmets, shoes, and small gear.",
        pricePerWeek: 5,
      },
    ],
  },

  {
    id: "relax-zone",
    name: "Relax Zone",
    description:
      "Add furniture and essentials for taking a break.",
    items: [
      {
        id: "relax-floor-cushion",
        name: "Floor Cushion",
        description:
          "Soft cushion for comfortable floor seating.",
        pricePerWeek: 3,
      },
      {
        id: "relax-lounge-pillow",
        name: "Lounge Pillow",
        description:
          "Large pillow for additional comfort.",
        pricePerWeek: 2,
      },
      {
        id: "relax-side-table",
        name: "Side Table",
        description:
          "Small table for drinks, books, and personal items.",
        pricePerWeek: 4,
      },
    ],
  },

  {
    id: "garage-space",
    name: "Garage Space",
    description:
      "Organize tools, equipment, and larger items.",
    items: [
      {
        id: "garage-storage-rack",
        name: "Storage Rack",
        description:
          "Heavy-duty rack for tools and equipment.",
        pricePerWeek: 7,
      },
      {
        id: "garage-tool-board",
        name: "Tool Board",
        description:
          "Wall-mounted board for organizing hand tools.",
        pricePerWeek: 4,
      },
      {
        id: "garage-storage-box",
        name: "Storage Box",
        description:
          "Stackable box for smaller equipment and supplies.",
        pricePerWeek: 3,
      },
    ],
  },
];

export const workspaceLocations: WorkspaceLocation[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    currency: "USD",
  },
  {
    id: "chiang-mai",
    name: "Chiang Mai",
    country: "Thailand",
    currency: "USD",
  },
];

export const workspaceRentals: WorkspaceRental[] = [
  {
    id: "rental-001",
    productId: "desk-nordic-ascent",
    locationId: "bali",
    rentedFrom: "2026-10-05",
    rentedUntil: "2026-10-12",
  },
  {
    id: "rental-002",
    productId: "desk-nordic-ascent",
    locationId: "bali",
    rentedFrom: "2026-10-20",
    rentedUntil: "2026-10-25",
  },
  {
    id: "rental-003",
    productId: "chair-atlas-ergonomic",
    locationId: "chiang-mai",
    rentedFrom: "2026-10-10",
    rentedUntil: "2026-10-17",
  },
];