import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function TermsOfService() {
  <SEO
    name="Terms of Service | BASIS-64"
    description="Syarat dan ketentuan penggunaan layanan BASIS-64. Baca aturan mengenai penggunaan yang wajar, hak kekayaan intelektual, dan kebijakan iklan kami."
    keys="terms of service basis-64, syarat dan ketentuan, aturan penggunaan basis-64, disclaimer terjemahan"
  />
  return (
    <main className="px-6 py-8 mt-4 mx-4 bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white rounded-md shadow-sm">
      <h1 className="text-3xl font-extrabold mb-6">Terms of Service</h1>
      <p className="text-slate-600 dark:text-slate-200 mb-8">
        Dengan menggunakan <strong>BASIS-64</strong>, Anda setuju untuk mengikuti aturan sederhana di bawah ini.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">1. Penggunaan yang Wajar</h2>
          <p className="text-slate-600 dark:text-slate-200">
            Jangan gunakan layanan ini untuk spam, konten ilegal, atau hal-hal yang bisa merugikan orang lain.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">2. Larangan Reverse Engineering</h2>
          <p className="text-slate-600 dark:text-slate-200">
            Jangan mencoba membongkar, menyalin, atau memodifikasi sistem kami tanpa izin. Pastikan semua konten yang Anda unggah adalah milik Anda sendiri atau Anda memiliki hak untuk menggunakannya.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. Akurasi Terjemahan</h2>
          <p className="text-slate-600 dark:text-slate-200">
            BASIS-64 berusaha memberikan hasil terbaik, tapi kami tidak menjamin terjemahan 100% akurat. Gunakan dengan bijak.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. Privasi & Data Pengguna</h2>
          <p className="text-slate-600 dark:text-slate-200">
            Kami menghormati privasi Anda. Informasi yang dikumpulkan melalui layanan ini akan digunakan sesuai dengan <Link to="/privacy-policy" className="text-sky-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">5. Iklan & Monetisasi</h2>
          <p className="text-slate-600 dark:text-slate-200">
            BASIS-64 dapat menampilkan iklan melalui pihak ketiga seperti Google AdSense. Dengan menggunakan layanan, Anda menyetujui penayangan iklan tersebut.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">6. Kontak</h2>
          <p className="text-slate-600 dark:text-slate-200">
            Jika ada pertanyaan atau laporan bug, hubungi kami melalui:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-200 mt-2">
            <li>Email: <em>basis64computer@gmail.com</em></li>
            <li>Website: <Link to="/" className="text-sky-600 hover:underline">basis64.pages.dev</Link></li>
            <li><Link to="/about" className="text-sky-600 hover:underline">Lihat tentang kami</Link></li>
            <li><Link to="/feedback" className="text-sky-600 hover:underline">Berikan kami feedback</Link></li>
          </ul>
        </div>
      </section>

      <p className="text-sm text-slate-500 mt-6">
        Terakhir diperbarui: 17 September 2025
      </p>
    </main>
  );
}
