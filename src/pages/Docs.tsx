import { Link } from "react-router-dom";
import userImage from '../assets/img/user.webp';
import { useEffect, useState } from "react";

export default function Docs() {
  const [changelog, setChangelog] = useState("Loading...");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/basis64computer/public/changelog.txt');
        const data = await response.text();
        setChangelog(data);
        // Update state with data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <main className="px-6 py-8 mt-4 mx-4 bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white rounded-sm shadow-xs">
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

      <div className="px-4 mt-8">
        <div className="flex-1 items-center p-4 mb-4 bg-white shadow-xs dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"></path>
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-gray-900 dark:text-white">"Kami mengerjakan apa yang dibicarakan, bukan hanya berbicara tentang apa yang dibicarakan."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <img className="w-6 h-6 rounded-full border border-neutral-300" src={userImage} alt="Administrator" />
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite className="pe-3 font-medium text-gray-900 dark:text-white"><Link to="/admin/login">Administrator</Link></cite>
              <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">2025</cite>
            </div>
          </figcaption>
        </div>
        <div className="flex items-center p-4 bg-white shadow-xs dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600">
          <div className="p-3 mr-4 text-gray-500 bg-gray-100 rounded-full px-4 dark:text-gray-100 dark:bg-neutral-500">
            <i className="bi bi-terminal-fill"></i>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Change Log</p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400" id="systemLogStatus">Website change log and updates.</p>
          </div>
        </div>

        <textarea rows={20} value={changelog} className="block p-2.5 w-full outline-none text-sm text-white font-mono bg-black border border-t-0 border-gray-400 dark:border-neutral-600 dark:bg-neutral-700 dark:placeholder-gray-400 dark:text-white" placeholder="The change log should be written here..." readOnly></textarea>
      </div>
    </main>
  );
}
