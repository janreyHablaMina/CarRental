"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface OpenBookingOptions {
  vehicleId?: string;
  destination?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  returnDate?: string;
  vehicleType?: string;
  step?: number;
}

interface BookingContextType {
  isModalOpen: boolean;
  bookingOptions: OpenBookingOptions;
  openBooking: (options?: OpenBookingOptions) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingOptions, setBookingOptions] = useState<OpenBookingOptions>({});

  const openBooking = (options?: OpenBookingOptions) => {
    setBookingOptions(options || {});
    setIsModalOpen(true);
  };

  const closeBooking = () => {
    setIsModalOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        bookingOptions,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
