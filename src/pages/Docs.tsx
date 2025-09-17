import { Link } from "react-router-dom";

export default function Docs() {
  return (
    <main className="px-6 py-8 mt-4 mx-4 bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white">
      <h1 className="text-3xl font-extrabold mb-6">Dokumentasi BASIS-64</h1>
      <p className="text-slate-600 dark:text-slate-200 mb-8">
        Halaman ini menjelaskan fitur dan panduan penggunaan <strong>BASIS-64</strong>. Ikuti panduan di bawah ini untuk memaksimalkan pengalaman.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">1. Apa itu BASIS-64?</h2>
          <p className="text-slate-600 dark:text-slate-200">
            <strong>BASIS-64</strong> adalah layanan penerjemah online antara <strong>Bahasa Dayak Kenyah</strong> dan <strong>Bahasa Indonesia</strong>. Semua layanan tersedia <strong>gratis</strong> untuk publik dan didukung oleh iklan (AdSense).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">2. Cara Menggunakan</h2>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-200">
            <li>
              Buka <Link to="/" className="text-sky-600 hover:underline">basis64.pages.dev</Link>.
            </li>
            <li>Masukkan teks dalam Bahasa Dayak Kenyah atau Bahasa Indonesia pada kotak input.</li>
            <li>Pilih arah terjemahan: <em>Dayak Kenyah → Indonesia</em> atau <em>Indonesia → Dayak Kenyah</em>.</li>
            <li>Klik tombol <strong>Translate</strong>. Hasil akan muncul di bawah input.</li>
            <li>Salin hasil jika perlu.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. Fitur Utama</h2>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-200">
            <li><strong>Gratis</strong> — tanpa biaya berlangganan.</li>
            <li><strong>Fokus Lokal</strong> — khusus untuk Dayak Kenyah ↔ Indonesia.</li>
            <li><strong>Mudah & Cepat</strong> — UI simpel untuk penggunaan sehari-hari.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. FAQ</h2>
          <details className="p-3 border rounded-md mb-2 bg-slate-50 text-slate-600 border-gray-300 dark:bg-neutral-700 dark:border-neutral-600">
            <summary className="cursor-pointer font-medium">Apakah BASIS-64 berbayar?</summary>
            <p className="mt-2 text-slate-600 dark:text-slate-200">Tidak. Semua fitur gratis, didukung oleh iklan.</p>
          </details>
          <details className="p-3 border rounded-md mb-2 bg-slate-50 text-slate-600 border-gray-300 dark:bg-neutral-700 dark:border-neutral-600">
            <summary className="cursor-pointer font-medium">Bahasa apa saja yang didukung?</summary>
            <p className="mt-2 text-slate-600 dark:text-slate-200">Saat ini hanya Dayak Kenyah dan Indonesia.</p>
          </details>
          <details className="p-3 border rounded-md mb-2 bg-slate-50 text-slate-600 border-gray-300 dark:bg-neutral-700 dark:border-neutral-600">
            <summary className="cursor-pointer font-medium">Bagaimana jika hasil terjemahan salah?</summary>
            <p className="mt-2 text-slate-600 dark:text-slate-200">Laporkan lewat halaman <Link to="/feedback" className="text-sky-600 hover:underline">feedback</Link> atau informasi kontak pada halaman <Link to="/about" className="text-sky-600 hover:underline">tentang kami</Link>
              .</p>
          </details>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">5. Kontak & Dukungan</h2>
          <p className="text-slate-600 dark:text-slate-200">Untuk laporan bug, saran, atau kerjasama:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-200 mt-2">
            <li>Email: <a href="mailto:basis64computer@gmail.com" className="text-sky-600 hover:underline">basis64computer@gmail.com</a></li>
            <li>Website: <Link to="/" className="text-sky-600 hover:underline">basis64.pages.dev</Link></li>
            <li><Link to="/about" className="text-sky-600 hover:underline">Lihat tentang kami</Link></li>
            <li><Link to="/feedback" className="text-sky-600 hover:underline">Berikan feedback</Link></li>
          </ul>
        </div>
      </section>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
        Catatan: Basis-64 adalah layanan komunitas. Kami menghormati privasi pengguna — jangan kirim informasi sensitif melalui input terjemahan.
      </p>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
        Terakhir diperbarui: 17 September 2025
      </p>
    </main>
  );
}
