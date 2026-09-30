"use client";

import { useState } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import {
  workspaceLocations,
} from "@/data/workspace";
import type {
  WorkspaceCurrency,
  WorkspaceLocation,
} from "@/types/workspace";

function getTomorrowDate() {
  const date = new Date();

  date.setDate(date.getDate() + 1);

  return date.toISOString().split("T")[0];
}

export default function Home() {
  const [currency, setCurrency] =
    useState<WorkspaceCurrency>("USD");

  const [location, setLocation] =
    useState<WorkspaceLocation | null>(
      workspaceLocations[0] ?? null,
    );

  const [rentalDate, setRentalDate] =
    useState(getTomorrowDate());

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Header
        currency={currency}
        location={location}
        rentalDate={rentalDate}
        onCurrencyChange={setCurrency}
        onLocationChange={setLocation}
        onRentalDateChange={setRentalDate}
      />

      <WorkspaceShell
        currency={currency}
        location={location}
        onLocationChange={setLocation}
        rentalDate={rentalDate}
        onRentalDateChange={setRentalDate}
      />

      <Footer />
    </div>
  );
}