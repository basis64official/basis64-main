import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white shadow-sm dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-600 mt-8 inset-x-0 bottom-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div
            className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()} {" "}
          <span className="hover:underline">
            BASIS-64™
          </span>
          . All Rights Reserved.
        </span>
            
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">
                Tentang kami
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline me-4 md:me-6">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link to="/terms-of-use" className="hover:underline me-4 md:me-6">
                Syarat & Ketentuan
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                Kontak
              </Link>
            </li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
}
