export default function Home() {
  return (
    <main className="flex flex-col w-full gap-14 p-6">
      <div className="gap-4">
        <h3 className="text-4xl font-semibold">
          Catat keuangan mu sekarang juga!
        </h3>
        <p className="text-lg">
          Kirim struk transaksimu dan pindai secara otomatis menggunakan AI
        </p>
      </div>

      <div className="flex w-full gap-10">
        <a
          href="/pindai"
          className="flex justify-center items-center w-1/2 text-xl p-10 bg-amber-200 shadow rounded-lg hover:bg-amber-300/80 transition duration-300"
        >
          Upload Struk Transaksi mu
        </a>

        <a
          href="/laporan"
          className="flex justify-center items-center w-1/2 text-xl p-10 bg-lime-200 shadow rounded-lg hover:bg-lime-300/80 transition duration-300"
        >
          Lihat Laporan Keuangan mu
        </a>
      </div>
    </main>
  );
}
