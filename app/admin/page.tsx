"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Star,
  ArrowUpRight,
  CalendarCheck,
  Car,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Edit3,
  ExternalLink,
  Filter,
  Key,
  LayoutDashboard,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";
import "./admin.css";

type VehicleStatus = "available" | "rented" | "maintenance";
type BookingStatus = "confirmed" | "active" | "pending" | "completed";

export interface DestinationPrice {
  id: string;
  route: string;
  price: number;
}

export interface AdminVehicle {
  id: string;
  name: string;
  brand: string;
  category: string;
  plate: string;
  images: string[];
  destinations: DestinationPrice[];
  status: VehicleStatus;
  trips: number;
}

interface AdminBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
  status: BookingStatus;
}

interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  verified: boolean;
  totalBookings: number;
  totalSpent: number;
}

const INITIAL_VEHICLES: AdminVehicle[] = [
  {
    id: "v-1",
    name: "Huracán EVO",
    brand: "Lamborghini",
    category: "Sports",
    plate: "DX-8890",
    images: ["/images/fleet-sports-huracan.jpg"],
    destinations: [
      { id: "c6ffd5bb-b085-4384-8961-db90654ef155", route: "Pampanga to Zambales", price: 28000 },
      { id: "a899908a-c7f8-4b5d-8254-0e5435a8a8d3", route: "Pampanga to Pangasinan", price: 28300 }
    ],
    status: "rented",
    trips: 42,
  },
  {
    id: "v-2",
    name: "911 Carrera T",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9911",
    images: ["/images/fleet-porsche.jpg"],
    destinations: [
      { id: "5741c3f8-ee7e-44a2-a1f3-dda7b44acf6a", route: "Pampanga to Zambales", price: 18500 },
      { id: "70922e8f-be28-4361-9907-3ddbcc2d4ca2", route: "Pampanga to Pangasinan", price: 18800 }
    ],
    status: "available",
    trips: 68,
  },
  {
    id: "v-3",
    name: "Phantom VIII",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7700",
    images: ["/images/fleet-rolls.jpg"],
    destinations: [
      { id: "7f4afbcd-d1a3-4dd7-9777-765db834c812", route: "Pampanga to Zambales", price: 35000 },
      { id: "dbdcf78f-30cb-47c7-89f8-2bc878fc56ef", route: "Pampanga to Pangasinan", price: 35300 }
    ],
    status: "rented",
    trips: 24,
  },
  {
    id: "v-4",
    name: "Model S Plaid",
    brand: "Tesla",
    category: "Luxury",
    plate: "DX-1020",
    images: ["/images/fleet-tesla.jpg"],
    destinations: [
      { id: "dab82c4c-64a6-41e3-86b1-168997229edb", route: "Pampanga to Zambales", price: 12500 },
      { id: "0e577c27-a825-425a-a4f3-a5d08672bba5", route: "Pampanga to Pangasinan", price: 12800 }
    ],
    status: "available",
    trips: 84,
  },
  {
    id: "v-5",
    name: "Velar R-Dynamic",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5521",
    images: ["/images/fleet-suv-velar.jpg"],
    destinations: [
      { id: "1c925ae5-0c86-4473-a573-311292a02d0c", route: "Pampanga to Zambales", price: 8500 },
      { id: "9281ed7c-71d5-4a62-8e37-3f13e5aaa4f6", route: "Pampanga to Pangasinan", price: 8800 }
    ],
    status: "available",
    trips: 53,
  },
  {
    id: "v-6",
    name: "330i M Sport",
    brand: "BMW",
    category: "Sedan",
    plate: "DX-3300",
    images: ["/images/fleet-bmw.jpg"],
    destinations: [
      { id: "e63c099b-b966-43af-bef6-d80c9ec53d64", route: "Pampanga to Zambales", price: 5500 },
      { id: "97be5e24-ea27-4c2f-a6a4-beaff16cd2d7", route: "Pampanga to Pangasinan", price: 5800 }
    ],
    status: "rented",
    trips: 92,
  },
  {
    id: "v-7",
    name: "E-Class Executive",
    brand: "Mercedes-Benz",
    category: "Sedan",
    plate: "DX-2130",
    images: ["/images/fleet-mercedes.jpg"],
    destinations: [
      { id: "d9e43501-e7ce-4cdb-9ee6-e4284d94afa6", route: "Pampanga to Zambales", price: 6800 },
      { id: "a147d75e-d84a-42bd-9ddd-90568b9a5658", route: "Pampanga to Pangasinan", price: 7100 }
    ],
    status: "available",
    trips: 76,
  },
  {
    id: "v-8",
    name: "GR Sport Hatch",
    brand: "Toyota",
    category: "Economy",
    plate: "DX-1844",
    images: ["/images/fleet-toyota.jpg"],
    destinations: [
      { id: "fe1f1a14-ae51-4585-b3c8-2bbd26d273bd", route: "Pampanga to Zambales", price: 2200 },
      { id: "c4722d2d-2d1f-4982-938e-49312d1359ff", route: "Pampanga to Pangasinan", price: 2500 }
    ],
    status: "available",
    trips: 124,
  },
  {
    id: "v-9",
    name: "Altima Premium",
    brand: "Nissan",
    category: "Economy",
    plate: "DX-4912",
    images: ["/images/fleet-nissan.jpg"],
    destinations: [
      { id: "b9ad920b-8209-44e8-9bfd-26571c062533", route: "Pampanga to Zambales", price: 2800 },
      { id: "1ca49bd9-a065-4648-a6ca-510fe046f048", route: "Pampanga to Pangasinan", price: 3100 }
    ],
    status: "maintenance",
    trips: 89,
  },
  {
    id: "v-10",
    name: "911 GT3 RS",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9110",
    images: ["/images/fleet-porsche.jpg"],
    destinations: [
      { id: "5115feef-4873-4005-9992-18bd65589886", route: "Pampanga to Zambales", price: 32000 },
      { id: "f163ae84-a8b2-4f94-854b-6359101bcb71", route: "Pampanga to Pangasinan", price: 32300 }
    ],
    status: "available",
    trips: 31,
  },
  {
    id: "v-11",
    name: "Ghost Extended",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7788",
    images: ["/images/fleet-rolls.jpg"],
    destinations: [
      { id: "33b57ad3-fa59-4a4d-aeb9-3263675e58d8", route: "Pampanga to Zambales", price: 38000 },
      { id: "0bbe1acf-ced3-477b-843e-4430c7d5ccd4", route: "Pampanga to Pangasinan", price: 38300 }
    ],
    status: "available",
    trips: 19,
  },
  {
    id: "v-12",
    name: "Defender 110 V8",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5580",
    images: ["/images/fleet-suv-velar.jpg"],
    destinations: [
      { id: "7197b578-6a28-4d4d-bf20-060f7cc202fb", route: "Pampanga to Zambales", price: 11000 },
      { id: "64cc13bd-2ad2-4198-82ec-b27a687acf7a", route: "Pampanga to Pangasinan", price: 11300 }
    ],
    status: "rented",
    trips: 65,
  },
  {
    id: "v-13",
    name: "M5 Competition",
    brand: "BMW",
    category: "Sedan",
    plate: "DX-3550",
    images: ["/images/fleet-bmw.jpg"],
    destinations: [
      { id: "a7cdbead-53e7-4ef7-999e-606a73ed66b9", route: "Pampanga to Zambales", price: 14500 },
      { id: "52b8ba51-49cf-40ab-accc-4ca3d9ae87ce", route: "Pampanga to Pangasinan", price: 14800 }
    ],
    status: "available",
    trips: 47,
  },
  {
    id: "v-14",
    name: "Corolla Cross HEV",
    brand: "Toyota",
    category: "Economy",
    plate: "DX-1920",
    images: ["/images/fleet-toyota.jpg"],
    destinations: [
      { id: "2a1baa28-c758-4753-8844-d0adbe7b9839", route: "Pampanga to Zambales", price: 2500 },
      { id: "e2877b65-b3f5-41f0-8354-f2f3c99ec854", route: "Pampanga to Pangasinan", price: 2800 }
    ],
    status: "available",
    trips: 110,
  },
  {
    id: "v-15",
    name: "Huracán STO",
    brand: "Lamborghini",
    category: "Sports",
    plate: "DX-8822",
    images: ["/images/fleet-sports-huracan.jpg"],
    destinations: [
      { id: "9f8cddce-de07-4635-af50-d674fe27c95a", route: "Pampanga to Zambales", price: 42000 },
      { id: "502403e4-e035-422b-ac6e-6c3302adcd9f", route: "Pampanga to Pangasinan", price: 42300 }
    ],
    status: "maintenance",
    trips: 18,
  },
  {
    id: "v-16",
    name: "Cullinan Black Badge",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7744",
    images: ["/images/fleet-rolls.jpg"],
    destinations: [
      { id: "061ca6f3-2669-4212-aaab-792f64213195", route: "Pampanga to Zambales", price: 45000 },
      { id: "41aa8e2f-5773-4323-aa1b-ad36e5cbbde3", route: "Pampanga to Pangasinan", price: 45300 }
    ],
    status: "rented",
    trips: 29,
  },
  {
    id: "v-17",
    name: "Range Rover Sport",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5599",
    images: ["/images/fleet-suv-velar.jpg"],
    destinations: [
      { id: "4bb24569-8b88-4560-8645-b18e349b528e", route: "Pampanga to Zambales", price: 13500 },
      { id: "e8a257fc-1886-4bbd-9f74-1bb10353f3e3", route: "Pampanga to Pangasinan", price: 13800 }
    ],
    status: "available",
    trips: 58,
  },
  {
    id: "v-18",
    name: "S-Class 580 Maybach",
    brand: "Mercedes-Benz",
    category: "Sedan",
    plate: "DX-2255",
    images: ["/images/fleet-mercedes.jpg"],
    destinations: [
      { id: "f63e85a4-faee-44f5-9c25-a137a52030b4", route: "Pampanga to Zambales", price: 22000 },
      { id: "0013df16-c052-4e35-8b0f-83cae1f61f91", route: "Pampanga to Pangasinan", price: 22300 }
    ],
    status: "rented",
    trips: 38,
  },
  {
    id: "v-19",
    name: "Sentra SR Turbo",
    brand: "Nissan",
    category: "Economy",
    plate: "DX-4888",
    images: ["/images/fleet-nissan.jpg"],
    destinations: [
      { id: "969cd65a-951c-4d11-b6ec-7adeb29b6a7b", route: "Pampanga to Zambales", price: 2400 },
      { id: "35d268b3-abde-4c6a-b950-fdc3c5ff1736", route: "Pampanga to Pangasinan", price: 2700 }
    ],
    status: "available",
    trips: 95,
  },
  {
    id: "v-20",
    name: "718 Cayman GTS",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9718",
    images: ["/images/fleet-porsche.jpg"],
    destinations: [
      { id: "c1bdab0e-c659-49e0-aee0-44bf7b677631", route: "Pampanga to Zambales", price: 16000 },
      { id: "02e74062-7f67-453d-8f0f-54890fb84a53", route: "Pampanga to Pangasinan", price: 16300 }
    ],
    status: "available",
    trips: 72,
  },
  {
    id: "v-21",
    name: "Model X Plaid",
    brand: "Tesla",
    category: "Luxury",
    plate: "DX-1088",
    images: ["/images/fleet-tesla.jpg"],
    destinations: [
      { id: "e7e980f6-528b-4680-bea1-57a2c89c2e87", route: "Pampanga to Zambales", price: 14500 },
      { id: "d65d1ad7-23e4-4353-82eb-cf45aef89d86", route: "Pampanga to Pangasinan", price: 14800 }
    ],
    status: "available",
    trips: 61,
  },
  {
    id: "v-22",
    name: "Discovery Metropolitan",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5544",
    images: ["/images/fleet-suv-velar.jpg"],
    destinations: [
      { id: "27ae92ec-07b2-444d-8522-96d3aecf2bd2", route: "Pampanga to Zambales", price: 9800 },
      { id: "f2e8e8c7-0ade-4f76-b4fc-53ac591b2791", route: "Pampanga to Pangasinan", price: 10100 }
    ],
    status: "maintenance",
    trips: 44,
  },
  {
    id: "v-23",
    name: "M3 Competition",
    brand: "BMW",
    category: "Sedan",
    plate: "DX-3388",
    images: ["/images/fleet-bmw.jpg"],
    destinations: [
      { id: "743d09e9-eeb0-4a4e-9177-b92c6a6e96f0", route: "Pampanga to Zambales", price: 11500 },
      { id: "ebeb3320-ff9e-443e-8bfb-2712714efae9", route: "Pampanga to Pangasinan", price: 11800 }
    ],
    status: "rented",
    trips: 83,
  },
  {
    id: "v-24",
    name: "GR Yaris Circuit",
    brand: "Toyota",
    category: "Economy",
    plate: "DX-1899",
    images: ["/images/fleet-toyota.jpg"],
    destinations: [
      { id: "37db979e-2880-44bf-9dc4-53293d047f6e", route: "Pampanga to Zambales", price: 3200 },
      { id: "82b229c4-9384-4d59-9f6f-b2aa7879f15e", route: "Pampanga to Pangasinan", price: 3500 }
    ],
    status: "available",
    trips: 102,
  },
  {
    id: "v-25",
    name: "Aventador SVJ",
    brand: "Lamborghini",
    category: "Sports",
    plate: "DX-8801",
    images: ["/images/fleet-sports-huracan.jpg"],
    destinations: [
      { id: "c8fe8020-ae30-4259-bd94-b2299f16b57a", route: "Pampanga to Zambales", price: 52000 },
      { id: "2bc783d2-de25-4860-94eb-e605b905846e", route: "Pampanga to Pangasinan", price: 52300 }
    ],
    status: "rented",
    trips: 15,
  },
  {
    id: "v-26",
    name: "Spectre EV Coupe",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7799",
    images: ["/images/fleet-rolls.jpg"],
    destinations: [
      { id: "b8dfe779-7569-4a3b-a330-768305fd05a9", route: "Pampanga to Zambales", price: 48000 },
      { id: "9c78ca4d-c2a2-4c22-913c-0c5a2579fdc0", route: "Pampanga to Pangasinan", price: 48300 }
    ],
    status: "available",
    trips: 12,
  },
  {
    id: "v-27",
    name: "Defender 90 Trophy",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5511",
    images: ["/images/fleet-suv-velar.jpg"],
    destinations: [
      { id: "bac172d2-4a2b-4e3d-a342-cad6f597f5e9", route: "Pampanga to Zambales", price: 10500 },
      { id: "bb9ba5b1-3977-4225-a357-8e91e4242788", route: "Pampanga to Pangasinan", price: 10800 }
    ],
    status: "available",
    trips: 39,
  },
  {
    id: "v-28",
    name: "C-Class AMG Line",
    brand: "Mercedes-Benz",
    category: "Sedan",
    plate: "DX-2188",
    images: ["/images/fleet-mercedes.jpg"],
    destinations: [
      { id: "0b77cf0f-71b4-4826-b0e6-5a5f9f2ca817", route: "Pampanga to Zambales", price: 5800 },
      { id: "253cb81c-9089-4819-83a0-c4bc377d1a0d", route: "Pampanga to Pangasinan", price: 6100 }
    ],
    status: "available",
    trips: 88,
  },
  {
    id: "v-29",
    name: "Kicks e-Power Sport",
    brand: "Nissan",
    category: "Economy",
    plate: "DX-4955",
    images: ["/images/fleet-nissan.jpg"],
    destinations: [
      { id: "2a543953-6024-4e76-9c87-004ebf78b8a5", route: "Pampanga to Zambales", price: 2600 },
      { id: "bb94027e-faac-4e04-a5f9-76b16f69a447", route: "Pampanga to Pangasinan", price: 2900 }
    ],
    status: "available",
    trips: 115,
  },
  {
    id: "v-30",
    name: "Taycan Turbo S",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9950",
    images: ["/images/fleet-porsche.jpg"],
    destinations: [
      { id: "ef980c2d-b95d-4a51-b73d-f1adb2819f55", route: "Pampanga to Zambales", price: 26000 },
      { id: "fb700f33-c11d-4bfb-a1ce-5957c5fffc92", route: "Pampanga to Pangasinan", price: 26300 }
    ],
    status: "maintenance",
    trips: 27,
  },
];

const INITIAL_BOOKINGS: AdminBooking[] = [
  {
    id: "DX-9401",
    customerName: "Carlos Mendoza",
    customerEmail: "carlos.mendoza@gmail.com",
    carName: "Lamborghini Huracán EVO",
    carImage: "/images/fleet-sports-huracan.jpg",
    startDate: "2026-09-22",
    endDate: "2026-09-25",
    days: 3,
    totalPrice: 84000,
    status: "active",
  },
  {
    id: "DX-9402",
    customerName: "Sophia Lauren Rivera",
    customerEmail: "sophia.rivera@enterprise.ph",
    carName: "Rolls-Royce Phantom VIII",
    carImage: "/images/fleet-rolls.jpg",
    startDate: "2026-09-23",
    endDate: "2026-09-24",
    days: 1,
    totalPrice: 35000,
    status: "confirmed",
  },
  {
    id: "DX-9403",
    customerName: "Marcus Vance",
    customerEmail: "mvance@techcorp.io",
    carName: "BMW 330i M Sport",
    carImage: "/images/fleet-bmw.jpg",
    startDate: "2026-09-21",
    endDate: "2026-09-26",
    days: 5,
    totalPrice: 27500,
    status: "active",
  },
  {
    id: "DX-9404",
    customerName: "Elena Tan-Reyes",
    customerEmail: "elena.reyes@primecapital.com",
    carName: "Porsche 911 Carrera T",
    carImage: "/images/fleet-porsche.jpg",
    startDate: "2026-09-28",
    endDate: "2026-10-01",
    days: 3,
    totalPrice: 55500,
    status: "pending",
  },
  {
    id: "DX-9405",
    customerName: "Derrick Armstrong",
    customerEmail: "d.armstrong@global.sg",
    carName: "Range Rover Velar R-Dynamic",
    carImage: "/images/fleet-suv-velar.jpg",
    startDate: "2026-09-15",
    endDate: "2026-09-19",
    days: 4,
    totalPrice: 34000,
    status: "completed",
  },
  {
    id: "DX-9406",
    customerName: "Alexander Wright",
    customerEmail: "a.wright@solaris.co",
    carName: "Tesla Model S Plaid",
    carImage: "/images/fleet-tesla.jpg",
    startDate: "2026-09-24",
    endDate: "2026-09-26",
    days: 2,
    totalPrice: 25000,
    status: "confirmed",
  },
  {
    id: "DX-9407",
    customerName: "Beatrice Gomez",
    customerEmail: "bgomez@luxuryescapes.ph",
    carName: "Mercedes-Benz E-Class",
    carImage: "/images/fleet-mercedes.jpg",
    startDate: "2026-09-27",
    endDate: "2026-10-04",
    days: 7,
    totalPrice: 47600,
    status: "pending",
  },
  {
    id: "DX-9408",
    customerName: "Liam Montgomery",
    customerEmail: "liam.mont@apexcapital.hk",
    carName: "Porsche 911 GT3 RS",
    carImage: "/images/fleet-porsche.jpg",
    startDate: "2026-09-20",
    endDate: "2026-09-22",
    days: 2,
    totalPrice: 64000,
    status: "active",
  },
  {
    id: "DX-9409",
    customerName: "Hannah Chen",
    customerEmail: "hchen@creativestudio.sg",
    carName: "Toyota GR Sport Hatch",
    carImage: "/images/fleet-toyota.jpg",
    startDate: "2026-09-12",
    endDate: "2026-09-15",
    days: 3,
    totalPrice: 6600,
    status: "completed",
  },
  {
    id: "DX-9410",
    customerName: "Gabriel Santos",
    customerEmail: "gsantos@metroventures.com",
    carName: "Rolls-Royce Ghost Extended",
    carImage: "/images/fleet-rolls.jpg",
    startDate: "2026-09-25",
    endDate: "2026-09-29",
    days: 4,
    totalPrice: 152000,
    status: "confirmed",
  },
  {
    id: "DX-9411",
    customerName: "Natasha Romanoff",
    customerEmail: "n.romanoff@shield.io",
    carName: "Defender 110 V8",
    carImage: "/images/fleet-suv-velar.jpg",
    startDate: "2026-09-30",
    endDate: "2026-10-05",
    days: 5,
    totalPrice: 55000,
    status: "pending",
  },
  {
    id: "DX-9412",
    customerName: "Julian Mercado",
    customerEmail: "jmercado@nexus-tech.ph",
    carName: "BMW M5 Competition",
    carImage: "/images/fleet-bmw.jpg",
    startDate: "2026-09-17",
    endDate: "2026-09-19",
    days: 2,
    totalPrice: 29000,
    status: "completed",
  },
];

const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: "c-1",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@gmail.com",
    phone: "+63 917 842 1920",
    licenseNumber: "N02-18-928194",
    verified: true,
    totalBookings: 6,
    totalSpent: 312000,
  },
  {
    id: "c-2",
    name: "Sophia Lauren Rivera",
    email: "sophia.rivera@enterprise.ph",
    phone: "+63 920 551 8832",
    licenseNumber: "N01-20-449102",
    verified: true,
    totalBookings: 4,
    totalSpent: 175000,
  },
  {
    id: "c-3",
    name: "Marcus Vance",
    email: "mvance@techcorp.io",
    phone: "+63 918 332 9901",
    licenseNumber: "N14-19-002914",
    verified: true,
    totalBookings: 8,
    totalSpent: 168000,
  },
  {
    id: "c-4",
    name: "Elena Tan-Reyes",
    email: "elena.reyes@primecapital.com",
    phone: "+63 917 114 7720",
    licenseNumber: "N03-21-391823",
    verified: false,
    totalBookings: 1,
    totalSpent: 55500,
  },
  {
    id: "c-5",
    name: "Derrick Armstrong",
    email: "d.armstrong@global.sg",
    phone: "+65 8291 0023",
    licenseNumber: "SG-8849201-B",
    verified: true,
    totalBookings: 5,
    totalSpent: 198000,
  },
];

const OPS_METADATA: Record<string, {
  window: string;
  timeRemaining: string;
  urgency: "urgent" | "soon" | "normal";
  bay: string;
  notes: string;
  phone?: string;
}> = {
  "bk-01": {
    window: "Today 5:30 PM",
    timeRemaining: "Due in ~3h 45m",
    urgency: "soon",
    bay: "Valet Bay 2 (VIP Reception)",
    notes: "VIP Renter · Fuel tank pre-paid",
    phone: "+63 917 889 2041",
  },
  "bk-03": {
    window: "Today 7:00 PM",
    timeRemaining: "Due in ~5h 15m",
    urgency: "soon",
    bay: "Valet Bay 1 (Main Concierge)",
    notes: "Chauffeur drop-off requested",
    phone: "+63 920 441 9920",
  },
  "bk-08": {
    window: "Tomorrow 11:00 AM",
    timeRemaining: "Due in ~24 hours",
    urgency: "normal",
    bay: "Valet Bay 3 (Express Intake)",
    notes: "Highway mileage audit required",
    phone: "+63 918 552 1109",
  },
  "bk-02": {
    window: "Today 2:30 PM",
    timeRemaining: "Departs in ~45 mins",
    urgency: "urgent",
    bay: "Dispatch Bay A",
    notes: "Ceramic detailing passed · Keys staged",
    phone: "+63 919 332 7781",
  },
  "bk-06": {
    window: "Today 4:15 PM",
    timeRemaining: "Departs in ~2h 30m",
    urgency: "soon",
    bay: "Dispatch Bay B",
    notes: "Full tank sanitized · Keycard programmed",
    phone: "+63 922 881 4059",
  },
  "bk-10": {
    window: "Tomorrow 9:00 AM",
    timeRemaining: "Scheduled Tomorrow",
    urgency: "normal",
    bay: "Staging Bay C",
    notes: "Interior leather conditioning complete",
    phone: "+63 915 772 3341",
  },
};

const MAINTENANCE_METADATA: Record<string, {
  service: string;
  bay: string;
  eta: string;
  diagnostic: string;
}> = {
  "v-9": {
    service: "Brembo Carbon Ceramic Brake Inspection",
    bay: "Tech Bay 3 · High-Performance",
    eta: "Ready for Sign-Off",
    diagnostic: "100% Pad thickness verified, sensors calibrated",
  },
  "v-15": {
    service: "Synthetic Oil & Multi-Point Telemetry Scan",
    bay: "Tech Bay 1 · Diagnostics",
    eta: "Today 4:30 PM",
    diagnostic: "Fluids topped up, zero ECU fault codes",
  },
  "v-22": {
    service: "Pirelli P-Zero Tire Pressure & Tread Check",
    bay: "Tech Bay 2 · Alignment",
    eta: "Tomorrow 10:00 AM",
    diagnostic: "Rear camber balanced, tread 7.8mm",
  },
  "v-30": {
    service: "Tri-Motor EV Battery Health & Firmware 4.2",
    bay: "EV Supercharging Bay 1",
    eta: "Ready for Sign-Off",
    diagnostic: "Battery pack balance: 99.4% SOH, flashed v4.2",
  },
};

const getOpsMeta = (bookingId: string) => {
  return (
    OPS_METADATA[bookingId] || {
      window: "Today 6:00 PM",
      timeRemaining: "In Progress",
      urgency: "normal" as const,
      bay: "Intake Bay 1",
      notes: "Standard concierge return protocol",
      phone: "+63 917 000 1234",
    }
  );
};

const getMaintMeta = (vehicleId: string) => {
  return (
    MAINTENANCE_METADATA[vehicleId] || {
      service: "Scheduled Multi-Point Safety Inspection",
      bay: "Tech Bay 1",
      eta: "Ready for Sign-Off",
      diagnostic: "All diagnostics normal, fluids optimal",
    }
  );
};


interface VehicleEditorProps {
  isEdit: boolean;
  formData: {
    name: string;
    brand: string;
    category: string;
    plate: string;
    images: string[];
    destinations: DestinationPrice[];
    status?: VehicleStatus;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  tab: "specs" | "pricing" | "photos";
  setTab: (tab: "specs" | "pricing" | "photos") => void;
  categories: string[];
  onAddCategory: (cat: string) => void;
  onDeleteCategory: (cat: string) => void;
}

function VehicleEditorView({
  isEdit,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  tab,
  setTab,
  categories,
  onAddCategory,
  onDeleteCategory,
}: VehicleEditorProps) {
  const [newRouteInput, setNewRouteInput] = useState("");
  const [newPriceInput, setNewPriceInput] = useState<number | "">("");
  const [newPhotoInput, setNewPhotoInput] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleAddRoute = () => {
    if (!newRouteInput.trim()) return;
    const priceNum = typeof newPriceInput === "number" ? newPriceInput : 1500;
    setFormData((prev: any) => ({
      ...prev,
      destinations: [
        ...prev.destinations,
        { id: Date.now().toString(), route: newRouteInput.trim(), price: priceNum },
      ],
    }));
    setNewRouteInput("");
    setNewPriceInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
        }
        processedCount++;
        if (processedCount === files.length) {
          setFormData((prev: any) => ({
            ...prev,
            images: [...prev.images, ...newImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    setFormData((prev: any) => {
      const selected = prev.images[index];
      const others = prev.images.filter((_: any, i: number) => i !== index);
      return {
        ...prev,
        images: [selected, ...others],
      };
    });
  };

  const handleDeletePhoto = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleDeleteRoute = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      destinations: prev.destinations.filter((d: any) => d.id !== id),
    }));
  };

  return (
    <div className="vehicle-form-page">
      {/* Top Banner with Quick Actions */}
      <div className="vehicle-form-banner">
        <div>
          <h2 className="vehicle-form-title">
            {isEdit ? `Edit Vehicle: ${formData.name || "Fleet Listing"}` : "Add New Fleet Listing"}
          </h2>
          <p className="vehicle-form-subtitle">
            Configure vehicle specifications, destination pricing matrix, and photo slider assets.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button type="button" className="admin-secondary-btn" onClick={onCancel} style={{ padding: "8px 16px" }}>
            Cancel
          </button>
          <button type="button" className="admin-primary-btn" onClick={onSubmit} style={{ padding: "8px 20px" }}>
            <Check size={14} style={{ marginRight: 6 }} />
            <span>{isEdit ? "Update Vehicle" : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {/* 3-Step Navigation Tab Bar */}
      <div className="vehicle-tabs-header">
        <button
          type="button"
          className={`vehicle-tab-btn ${tab === "specs" ? "active" : ""}`}
          onClick={() => setTab("specs")}
        >
          <div className="tab-step-circle">1</div>
          <div className="tab-text-wrap">
            <span className="tab-title-text">Vehicle Specifications</span>
            <span className="tab-sub-text">{formData.brand || "Make"} {formData.name || "Model"}</span>
          </div>
        </button>

        <button
          type="button"
          className={`vehicle-tab-btn ${tab === "pricing" ? "active" : ""}`}
          onClick={() => setTab("pricing")}
        >
          <div className="tab-step-circle">2</div>
          <div className="tab-text-wrap">
            <span className="tab-title-text">Destination Pricing</span>
            <span className="tab-sub-text">{formData.destinations.length} Routes Configured</span>
          </div>
        </button>

        <button
          type="button"
          className={`vehicle-tab-btn ${tab === "photos" ? "active" : ""}`}
          onClick={() => setTab("photos")}
        >
          <div className="tab-step-circle">3</div>
          <div className="tab-text-wrap">
            <span className="tab-title-text">Photo Slider Gallery</span>
            <span className="tab-sub-text">{formData.images.length} Slider Photos</span>
          </div>
        </button>
      </div>

      {/* Main Form Body by Tab */}
      <form onSubmit={onSubmit} className="vehicle-form-layout">
        {/* STEP 1: VEHICLE SPECIFICATIONS */}
        {tab === "specs" && (
          <div className="vehicle-form-card">
            <div className="vehicle-form-card-head">
              <div>
                <h3>Step 1: Core Specifications</h3>
                <p className="vehicle-card-desc">General details, classification tier, and license registration</p>
              </div>
              <span className="vehicle-card-badge">Step 1 of 3</span>
            </div>

            <div className="vehicle-grid-2">
              <label className="vehicle-input-label">
                <span>Car Model Name *</span>
                <input
                  required
                  placeholder="e.g. Huracán EVO or 720S Spider"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="vehicle-input"
                />
              </label>

              <label className="vehicle-input-label">
                <span>Make / Brand *</span>
                <input
                  required
                  placeholder="e.g. Lamborghini, Porsche, McLaren"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="vehicle-input"
                />
              </label>

              <label className="vehicle-input-label" style={{ position: "relative" }}>
                <span>Vehicle Category *</span>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="vehicle-input"
                    placeholder="Search or type a new category..."
                    value={showCategoryDropdown ? categorySearch : formData.category}
                    onFocus={() => {
                      setCategorySearch("");
                      setShowCategoryDropdown(true);
                    }}
                    onBlur={() => setTimeout(() => setShowCategoryDropdown(false), 180)}
                    onChange={(e) => {
                      setCategorySearch(e.target.value);
                    }}
                  />
                  {showCategoryDropdown && (
                    <div className="category-dropdown">
                      {(() => {
                        const q = categorySearch.trim().toLowerCase();
                        const filtered = categories.filter((c) =>
                          c.toLowerCase().includes(q)
                        );
                        const exactMatch = categories.some(
                          (c) => c.toLowerCase() === q
                        );
                        return (
                          <>
                            {filtered.map((cat) => (
                              <div
                                key={cat}
                                className={`category-option ${formData.category === cat ? "active" : ""}`}
                                onMouseDown={(e) => {
                                  if ((e.target as HTMLElement).closest('.category-delete-btn')) {
                                    return;
                                  }
                                  setFormData({ ...formData, category: cat });
                                  setShowCategoryDropdown(false);
                                  setCategorySearch("");
                                }}
                              >
                                <span style={{ flex: 1 }}>{cat}</span>
                                {formData.category === cat && (
                                  <Check size={13} style={{ marginLeft: "auto" }} />
                                )}
                                <button
                                  type="button"
                                  className="category-delete-btn"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDeleteCategory(cat);
                                    if (formData.category === cat) {
                                      setFormData({ ...formData, category: "" });
                                    }
                                  }}
                                  title="Delete category"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}
                            {q && !exactMatch && (
                              <button
                                type="button"
                                className="category-option create-new"
                                onMouseDown={() => {
                                  const newCat = categorySearch.trim();
                                  onAddCategory(newCat);
                                  setFormData({ ...formData, category: newCat });
                                  setShowCategoryDropdown(false);
                                  setCategorySearch("");
                                }}
                              >
                                <Plus size={13} />
                                <span>Create &quot;{categorySearch.trim()}&quot;</span>
                              </button>
                            )}
                            {filtered.length === 0 && !q && (
                              <div className="category-empty">
                                Type to search or create a new category
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </label>

              <label className="vehicle-input-label">
                <span>License Plate Registration</span>
                <input
                  placeholder="e.g. DX-8890"
                  value={formData.plate}
                  onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                  className="vehicle-input"
                />
              </label>

              {isEdit && (
                <label className="vehicle-input-label">
                  <span>Current Fleet Status</span>
                  <select
                    value={formData.status || "available"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="vehicle-select"
                  >
                    <option value="available">🟢 Available for Dispatch</option>
                    <option value="rented">🔵 Currently Rented</option>
                    <option value="maintenance">🟡 Scheduled Maintenance</option>
                  </select>
                </label>
              )}
            </div>

            <div className="step-navigation-footer">
              <button type="button" className="admin-secondary-btn" onClick={onCancel} style={{ padding: "10px 20px" }}>
                Cancel
              </button>
              <button
                type="button"
                className="admin-primary-btn"
                onClick={() => setTab("pricing")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px" }}
              >
                <span>Next: Destination Pricing</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DESTINATION-BASED PRICING */}
        {tab === "pricing" && (
          <div className="vehicle-form-card">
            <div className="vehicle-form-card-head">
              <div>
                <h3>Step 2: Destination-Based Pricing Matrix</h3>
                <p className="vehicle-card-desc">
                  Set specific rental prices depending on client destination (e.g. Pampanga to Zambales is ₱1,200).
                </p>
              </div>
              <span className="vehicle-card-badge">Step 2 of 3</span>
            </div>

            {/* Quick Preset Route Suggestions */}
            <div>
              <span style={{ fontSize: "11px", color: "var(--admin-text-muted)", display: "block", marginBottom: 6 }}>
                Quick Add Common Route Suggestions:
              </span>
              <div className="presets-quick-bar">
                {[
                  { route: "Pampanga to Zambales", price: 1200 },
                  { route: "Pampanga to Pangasinan", price: 1500 },
                  { route: "Pampanga to Baguio", price: 3500 },
                  { route: "Metro Manila to Clark", price: 2800 },
                  { route: "Clark to Subic Bay", price: 1800 },
                  { route: "Pampanga to La Union", price: 3200 },
                ].map((sug) => (
                  <button
                    key={sug.route}
                    type="button"
                    className="preset-pill-btn"
                    onClick={() => {
                      if (!formData.destinations.some((d: any) => d.route === sug.route)) {
                        setFormData((prev: any) => ({
                          ...prev,
                          destinations: [
                            ...prev.destinations,
                            { id: Date.now().toString() + Math.random(), route: sug.route, price: sug.price },
                          ],
                        }));
                      }
                    }}
                  >
                    + {sug.route} (₱{sug.price.toLocaleString()})
                  </button>
                ))}
              </div>
            </div>

            {/* Add Custom Route Input Bar */}
            <div className="add-route-card">
              <div style={{ flex: 2 }}>
                <span className="sub-input-label">Route / Destination Pair</span>
                <input
                  placeholder="e.g. Pampanga to Zambales"
                  value={newRouteInput}
                  onChange={(e) => setNewRouteInput(e.target.value)}
                  className="vehicle-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRoute();
                    }
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <span className="sub-input-label">Trip Price Rate (₱)</span>
                <input
                  type="number"
                  placeholder="e.g. 1200"
                  value={newPriceInput}
                  onChange={(e) => setNewPriceInput(e.target.value ? Number(e.target.value) : "")}
                  className="vehicle-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRoute();
                    }
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  type="button"
                  className="admin-primary-btn"
                  onClick={handleAddRoute}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, height: "38px", padding: "0 18px" }}
                >
                  <Plus size={15} />
                  <span>Add Route</span>
                </button>
              </div>
            </div>

            {/* Routes List Table */}
            <div className="routes-table-wrap">
              <div className="route-table-header">
                <span>Destination Route</span>
                <span>Trip Rate</span>
                <span>Action</span>
              </div>

              {formData.destinations.length === 0 ? (
                <div style={{ padding: "28px", textAlign: "center", color: "var(--admin-text-muted)", fontSize: "13px" }}>
                  No destination routes added yet. Use the inputs above or click a suggestion to add your first route rate.
                </div>
              ) : (
                formData.destinations.map((dest: any, i: number) => (
                  <div key={dest.id} className="route-table-row">
                    <div>
                      <input
                        value={dest.route}
                        onChange={(e) => {
                          const updated = [...formData.destinations];
                          updated[i] = { ...dest, route: e.target.value };
                          setFormData({ ...formData, destinations: updated });
                        }}
                        className="vehicle-input"
                        placeholder="Route name"
                      />
                    </div>

                    <div>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 10, top: 10, color: "var(--admin-accent)", fontWeight: 600, fontSize: 13 }}>
                          ₱
                        </span>
                        <input
                          type="number"
                          value={dest.price}
                          onChange={(e) => {
                            const updated = [...formData.destinations];
                            updated[i] = { ...dest, price: Number(e.target.value) };
                            setFormData({ ...formData, destinations: updated });
                          }}
                          className="vehicle-input"
                          style={{ paddingLeft: 24 }}
                          placeholder="Price"
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        type="button"
                        className="route-delete-btn"
                        onClick={() => handleDeleteRoute(dest.id)}
                        title="Delete this route"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="step-navigation-footer">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setTab("specs")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px" }}
              >
                <ArrowLeft size={15} />
                <span>Back to Specs</span>
              </button>
              <button
                type="button"
                className="admin-primary-btn"
                onClick={() => setTab("photos")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px" }}
              >
                <span>Next: Photo Slider Gallery</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PHOTO SLIDER GALLERY (VISUAL GRID) */}
        {tab === "photos" && (
          <div className="vehicle-form-card">
            <div className="vehicle-form-card-head">
              <div>
                <h3>Step 3: Photo Slider Gallery</h3>
                <p className="vehicle-card-desc">
                  Upload or add image URLs for the car slider. The photo with the <strong>★ Primary Cover</strong> badge is shown as the main showroom thumbnail.
                </p>
              </div>
              <span className="vehicle-card-badge">Step 3 of 3</span>
            </div>

            {/* Quick Car Preset Images */}
            <div>
              <span style={{ fontSize: "11px", color: "var(--admin-text-muted)", display: "block", marginBottom: 6 }}>
                Quick Preset Car Assets:
              </span>
              <div className="presets-quick-bar">
                {[
                  { label: "Lamborghini Huracán", url: "/images/fleet-sports-huracan.jpg" },
                  { label: "Porsche 911 Carrera", url: "/images/fleet-porsche.jpg" },
                  { label: "Rolls-Royce Ghost", url: "/images/fleet-rolls.jpg" },
                  { label: "Tesla Model S", url: "/images/fleet-tesla.jpg" },
                  { label: "Range Rover Velar", url: "/images/fleet-suv-velar.jpg" },
                  { label: "BMW 330i M-Sport", url: "/images/fleet-bmw.jpg" },
                  { label: "Mercedes-Benz E-Class", url: "/images/fleet-mercedes.jpg" },
                  { label: "Toyota GR Supra", url: "/images/fleet-toyota.jpg" },
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="preset-pill-btn"
                    onClick={() => {
                      if (!formData.images.includes(p.url)) {
                        setFormData((prev: any) => ({
                          ...prev,
                          images: [...prev.images, p.url],
                        }));
                      }
                    }}
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload Box */}
            <div className="add-photo-inline-card" style={{ padding: '16px', border: '1px dashed rgba(255, 255, 255, 0.2)', background: 'transparent', textAlign: 'center', justifyContent: 'center' }}>
              <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <div style={{ background: '#4f46e5', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={15} />
                  <span>Upload Images</span>
                </div>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>Click to select photo files from your device</span>
              </label>
            </div>

            {/* Visual Photo Card Grid */}
            <div className="photo-gallery-grid">
              {formData.images.map((img: string, idx: number) => (
                <div key={idx} className={`photo-grid-card ${idx === 0 ? "is-primary" : ""}`}>
                  <div className="photo-card-thumb-wrap">
                    <img
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = "0.2";
                      }}
                    />

                    {/* Primary Badge */}
                    {idx === 0 ? (
                      <span className="photo-card-primary-badge">
                        <Star size={11} fill="#07080a" />
                        <span>Primary Cover</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="photo-card-primary-badge"
                        style={{ cursor: "pointer", background: "rgba(0,0,0,0.75)", color: "#cbd5e1" }}
                        onClick={() => handleSetPrimary(idx)}
                        title="Click to make this the cover image"
                      >
                        <span>Set as Primary</span>
                      </button>
                    )}

                    {/* Action buttons */}
                    <div className="photo-card-actions-bar">
                      <button
                        type="button"
                        className="photo-card-icon-btn delete"
                        onClick={() => handleDeletePhoto(idx)}
                        title="Delete photo"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="photo-card-footer">
                    <span className="photo-card-index">Slide #{idx + 1} {idx === 0 ? "(Cover)" : ""}</span>
                    <span className="photo-card-url-text" title={img}>
                      {img.startsWith('data:image') ? 'Local File (Base64)' : img}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-navigation-footer">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setTab("pricing")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px" }}
              >
                <ArrowLeft size={15} />
                <span>Back to Pricing</span>
              </button>
              <button
                type="submit"
                className="admin-primary-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 28px", fontSize: "13.5px" }}
              >
                <Check size={16} />
                <span>{isEdit ? "Update Vehicle Details" : "Save & Publish Vehicle"}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "fleet" | "bookings" | "customers">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [fleetCategoryFilter, setFleetCategoryFilter] = useState<string>("all");
  const [fleetStatusFilter, setFleetStatusFilter] = useState<"all" | VehicleStatus>("all");
  const [fleetSearchQuery, setFleetSearchQuery] = useState("");
  const [fleetPage, setFleetPage] = useState(1);
  const [fleetPageSize, setFleetPageSize] = useState(10);
  const [bookingFilter, setBookingFilter] = useState<"all" | BookingStatus>("all");
  const [bookingSearchQuery, setBookingSearchQuery] = useState("");
  const [bookingVehicleFilter, setBookingVehicleFilter] = useState<string>("all");
  const [bookingPage, setBookingPage] = useState(1);
  const [bookingPageSize, setBookingPageSize] = useState(10);

  // Operations Hub State
  const [opsTab, setOpsTab] = useState<"all" | "returns" | "dispatches" | "maintenance">("all");
  const [opsNotification, setOpsNotification] = useState<string | null>(null);

  const [vehicles, setVehicles] = useState<AdminVehicle[]>(INITIAL_VEHICLES);
  const [bookings, setBookings] = useState<AdminBooking[]>(INITIAL_BOOKINGS);
  const [customers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);

  // Modal & Action Menu State
  const [showAddModal, setShowAddModal] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [openBookingMenuId, setOpenBookingMenuId] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<AdminVehicle | null>(null);
  const [vehicleEditorTab, setVehicleEditorTab] = useState<"specs" | "pricing" | "photos">("specs");
  const [vehicleCategories, setVehicleCategories] = useState<string[]>(["Sports", "Luxury", "Sedan", "SUV", "Economy"]);
  const [newVehicle, setNewVehicle] = useState<{
    name: string;
    brand: string;
    category: string;
    plate: string;
    images: string[];
    destinations: DestinationPrice[];
  }>({
    name: "",
    brand: "",
    category: "Sports",
    plate: "",
    images: ["/images/fleet-sports-huracan.jpg"],
    destinations: [{ id: Date.now().toString(), route: "Pampanga to Zambales", price: 5000 }],
  });

  const handleAddCategory = (cat: string) => {
    setVehicleCategories((prev) =>
      prev.includes(cat) ? prev : [...prev, cat]
    );
  };

  const handleDeleteCategory = (cat: string) => {
    setVehicleCategories((prev) => prev.filter((c) => c !== cat));
  };

  // KPI Calculations
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0) + 1606500; // includes past cycle
  const activeRentalsCount = vehicles.filter((v) => v.status === "rented").length;
  const availableCount = vehicles.filter((v) => v.status === "available").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "maintenance").length;

  // Live Turnaround Operations Lists
  const activeReturns = bookings.filter((b) => b.status === "active");
  const scheduledDispatches = bookings.filter((b) => b.status === "confirmed");
  const maintenanceList = vehicles.filter((v) => v.status === "maintenance");

  const handleStatusChange = (vehicleId: string, newStatus: VehicleStatus) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status: newStatus } : v))
    );
    setOpenActionMenuId(null);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    setOpenActionMenuId(null);
  };

  const handleUpdateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;
    setVehicles((prev) =>
      prev.map((v) => (v.id === editingVehicle.id ? editingVehicle : v))
    );
    setEditingVehicle(null);
  };

  const handleBookingAction = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    setOpenBookingMenuId(null);
  };

  const handleOpsReturn = (bookingId: string, carName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "completed" as BookingStatus } : b))
    );
    setVehicles((prev) =>
      prev.map((v) => (v.name === carName ? { ...v, status: "available" as VehicleStatus } : v))
    );
    setOpsNotification(`✓ ${carName} returned & inspected. Restored to Available fleet.`);
    setTimeout(() => setOpsNotification(null), 4000);
  };

  const handleOpsDispatch = (bookingId: string, carName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "active" as BookingStatus } : b))
    );
    setVehicles((prev) =>
      prev.map((v) => (v.name === carName ? { ...v, status: "rented" as VehicleStatus } : v))
    );
    setOpsNotification(`✓ Key dispatched for ${carName}. Rental trip is now Active on Road.`);
    setTimeout(() => setOpsNotification(null), 4000);
  };

  const handleOpsReleaseMaintenance = (vehicleId: string, carName: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status: "available" as VehicleStatus } : v))
    );
    setOpsNotification(`✓ Service inspection passed for ${carName}. Restored to Available fleet.`);
    setTimeout(() => setOpsNotification(null), 4000);
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.name || !newVehicle.brand) return;

    const created: AdminVehicle = {
      id: `v-${Date.now()}`,
      name: newVehicle.name,
      brand: newVehicle.brand,
      category: newVehicle.category,
      plate: newVehicle.plate || `DX-${Math.floor(1000 + Math.random() * 9000)}`,
      images: newVehicle.images,
      destinations: newVehicle.destinations,
      status: "available",
      trips: 0,
    };

    setVehicles([created, ...vehicles]);
    setShowAddModal(false);
    setNewVehicle({
      name: "",
      brand: "",
      category: "Sports",
      plate: "",
      images: ["/images/fleet-sports-huracan.jpg"],
      destinations: [{ id: Date.now().toString(), route: "Pampanga to Zambales", price: 5000 }],
    });
  };

  // Filtered lists
  const filteredVehicles = vehicles
    .filter((v) => (fleetStatusFilter === "all" ? true : v.status === fleetStatusFilter))
    .filter((v) => (fleetCategoryFilter === "all" ? true : v.category.toLowerCase() === fleetCategoryFilter.toLowerCase()))
    .filter((v) => {
      const query = (fleetSearchQuery || searchQuery).toLowerCase().trim();
      if (!query) return true;
      return (
        v.name.toLowerCase().includes(query) ||
        v.brand.toLowerCase().includes(query) ||
        v.plate.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query)
      );
    });

  // Fleet Pagination
  const totalFleetPages = Math.max(1, Math.ceil(filteredVehicles.length / fleetPageSize));
  const currentFleetPage = Math.min(fleetPage, totalFleetPages);
  const startFleetIndex = (currentFleetPage - 1) * fleetPageSize;
  const paginatedVehicles = filteredVehicles.slice(
    startFleetIndex,
    startFleetIndex + fleetPageSize
  );

  const filteredBookings = bookings
    .filter((b) => (bookingFilter === "all" ? true : b.status === bookingFilter))
    .filter((b) => (bookingVehicleFilter === "all" ? true : b.carName.toLowerCase().includes(bookingVehicleFilter.toLowerCase())))
    .filter((b) => {
      const query = (bookingSearchQuery || searchQuery).toLowerCase().trim();
      if (!query) return true;
      return (
        b.customerName.toLowerCase().includes(query) ||
        b.customerEmail.toLowerCase().includes(query) ||
        b.carName.toLowerCase().includes(query) ||
        b.id.toLowerCase().includes(query)
      );
    });

  // Booking Pagination
  const totalBookingPages = Math.max(1, Math.ceil(filteredBookings.length / bookingPageSize));
  const currentBookingPage = Math.min(bookingPage, totalBookingPages);
  const startBookingIndex = (currentBookingPage - 1) * bookingPageSize;
  const paginatedBookings = filteredBookings.slice(
    startBookingIndex,
    startBookingIndex + bookingPageSize
  );

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Link href="/" className="admin-logo">
            DRIVE<span>X</span>
          </Link>
          <span className="admin-badge">ADMIN</span>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => { setActiveTab("overview"); setShowAddModal(false); setEditingVehicle(null); }}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>
          <button
            className={`admin-nav-item ${(activeTab === "fleet" || showAddModal || editingVehicle) ? "active" : ""}`}
            onClick={() => { setActiveTab("fleet"); setShowAddModal(false); setEditingVehicle(null); }}
          >
            <Car size={18} />
            <span>Fleet Inventory</span>
            <span className="admin-nav-badge">{vehicles.length}</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => { setActiveTab("bookings"); setShowAddModal(false); setEditingVehicle(null); }}
          >
            <CalendarCheck size={18} />
            <span>Reservations</span>
            <span className="admin-nav-badge">{bookings.length}</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => { setActiveTab("customers"); setShowAddModal(false); setEditingVehicle(null); }}
          >
            <Users size={18} />
            <span>Customers</span>
            <span className="admin-nav-badge">{customers.length}</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="showroom-btn">
            <ExternalLink size={15} />
            <span>View Public Showroom</span>
          </Link>

          <div className="admin-profile">
            <div className="admin-avatar">AD</div>
            <div className="admin-profile-info">
              <span className="admin-profile-name">Janrey Mina</span>
              <span className="admin-profile-role">Fleet Director</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-page-title">
            {showAddModal ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setShowAddModal(false)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "12px" }}
                >
                  <ArrowLeft size={15} />
                  <span>Back to Fleet</span>
                </button>
                <h1 style={{ margin: 0, fontSize: "17px" }}>Add New Fleet Vehicle</h1>
              </div>
            ) : editingVehicle ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setEditingVehicle(null)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "12px" }}
                >
                  <ArrowLeft size={15} />
                  <span>Back to Fleet</span>
                </button>
                <h1 style={{ margin: 0, fontSize: "17px" }}>Edit Fleet Vehicle: {editingVehicle.name}</h1>
              </div>
            ) : (
              <h1>
                {activeTab === "overview" && "Executive Dashboard"}
                {activeTab === "fleet" && "Fleet Management"}
                {activeTab === "bookings" && "Reservations & Bookings"}
                {activeTab === "customers" && "Verified Customers Directory"}
              </h1>
            )}
          </div>

          <div className="admin-topbar-actions">
            {!showAddModal && !editingVehicle && (
              <>
                <div className="admin-search-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search fleet, booking, driver..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin-search-input"
                  />
                </div>

                {activeTab === "fleet" && (
                  <button
                    className="admin-primary-btn"
                    onClick={() => { setVehicleEditorTab("specs"); setShowAddModal(true); }}
                  >
                    <Plus size={16} />
                    <span>Add Vehicle</span>
                  </button>
                )}
              </>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="admin-content">
          {showAddModal ? (
            <VehicleEditorView
              isEdit={false}
              formData={newVehicle}
              setFormData={setNewVehicle}
              onSubmit={handleCreateVehicle}
              onCancel={() => setShowAddModal(false)}
              tab={vehicleEditorTab}
              setTab={setVehicleEditorTab}
              categories={vehicleCategories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          ) : editingVehicle ? (
            <VehicleEditorView
              isEdit={true}
              formData={editingVehicle}
              setFormData={setEditingVehicle}
              onSubmit={handleUpdateVehicle}
              onCancel={() => setEditingVehicle(null)}
              tab={vehicleEditorTab}
              setTab={setVehicleEditorTab}
              categories={vehicleCategories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          ) : (
            <>

          {/* KPI Stat Cards (always shown on Overview, compact on other tabs) */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-head">
                <span className="kpi-title">Monthly Revenue</span>
                <div className="kpi-icon">
                  <DollarSign size={18} />
                </div>
              </div>
              <div className="kpi-value">₱{totalRevenue.toLocaleString()}</div>
              <div className="kpi-footer">
                <span className="kpi-trend-up">
                  <TrendingUp size={14} /> +18.4%
                </span>
                <span className="kpi-sub">vs previous month</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-head">
                <span className="kpi-title">Active on Road</span>
                <div className="kpi-icon">
                  <Car size={18} />
                </div>
              </div>
              <div className="kpi-value">
                {activeRentalsCount} <small style={{ fontSize: 12, color: "#8b929d", fontWeight: 400 }}>/ {vehicles.length}</small>
              </div>
              <div className="kpi-footer">
                <span className="kpi-trend-up">
                  {Math.round((activeRentalsCount / vehicles.length) * 100)}%
                </span>
                <span className="kpi-sub">fleet utilization rate</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-head">
                <span className="kpi-title">Total Bookings</span>
                <div className="kpi-icon">
                  <CalendarCheck size={18} />
                </div>
              </div>
              <div className="kpi-value">184</div>
              <div className="kpi-footer">
                <span className="kpi-trend-up">
                  <TrendingUp size={14} /> +24
                </span>
                <span className="kpi-sub">new this cycle</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-head">
                <span className="kpi-title">Fleet Readiness</span>
                <div className="kpi-icon">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="kpi-value">{availableCount} Ready</div>
              <div className="kpi-footer">
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                  {maintenanceCount} In Maintenance
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <div className="analytics-row">
                <div className="dashboard-panel">
                  <div className="panel-head">
                    <div>
                      <h2 className="panel-title">Revenue Trajectory</h2>
                      <p className="panel-subtitle">Monthly earnings performance across 2026 (in ₱ thousands)</p>
                    </div>
                    <span className="status-pill status-available">Live Data</span>
                  </div>

                  {/* Simulated Visual Chart */}
                  <div className="revenue-bars-container">
                    {[
                      { month: "Jan", val: 840, pct: 45 },
                      { month: "Feb", val: 990, pct: 54 },
                      { month: "Mar", val: 1210, pct: 66 },
                      { month: "Apr", val: 1140, pct: 62 },
                      { month: "May", val: 1390, pct: 75 },
                      { month: "Jun", val: 1510, pct: 82 },
                      { month: "Jul", val: 1680, pct: 91 },
                      { month: "Aug", val: 1620, pct: 88 },
                      { month: "Sep", val: 1842, pct: 100 },
                    ].map((bar) => (
                      <div className="revenue-bar-col" key={bar.month}>
                        <div
                          className="revenue-bar"
                          style={{ height: `${bar.pct}%` }}
                          title={`₱${bar.val},000`}
                        />
                        <span className="revenue-bar-label">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-panel">
                  <div className="panel-head">
                    <div>
                      <h2 className="panel-title">Fleet Utilization</h2>
                      <p className="panel-subtitle">Demand share by vehicle tier</p>
                    </div>
                  </div>

                  <div className="category-progress-list">
                    {[
                      { name: "Exotic Sports", pct: 42, color: "#4da3ff" },
                      { name: "Ultra Luxury", pct: 28, color: "#a855f7" },
                      { name: "Premium SUV", pct: 16, color: "#10b981" },
                      { name: "Executive Sedan", pct: 9, color: "#f59e0b" },
                      { name: "Sport Economy", pct: 5, color: "#ec4899" },
                    ].map((cat) => (
                      <div className="category-progress-item" key={cat.name}>
                        <div className="cat-head">
                          <span className="cat-head-name">{cat.name}</span>
                          <span className="cat-head-pct">{cat.pct}%</span>
                        </div>
                        <div className="cat-track">
                          <div
                            className="cat-fill"
                            style={{ width: `${cat.pct}%`, background: cat.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Operations & Turnaround Hub */}
              <div className="dashboard-panel">
                <div className="panel-head ops-hub-header">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h2 className="panel-title">Live Operations & Turnaround Hub</h2>
                      <span className="ops-pulse-dot" title="Real-time telemetry stream active" />
                    </div>
                    <p className="panel-subtitle">
                      Real-time on-road telemetry, today's return deadlines, dispatch staging, and fleet health
                    </p>
                  </div>
                  <button
                    type="button"
                    className="filter-btn"
                    onClick={() => setActiveTab("bookings")}
                  >
                    All Reservations <ArrowUpRight size={14} style={{ display: "inline" }} />
                  </button>
                </div>

                {opsNotification && (
                  <div className="ops-toast">
                    <CheckCircle2 size={15} />
                    <span>{opsNotification}</span>
                  </div>
                )}

                {/* Operations Filter / Category Bar */}
                <div className="ops-filter-bar">
                  <button
                    type="button"
                    className={`ops-filter-tab ${opsTab === "all" ? "active" : ""}`}
                    onClick={() => setOpsTab("all")}
                  >
                    <Activity size={13} />
                    <span>All Active Tasks</span>
                    <span className="ops-filter-badge">{activeReturns.length + scheduledDispatches.length + maintenanceList.length}</span>
                  </button>

                  <button
                    type="button"
                    className={`ops-filter-tab ${opsTab === "returns" ? "active" : ""}`}
                    onClick={() => setOpsTab("returns")}
                  >
                    <Car size={13} />
                    <span>Returns Due</span>
                    <span className="ops-filter-badge">{activeReturns.length}</span>
                  </button>

                  <button
                    type="button"
                    className={`ops-filter-tab ${opsTab === "dispatches" ? "active" : ""}`}
                    onClick={() => setOpsTab("dispatches")}
                  >
                    <Key size={13} />
                    <span>Scheduled Dispatches</span>
                    <span className="ops-filter-badge">{scheduledDispatches.length}</span>
                  </button>

                  <button
                    type="button"
                    className={`ops-filter-tab ${opsTab === "maintenance" ? "active" : ""}`}
                    onClick={() => setOpsTab("maintenance")}
                  >
                    <Wrench size={13} />
                    <span>Fleet Service & Health</span>
                    <span className="ops-filter-badge">{maintenanceList.length}</span>
                  </button>
                </div>

                {/* Turnaround Cards List */}
                <div className="ops-list">
                  {/* Returns */}
                  {(opsTab === "all" || opsTab === "returns") &&
                    activeReturns.map((b) => {
                      const meta = getOpsMeta(b.id);
                      return (
                        <div className="ops-card" key={`return-${b.id}`}>
                          <div className="ops-card-left">
                            <div className="ops-thumb">
                              <Image src={b.carImage} alt={b.carName} fill sizes="60px" />
                            </div>
                            <div className="ops-vehicle-info">
                              <div className="ops-vehicle-title-row">
                                <span className="ops-vehicle-name">{b.carName}</span>
                              </div>
                              <div className="ops-type-tag">
                                <span className="ops-plate-badge">{b.id}</span>
                                <span>•</span>
                                <span>Return Intake</span>
                              </div>
                            </div>
                          </div>

                          <div className="ops-card-center">
                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Current Renter</span>
                              <span className="ops-detail-value">{b.customerName}</span>
                              <span className="ops-detail-sub">{meta.phone || b.customerEmail}</span>
                            </div>

                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Return Window</span>
                              <span className="ops-detail-value">{meta.window}</span>
                              <span className="ops-detail-sub">{meta.bay}</span>
                            </div>

                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Telemetry / Countdown</span>
                              <span className="ops-telemetry-pill ops-telemetry-return">
                                <Clock size={12} />
                                {meta.timeRemaining}
                              </span>
                              <span className="ops-detail-sub">{meta.notes}</span>
                            </div>
                          </div>

                          <div className="ops-card-actions">
                            <button
                              type="button"
                              className="ops-btn-primary ops-btn-return"
                              onClick={() => handleOpsReturn(b.id, b.carName)}
                              title="Sign off intake inspection and mark returned"
                            >
                              <CheckCircle2 size={13} />
                              <span>Inspect & Return</span>
                            </button>
                            <button
                              type="button"
                              className="ops-btn-secondary"
                              onClick={() => setActiveTab("bookings")}
                              title="View full booking record"
                            >
                              <span>Details</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {/* Dispatches */}
                  {(opsTab === "all" || opsTab === "dispatches") &&
                    scheduledDispatches.map((b) => {
                      const meta = getOpsMeta(b.id);
                      return (
                        <div className="ops-card" key={`dispatch-${b.id}`}>
                          <div className="ops-card-left">
                            <div className="ops-thumb">
                              <Image src={b.carImage} alt={b.carName} fill sizes="60px" />
                            </div>
                            <div className="ops-vehicle-info">
                              <div className="ops-vehicle-title-row">
                                <span className="ops-vehicle-name">{b.carName}</span>
                              </div>
                              <div className="ops-type-tag">
                                <span className="ops-plate-badge">{b.id}</span>
                                <span>•</span>
                                <span>Staged for Pickup</span>
                              </div>
                            </div>
                          </div>

                          <div className="ops-card-center">
                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Reserved By</span>
                              <span className="ops-detail-value">{b.customerName}</span>
                              <span className="ops-detail-sub">{meta.phone || b.customerEmail}</span>
                            </div>

                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Dispatch Schedule</span>
                              <span className="ops-detail-value">{meta.window}</span>
                              <span className="ops-detail-sub">{meta.bay}</span>
                            </div>

                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Prep Status</span>
                              <span className="ops-telemetry-pill ops-telemetry-dispatch">
                                <Key size={12} />
                                {meta.timeRemaining}
                              </span>
                              <span className="ops-detail-sub">{meta.notes}</span>
                            </div>
                          </div>

                          <div className="ops-card-actions">
                            <button
                              type="button"
                              className="ops-btn-primary ops-btn-dispatch"
                              onClick={() => handleOpsDispatch(b.id, b.carName)}
                              title="Hand over keys and start rental dispatch"
                            >
                              <Key size={13} />
                              <span>Dispatch Key</span>
                            </button>
                            <button
                              type="button"
                              className="ops-btn-secondary"
                              onClick={() => setActiveTab("bookings")}
                              title="View reservation agreement"
                            >
                              <span>Agreement</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {/* Maintenance */}
                  {(opsTab === "all" || opsTab === "maintenance") &&
                    maintenanceList.map((v) => {
                      const meta = getMaintMeta(v.id);
                      return (
                        <div className="ops-card" key={`maint-${v.id}`}>
                          <div className="ops-card-left">
                            <div className="ops-thumb">
                              <Image src={v.images[0] || ""} alt={v.name} fill sizes="60px" />
                            </div>
                            <div className="ops-vehicle-info">
                              <div className="ops-vehicle-title-row">
                                <span className="ops-vehicle-name">{v.name}</span>
                              </div>
                              <div className="ops-type-tag">
                                <span className="ops-plate-badge">{v.plate}</span>
                                <span>•</span>
                                <span>{v.category} Tier</span>
                              </div>
                            </div>
                          </div>

                          <div className="ops-card-center">
                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Service Required</span>
                              <span className="ops-detail-value">{meta.service}</span>
                              <span className="ops-detail-sub">{meta.bay}</span>
                            </div>

                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Diagnostics & Notes</span>
                              <span className="ops-detail-value" style={{ fontSize: 11.5 }}>
                                {meta.diagnostic}
                              </span>
                              <span className="ops-detail-sub">Rate from: ₱{v.destinations?.[0]?.price.toLocaleString() || 0}</span>
                            </div>

                            <div className="ops-detail-block">
                              <span className="ops-detail-label">Est. Completion</span>
                              <span className="ops-telemetry-pill ops-telemetry-maintenance">
                                <Wrench size={12} />
                                {meta.eta}
                              </span>
                            </div>
                          </div>

                          <div className="ops-card-actions">
                            <button
                              type="button"
                              className="ops-btn-primary ops-btn-service"
                              onClick={() => handleOpsReleaseMaintenance(v.id, v.name)}
                              title="Sign off completed service and return to ready fleet"
                            >
                              <CheckSquare size={13} />
                              <span>Release to Fleet</span>
                            </button>
                            <button
                              type="button"
                              className="ops-btn-secondary"
                              onClick={() => setActiveTab("fleet")}
                              title="View fleet inventory item"
                            >
                              <span>Inspect</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {/* Empty State */}
                  {((opsTab === "returns" && activeReturns.length === 0) ||
                    (opsTab === "dispatches" && scheduledDispatches.length === 0) ||
                    (opsTab === "maintenance" && maintenanceList.length === 0) ||
                    (opsTab === "all" &&
                      activeReturns.length === 0 &&
                      scheduledDispatches.length === 0 &&
                      maintenanceList.length === 0)) && (
                    <div className="ops-empty">
                      <CheckCircle2 size={32} style={{ color: "var(--admin-success)", opacity: 0.8 }} />
                      <p>All operational tasks in this category are completely cleared!</p>
                    </div>
                  )}
                </div>

                {/* Operations Advisory Bar */}
                <div className="ops-notice-bar">
                  <div className="ops-notice-left">
                    <span className="ops-pulse-dot" />
                    <span>
                      <strong>Valet Intake Bays 1 & 2</strong> operating at optimal capacity. Digital key locker active.
                    </span>
                  </div>
                  <span>Standard turnover requirement: dual-staff inspection & odometer verification.</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: FLEET MANAGEMENT */}
          {activeTab === "fleet" && (
            <div className="dashboard-panel">
              <div className="panel-head">
                <div>
                  <h2 className="panel-title">Fleet Vehicles ({filteredVehicles.length})</h2>
                  <p className="panel-subtitle">Manage vehicle statuses, pricing, and live deployment</p>
                </div>
              </div>

              {/* Fleet Toolbar: Search + Car Type Filter + Status Filter */}
              <div className="fleet-toolbar">
                <div className="fleet-search-wrapper">
                  <Search size={14} className="fleet-search-icon" />
                  <input
                    type="text"
                    placeholder="Search car name, brand, plate..."
                    value={fleetSearchQuery}
                    onChange={(e) => {
                      setFleetSearchQuery(e.target.value);
                      setFleetPage(1);
                    }}
                    className="fleet-search-input"
                  />
                  {fleetSearchQuery && (
                    <button
                      type="button"
                      className="fleet-search-clear"
                      onClick={() => {
                        setFleetSearchQuery("");
                        setFleetPage(1);
                      }}
                      title="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                <div className="fleet-filters-group">
                  {/* Filter 1: Car Type */}
                  <div className="filter-select-wrapper">
                    <label className="filter-select-label">Type:</label>
                    <select
                      value={fleetCategoryFilter}
                      onChange={(e) => {
                        setFleetCategoryFilter(e.target.value);
                        setFleetPage(1);
                      }}
                      className="fleet-filter-select"
                    >
                      <option value="all">All Types ({vehicles.length})</option>
                      {vehicleCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat} ({vehicles.filter((v) => v.category === cat).length})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter 2: Status */}
                  <div className="filter-select-wrapper">
                    <label className="filter-select-label">Status:</label>
                    <select
                      value={fleetStatusFilter}
                      onChange={(e) => {
                        setFleetStatusFilter(e.target.value as any);
                        setFleetPage(1);
                      }}
                      className="fleet-filter-select"
                    >
                      <option value="all">All Statuses ({vehicles.length})</option>
                      <option value="available">🟢 Available ({vehicles.filter((v) => v.status === "available").length})</option>
                      <option value="rented">🔵 Rented ({vehicles.filter((v) => v.status === "rented").length})</option>
                      <option value="maintenance">🟡 Maintenance ({vehicles.filter((v) => v.status === "maintenance").length})</option>
                    </select>
                  </div>

                  {(fleetCategoryFilter !== "all" || fleetStatusFilter !== "all" || fleetSearchQuery) && (
                    <button
                      type="button"
                      className="filter-reset-btn"
                      onClick={() => {
                        setFleetCategoryFilter("all");
                        setFleetStatusFilter("all");
                        setFleetSearchQuery("");
                        setFleetPage(1);
                      }}
                      title="Reset all fleet filters"
                    >
                      <RefreshCw size={12} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="admin-table-wrap">
                {filteredVehicles.length === 0 ? (
                  <div className="table-empty-state">
                    <Car size={34} style={{ color: "var(--admin-text-muted)", opacity: 0.4 }} />
                    <p className="table-empty-title">No vehicles match your search or filter</p>
                    <p className="table-empty-sub">Try changing your car type, status filter, or search keyword</p>
                    <button
                      type="button"
                      className="admin-primary-btn"
                      style={{ marginTop: 8 }}
                      onClick={() => {
                        setFleetCategoryFilter("all");
                        setFleetStatusFilter("all");
                        setFleetSearchQuery("");
                        setFleetPage(1);
                      }}
                    >
                      <RefreshCw size={13} />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                ) : (
                  <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Category</th>
                      <th>License Plate</th>
                      <th>Daily Rate</th>
                      <th>Total Trips</th>
                      <th>Current Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedVehicles.map((car) => (
                      <tr key={car.id}>
                        <td>
                          <div className="vehicle-cell">
                            <div className="vehicle-thumb">
                              <Image
                                src={car.images[0] || ""}
                                alt={car.name}
                                fill
                                sizes="60px"
                              />
                            </div>
                            <div className="vehicle-cell-info">
                              <span className="vehicle-cell-title">{car.name}</span>
                              <span className="vehicle-cell-sub">{car.brand}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#cbd5e1" }}>
                            {car.category}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "#fff" }}>
                            {car.plate}
                          </span>
                        </td>
                        <td>
                          <strong>₱{car.destinations?.[0]?.price.toLocaleString() || 0}</strong>+
                        </td>
                        <td>
                          <span style={{ color: "#8b929d" }}>{car.trips} trips</span>
                        </td>
                        <td>
                          <span className={`status-pill status-${car.status}`}>
                            {car.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button
                            className={`table-action-btn triple-dot-btn ${openActionMenuId === car.id ? "active" : ""}`}
                            title="Actions"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionMenuId(openActionMenuId === car.id ? null : car.id);
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openActionMenuId === car.id && (
                            <>
                              <div
                                className="action-menu-backdrop"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenActionMenuId(null);
                                }}
                              />
                              <div className="action-dropdown-menu">
                                <div className="action-menu-header">Change Status</div>
                                <button
                                  type="button"
                                  className={`action-menu-item ${car.status === "available" ? "selected" : ""}`}
                                  onClick={() => handleStatusChange(car.id, "available")}
                                >
                                  <span className="menu-status-dot dot-available" />
                                  <span>Available</span>
                                  {car.status === "available" && <Check size={13} className="menu-check-icon" />}
                                </button>
                                <button
                                  type="button"
                                  className={`action-menu-item ${car.status === "rented" ? "selected" : ""}`}
                                  onClick={() => handleStatusChange(car.id, "rented")}
                                >
                                  <span className="menu-status-dot dot-rented" />
                                  <span>Rented</span>
                                  {car.status === "rented" && <Check size={13} className="menu-check-icon" />}
                                </button>
                                <button
                                  type="button"
                                  className={`action-menu-item ${car.status === "maintenance" ? "selected" : ""}`}
                                  onClick={() => handleStatusChange(car.id, "maintenance")}
                                >
                                  <span className="menu-status-dot dot-maintenance" />
                                  <span>Maintenance</span>
                                  {car.status === "maintenance" && <Check size={13} className="menu-check-icon" />}
                                </button>

                                <div className="action-menu-divider" />

                                <button
                                  type="button"
                                  className="action-menu-item"
                                  onClick={() => {
                                    setVehicleEditorTab("specs"); setEditingVehicle(car);
                                    setOpenActionMenuId(null);
                                  }}
                                >
                                  <Edit3 size={14} />
                                  <span>Edit Vehicle</span>
                                </button>

                                <button
                                  type="button"
                                  className="action-menu-item danger"
                                  onClick={() => {
                                    handleDeleteVehicle(car.id);
                                  }}
                                >
                                  <Trash2 size={14} />
                                  <span>Delete Vehicle</span>
                                </button>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredVehicles.length > 0 && (
              <div className="table-pagination">
                <div className="pagination-info">
                  Showing <strong>{startFleetIndex + 1}</strong>–
                  <strong>
                    {Math.min(startFleetIndex + fleetPageSize, filteredVehicles.length)}
                  </strong>{" "}
                  of <strong>{filteredVehicles.length}</strong> vehicles
                </div>

                <div className="pagination-controls">
                  <div className="page-size-selector">
                    <span className="page-size-label">Show</span>
                    <select
                      value={fleetPageSize}
                      onChange={(e) => {
                        setFleetPageSize(Number(e.target.value));
                        setFleetPage(1);
                      }}
                      className="page-size-select"
                    >
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>
                    <span className="page-size-label">per page</span>
                  </div>

                  <div className="pagination-nav-group">
                    <button
                      type="button"
                      className="pagination-btn"
                      disabled={currentFleetPage <= 1}
                      onClick={() => setFleetPage((p) => Math.max(1, p - 1))}
                      title="Previous page"
                    >
                      <ChevronLeft size={14} />
                      <span>Prev</span>
                    </button>

                    <div className="pagination-pages">
                      {Array.from({ length: totalFleetPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          className={`pagination-page-btn ${pageNum === currentFleetPage ? "active" : ""}`}
                          onClick={() => setFleetPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="pagination-btn"
                      disabled={currentFleetPage >= totalFleetPages}
                      onClick={() => setFleetPage((p) => Math.min(totalFleetPages, p + 1))}
                      title="Next page"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

          {/* TAB 3: BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="dashboard-panel">
              <div className="panel-head">
                <div>
                  <h2 className="panel-title">Customer Bookings & Contracts ({filteredBookings.length})</h2>
                  <p className="panel-subtitle">Approve, dispatch, and monitor ongoing client hires</p>
                </div>
              </div>

              {/* Reservations Toolbar: Search + Status Filter + Vehicle Filter */}
              <div className="fleet-toolbar">
                <div className="fleet-search-wrapper">
                  <Search size={14} className="fleet-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by ID, renter, email, vehicle..."
                    value={bookingSearchQuery}
                    onChange={(e) => {
                      setBookingSearchQuery(e.target.value);
                      setBookingPage(1);
                    }}
                    className="fleet-search-input"
                  />
                  {bookingSearchQuery && (
                    <button
                      type="button"
                      className="fleet-search-clear"
                      onClick={() => {
                        setBookingSearchQuery("");
                        setBookingPage(1);
                      }}
                      title="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                <div className="fleet-filters-group">
                  {/* Status Filter */}
                  <div className="filter-select-wrapper">
                    <label className="filter-select-label">Status:</label>
                    <select
                      value={bookingFilter}
                      onChange={(e) => {
                        setBookingFilter(e.target.value as any);
                        setBookingPage(1);
                      }}
                      className="fleet-filter-select"
                    >
                      <option value="all">All Statuses ({bookings.length})</option>
                      <option value="active">Active ({bookings.filter((b) => b.status === "active").length})</option>
                      <option value="confirmed">Confirmed ({bookings.filter((b) => b.status === "confirmed").length})</option>
                      <option value="pending">Pending ({bookings.filter((b) => b.status === "pending").length})</option>
                      <option value="completed">Completed ({bookings.filter((b) => b.status === "completed").length})</option>
                    </select>
                  </div>

                  {/* Vehicle Model / Brand Filter */}
                  <div className="filter-select-wrapper">
                    <label className="filter-select-label">Vehicle:</label>
                    <select
                      value={bookingVehicleFilter}
                      onChange={(e) => {
                        setBookingVehicleFilter(e.target.value);
                        setBookingPage(1);
                      }}
                      className="fleet-filter-select"
                    >
                      <option value="all">All Vehicles ({bookings.length})</option>
                      <option value="Lamborghini">Lamborghini ({bookings.filter((b) => b.carName.includes("Lamborghini")).length})</option>
                      <option value="Porsche">Porsche ({bookings.filter((b) => b.carName.includes("Porsche")).length})</option>
                      <option value="Rolls-Royce">Rolls-Royce ({bookings.filter((b) => b.carName.includes("Rolls-Royce")).length})</option>
                      <option value="Tesla">Tesla ({bookings.filter((b) => b.carName.includes("Tesla")).length})</option>
                      <option value="Range Rover">Range Rover ({bookings.filter((b) => b.carName.includes("Range Rover") || b.carName.includes("Velar") || b.carName.includes("Defender")).length})</option>
                      <option value="BMW">BMW ({bookings.filter((b) => b.carName.includes("BMW")).length})</option>
                      <option value="Mercedes-Benz">Mercedes-Benz ({bookings.filter((b) => b.carName.includes("Mercedes-Benz")).length})</option>
                      <option value="Toyota">Toyota ({bookings.filter((b) => b.carName.includes("Toyota")).length})</option>
                    </select>
                  </div>

                  {(bookingFilter !== "all" || bookingVehicleFilter !== "all" || bookingSearchQuery) && (
                    <button
                      type="button"
                      className="filter-reset-btn"
                      onClick={() => {
                        setBookingFilter("all");
                        setBookingVehicleFilter("all");
                        setBookingSearchQuery("");
                        setBookingPage(1);
                      }}
                      title="Reset all reservation filters"
                    >
                      <RefreshCw size={12} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="admin-table-wrap">
                {filteredBookings.length === 0 ? (
                  <div className="table-empty-state">
                    <CalendarCheck size={34} style={{ color: "var(--admin-text-muted)", opacity: 0.4 }} />
                    <p className="table-empty-title">No reservations match your filter</p>
                    <p className="table-empty-sub">Try changing your status, vehicle filter, or search keyword</p>
                    <button
                      type="button"
                      className="admin-primary-btn"
                      style={{ marginTop: 8 }}
                      onClick={() => {
                        setBookingFilter("all");
                        setBookingVehicleFilter("all");
                        setBookingSearchQuery("");
                        setBookingPage(1);
                      }}
                    >
                      <RefreshCw size={13} />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                ) : (
                  <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Renter</th>
                      <th>Vehicle</th>
                      <th>Dates</th>
                      <th>Duration</th>
                      <th>Total (₱)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <span style={{ fontFamily: "var(--font-mono)", color: "#4da3ff", fontWeight: 700 }}>
                            {b.id}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: "#fff" }}>{b.customerName}</div>
                          <div style={{ fontSize: 11, color: "#8b929d" }}>{b.customerEmail}</div>
                        </td>
                        <td>
                          <div className="vehicle-cell">
                            <div className="vehicle-thumb">
                              <Image
                                src={b.carImage}
                                alt={b.carName}
                                fill
                                sizes="60px"
                              />
                            </div>
                            <span className="vehicle-cell-title">{b.carName}</span>
                          </div>
                        </td>
                        <td>{b.startDate} → {b.endDate}</td>
                        <td>{b.days} Days</td>
                        <td>
                          <strong>₱{b.totalPrice.toLocaleString()}</strong>
                        </td>
                        <td>
                          <span className={`status-pill status-${b.status}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button
                            className={`table-action-btn triple-dot-btn ${openBookingMenuId === b.id ? "active" : ""}`}
                            title="Actions"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenBookingMenuId(openBookingMenuId === b.id ? null : b.id);
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openBookingMenuId === b.id && (
                            <>
                              <div
                                className="action-menu-backdrop"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenBookingMenuId(null);
                                }}
                              />
                              <div className="action-dropdown-menu">
                                <div className="action-menu-header">Update Status</div>

                                {b.status === "pending" && (
                                  <button
                                    type="button"
                                    className="action-menu-item"
                                    onClick={() => handleBookingAction(b.id, "confirmed")}
                                  >
                                    <CheckCircle2 size={14} style={{ color: "#10b981" }} />
                                    <span>Approve Booking</span>
                                  </button>
                                )}

                                {(b.status === "confirmed" || b.status === "pending") && (
                                  <button
                                    type="button"
                                    className="action-menu-item"
                                    onClick={() => handleBookingAction(b.id, "active")}
                                  >
                                    <Car size={14} style={{ color: "#3b82f6" }} />
                                    <span>Dispatch (Start Trip)</span>
                                  </button>
                                )}

                                {b.status === "active" && (
                                  <button
                                    type="button"
                                    className="action-menu-item"
                                    onClick={() => handleBookingAction(b.id, "completed")}
                                  >
                                    <CheckCircle2 size={14} style={{ color: "#9ca3af" }} />
                                    <span>Mark Returned</span>
                                  </button>
                                )}

                                <div className="action-menu-divider" />

                                {b.status !== "completed" ? (
                                  <button
                                    type="button"
                                    className="action-menu-item danger"
                                    onClick={() => handleBookingAction(b.id, "completed")}
                                  >
                                    <X size={14} />
                                    <span>Cancel Reservation</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="action-menu-item"
                                    onClick={() => handleBookingAction(b.id, "confirmed")}
                                  >
                                    <RefreshCw size={13} />
                                    <span>Re-open Booking</span>
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Reservation Pagination */}
            {filteredBookings.length > 0 && (
              <div className="table-pagination">
                <div className="pagination-info">
                  Showing <strong>{startBookingIndex + 1}</strong>–
                  <strong>
                    {Math.min(startBookingIndex + bookingPageSize, filteredBookings.length)}
                  </strong>{" "}
                  of <strong>{filteredBookings.length}</strong> reservations
                </div>

                <div className="pagination-controls">
                  <div className="page-size-selector">
                    <span className="page-size-label">Show</span>
                    <select
                      value={bookingPageSize}
                      onChange={(e) => {
                        setBookingPageSize(Number(e.target.value));
                        setBookingPage(1);
                      }}
                      className="page-size-select"
                    >
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                    <span className="page-size-label">per page</span>
                  </div>

                  <div className="pagination-nav-group">
                    <button
                      type="button"
                      className="pagination-btn"
                      disabled={currentBookingPage <= 1}
                      onClick={() => setBookingPage((p) => Math.max(1, p - 1))}
                      title="Previous page"
                    >
                      <ChevronLeft size={14} />
                      <span>Prev</span>
                    </button>

                    <div className="pagination-pages">
                      {Array.from({ length: totalBookingPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          className={`pagination-page-btn ${pageNum === currentBookingPage ? "active" : ""}`}
                          onClick={() => setBookingPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="pagination-btn"
                      disabled={currentBookingPage >= totalBookingPages}
                      onClick={() => setBookingPage((p) => Math.min(totalBookingPages, p + 1))}
                      title="Next page"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === "customers" && (
            <div className="dashboard-panel">
              <div className="panel-head">
                <div>
                  <h2 className="panel-title">Verified Customer Profiles</h2>
                  <p className="panel-subtitle">Driver background checks, license validation, and trip history</p>
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Contact Number</th>
                      <th>Driver License</th>
                      <th>Verification</th>
                      <th>Completed Trips</th>
                      <th>Lifetime Spend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((cust) => (
                      <tr key={cust.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: "#fff" }}>{cust.name}</div>
                          <div style={{ fontSize: 11, color: "#8b929d" }}>{cust.email}</div>
                        </td>
                        <td>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                            {cust.phone}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: "var(--font-mono)", color: "#cbd5e1" }}>
                            {cust.licenseNumber}
                          </span>
                        </td>
                        <td>
                          {cust.verified ? (
                            <span className="status-pill status-available">
                              <ShieldCheck size={12} style={{ display: "inline", marginRight: 3 }} /> Verified
                            </span>
                          ) : (
                            <span className="status-pill status-maintenance">
                              <Clock size={12} style={{ display: "inline", marginRight: 3 }} /> Pending Review
                            </span>
                          )}
                        </td>
                        <td>
                          <strong>{cust.totalBookings} rentals</strong>
                        </td>
                        <td>
                          <strong style={{ color: "#4da3ff" }}>
                            ₱{cust.totalSpent.toLocaleString()}
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
