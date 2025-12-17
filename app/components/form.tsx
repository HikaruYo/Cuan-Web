"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(
        "https://immoderately-puniest-lang.ngrok-free.dev/webhook-test/laporan-keuangan",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);

      if (data) {
        console.log("Berhasil dikirim", data);
        router.push("/laporan");
      } else {
        console.log("Gagal dikirim");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={submitForm}
      encType="multipart/form-data"
      className="flex w-full gap-4"
    >
      <div className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Masukkan Nama Anda</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            className="p-2 border rounded focus:outline-none focus:ring-1"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="jenisLaporan">Pilih Jenis Laporan</label>
          <select
            id="jenisLaporan"
            name="jenisLaporan"
            defaultValue=""
            className="p-3 border rounded focus:ring-0"
            required
          >
            <option value="" disabled>
              -- Pilih Jenis Laporan --
            </option>
            <option value="pengeluaran">Pengeluaran</option>
            <option value="pemasukan">Pemasukan</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-1/3 mt-4 p-2 bg-gray-200 shadow-sm rounded hover:bg-gray-300 transition"
        >
          Kirim
        </button>
      </div>

      <div className="flex flex-col gap-1 w-1/2">
        <label htmlFor="buktiStruk">Kirim Struk Anda</label>
        <input
          id="buktiStruk"
          type="file"
          name="buktiStruk"
          accept="image/*"
          onChange={handleImageUpload}
          className="border rounded p-2"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-full max-h-72 max-w-40 object-cover rounded border"
          />
        )}
      </div>
    </form>
  );
}
