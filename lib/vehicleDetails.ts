import { Vehicle } from "./vehicles";

export interface VehicleEditorial {
  tagline: string;
  origin: string;
  badge: string;
  drivetrain: string;
  topSpeed: string;
  fuelType: string;
  editorial: string[];
  highlights: string[];
}

export const VEHICLE_EDITORIAL_DATA: Record<string, VehicleEditorial> = {
  "lamborghini-huracan-evo": {
    tagline: "Naturally Aspirated V10 Symphony // Corsa Dynamics & Titanium Exhaust",
    origin: "Sant'Agata Bolognese, Italy",
    badge: "FLEET FLAGSHIP",
    drivetrain: "All-Wheel Drive (AWD)",
    topSpeed: "325 km/h",
    fuelType: "Ron 98+ Unleaded",
    editorial: [
      "The Lamborghini Huracán EVO is an engineering tour-de-force created for visceral road presence. Driven by a naturally aspirated 5.2-liter V10 that screams to an electrifying 8,500 RPM, it delivers an unfiltered grand-touring supercar experience whether carving through Subic mountain passes or staging a grand entrance in Bonifacio Global City.",
      "Equipped with Lamborghini Dinamica Veicolo Integrata (LDVI) predictive logic, magnetorheological suspension, and all-wheel steering, every millisecond of driving feel is amplified with surgical precision, tactile feedback, and Italian theatre."
    ],
    highlights: [
      "5.2L Naturally Aspirated V10 (640 HP)",
      "Lamborghini Dinamica Veicolo Integrata (LDVI)",
      "Active Magnetorheological Suspension",
      "Titanium Sport Exhaust with Dynamic Valves",
      "Carbon Ceramic High-Performance Brakes",
      "Aerospace Cockpit with 8.4-inch HMI Touchscreen"
    ],
  },
  "porsche-911-carrera-t": {
    tagline: "Pure Mechanical Purity // Active Suspension Dynamics & Rear-Engine Balance",
    origin: "Stuttgart-Zuffenhausen, Germany",
    badge: "TRACK HERITAGE",
    drivetrain: "Rear-Wheel Drive (RWD)",
    topSpeed: "291 km/h",
    fuelType: "Premium Gasoline",
    editorial: [
      "The 911 Carrera T embodies the purest essence of Porsche engineering. Stripped of superfluous weight and dialed for tactile road engagement, its 3.0-liter twin-turbocharged boxer six delivers an instantaneous 385 horsepower with surgical throttle response.",
      "Fitted with Porsche Active Suspension Management (PASM) Sport and a lightning-fast PDK transmission, the Carrera T provides an intimate, confidence-inspiring connection to the asphalt on winding coastal expressways and highland ribbons."
    ],
    highlights: [
      "3.0L Twin-Turbo Flat-Six Boxer (385 HP)",
      "PASM Sport Suspension with 10mm Ride Lowering",
      "Sport Chrono Package with Mode Switch Dial",
      "Porsche Torque Vectoring (PTV) Mechanical Lock",
      "Sport Exhaust with Black High-Gloss Tailpipes",
      "Lightweight Glass & Acoustic Insulation"
    ],
  },
  "rolls-royce-phantom-viii": {
    tagline: "The Pinnacle of Ultra-Luxury Transport & Silent Flight",
    origin: "Goodwood, West Sussex, England",
    badge: "VIP SOVEREIGN",
    drivetrain: "Rear-Wheel Drive (RWD)",
    topSpeed: "250 km/h (Governed)",
    fuelType: "Premium 98 Octane",
    editorial: [
      "Regarded worldwide as the benchmark of ultra-luxury motoring, the Rolls-Royce Phantom VIII floats across the pavement on a magic carpet ride powered by a whisper-quiet 6.75-liter twin-turbocharged V12. Its cabin is a sound-insulated sanctuary crafted with over 130 kilograms of acoustic damping.",
      "Surrounded by hand-stitched leather, lambswool floor mats, and the iconic starlight headliner, passengers enjoy peerless serenity, effortless road authority, and total privacy for executive travel, premier weddings, or diplomatic delegations."
    ],
    highlights: [
      "6.75L Twin-Turbocharged V12 (563 HP)",
      "Magic Carpet Air Suspension with Flagbearer Camera",
      "Bespoke Fiber-Optic Starlight Headliner",
      "Whisper-Quiet 6mm Double-Glazed Acoustic Glass",
      "Rear Theatre Entertainment with Handcrafted Wood Tables",
      "Satellite-Aided 8-Speed Automatic Transmission"
    ],
  },
  "tesla-model-s-plaid": {
    tagline: "Sub-2-Second Acceleration // Tri-Motor Torque Vectoring & Next-Gen Tech",
    origin: "Fremont, California, USA",
    badge: "ELECTRIC HYPERCAR",
    drivetrain: "Tri-Motor All-Wheel Drive",
    topSpeed: "322 km/h",
    fuelType: "100 kWh Electric (Supercharging Ready)",
    editorial: [
      "The Tesla Model S Plaid redefines the physical limits of automotive performance. Utilizing a tri-motor all-wheel-drive powertrain equipped with carbon-sleeved rotors, it catapults from 0 to 100 km/h in an astonishing 1.99 seconds without pause.",
      "Inside, the minimalist cockpit features a cinematic 17-inch touchscreen, tri-zone climate controls with HEPA air filtration, and an expansive glass panoramic canopy, making every journey through the Philippine archipelago both effortless and futuristic."
    ],
    highlights: [
      "Tri-Motor Electric Powertrain (1,020 HP)",
      "Carbon-Sleeved High-RPM Electric Rotors",
      "17-Inch Cinematic Touchscreen Display (2200x1300)",
      "HEPA Bioweapon Defense Air Filtration",
      "Ultra-Low 0.208 Drag Coefficient Chassis",
      "22-Speaker 960W Audio with Active Noise Reduction"
    ],
  },
  "range-rover-velar-r-dynamic": {
    tagline: "All-Terrain Prestige // British High-Performance Avant-Garde",
    origin: "Solihull, United Kingdom",
    badge: "PREMIUM CONCIERGE SUV",
    drivetrain: "Intelligent All-Wheel Drive (AWD)",
    topSpeed: "250 km/h",
    fuelType: "Mild-Hybrid Petrol",
    editorial: [
      "The Range Rover Velar R-Dynamic strikes the perfect equilibrium between contemporary modernist design and legendary British off-road capability. With flush deployable door handles, sculpted silhouette, and intelligent all-wheel drive, the Velar glides through city traffic and provincial highways with equal poise.",
      "Passengers enjoy panoramic views, Meridian 3D surround sound, and adaptive air suspension that smooths every road imperfection, making it the premier choice for luxury family getaways and coastal excursions."
    ],
    highlights: [
      "395 HP Turbocharged Inline-6 with MHEV Assist",
      "Electronic Air Suspension with Adaptive Dynamics",
      "Meridian 3D Surround Audio System",
      "Pivi Pro Dual Touchscreen Infotainment",
      "Flush Deployable Aerodynamic Door Handles",
      "Terrain Response 2 All-Weather Driving Modes"
    ],
  },
  "bmw-330i-m-sport": {
    tagline: "The Benchmark Sport Sedan // 50:50 Weight Distribution & M-Sport Agility",
    origin: "Munich, Bavaria, Germany",
    badge: "M-SPORT PERFORMANCE",
    drivetrain: "Rear-Wheel Drive (RWD)",
    topSpeed: "250 km/h",
    fuelType: "Premium Gasoline",
    editorial: [
      "Renowned as the definitive driver's sedan, the BMW 330i M Sport delivers razor-sharp steering, an athletic stance, and communicative chassis response. Its 2.0-liter TwinPower Turbo engine pairs with an 8-speed Steptronic Sport transmission for punchy mid-range acceleration.",
      "Featuring M Sport brakes, aerodynamic styling, and the expansive BMW Curved Display with Operating System 8, it is the quintessential daily executive touring machine for high-paced provincial commutes and corporate travel."
    ],
    highlights: [
      "2.0L TwinPower Turbocharged 4-Cylinder (255 HP)",
      "M Sport Variable Sport Steering & Tuned Suspension",
      "M Aerodynamics Package & High-Gloss Shadowline",
      "BMW Curved Display with OS 8 & Live Cockpit Pro",
      "Wireless Apple CarPlay & Android Auto",
      "Harman Kardon Surround Sound System"
    ],
  },
  "mercedes-e-class-executive": {
    tagline: "First-Class Executive Comfort // EQ Boost Mild-Hybrid Refinement",
    origin: "Stuttgart, Germany",
    badge: "EXECUTIVE SALOON",
    drivetrain: "Rear-Wheel Drive (RWD)",
    topSpeed: "250 km/h",
    fuelType: "Mild-Hybrid Gasoline",
    editorial: [
      "The Mercedes-Benz E-Class Executive represents the gold standard of business travel and diplomat transport. Combining serene acoustic isolation with an intelligent EQ Boost powertrain, the E-Class turns long provincial commutes into moments of calm productivity.",
      "Ergonomic seating with active lumbar support, 64-color ambient lighting, and the MBUX digital widescreen cockpit complete this peerless executive lounge on wheels."
    ],
    highlights: [
      "258 HP Turbocharged Engine with EQ Boost Electrification",
      "Agility Control Suspension with Selective Damping",
      "MBUX Dual 12.3-Inch Widescreen Cockpit",
      "64-Color Ambient Interior Lighting",
      "Active Brake Assist & Blind Spot Monitoring",
      "Burmester Surround Sound System"
    ],
  },
  "toyota-gr-sport-hatch": {
    tagline: "Gazoo Racing Dynamics // Agile Urban & Mountain Road Tourer",
    origin: "Toyota City, Japan",
    badge: "GAZOO RACING TUNED",
    drivetrain: "Front-Wheel Drive (FWD)",
    topSpeed: "205 km/h",
    fuelType: "Unleaded Regular / Premium",
    editorial: [
      "Born from Toyota's championship Gazoo Racing heritage, the GR Sport Hatch brings spirited handling and razor-sharp agility to every turn. Lightweight and remarkably responsive, its retuned suspension and Direct-Shift CVT deliver eager performance while maintaining exemplary fuel efficiency.",
      "Perfect for navigating tight island corridors, weekend getaways to Baguio, or brisk metropolitan sprints through Metro Manila."
    ],
    highlights: [
      "170 HP Dynamic Force 2.0L Engine",
      "GR-Tuned Sport Suspension & Underbody Bracing",
      "Direct-Shift CVT with 10-Speed Sport Sequential Mode",
      "18-Inch Machined Alloy GR Wheels",
      "Toyota Safety Sense Active Driver Suite",
      "Sport Front Bucket Seats with GR Badging"
    ],
  },
  "nissan-altima-premium": {
    tagline: "Zero-Gravity Comfort // Advanced Direct-Injection Cruising",
    origin: "Tochigi, Japan",
    badge: "PREMIUM TOURING",
    drivetrain: "Front-Wheel Drive (FWD)",
    topSpeed: "210 km/h",
    fuelType: "Unleaded Gasoline",
    editorial: [
      "The Nissan Altima Premium combines executive refinement with whisper-smooth highway cruising. Equipped with Nissan's patented Zero Gravity front seats inspired by NASA ergonomics, it minimizes driving fatigue during extended journeys across North and South Luzon.",
      "Its quiet cabin, intuitive driver-assist technologies, and responsive Xtronic transmission make it an exceptional choice for family outings and business trips alike."
    ],
    highlights: [
      "2.5L Direct Injection Gasoline Engine (188 HP)",
      "NASA-Inspired Zero Gravity Ergonomic Seats",
      "Nissan Safety Shield 360 with Predictive Braking",
      "Bose Premium 9-Speaker Audio System",
      "Intelligent Trace & Active Ride Control",
      "Acoustic Laminated Windshield Glass"
    ],
  },
  "ferrari-f8-tributo": {
    tagline: "720 HP Twin-Turbo Italian Masterpiece // Maranello Aerodynamics",
    origin: "Maranello, Italy",
    badge: "SUPERCAR SUPREME",
    drivetrain: "Rear-Wheel Drive (RWD)",
    topSpeed: "340 km/h",
    fuelType: "High-Octane Racing Fuel / Premium 98",
    editorial: [
      "The Ferrari F8 Tributo is a supreme celebration of Maranello's most powerful V8 engine in history. Producing 720 horsepower with zero turbo lag, it roars from 0 to 100 km/h in an electrifying 2.9 seconds.",
      "Incorporating the S-Duct aerodynamic nose and Ferrari Dynamic Enhancer (FDE+), the F8 delivers razor-sharp handling limits and breathtaking theater, making it an unforgettable centerpiece for grand arrivals and VIP track excursions."
    ],
    highlights: [
      "3.9L Award-Winning Twin-Turbo V8 (720 HP)",
      "Ferrari Dynamic Enhancer (FDE+) & Side Slip Control 6.1",
      "S-Duct Front Aerodynamic Downforce Channel",
      "Carbon Ceramic High-Performance Braking System",
      "Dual Cockpit Interior with Passenger Display",
      "Titanium Sport Exhaust with Maranello Sound Tuning"
    ],
  },
  "aston-martin-dbs": {
    tagline: "Superleggera Grand Tourer // 715 HP Twin-Turbo V12 Elegance",
    origin: "Gaydon, Warwickshire, England",
    badge: "BESPOKE GT",
    drivetrain: "Rear-Wheel Drive (RWD)",
    topSpeed: "340 km/h",
    fuelType: "High-Octane Premium Gasoline",
    editorial: [
      "Sculpted from carbon fiber and steeped in British motorsport legacy, the Aston Martin DBS Superleggera is a magnificent beast in a bespoke tailored suit. Its 5.2-liter twin-turbocharged V12 generates 715 horsepower and a monumental 900 Nm of torque, surging forward with intoxicating authority.",
      "Handcrafted Bridge of Weir leather, Alcantara headlining, and Bang & Olufsen acoustic audio create an opulent cabin suited for the most distinguished travelers."
    ],
    highlights: [
      "5.2L Twin-Turbocharged V12 (715 HP, 900 Nm)",
      "Carbon-Fiber Sculpted Body Panels",
      "Aeroblade II Aerodynamic Downforce System",
      "Adaptive Damping System with 3 Dynamic Modes",
      "Handcrafted Bridge of Weir Leather Interior",
      "Bang & Olufsen BeoSound High-Fidelity Audio"
    ],
  },
  "porsche-cayenne-turbo-gt": {
    tagline: "Nürburgring Record-Holding Super SUV // Twin-Turbo V8 Dominance",
    origin: "Stuttgart / Leipzig, Germany",
    badge: "HYPER SUV",
    drivetrain: "Porsche Traction Management AWD",
    topSpeed: "300 km/h",
    fuelType: "Premium Gasoline",
    editorial: [
      "The Porsche Cayenne Turbo GT reigns supreme as the undisputed king of performance SUVs. Clocking record lap times on the Nürburgring Nordschleife, its 4.0-liter twin-turbo V8 churns out 631 horsepower with a blistering 3.3-second 0–100 km/h sprint.",
      "With standard Porsche Ceramic Composite Brakes (PCCB), rear-axle steering, and titanium center exhaust, it defies the laws of physics while comfortably accommodating five passengers and their luggage."
    ],
    highlights: [
      "4.0L Twin-Turbo V8 (631 HP, 850 Nm)",
      "Porsche Ceramic Composite Brakes (PCCB)",
      "Rear-Axle Steering with Power Steering Plus",
      "Titanium Center-Exit Sport Exhaust System",
      "Active Carbon-Fiber Roof & Aerodynamic Spoiler",
      "Race-Tex Interior with Contrasting GT Stitching"
    ],
  },
};

export function getVehicleEditorial(vehicle: Vehicle): VehicleEditorial {
  if (VEHICLE_EDITORIAL_DATA[vehicle.id]) {
    return VEHICLE_EDITORIAL_DATA[vehicle.id];
  }

  // Fallback generation for any custom vehicle added in the future
  return {
    tagline: `${vehicle.engine} // High-Performance ${vehicle.category} Dynamics`,
    origin: `${vehicle.brand} Engineering`,
    badge: vehicle.featured ? "FLEET FLAGSHIP" : `${vehicle.category.toUpperCase()} EDITION`,
    drivetrain: vehicle.category === "SUV" || vehicle.category === "Sports" ? "All-Wheel Drive (AWD)" : "Rear-Wheel Drive (RWD)",
    topSpeed: "250+ km/h",
    fuelType: "Premium Gasoline",
    editorial: [
      `The ${vehicle.brand} ${vehicle.name} delivers exceptional ${vehicle.category.toLowerCase()} performance and road presence. Precision-tuned with an exhilarating ${vehicle.engine} and seamless ${vehicle.transmission} transmission, it is prepared to elevate every kilometer of your journey.`,
      `From executive city arrivals to long provincial tours across Luzon and the Visayas, the ${vehicle.name} guarantees unwavering refinement, advanced driver ergonomics, and effortless power delivery.`
    ],
    highlights: [
      `${vehicle.engine} Power Unit`,
      `${vehicle.transmission} Gearbox`,
      `0-100 km/h in ${vehicle.acceleration}`,
      `Luxury Ergonomic Cockpit for ${vehicle.seats} Passengers`,
      `Apple CarPlay & Modern Telemetry Infotainment`,
      `DriveX Pre-Inspected Performance Audit`
    ],
  };
}
