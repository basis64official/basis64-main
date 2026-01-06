import Logo from '../assets/img/logo.webp';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        name="Tentang BASIS-64 | Platform SaaS & Penerjemah Dayak Kenyah"
        description="Pelajari lebih lanjut tentang BASIS-64, platform SaaS masa depan dan penyedia teknologi penerjemah bahasa Dayak Kenyah."
        keys="tentang basis-64, profil basis-64, teknologi penerjemah dayak, saas indonesia, kamus dayak kenyah modern"
      />
      {/* Hero Section */}
      <header className="relative min-h-[320px] sm:min-h-[240px] flex items-center mt-6 justify-center text-white overflow-hidden bg-gray-50 dark:bg-neutral-950">
        <div className="relative z-10 text-center px-6 sm:px-12">
          {/* Logo & Title */}
          <div className="flex flex-row items-center justify-center sm:space-x-6 mb-8 sm:mt-32">
            <img
              src={Logo}
              alt="BASIS-64 Logo"
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
            <div className="mt-4 sm:mt-0 text-center sm:text-left text-black dark:text-white">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                BASIS-64
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-1">
                The hub of future tools
              </p>
            </div>
          </div>

          {/* About Box */}
          <div className="bg-white border border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white rounded-md p-6 mx-auto text-gray-700 shadow-xs transition duration-300 max-w-3xl">
            <p className="mb-4">
              BASIS-64 adalah platform layanan berbasis web.
            </p>
            <p className="mb-4">
              Salah satu proyek kami adalah penerjemah yang dapat menerjemahkan bahasa Dayak Kenyah, misalnya:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li>"saya seorang guru" → "ca guru keq"</li>
              <li>"sudahkah kamu makan" → "lepe ne ikoq uman"</li>
            </ul>
            {/* <p>
              Berbeda dengan penerjemah lama yang hanya mengganti kata per kata, BASIS-64 fokus pada pemahaman konteks untuk hasil terjemahan yang lebih natural.
            </p> */}
          </div>

          {/* Contact & Privacy */}
          <div className="mt-6 text-gray-600 dark:text-gray-300 text-sm max-w-3xl mx-auto text-center">
            <p>
              Untuk pertanyaan atau masukan, hubungi kami di{' '}
              <a href="mailto:official@basis64.com" className="text-sky-600 hover:underline">
                official@basis64.com
              </a>
            </p>
            <p className="mt-2">
              Baca juga <Link to="/privacy" className="text-sky-600 hover:underline">Privacy Policy</Link> kami.
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
