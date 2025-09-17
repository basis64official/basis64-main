import { Link } from "react-router-dom";

export default function TermsOfUse() {
  return (
    <main className="px-6 py-8 mt-4 mx-4 bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white">
      <h1 className="text-3xl font-extrabold mb-6">Terms of Use</h1>
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
            Jangan mencoba membongkar, menyalin, atau memodifikasi sistem kami tanpa izin.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. Akurasi Terjemahan</h2>
          <p className="text-slate-600 dark:text-slate-200">
            BASIS-64 berusaha memberikan hasil terbaik, tapi kami tidak menjamin terjemahan 100% akurat.
            Gunakan dengan bijak.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. Kontak</h2>
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
