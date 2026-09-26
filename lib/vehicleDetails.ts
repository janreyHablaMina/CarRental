import { Vehicle } from "./vehicles";

export interface VehicleDetails {
  tagline: string;
  summary: string;
}

export const VEHICLE_DETAILS: Record<string, VehicleDetails> = {
  "lamborghini-huracan-evo": {
    tagline: "Atmospheric V10 // Corsa Dynamics & Titanium Exhaust",
    summary: "A naturally aspirated 5.2L V10 delivering 640 HP with predictive all-wheel drive, race-tuned suspension, and an unfiltered Italian supercar sound.",
  },
  "porsche-911-carrera-t": {
    tagline: "Pure Mechanical Purity // Active Suspension Dynamics",
    summary: "Stripped of superfluous weight and dialed for pure road engagement, pairing a 385 HP twin-turbo flat-six with a lightning-fast PDK gearbox.",
  },
  "rolls-royce-phantom-viii": {
    tagline: "The Pinnacle of Ultra-Luxury & Silent Flight",
    summary: "The definitive benchmark of chauffeured luxury, floating on magic carpet air suspension powered by a whisper-quiet 563 HP twin-turbo V12.",
  },
  "tesla-model-s-plaid": {
    tagline: "Sub-2-Second Acceleration // Tri-Motor Electric Power",
    summary: "Tri-motor all-wheel drive generating 1,020 HP with 1.99s 0–100 km/h acceleration, minimalist cockpit ergonomics, and ultra-fast charging.",
  },
  "range-rover-velar-r-dynamic": {
    tagline: "All-Terrain Prestige // British Avant-Garde Luxury",
    summary: "Contemporary design meets legendary all-weather capability, featuring 395 HP turbo inline-6 power and adaptive air suspension.",
  },
  "bmw-330i-m-sport": {
    tagline: "The Benchmark Sport Sedan // 50:50 Balance & M Agility",
    summary: "Communicative chassis response and punchy 255 HP turbocharged performance, engineered for sharp executive commuting and weekend touring.",
  },
  "mercedes-e-class-executive": {
    tagline: "First-Class Executive Comfort // Mild-Hybrid Refinement",
    summary: "Serene acoustic isolation and effortless cruising comfort powered by a 258 HP EQ Boost engine and ergonomic active seating.",
  },
  "toyota-gr-sport-hatch": {
    tagline: "Gazoo Racing Dynamics // Agile Urban & Mountain Tourer",
    summary: "Spirited handling and razor-sharp agility tuned with Gazoo Racing suspension, providing exceptional efficiency and nimble response.",
  },
  "nissan-altima-premium": {
    tagline: "Zero-Gravity Comfort // Advanced Direct-Injection Cruising",
    summary: "NASA-inspired zero gravity seating and whisper-smooth highway manners, providing fatigue-free long-distance travel across Luzon.",
  },
  "ferrari-f8-tributo": {
    tagline: "720 HP Twin-Turbo Italian Masterpiece // Maranello Aero",
    summary: "Maranello's celebrated 720 HP twin-turbo V8 with S-Duct aerodynamics, razor-sharp handling, and a blistering 2.9-second 0–100 km/h sprint.",
  },
  "aston-martin-dbs": {
    tagline: "Superleggera Grand Tourer // 715 HP Twin-Turbo V12",
    summary: "Sculpted carbon-fiber elegance with a 715 HP twin-turbo V12 and handcrafted leather cockpit for premier grand-touring presence.",
  },
  "porsche-cayenne-turbo-gt": {
    tagline: "Nürburgring Record-Holding Super SUV // Twin-Turbo V8",
    summary: "The apex performance SUV, pushing 631 HP with ceramic composite brakes, rear-axle steering, and sports car agility for 5 passengers.",
  },
};

export function getVehicleDetails(vehicle: Vehicle): VehicleDetails {
  if (VEHICLE_DETAILS[vehicle.id]) {
    return VEHICLE_DETAILS[vehicle.id];
  }
  return {
    tagline: `${vehicle.engine} // ${vehicle.category} Performance`,
    summary: `Premium ${vehicle.brand} ${vehicle.name} with ${vehicle.engine}, ${vehicle.transmission} transmission, and refined comfort for ${vehicle.seats} passengers.`,
  };
}
