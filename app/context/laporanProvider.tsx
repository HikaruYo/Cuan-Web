"use client";
import { createContext, useContext, useState } from "react";

type LaporanData = any;

const LaporanContext = createContext<{
  data: LaporanData | null;
  setData: (d: LaporanData) => void;
} | null>(null);

export function LaporanProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<LaporanData | null>(null);

  return (
    <LaporanContext.Provider value={{ data, setData }}>
      {children}
    </LaporanContext.Provider>
  );
}

export function useLaporan() {
  const ctx = useContext(LaporanContext);
  if (!ctx) throw new Error("useLaporan must be used inside provider");
  return ctx;
}
