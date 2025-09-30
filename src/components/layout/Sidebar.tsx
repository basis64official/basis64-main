import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui";
import useAuth from "../../state/useAuth";
import useLoginModal from "../../state/useLoginModal";
import { AuthManager } from "../../utils/AuthManager";
import { Utils } from "../../utils/utils";
import { motion, AnimatePresence } from "framer-motion";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const [darkMode] = useState(false);
  const loginModal = useLoginModal();
  const auth = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const isMobile = () => window.innerWidth < 640;
  const handleMenuClick = () => {
    if (isMobile()) setSidebarOpen(false);
  };

  const menuItems = location.pathname.includes("admin")
    ? [
      { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2", to: "/admin/dashboard" },
      { id: "sessions", label: "Manajemen sesi", icon: "bi-people", to: "/admin/sessions" },
      { id: "database", label: "Database", icon: "bi-database", to: "/admin/database" },
      { id: "cms", label: "CMS", icon: "bi-grid-3x2-gap", to: "/admin/cms" },
    ]
    : [
      { id: "home", label: "Halaman awal", icon: "bi-house", to: "/" },
      { id: "about", label: "Tentang kami", icon: "bi-info-square", to: "/about" },
      { id: "contact", label: "Hubungi kami", icon: "bi-person-lines-fill", to: "/contact" },
      { id: "docs", label: "Dokumentasi", icon: "bi-journals", to: "/docs" },
      { id: "feedback", label: "Feedback", icon: "bi-chat-right-quote", to: "/feedback" },
    ];

  // Variants framer-motion
  const sidebarVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } }, // stagger menu utama
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
  };

  const featureVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, delay: menuItems.length * 0.05 } }, // muncul setelah menu utama
  };

  return (
    <>
      {/* Backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white dark:bg-neutral-900 border-r border-gray-300 dark:border-neutral-700 shadow-sm transition-transform duration-500 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-4 pb-6">
          {/* Menu list */}
          <motion.ul
            className="flex-1 overflow-y-auto no-scrollbar space-y-1 text-sm"
            variants={sidebarVariants}
            initial="hidden"
            animate={sidebarOpen ? "show" : "hidden"}
            {...({} as any)} // TypeScript safe

          >
            

            {/* Menu utama */}
            {menuItems.map(({ id, label, icon, to }) => {
              const isActive = location.pathname === to;
              return (
                <motion.li key={id} variants={menuItemVariants} {...({} as any)} // TypeScript safe
                >
                  <Link
                    to={to}
                    onClick={handleMenuClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-400 ${isActive
                        ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white group hover:from-blue-500 hover:to-blue-700 focus:ring-blue-400 shadow-md"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      }`}
                  >
                    <i className={`bi ${icon} text-lg ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} />
                    <span>{label}</span>
                  </Link>
                </motion.li>
              );
            })}

            {/* Menu feature di bawah */}
            <AnimatePresence>
              {location.pathname.startsWith("/features") && (
                <motion.div
                  key="feature-menu"
                  variants={featureVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="mb-2"
                  {...({} as any)} // TypeScript safe

                >
                  <hr className="border-gray-300 dark:border-neutral-700 mb-4"></hr>
                  <Link
                    to={location}
                    onClick={handleMenuClick}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-400 bg-gradient-to-r from-blue-700 to-blue-500 text-white group hover:from-blue-500 hover:to-blue-700 focus:ring-blue-400 shadow-md"
                  >
                    <i className="bi bi-stars text-white text-lg"></i>
                    <span>{Utils.formatFeatureName(location.pathname)}</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.ul>

          {/* Bottom login section */}
          <div className="mt-6 p-4 rounded-md bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm mb-8 sm:mb-0">
            {auth.user ? (
              <>
                <p className="font-semibold text-gray-700 dark:text-gray-200 text-center">Login sebagai</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-3">{auth.name}</p>
                <Button as="button" variant="red" className="w-full" onClick={() => AuthManager.logOut()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <p className="font-semibold text-gray-700 dark:text-gray-200 text-center">Belum login?</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-3">
                  Login untuk menggunakan sebagian fitur di BASIS-64
                </p>
                <Button as="button" variant="blue" className="w-full" onClick={() => loginModal.show()}>
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
