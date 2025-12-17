import { NextResponse } from "next/server";
import { google } from "googleapis";

type PengeluaranRow = {
  jenisLaporan: string;
  tanggal: string;
  jam: string;
  alamat: string;
  barang: string;
  totalHarga: string;
  diskonHarga: string;
  kembalian: string;
  pajak: string;
  nama: string;
};

type PemasukanRow = {
  jenisLaporan: string;
  tanggal: string;
  jam: string;
  alamat: string;
  total: string;
}

function pengeluaranRow(rows: string[][] = []): PengeluaranRow[] {
  return rows.map((row) => ({
    jenisLaporan: row[0] ?? "",
    tanggal: row[1] ?? "",
    jam: row[2] ?? "",
    alamat: row[3] ?? "",
    barang: row[4] ?? "",
    totalHarga: row[5] ?? "",
    diskonHarga: row[6] ?? "",
    kembalian: row[7] ?? "",
    pajak: row[8] ?? "",
    nama: row[9] ?? "",
  }));
}

function pemasukanRow(rows: string[][] = []): PemasukanRow[] {
  return rows.map((row) => ({
    jenisLaporan: row[0] ?? "",
    tanggal: row[1] ?? "",
    jam: row[2] ?? "",
    alamat: row[3] ?? "",
    bartotalang: row[4] ?? "",
  }));
}

export async function GET() {
  try {
    const {
      GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      SHEET_ID,
    } = process.env;

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SHEET_ID) {
      return NextResponse.json(
        { error: "Missing environment variables" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const pengeluaranRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Pengeluaran!A2:Z",
    });

    const pemasukanRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Pemasukan!A2:Z",
    });

    const pengeluaran = pengeluaranRow(pengeluaranRes.data.values as string[][]);
    const pemasukan = pemasukanRow(pemasukanRes.data.values as string[][]);

    return NextResponse.json({
      success: true,
      pengeluaran,
      pemasukan,
    });
  } catch (error: any) {
    console.error("Google Sheets Error:", error);

    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
