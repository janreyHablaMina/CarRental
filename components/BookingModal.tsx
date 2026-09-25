"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  ShieldCheck,
  FileText,
  Upload,
  Camera,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileCheck,
  Trash2,
  Phone,
  Mail,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { vehicles, type Vehicle } from "@/lib/vehicles";
import { useBooking } from "@/context/BookingContext";
import "./booking-modal.css";

const HUBS = [
  "BGC Flagship Concierge Hub (Taguig)",
  "Makati Concierge Suite (Ayala Ave)",
  "NAIA Terminal 3 VIP Curbside (Pasay)",
  "Clark International Airport Hub (Pampanga)",
  "Cebu IT Park Hub (Cebu City)",
  "Custom Doorstep VIP Delivery (Metro Manila)",
];

const BILL_TYPES = [
  "Electricity (Meralco)",
  "Water Utility Bill (Maynilad / Manila Water)",
  "Internet / Telecom Bill (PLDT / Globe / Converge)",
  "Bank / Credit Card Statement",
  "Barangay Clearance Certificate",
  "Residential Lease Agreement",
];

const ID_TYPES = [
  "Philippine Passport",
  "PhilSys National ID",
  "Unified Multi-Purpose ID (UMID)",
  "PRC Professional License",
  "SSS / GSIS ID",
  "Foreign Passport",
];

interface UploadedFile {
  name: string;
  size: string;
  dataUrl: string;
}

export default function BookingModal() {
  const { isModalOpen, bookingOptions, closeBooking } = useBooking();

  // Wizard Step: 1 = Reservation, 2 = Profile, 3 = Documents & Uploads, 4 = Review, 5 = Confirmed
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Vehicle & Schedule
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || "");
  const [pickupHub, setPickupHub] = useState(HUBS[0]);
  const [dropoffHub, setDropoffHub] = useState(HUBS[0]);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("18:00");
  const [rentalType, setRentalType] = useState<"self-drive" | "chauffeur">("self-drive");
  const [insuranceType, setInsuranceType] = useState<"standard" | "vip-zero">("standard");

  // Step 2: Client Profile
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("Taguig");
  const [postalCode, setPostalCode] = useState("1634");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Step 3: Documents & Uploads
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [licenseFront, setLicenseFront] = useState<UploadedFile | null>(null);
  const [licenseBack, setLicenseBack] = useState<UploadedFile | null>(null);

  const [billType, setBillType] = useState(BILL_TYPES[0]);
  const [billFile, setBillFile] = useState<UploadedFile | null>(null);

  const [idType, setIdType] = useState(ID_TYPES[0]);
  const [idFile, setIdFile] = useState<UploadedFile | null>(null);

  const [selfieFile, setSelfieFile] = useState<UploadedFile | null>(null);

  // Step 4: Payment & Review
  const [paymentMethod, setPaymentMethod] = useState<"card" | "gcash" | "maya" | "bank">("card");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeTruth, setAgreeTruth] = useState(false);

  // Step 5: Submitted State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Populate from incoming booking options
  useEffect(() => {
    if (isModalOpen) {
      if (bookingOptions.vehicleId) {
        setSelectedVehicleId(bookingOptions.vehicleId);
      }
      if (bookingOptions.pickupLocation) {
        setPickupHub(bookingOptions.pickupLocation);
      }
      if (bookingOptions.dropoffLocation) {
        setDropoffHub(bookingOptions.dropoffLocation);
      }
      if (bookingOptions.pickupDate) {
        setPickupDate(bookingOptions.pickupDate);
      } else if (!pickupDate) {
        // Default tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPickupDate(tomorrow.toISOString().split("T")[0]);
      }
      if (bookingOptions.returnDate) {
        setReturnDate(bookingOptions.returnDate);
      } else if (!returnDate) {
        // Default 3 days later
        const plusThree = new Date();
        plusThree.setDate(plusThree.getDate() + 4);
        setReturnDate(plusThree.toISOString().split("T")[0]);
      }
      if (bookingOptions.step) {
        setCurrentStep(bookingOptions.step);
      } else {
        setCurrentStep(1);
      }
      setErrorMessage("");
    }
  }, [isModalOpen, bookingOptions]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Current selected vehicle
  const currentVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  }, [selectedVehicleId]);

  // Price calculations
  const rentalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate).getTime();
    const end = new Date(returnDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [pickupDate, returnDate]);

  const vehicleDailyRate = useMemo(() => {
    if (!currentVehicle) return 0;
    return parseInt(currentVehicle.price.replace(/,/g, ""), 10) || 5000;
  }, [currentVehicle]);

  const chauffeurFee = rentalType === "chauffeur" ? 2500 * rentalDays : 0;
  const insuranceFee = insuranceType === "vip-zero" ? 1800 * rentalDays : 0;
  const subtotal = vehicleDailyRate * rentalDays + chauffeurFee + insuranceFee;
  const securityDeposit = Math.max(10000, Math.round(vehicleDailyRate * 0.5));
  const estimatedTotal = subtotal + securityDeposit;

  // File Upload Helper
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: UploadedFile | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 8MB
    if (file.size > 8 * 1024 * 1024) {
      alert("File size exceeds 8MB limit. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setter({
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        dataUrl: (event.target?.result as string) || "",
      });
    };
    reader.readAsDataURL(file);
  };

  // Step Nav Validation
  const validateStep = (step: number): boolean => {
    setErrorMessage("");
    if (step === 1) {
      if (!pickupDate || !returnDate) {
        setErrorMessage("Please select valid pickup and return dates.");
        return false;
      }
      if (new Date(returnDate) < new Date(pickupDate)) {
        setErrorMessage("Return date must be on or after the pickup date.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!fullName.trim()) {
        setErrorMessage("Please enter your legal full name.");
        return false;
      }
      if (!email.trim() || !email.includes("@")) {
        setErrorMessage("Please provide a valid email address.");
        return false;
      }
      if (!phone.trim()) {
        setErrorMessage("Please provide your active mobile or WhatsApp number.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!licenseNumber.trim()) {
        setErrorMessage("Please enter your Driver's License Number.");
        return false;
      }
      if (!licenseFront) {
        setErrorMessage("Please upload a photo of the FRONT of your Driver's License.");
        return false;
      }
      if (!billFile) {
        setErrorMessage("Please upload your Proof of Billing / Address document.");
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!agreeTerms || !agreeTruth) {
        setErrorMessage("Please review and accept the rental terms and authenticity declaration.");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(5, prev + 1));
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Final Submission
  const handleSubmitBooking = () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrorMessage("");

    setTimeout(() => {
      const generatedRef = `DX-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingRef(generatedRef);

      // Save to localStorage for Admin sync
      try {
        const existingData = localStorage.getItem("drivex_custom_bookings");
        const bookingsList = existingData ? JSON.parse(existingData) : [];

        const newAdminBooking = {
          id: generatedRef,
          customerName: fullName,
          customerEmail: email,
          customerPhone: phone,
          carName: `${currentVehicle.brand} ${currentVehicle.name}`,
          carImage: currentVehicle.image,
          startDate: pickupDate,
          endDate: returnDate,
          days: rentalDays,
          totalPrice: estimatedTotal,
          status: "pending",
          licenseNumber: licenseNumber,
          pickupHub: pickupHub,
          dropoffHub: dropoffHub,
          verified: false,
          documentsUploaded: {
            licenseFront: licenseFront?.name || "license_front.jpg",
            licenseBack: licenseBack?.name || "license_back.jpg",
            billType: billType,
            billFile: billFile?.name || "utility_bill.pdf",
            idType: idType,
            idFile: idFile?.name || "gov_id.jpg",
            selfieFile: selfieFile?.name || "client_selfie.jpg",
          },
          createdAt: new Date().toISOString(),
        };

        bookingsList.unshift(newAdminBooking);
        localStorage.setItem("drivex_custom_bookings", JSON.stringify(bookingsList));
        window.dispatchEvent(new Event("drivex_booking_created"));
      } catch (err) {
        console.error("Failed to store booking locally:", err);
      }

      setIsSubmitting(false);
      setCurrentStep(5);
    }, 1200);
  };

  if (!isModalOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={closeBooking}>
      <div
        className="booking-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bm-modal-title"
      >
        {/* Header */}
        <div className="bm-header">
          <div className="bm-header-top">
            <div className="bm-title-wrap">
              <h2 id="bm-modal-title">
                <Sparkles size={20} color="var(--accent)" />
                DriveX VIP Reservation & Verification
              </h2>
              <p>Reserve high-performance exotics with rapid identity authentication</p>
            </div>
            <button
              className="bm-close-btn"
              onClick={closeBooking}
              aria-label="Close booking modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Stepper Progress */}
          {currentStep < 5 && (
            <div className="bm-stepper">
              <div
                className={`bm-step-item ${currentStep === 1 ? "active" : ""} ${
                  currentStep > 1 ? "completed" : ""
                }`}
                onClick={() => currentStep > 1 && setCurrentStep(1)}
              >
                <div className="bm-step-num">1</div>
                <div className="bm-step-label">Vehicle & Dates</div>
              </div>
              <div
                className={`bm-step-item ${currentStep === 2 ? "active" : ""} ${
                  currentStep > 2 ? "completed" : ""
                }`}
                onClick={() => currentStep > 2 && setCurrentStep(2)}
              >
                <div className="bm-step-num">2</div>
                <div className="bm-step-label">Client Profile</div>
              </div>
              <div
                className={`bm-step-item ${currentStep === 3 ? "active" : ""} ${
                  currentStep > 3 ? "completed" : ""
                }`}
                onClick={() => currentStep > 3 && setCurrentStep(3)}
              >
                <div className="bm-step-num">3</div>
                <div className="bm-step-label">License & Documents</div>
              </div>
              <div
                className={`bm-step-item ${currentStep === 4 ? "active" : ""} ${
                  currentStep > 4 ? "completed" : ""
                }`}
                onClick={() => currentStep > 4 && setCurrentStep(4)}
              >
                <div className="bm-step-num">4</div>
                <div className="bm-step-label">Review & Deposit</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="bm-body">
          {errorMessage && (
            <div
              style={{
                background: "rgba(255, 107, 107, 0.12)",
                border: "1px solid rgba(255, 107, 107, 0.35)",
                color: "#ff8585",
                padding: "10px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ============================================================
              STEP 1: VEHICLE & SCHEDULE
          ============================================================ */}
          {currentStep === 1 && (
            <div>
              <div className="bm-section-title">
                <span>Selected Vehicle</span>
                <span className="bm-badge">{currentVehicle.category} Class</span>
              </div>

              {/* Vehicle Card Preview */}
              <div className="bm-vehicle-card">
                <div className="bm-vehicle-thumb">
                  <Image
                    src={currentVehicle.image}
                    alt={`${currentVehicle.brand} ${currentVehicle.name}`}
                    fill
                    sizes="200px"
                  />
                </div>
                <div className="bm-vehicle-details">
                  <h4>{currentVehicle.brand} {currentVehicle.name}</h4>
                  <div className="bm-vehicle-specs">
                    <span>{currentVehicle.engine}</span>
                    <span>•</span>
                    <span>{currentVehicle.transmission}</span>
                    <span>•</span>
                    <span>{currentVehicle.seats} Seats</span>
                  </div>
                  <div className="bm-vehicle-rate">
                    <strong>₱{currentVehicle.price}</strong> / 24-hr day
                  </div>
                </div>
                <div className="bm-vehicle-change">
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    aria-label="Switch vehicle"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.brand} {v.name} (₱{v.price}/d)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pickup & Return Locations */}
              <div className="bm-section-title">
                <span>Dispatch Hub & Scheduling</span>
              </div>
              <div className="bm-form-grid-2">
                <div className="bm-field">
                  <label>
                    <MapPin size={14} color="var(--accent)" />
                    Pickup Location <span className="required">*</span>
                  </label>
                  <select
                    className="bm-select"
                    value={pickupHub}
                    onChange={(e) => setPickupHub(e.target.value)}
                  >
                    {HUBS.map((hub) => (
                      <option key={hub} value={hub}>
                        {hub}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bm-field">
                  <label>
                    <MapPin size={14} color="var(--accent)" />
                    Drop-off Location <span className="required">*</span>
                  </label>
                  <select
                    className="bm-select"
                    value={dropoffHub}
                    onChange={(e) => setDropoffHub(e.target.value)}
                  >
                    {HUBS.map((hub) => (
                      <option key={hub} value={hub}>
                        {hub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="bm-form-grid-2">
                <div className="bm-form-grid-2" style={{ margin: 0 }}>
                  <div className="bm-field">
                    <label>
                      <Calendar size={14} /> Pickup Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      className="bm-input"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>
                  <div className="bm-field">
                    <label>
                      <Clock size={14} /> Time
                    </label>
                    <input
                      type="time"
                      className="bm-input"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bm-form-grid-2" style={{ margin: 0 }}>
                  <div className="bm-field">
                    <label>
                      <Calendar size={14} /> Return Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      className="bm-input"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                  <div className="bm-field">
                    <label>
                      <Clock size={14} /> Time
                    </label>
                    <input
                      type="time"
                      className="bm-input"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Drive Mode & Protection options */}
              <div className="bm-options-grid">
                <div
                  className={`bm-option-card ${rentalType === "self-drive" ? "selected" : ""}`}
                  onClick={() => setRentalType("self-drive")}
                >
                  <input
                    type="radio"
                    name="rentalType"
                    checked={rentalType === "self-drive"}
                    onChange={() => setRentalType("self-drive")}
                  />
                  <div>
                    <h5>Self-Drive Rental</h5>
                    <p>Take the wheel yourself. Requires Driver&apos;s License verification in Step 3.</p>
                  </div>
                </div>
                <div
                  className={`bm-option-card ${rentalType === "chauffeur" ? "selected" : ""}`}
                  onClick={() => setRentalType("chauffeur")}
                >
                  <input
                    type="radio"
                    name="rentalType"
                    checked={rentalType === "chauffeur"}
                    onChange={() => setRentalType("chauffeur")}
                  />
                  <div>
                    <h5>VIP Chauffeur Driven (+₱2,500/d)</h5>
                    <p>Executive uniformed chauffeur included for stress-free luxury transport.</p>
                  </div>
                </div>
              </div>

              {/* Price Calculation Strip */}
              <div className="bm-price-strip">
                <div className="bm-strip-breakdown">
                  <div className="bm-strip-item">
                    <span>Duration</span>
                    <strong>{rentalDays} {rentalDays === 1 ? "Day" : "Days"}</strong>
                  </div>
                  <div className="bm-strip-item">
                    <span>Daily Rate</span>
                    <strong>₱{currentVehicle.price}</strong>
                  </div>
                  <div className="bm-strip-item">
                    <span>Refundable Deposit</span>
                    <strong>₱{securityDeposit.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="bm-strip-total">
                  <span>Estimated Total (incl. deposit)</span>
                  <h3>₱{estimatedTotal.toLocaleString()}</h3>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 2: CLIENT PROFILE
          ============================================================ */}
          {currentStep === 2 && (
            <div>
              <div className="bm-section-title">
                <span>Renter Primary Information</span>
                <span className="bm-badge">Verified Profile</span>
              </div>

              <div className="bm-form-grid-3">
                <div className="bm-field">
                  <label>
                    <User size={14} /> Full Legal Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="bm-input"
                    placeholder="e.g. Alexander Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="bm-field">
                  <label>
                    <Mail size={14} /> Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="bm-input"
                    placeholder="e.g. alex@vance.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="bm-field">
                  <label>
                    <Phone size={14} /> Phone / WhatsApp <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    className="bm-input"
                    placeholder="+63 9XX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="bm-form-grid-2">
                <div className="bm-field">
                  <label>
                    <Calendar size={14} /> Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    className="bm-input"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="bm-field">
                  <label>
                    <MapPin size={14} /> Street / Condo / Unit Address
                  </label>
                  <input
                    type="text"
                    className="bm-input"
                    placeholder="e.g. Unit 24A, Grand Hyatt Residences"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="bm-form-grid-2">
                <div className="bm-field">
                  <label>City / Province</label>
                  <input
                    type="text"
                    className="bm-input"
                    placeholder="e.g. Taguig City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="bm-field">
                  <label>Postal / ZIP Code</label>
                  <input
                    type="text"
                    className="bm-input"
                    placeholder="e.g. 1634"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="bm-section-title" style={{ marginTop: "24px" }}>
                <span>Emergency Contact</span>
                <span className="bm-badge">Safety Protocol</span>
              </div>
              <div className="bm-form-grid-2">
                <div className="bm-field">
                  <label>Emergency Contact Name</label>
                  <input
                    type="text"
                    className="bm-input"
                    placeholder="e.g. Victoria Vance (Spouse / Relative)"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                  />
                </div>
                <div className="bm-field">
                  <label>Emergency Contact Phone</label>
                  <input
                    type="tel"
                    className="bm-input"
                    placeholder="+63 9XX XXX XXXX"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 3: DOCUMENT VERIFICATION (License, Bill & ID)
          ============================================================ */}
          {currentStep === 3 && (
            <div>
              <div className="bm-docs-header-notice">
                <ShieldCheck size={20} color="var(--accent)" />
                <span>
                  <strong>Mandatory Identity & Security Verification:</strong> Please upload clear,
                  unobscured photos of your Driver&apos;s License and Proof of Billing to ensure rapid VIP curbside release.
                </span>
              </div>

              <div className="bm-docs-grid">
                {/* 1. Driver's License Card */}
                <div className={`bm-doc-card ${licenseFront ? "completed" : ""}`}>
                  <div className="bm-doc-header">
                    <h4>
                      <FileCheck size={16} color={licenseFront ? "#2ecc71" : "var(--accent)"} />
                      1. Driver&apos;s License (Required)
                    </h4>
                    <span className={`bm-doc-status ${licenseFront ? "uploaded" : "pending"}`}>
                      {licenseFront ? "Front Uploaded" : "Required"}
                    </span>
                  </div>

                  <div className="bm-form-grid-2" style={{ margin: 0 }}>
                    <div className="bm-field">
                      <label>License Number <span className="required">*</span></label>
                      <input
                        type="text"
                        className="bm-input"
                        placeholder="N01-XX-XXXXXX"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                      />
                    </div>
                    <div className="bm-field">
                      <label>Expiration Date</label>
                      <input
                        type="date"
                        className="bm-input"
                        value={licenseExpiry}
                        onChange={(e) => setLicenseExpiry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="bm-license-subgrid">
                    {/* Front Upload */}
                    <div>
                      <span style={{ fontSize: "11px", color: "#8c939d", display: "block", marginBottom: 6 }}>
                        Front Side <span style={{ color: "#ff6b6b" }}>*</span>
                      </span>
                      {licenseFront ? (
                        <div className="bm-preview-box">
                          <img
                            src={licenseFront.dataUrl}
                            alt="License Front"
                            className="bm-preview-img"
                          />
                          <div className="bm-preview-overlay">
                            <span className="bm-preview-filename">{licenseFront.name}</span>
                            <button
                              type="button"
                              className="bm-preview-remove"
                              onClick={() => setLicenseFront(null)}
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="bm-upload-zone">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, setLicenseFront)}
                          />
                          <div className="bm-upload-icon">
                            <Upload size={18} />
                          </div>
                          <span className="bm-upload-label">Upload Front</span>
                          <span className="bm-upload-subtext">JPG, PNG, WEBP</span>
                        </label>
                      )}
                    </div>

                    {/* Back Upload */}
                    <div>
                      <span style={{ fontSize: "11px", color: "#8c939d", display: "block", marginBottom: 6 }}>
                        Back Side
                      </span>
                      {licenseBack ? (
                        <div className="bm-preview-box">
                          <img
                            src={licenseBack.dataUrl}
                            alt="License Back"
                            className="bm-preview-img"
                          />
                          <div className="bm-preview-overlay">
                            <span className="bm-preview-filename">{licenseBack.name}</span>
                            <button
                              type="button"
                              className="bm-preview-remove"
                              onClick={() => setLicenseBack(null)}
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="bm-upload-zone">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, setLicenseBack)}
                          />
                          <div className="bm-upload-icon">
                            <Upload size={18} />
                          </div>
                          <span className="bm-upload-label">Upload Back</span>
                          <span className="bm-upload-subtext">JPG, PNG, WEBP</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Proof of Billing Card */}
                <div className={`bm-doc-card ${billFile ? "completed" : ""}`}>
                  <div className="bm-doc-header">
                    <h4>
                      <FileText size={16} color={billFile ? "#2ecc71" : "var(--accent)"} />
                      2. Proof of Billing / Address (Required)
                    </h4>
                    <span className={`bm-doc-status ${billFile ? "uploaded" : "pending"}`}>
                      {billFile ? "Uploaded" : "Required"}
                    </span>
                  </div>

                  <div className="bm-field">
                    <label>Billing Statement Type <span className="required">*</span></label>
                    <select
                      className="bm-select"
                      value={billType}
                      onChange={(e) => setBillType(e.target.value)}
                    >
                      {BILL_TYPES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    {billFile ? (
                      <div className="bm-preview-box">
                        <img
                          src={billFile.dataUrl}
                          alt="Proof of Billing"
                          className="bm-preview-img"
                        />
                        <div className="bm-preview-overlay">
                          <span className="bm-preview-filename">{billFile.name} ({billFile.size})</span>
                          <button
                            type="button"
                            className="bm-preview-remove"
                            onClick={() => setBillFile(null)}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="bm-upload-zone">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, setBillFile)}
                        />
                        <div className="bm-upload-icon">
                          <Upload size={20} />
                        </div>
                        <span className="bm-upload-label">Upload Utility Bill or Statement</span>
                        <span className="bm-upload-subtext">Recent within 90 days (Meralco, Water, Bank, Telco)</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* 3. Secondary Government ID / Passport */}
                <div className={`bm-doc-card ${idFile ? "completed" : ""}`}>
                  <div className="bm-doc-header">
                    <h4>
                      <ShieldCheck size={16} color={idFile ? "#2ecc71" : "var(--accent)"} />
                      3. Secondary Government ID / Passport
                    </h4>
                    <span className={`bm-doc-status ${idFile ? "uploaded" : "pending"}`}>
                      {idFile ? "Uploaded" : "Optional / VIP"}
                    </span>
                  </div>

                  <div className="bm-field">
                    <label>ID Type</label>
                    <select
                      className="bm-select"
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                    >
                      {ID_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    {idFile ? (
                      <div className="bm-preview-box">
                        <img
                          src={idFile.dataUrl}
                          alt="Secondary ID"
                          className="bm-preview-img"
                        />
                        <div className="bm-preview-overlay">
                          <span className="bm-preview-filename">{idFile.name}</span>
                          <button
                            type="button"
                            className="bm-preview-remove"
                            onClick={() => setIdFile(null)}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="bm-upload-zone">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, setIdFile)}
                        />
                        <div className="bm-upload-icon">
                          <Upload size={18} />
                        </div>
                        <span className="bm-upload-label">Upload Secondary ID Photo</span>
                        <span className="bm-upload-subtext">Speeds up verification check</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* 4. Selfie Holding ID */}
                <div className={`bm-doc-card ${selfieFile ? "completed" : ""}`}>
                  <div className="bm-doc-header">
                    <h4>
                      <Camera size={16} color={selfieFile ? "#2ecc71" : "var(--accent)"} />
                      4. Liveness Selfie with ID
                    </h4>
                    <span className={`bm-doc-status ${selfieFile ? "uploaded" : "pending"}`}>
                      {selfieFile ? "Uploaded" : "Express Verification"}
                    </span>
                  </div>

                  <div style={{ fontSize: "12px", color: "#8c939d" }}>
                    Hold your physical ID card next to your face in a well-lit room for instant AI identity match.
                  </div>

                  <div>
                    {selfieFile ? (
                      <div className="bm-preview-box">
                        <img
                          src={selfieFile.dataUrl}
                          alt="Selfie with ID"
                          className="bm-preview-img"
                        />
                        <div className="bm-preview-overlay">
                          <span className="bm-preview-filename">{selfieFile.name}</span>
                          <button
                            type="button"
                            className="bm-preview-remove"
                            onClick={() => setSelfieFile(null)}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="bm-upload-zone">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setSelfieFile)}
                        />
                        <div className="bm-upload-icon">
                          <Camera size={18} />
                        </div>
                        <span className="bm-upload-label">Take or Upload Selfie with ID</span>
                        <span className="bm-upload-subtext">Instant curbside handover eligibility</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 4: REVIEW & POLICIES
          ============================================================ */}
          {currentStep === 4 && (
            <div>
              <div className="bm-section-title">
                <span>Reservation & Verification Summary</span>
                <span className="bm-badge">Final Step</span>
              </div>

              <div className="bm-review-grid">
                {/* Left: Summary Rows */}
                <div className="bm-review-card">
                  <div className="bm-review-row">
                    <span>Selected Automobile</span>
                    <strong>{currentVehicle.brand} {currentVehicle.name}</strong>
                  </div>
                  <div className="bm-review-row">
                    <span>Rental Schedule</span>
                    <strong>{pickupDate} ({pickupTime}) → {returnDate} ({returnTime})</strong>
                  </div>
                  <div className="bm-review-row">
                    <span>Total Duration</span>
                    <strong>{rentalDays} {rentalDays === 1 ? "Day" : "Days"}</strong>
                  </div>
                  <div className="bm-review-row">
                    <span>Pickup Hub</span>
                    <strong>{pickupHub}</strong>
                  </div>
                  <div className="bm-review-row">
                    <span>Drop-off Hub</span>
                    <strong>{dropoffHub}</strong>
                  </div>
                  <div className="bm-review-row">
                    <span>Drive Mode</span>
                    <strong style={{ textTransform: "capitalize" }}>{rentalType}</strong>
                  </div>
                  <div className="bm-review-row">
                    <span>Renter Name</span>
                    <strong>{fullName}</strong>
                  </div>
                  <div className="bm-review-row">
                    <span>Contact Details</span>
                    <strong>{email} • {phone}</strong>
                  </div>
                </div>

                {/* Right: Verification Status & Totals */}
                <div className="bm-review-card">
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: 8 }}>
                    Document Verification Checklist
                  </div>
                  <div className="bm-doc-checklist">
                    <div className="bm-check-item">
                      <span>
                        <CheckCircle2 size={14} color="#2ecc71" /> Driver&apos;s License ({licenseNumber || "Attached"})
                      </span>
                      <strong style={{ color: "#2ecc71" }}>Attached</strong>
                    </div>
                    <div className="bm-check-item">
                      <span>
                        <CheckCircle2 size={14} color="#2ecc71" /> Proof of Billing ({billType})
                      </span>
                      <strong style={{ color: "#2ecc71" }}>Attached</strong>
                    </div>
                    <div className="bm-check-item">
                      <span>
                        <CheckCircle2 size={14} color={idFile ? "#2ecc71" : "#8c939d"} /> Secondary ID / Passport
                      </span>
                      <span style={{ color: idFile ? "#2ecc71" : "#8c939d" }}>
                        {idFile ? "Attached" : "Not Provided"}
                      </span>
                    </div>
                    <div className="bm-check-item">
                      <span>
                        <CheckCircle2 size={14} color={selfieFile ? "#2ecc71" : "#8c939d"} /> Selfie Liveness Check
                      </span>
                      <span style={{ color: selfieFile ? "#2ecc71" : "#8c939d" }}>
                        {selfieFile ? "Attached" : "Not Provided"}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <div className="bm-review-row">
                      <span>Vehicle Rental</span>
                      <strong>₱{(vehicleDailyRate * rentalDays).toLocaleString()}</strong>
                    </div>
                    {chauffeurFee > 0 && (
                      <div className="bm-review-row">
                        <span>VIP Chauffeur</span>
                        <strong>₱{chauffeurFee.toLocaleString()}</strong>
                      </div>
                    )}
                    <div className="bm-review-row">
                      <span>Security Hold Deposit (Refundable)</span>
                      <strong>₱{securityDeposit.toLocaleString()}</strong>
                    </div>
                    <div className="bm-review-row" style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 12 }}>
                      <span style={{ color: "var(--accent)", fontWeight: 700 }}>Total Authorized</span>
                      <strong style={{ fontSize: 18, color: "#fff" }}>₱{estimatedTotal.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginTop: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#fff", display: "block", marginBottom: 8 }}>
                  Preferred Reservation & Deposit Authorization Method
                </label>
                <div className="bm-payment-methods">
                  <div
                    className={`bm-pay-card ${paymentMethod === "card" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard size={18} />
                    <span>Credit / Debit Card (Visa, MC, Amex)</span>
                  </div>
                  <div
                    className={`bm-pay-card ${paymentMethod === "gcash" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("gcash")}
                  >
                    <span style={{ fontWeight: 700, color: "#007dfe" }}>G</span>
                    <span>GCash Mobile Wallet</span>
                  </div>
                  <div
                    className={`bm-pay-card ${paymentMethod === "maya" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("maya")}
                  >
                    <span style={{ fontWeight: 700, color: "#00d632" }}>M</span>
                    <span>Maya / PayMaya</span>
                  </div>
                  <div
                    className={`bm-pay-card ${paymentMethod === "bank" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <FileText size={18} />
                    <span>Bank Transfer / VIP Wire (BDO / BPI)</span>
                  </div>
                </div>
              </div>

              {/* Legal Consents */}
              <div className="bm-legal-box">
                <label className="bm-checkbox-row">
                  <input
                    type="checkbox"
                    checked={agreeTruth}
                    onChange={(e) => setAgreeTruth(e.target.checked)}
                  />
                  <span>
                    I affirm that all personal information and documents uploaded (Driver&apos;s License and Proof of Billing)
                    are authentic, legally issued to me, and accurate.
                  </span>
                </label>
                <label className="bm-checkbox-row">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    I have read and agree to DriveX Rental Policies, Security Deposit Terms, and Comprehensive Collision Damage Waiver guidelines.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 5: CONFIRMATION SUCCESS
          ============================================================ */}
          {currentStep === 5 && (
            <div className="bm-success-wrap">
              <div className="bm-success-icon">
                <CheckCircle2 size={42} />
              </div>
              <h2>Reservation & Verification Submitted!</h2>
              <p>
                Thank you, <strong>{fullName}</strong>. Your rental reservation for the{" "}
                <strong>{currentVehicle.brand} {currentVehicle.name}</strong> and your verification
                credentials (License & Proof of Billing) have been transmitted to our 24/7 Concierge.
              </p>

              <div className="bm-ref-pill">
                BOOKING REF: {bookingRef}
              </div>

              <div className="bm-timeline-box">
                <h4>What Happens Next</h4>
                <div className="bm-timeline-steps">
                  <div className="bm-timeline-step">
                    <CheckCircle2 size={16} color="#2ecc71" />
                    <span><strong>1. Instant Concierge Review:</strong> Our VIP verification specialist reviews your driver&apos;s license and utility billing within 15 minutes.</span>
                  </div>
                  <div className="bm-timeline-step">
                    <Clock size={16} color="var(--accent)" />
                    <span><strong>2. SMS & Email Dispatch Notice:</strong> You will receive a direct notification with the vehicle delivery status and assigned concierge contact.</span>
                  </div>
                  <div className="bm-timeline-step">
                    <Car size={16} color="#8c939d" />
                    <span><strong>3. Curbside Handover:</strong> Present your physical license upon arrival at <strong>{pickupHub}</strong> for key release.</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href={`https://wa.me/639171234567?text=Hello%20DriveX%20Concierge,%20I%20have%20submitted%20booking%20${bookingRef}%20for%20the%20${encodeURIComponent(currentVehicle.brand + " " + currentVehicle.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bm-btn-secondary"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={14} /> Message VIP Concierge (WhatsApp)
                </a>
                <button
                  type="button"
                  className="bm-btn-primary"
                  onClick={closeBooking}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Navigation Buttons */}
        {currentStep < 5 && (
          <div className="bm-footer">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  className="bm-btn-secondary"
                  onClick={handlePrevStep}
                >
                  <ArrowLeft size={16} /> Back
                </button>
              )}
            </div>

            <div>
              {currentStep < 4 ? (
                <button
                  type="button"
                  className="bm-btn-primary"
                  onClick={handleNextStep}
                >
                  Continue to {currentStep === 1 ? "Client Profile" : currentStep === 2 ? "Upload Documents" : "Review & Deposit"}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="bm-btn-primary"
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting || !agreeTerms || !agreeTruth}
                >
                  {isSubmitting ? (
                    "Transmitting Credentials..."
                  ) : (
                    <>
                      Submit Reservation & Documents
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
