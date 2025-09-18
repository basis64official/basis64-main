import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
    return (
        <main className="px-6 py-8 mt-4 mx-4 bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white rounded-sm shadow-xs">
            <h1 className="text-3xl font-extrabold mb-4">Privacy Policy</h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Halaman ini menjelaskan data apa yang kami kumpulkan, kenapa kami
                kumpulkan, dan bagaimana Anda bisa mengontrolnya.
            </p>

            <section className="space-y-5 text-slate-700 dark:text-slate-200">
                <div>
                    <h2 className="text-lg font-semibold mb-1">1. Data yang Kami Kumpulkan</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Informasi akun Google:</strong> nama, alamat email, dan foto
                            profil (ketika Anda login via Google).
                        </li>
                        <li>
                            <strong>Informasi perangkat:</strong> tipe perangkat, browser,
                            versi OS, dan data teknis lain untuk keperluan debugging & analytics.
                        </li>
                        <li>
                            <strong>Geolokasi (berdasarkan IP):</strong> dipakai untuk
                            statistik dan penyajian konten yang relevan.
                        </li>
                        <li>
                            <strong>Data penggunaan:</strong> aktivitas di aplikasi (mis.
                            fitur yang dipakai) untuk meningkatkan layanan.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-1">2. Tujuan Pengumpulan</h2>
                    <p>
                        Data dikumpulkan untuk tujuan:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Menyediakan dan mengamankan fitur login (Google OAuth).</li>
                        <li>Personalisasi pengalaman pengguna (mis. menyimpan preferensi).</li>
                        <li>Analitik & perbaikan produk (memahami penggunaan fitur).</li>
                        <li>Mendukung monetisasi via Google AdSense.</li>
                        <li>Menangani bug, abuse, dan keamanan layanan.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-1">3. Pihak Ketiga</h2>
                    <p>
                        Kami menggunakan layanan pihak ketiga yang mungkin memproses data Anda:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Google OAuth</strong> — untuk autentikasi (login Google).</li>
                        <li><strong>Google AdSense</strong> — untuk menayangkan iklan dan membantu membiayai layanan.</li>
                        <li>Provider hosting dan alat analytics (seperlunya untuk operasional).</li>
                    </ul>
                    <p className="mt-2">
                        Pastikan juga membaca kebijakan privasi penyedia layanan pihak ketiga tersebut.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-1">4. Kontrol & Pilihan Pengguna</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Mencabut akses Google:</strong> Anda bisa mencabut akses
                            aplikasi lewat <em>Google Account &gt; Security &gt; Third-party apps</em>.
                        </li>
                        <li>
                            <strong>Cookies & tracking:</strong> AdSense menggunakan cookie untuk iklan.
                            Anda dapat mengelola preferensi iklan melalui pengaturan Google.
                        </li>
                        <li>
                            <strong>Permintaan data / penghapusan:</strong> hubungi kami lewat email
                            jika ingin meminta penghapusan data atau menanyakan detail apa yang kami simpan.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-1">5. Retensi Data</h2>
                    <p>
                        Kami menyimpan data selama diperlukan untuk tujuan operasional, kepatuhan,
                        atau sampai Anda meminta penghapusan. Data autentikasi (mis. akun yang
                        terdaftar) disimpan sampai akun dihapus atau akses dicabut.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-1">6. Keamanan</h2>
                    <p>
                        Kami menjaga data menggunakan praktik keamanan standar (mis. HTTPS,
                        pembatasan akses internal). Namun tidak ada sistem yang 100% aman; gunakan
                        layanan ini dengan risiko Anda sendiri untuk informasi sensitif.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-1">7. Perubahan pada Kebijakan</h2>
                    <p>
                        Kami dapat memperbarui kebijakan ini. Perubahan signifikan akan
                        diinformasikan lewat situs. Silakan cek halaman ini secara berkala.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-1">8. Kontak</h2>
                    <p>
                        Untuk pertanyaan, permintaan penghapusan data, atau laporan privasi,
                        hubungi kami:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>
                            Email:{' '}
                            <a
                                href="mailto:basis64computer@gmail.com"
                                className="text-sky-600 hover:underline"
                            >
                                basis64computer@gmail.com
                            </a>
                        </li>
                        <li>
                            Website:{' '}
                            <Link to="/" className="text-sky-600 hover:underline">
                                basis64.pages.dev
                            </Link>
                        </li>
                        <li><Link to="/about" className="text-sky-600 hover:underline">Lihat tentang kami</Link></li>
                        <li><Link to="/feedback" className="text-sky-600 hover:underline">Berikan kami feedback</Link></li>
                    </ul>
                </div>
            </section>

            <hr className="my-6 border-gray-200 dark:border-neutral-700" />

            <p className="text-sm text-slate-500 dark:text-slate-400">
                Terakhir diperbarui: 17 September 2025
            </p>
        </main>
    );
}
