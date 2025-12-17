"use client";
import { useLaporan } from "@/app/context/laporanProvider";

export default function Laporan() {
  const { data } = useLaporan();

  if (!data) return <p>Data tidak ditemukan</p>;

  return (
    <main className="flex flex-col w-full gap-10">
        Laporan

        {JSON.stringify(data, null, 2)}
    </main>
  )

}
