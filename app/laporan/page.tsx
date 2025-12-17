"use client";
import { useEffect, useState } from "react";

type Pengeluaran = {
  tanggal: string;
  jam: string;
  barang: string;
  alamat: string;
  totalHarga: string;
  diskonHarga: string;
  pajak: string;
  nama: string;
};

type Pemasukan = {
  tanggal: string;
  jam: string;
  alamat: string;
  total: string;
};

export default function Laporan() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sheets")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!data?.success) return <p>Data tidak ditemukan</p>;

  const pengeluaran: Pengeluaran[] = data.pengeluaran ?? [];
  const pemasukan: Pemasukan[] = data.pemasukan ?? [];

  const formatRupiah = (value: string) =>
    "Rp " + (Number(value) || 0).toLocaleString("id-ID");

  return (
    <main className="flex flex-col w-full gap-2 p-6">
      <h1 className="text-2xl font-bold">Laporan Keuangan</h1>

      {/* ===== Pengeluaran ===== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Pengeluaran</h2>

        {pengeluaran.length === 0 ? (
          <p className="text-gray-500">Belum ada data pengeluaran</p>
        ) : (
          <div className="max-h-56 overflow-y-auto rounded">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2">Tanggal</th>
                  <th className="border px-2">Jam</th>
                  <th className="border px-2">Barang</th>
                  <th className="border px-2">Alamat</th>
                  <th className="border px-2">Total</th>
                  <th className="border px-2">Diskon</th>
                  <th className="border px-2">Pajak</th>
                  <th className="border px-2">Nama</th>
                </tr>
              </thead>
              <tbody>
                {pengeluaran.map((item, i) => (
                  <tr key={i}>
                    <td className="border px-2">{item.tanggal}</td>
                    <td className="border px-2">{item.jam}</td>
                    <td className="px-3 py-2 border">
                      <ul className="list-disc pl-4 space-y-1">
                        {item.barang
                          .split(",")
                          .map((barang: string, idx: number) => (
                            <li key={idx}>{barang.trim()}</li>
                          ))}
                      </ul>
                    </td>
                    <td className="border px-2">{item.alamat}</td>
                    <td className="border px-2 text-right">
                      {formatRupiah(item.totalHarga)}
                    </td>
                    <td className="border px-2 text-right">
                      {formatRupiah(item.diskonHarga)}
                    </td>
                    <td className="border px-2 text-right">
                      {formatRupiah(item.pajak)}
                    </td>
                    <td className="border px-2">{item.nama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ===== Pemasukan ===== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Pemasukan</h2>

        {pemasukan.length === 0 ? (
          <p className="text-gray-500">Belum ada data pemasukan</p>
        ) : (
          <div className="max-h-56 overflow-y-auto rounded">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2">Tanggal</th>
                  <th className="border px-2">Jam</th>
                  <th className="border px-2">Alamat</th>
                  <th className="border px-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {pemasukan.map((item, i) => (
                  <tr key={i}>
                    <td className="border px-2">{item.tanggal}</td>
                    <td className="border px-2">{item.jam}</td>
                    <td className="border px-2">{item.alamat}</td>
                    <td className="border px-2 text-right">
                      {formatRupiah(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
