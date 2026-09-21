"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarCheck,
  Car,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Edit3,
  ExternalLink,
  Filter,
  LayoutDashboard,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import "./admin.css";

type VehicleStatus = "available" | "rented" | "maintenance";
type BookingStatus = "confirmed" | "active" | "pending" | "completed";

interface AdminVehicle {
  id: string;
  name: string;
  brand: string;
  category: "Sports" | "Luxury" | "Sedan" | "SUV" | "Economy";
  plate: string;
  image: string;
  rate: number;
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
    image: "/images/fleet-sports-huracan.jpg",
    rate: 28000,
    status: "rented",
    trips: 42,
  },
  {
    id: "v-2",
    name: "911 Carrera T",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9911",
    image: "/images/fleet-porsche.jpg",
    rate: 18500,
    status: "available",
    trips: 68,
  },
  {
    id: "v-3",
    name: "Phantom VIII",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7700",
    image: "/images/fleet-rolls.jpg",
    rate: 35000,
    status: "rented",
    trips: 24,
  },
  {
    id: "v-4",
    name: "Model S Plaid",
    brand: "Tesla",
    category: "Luxury",
    plate: "DX-1020",
    image: "/images/fleet-tesla.jpg",
    rate: 12500,
    status: "available",
    trips: 84,
  },
  {
    id: "v-5",
    name: "Velar R-Dynamic",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5521",
    image: "/images/fleet-suv-velar.jpg",
    rate: 8500,
    status: "available",
    trips: 53,
  },
  {
    id: "v-6",
    name: "330i M Sport",
    brand: "BMW",
    category: "Sedan",
    plate: "DX-3300",
    image: "/images/fleet-bmw.jpg",
    rate: 5500,
    status: "rented",
    trips: 92,
  },
  {
    id: "v-7",
    name: "E-Class Executive",
    brand: "Mercedes-Benz",
    category: "Sedan",
    plate: "DX-2130",
    image: "/images/fleet-mercedes.jpg",
    rate: 6800,
    status: "available",
    trips: 76,
  },
  {
    id: "v-8",
    name: "GR Sport Hatch",
    brand: "Toyota",
    category: "Economy",
    plate: "DX-1844",
    image: "/images/fleet-toyota.jpg",
    rate: 2200,
    status: "available",
    trips: 124,
  },
  {
    id: "v-9",
    name: "Altima Premium",
    brand: "Nissan",
    category: "Economy",
    plate: "DX-4912",
    image: "/images/fleet-nissan.jpg",
    rate: 2800,
    status: "maintenance",
    trips: 89,
  },
  {
    id: "v-10",
    name: "911 GT3 RS",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9110",
    image: "/images/fleet-porsche.jpg",
    rate: 32000,
    status: "available",
    trips: 31,
  },
  {
    id: "v-11",
    name: "Ghost Extended",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7788",
    image: "/images/fleet-rolls.jpg",
    rate: 38000,
    status: "available",
    trips: 19,
  },
  {
    id: "v-12",
    name: "Defender 110 V8",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5580",
    image: "/images/fleet-suv-velar.jpg",
    rate: 11000,
    status: "rented",
    trips: 65,
  },
  {
    id: "v-13",
    name: "M5 Competition",
    brand: "BMW",
    category: "Sedan",
    plate: "DX-3550",
    image: "/images/fleet-bmw.jpg",
    rate: 14500,
    status: "available",
    trips: 47,
  },
  {
    id: "v-14",
    name: "Corolla Cross HEV",
    brand: "Toyota",
    category: "Economy",
    plate: "DX-1920",
    image: "/images/fleet-toyota.jpg",
    rate: 2500,
    status: "available",
    trips: 110,
  },
  {
    id: "v-15",
    name: "Huracán STO",
    brand: "Lamborghini",
    category: "Sports",
    plate: "DX-8822",
    image: "/images/fleet-sports-huracan.jpg",
    rate: 42000,
    status: "maintenance",
    trips: 18,
  },
  {
    id: "v-16",
    name: "Cullinan Black Badge",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7744",
    image: "/images/fleet-rolls.jpg",
    rate: 45000,
    status: "rented",
    trips: 29,
  },
  {
    id: "v-17",
    name: "Range Rover Sport",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5599",
    image: "/images/fleet-suv-velar.jpg",
    rate: 13500,
    status: "available",
    trips: 58,
  },
  {
    id: "v-18",
    name: "S-Class 580 Maybach",
    brand: "Mercedes-Benz",
    category: "Sedan",
    plate: "DX-2255",
    image: "/images/fleet-mercedes.jpg",
    rate: 22000,
    status: "rented",
    trips: 38,
  },
  {
    id: "v-19",
    name: "Sentra SR Turbo",
    brand: "Nissan",
    category: "Economy",
    plate: "DX-4888",
    image: "/images/fleet-nissan.jpg",
    rate: 2400,
    status: "available",
    trips: 95,
  },
  {
    id: "v-20",
    name: "718 Cayman GTS",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9718",
    image: "/images/fleet-porsche.jpg",
    rate: 16000,
    status: "available",
    trips: 72,
  },
  {
    id: "v-21",
    name: "Model X Plaid",
    brand: "Tesla",
    category: "Luxury",
    plate: "DX-1088",
    image: "/images/fleet-tesla.jpg",
    rate: 14500,
    status: "available",
    trips: 61,
  },
  {
    id: "v-22",
    name: "Discovery Metropolitan",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5544",
    image: "/images/fleet-suv-velar.jpg",
    rate: 9800,
    status: "maintenance",
    trips: 44,
  },
  {
    id: "v-23",
    name: "M3 Competition",
    brand: "BMW",
    category: "Sedan",
    plate: "DX-3388",
    image: "/images/fleet-bmw.jpg",
    rate: 11500,
    status: "rented",
    trips: 83,
  },
  {
    id: "v-24",
    name: "GR Yaris Circuit",
    brand: "Toyota",
    category: "Economy",
    plate: "DX-1899",
    image: "/images/fleet-toyota.jpg",
    rate: 3200,
    status: "available",
    trips: 102,
  },
  {
    id: "v-25",
    name: "Aventador SVJ",
    brand: "Lamborghini",
    category: "Sports",
    plate: "DX-8801",
    image: "/images/fleet-sports-huracan.jpg",
    rate: 52000,
    status: "rented",
    trips: 15,
  },
  {
    id: "v-26",
    name: "Spectre EV Coupe",
    brand: "Rolls-Royce",
    category: "Luxury",
    plate: "DX-7799",
    image: "/images/fleet-rolls.jpg",
    rate: 48000,
    status: "available",
    trips: 12,
  },
  {
    id: "v-27",
    name: "Defender 90 Trophy",
    brand: "Range Rover",
    category: "SUV",
    plate: "DX-5511",
    image: "/images/fleet-suv-velar.jpg",
    rate: 10500,
    status: "available",
    trips: 39,
  },
  {
    id: "v-28",
    name: "C-Class AMG Line",
    brand: "Mercedes-Benz",
    category: "Sedan",
    plate: "DX-2188",
    image: "/images/fleet-mercedes.jpg",
    rate: 5800,
    status: "available",
    trips: 88,
  },
  {
    id: "v-29",
    name: "Kicks e-Power Sport",
    brand: "Nissan",
    category: "Economy",
    plate: "DX-4955",
    image: "/images/fleet-nissan.jpg",
    rate: 2600,
    status: "available",
    trips: 115,
  },
  {
    id: "v-30",
    name: "Taycan Turbo S",
    brand: "Porsche",
    category: "Sports",
    plate: "DX-9950",
    image: "/images/fleet-porsche.jpg",
    rate: 26000,
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

  const [vehicles, setVehicles] = useState<AdminVehicle[]>(INITIAL_VEHICLES);
  const [bookings, setBookings] = useState<AdminBooking[]>(INITIAL_BOOKINGS);
  const [customers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);

  // Modal & Action Menu State
  const [showAddModal, setShowAddModal] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [openBookingMenuId, setOpenBookingMenuId] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<AdminVehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    brand: "",
    category: "Sports" as const,
    plate: "",
    rate: 5000,
    image: "/images/fleet-sports-huracan.jpg",
  });

  // KPI Calculations
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0) + 1606500; // includes past cycle
  const activeRentalsCount = vehicles.filter((v) => v.status === "rented").length;
  const availableCount = vehicles.filter((v) => v.status === "available").length;
  const maintenanceCount = vehicles.filter((v) => v.status === "maintenance").length;

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

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.name || !newVehicle.brand) return;

    const created: AdminVehicle = {
      id: `v-${Date.now()}`,
      name: newVehicle.name,
      brand: newVehicle.brand,
      category: newVehicle.category,
      plate: newVehicle.plate || `DX-${Math.floor(1000 + Math.random() * 9000)}`,
      rate: Number(newVehicle.rate) || 5000,
      image: newVehicle.image,
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
      rate: 5000,
      image: "/images/fleet-sports-huracan.jpg",
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
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "fleet" ? "active" : ""}`}
            onClick={() => setActiveTab("fleet")}
          >
            <Car size={18} />
            <span>Fleet Inventory</span>
            <span className="admin-nav-badge">{vehicles.length}</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <CalendarCheck size={18} />
            <span>Reservations</span>
            <span className="admin-nav-badge">{bookings.length}</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => setActiveTab("customers")}
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
            <h1>
              {activeTab === "overview" && "Executive Dashboard"}
              {activeTab === "fleet" && "Fleet Management"}
              {activeTab === "bookings" && "Reservations & Bookings"}
              {activeTab === "customers" && "Verified Customers Directory"}
            </h1>
          </div>

          <div className="admin-topbar-actions">
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
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                <span>Add Vehicle</span>
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="admin-content">
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

              {/* Recent Activity Table */}
              <div className="dashboard-panel">
                <div className="panel-head">
                  <div>
                    <h2 className="panel-title">Recent Rental Operations</h2>
                    <p className="panel-subtitle">Real-time dispatches, check-ins, and reservations</p>
                  </div>
                  <button
                    className="filter-btn"
                    onClick={() => setActiveTab("bookings")}
                  >
                    View All Bookings <ArrowUpRight size={14} style={{ display: "inline" }} />
                  </button>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Renter</th>
                        <th>Vehicle</th>
                        <th>Rental Window</th>
                        <th>Total (₱)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 4).map((b) => (
                        <tr key={b.id}>
                          <td>
                            <strong style={{ fontFamily: "var(--font-mono)", color: "#4da3ff" }}>
                              {b.id}
                            </strong>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{b.customerName}</div>
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
                          <td>
                            <div>{b.startDate} to {b.endDate}</div>
                            <small style={{ color: "#8b929d" }}>{b.days} Days</small>
                          </td>
                          <td>
                            <strong>₱{b.totalPrice.toLocaleString()}</strong>
                          </td>
                          <td>
                            <span className={`status-pill status-${b.status}`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      <option value="Sports">Sports ({vehicles.filter((v) => v.category === "Sports").length})</option>
                      <option value="Luxury">Luxury ({vehicles.filter((v) => v.category === "Luxury").length})</option>
                      <option value="Sedan">Sedan ({vehicles.filter((v) => v.category === "Sedan").length})</option>
                      <option value="SUV">SUV ({vehicles.filter((v) => v.category === "SUV").length})</option>
                      <option value="Economy">Economy ({vehicles.filter((v) => v.category === "Economy").length})</option>
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
                                src={car.image}
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
                          <strong>₱{car.rate.toLocaleString()}</strong> / day
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
                                    setEditingVehicle(car);
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
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Add New Fleet Vehicle</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleCreateVehicle}>
              <label>
                <span>Car Model Name</span>
                <input
                  required
                  placeholder="e.g. 720S Spider"
                  value={newVehicle.name}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, name: e.target.value })
                  }
                />
              </label>

              <label>
                <span>Make / Brand</span>
                <input
                  required
                  placeholder="e.g. McLaren"
                  value={newVehicle.brand}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, brand: e.target.value })
                  }
                />
              </label>

              <label>
                <span>Vehicle Category</span>
                <select
                  value={newVehicle.category}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      category: e.target.value as any,
                    })
                  }
                >
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Economy">Economy</option>
                </select>
              </label>

              <label>
                <span>Daily Rate (₱)</span>
                <input
                  type="number"
                  required
                  placeholder="e.g. 24000"
                  value={newVehicle.rate}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      rate: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label>
                <span>License Plate</span>
                <input
                  placeholder="e.g. DX-7799"
                  value={newVehicle.plate}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, plate: e.target.value })
                  }
                />
              </label>

              <label>
                <span>Image Path / Preset</span>
                <select
                  value={newVehicle.image}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, image: e.target.value })
                  }
                >
                  <option value="/images/fleet-sports-huracan.jpg">Lamborghini Huracán</option>
                  <option value="/images/fleet-porsche.jpg">Porsche 911</option>
                  <option value="/images/fleet-rolls.jpg">Rolls-Royce</option>
                  <option value="/images/fleet-tesla.jpg">Tesla Model S</option>
                  <option value="/images/fleet-suv-velar.jpg">Range Rover Velar</option>
                  <option value="/images/fleet-bmw.jpg">BMW 330i</option>
                  <option value="/images/fleet-mercedes.jpg">Mercedes-Benz E-Class</option>
                  <option value="/images/fleet-toyota.jpg">Toyota GR</option>
                  <option value="/images/fleet-nissan.jpg">Nissan Altima</option>
                </select>
              </label>

              <div className="modal-actions full-span">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Vehicle Modal */}
      {editingVehicle && (
        <div className="modal-overlay" onClick={() => setEditingVehicle(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Edit Vehicle: {editingVehicle.name}</h3>
                <p className="modal-subtitle">Update vehicle pricing, category, plate or status</p>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setEditingVehicle(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateVehicle} className="modal-form">
              <label>
                <span>Vehicle Model Name</span>
                <input
                  required
                  value={editingVehicle.name}
                  onChange={(e) =>
                    setEditingVehicle({ ...editingVehicle, name: e.target.value })
                  }
                />
              </label>

              <label>
                <span>Make / Brand</span>
                <input
                  required
                  value={editingVehicle.brand}
                  onChange={(e) =>
                    setEditingVehicle({ ...editingVehicle, brand: e.target.value })
                  }
                />
              </label>

              <label>
                <span>Vehicle Category</span>
                <select
                  value={editingVehicle.category}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      category: e.target.value as any,
                    })
                  }
                >
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Economy">Economy</option>
                </select>
              </label>

              <label>
                <span>Daily Rate (₱)</span>
                <input
                  type="number"
                  required
                  value={editingVehicle.rate}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      rate: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label>
                <span>License Plate</span>
                <input
                  value={editingVehicle.plate}
                  onChange={(e) =>
                    setEditingVehicle({ ...editingVehicle, plate: e.target.value })
                  }
                />
              </label>

              <label>
                <span>Status</span>
                <select
                  value={editingVehicle.status}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      status: e.target.value as any,
                    })
                  }
                >
                  <option value="available">🟢 Available</option>
                  <option value="rented">🔵 Rented</option>
                  <option value="maintenance">🟡 Maintenance</option>
                </select>
              </label>

              <div className="modal-actions full-span">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setEditingVehicle(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Update Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


