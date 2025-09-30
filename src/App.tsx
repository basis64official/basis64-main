import { Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import "./index.css";
import { Navbar, Sidebar } from "./components/layout";
import { pages } from "./pages";
import { adminPages } from "./pages/admin";
import NotFound from "./pages/NotFound";
import { Footer } from "./components/layout/Footer";
import { CookieManager } from "./utils/CookieManager";
import { LoginModal } from "./components/layout/LoginModal";
import useLoginModal from "./state/useLoginModal";
import { Modal, Spinner } from "./components/ui";
import useModal from "./state/useModal";
import useNavigationBar from "./state/useNavigationBar";
import { apiFetch } from "./api/apiFetch";
import useSecure from "./state/useSecure";
import { AES } from "./crypto/aes";
import { RSA } from "./crypto/RSA";
import useAuth from "./state/useAuth";
import { featuresPages } from "./pages/features";
import { useNavStore } from "./state/useNavStore";
import { useFeatureStore } from "./state/useFeatureStore";
import featuresData from "./data/features.json";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { features, setFeatures } = useFeatureStore();


  const validPaths = pages.map((p) => p.path);
  const validAdminPaths = adminPages.map((p) => p.path);
  const validFeaturesPaths = featuresPages.map((p) => p.path);
  const shouldHideLayout = !(validPaths.includes(location.pathname) || validAdminPaths.includes(location.pathname) || validFeaturesPaths.includes(location.pathname));
  const modal = useModal();
  const navigatonBar = useNavigationBar();
  const secure = useSecure();

  const fromHome = useNavStore((s) => s.fromHome);
  const getFeatureById = useFeatureStore((s) => s.getFeatureById);

  if (!fromHome && location.pathname.startsWith('/features/')) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    setFeatures(featuresData);
  }, []);


  useEffect(() => {
    // cek session
    const checkSession = async () => {
      const status = await CookieManager.check();
      if (!status) {
        return <Navigate to="/internal-server-error" replace />;
      }
      if (location.pathname.includes('admin')) {
        try {
          const secureKey = AES.generateKey();
          const secureIv = AES.generateIv();
          const ciphertext = await RSA.encrypt(
            CookieManager.getCookie('public_key_pem') || '',
            JSON.stringify({
              key: secureKey,
              iv: secureIv
            })
          )
          const response = await apiFetch('/admin/set-key', {
            method: 'POST',
            headers: { 'X-Session-ID': CookieManager.getCookie('session_id') || '' },
            body: JSON.stringify({
              ciphertext
            })
          })
          if (!response.ok) {
            console.log(response)
            //navigate('/');
            /*if (location.pathname !== '/admin/login') {
              modal.show('info', 'Informasi', 'Akses ditolak, silakan login kembali.');
              setTimeout(() => {
                modal.hide();
                window.location.href = '/admin/login';
              }, 2000);
            }*/
          }
          secure.setKey(secureKey, secureIv);
        } catch {
          console.log("Error, check your connection.");
        }
      }
    };
    checkSession();

    // handle resize sidebar
    const handleResize = () => {
      if (window.innerWidth < 640) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    handleResize(); // panggil sekali saat mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   fetch("https://cdn.jsdelivr.net/gh/basis64computer/public/features.json")
  //     .then((res) => res.json())
  //     .then((data) => setFeatures(data))
  //     .catch((err) => console.error("Error loading CMS features:", err));
  // }, []);



  useEffect(() => {
    try {
      const feature = getFeatureById(location.pathname.replace('/features/', ''));
      console.log((feature?.isLogin || (feature?.premiumLevel ?? 0) > 0))
      if (!auth.user && location.pathname.startsWith('/features/') && (feature?.isLogin || (feature?.premiumLevel ?? 0) > 0) && feature) {
        console.log("forbidden");
        navigate('/forbidden');
      }
    } catch (error) {

    }
  }, [location, features, auth.user]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <Modal
          open={modal.type === "loading"}
          title={modal.title || "Loading"}
          variant="loading"
        >
          <div className="flex items-center gap-3">
            <Spinner size={32} className="" />
            <span className="text-black dark:text-white">{modal.description}</span>
          </div>
        </Modal>
        <Modal
          open={modal.type === "info"}
          title={modal.title || "Informasi"}
          variant="info"
          onConfirm={() => modal.hide()}
          onCancel={() => modal.hide()}
          confirmText="Tutup"
        >
          <span className="text-black dark:text-white">{modal.description}</span>
        </Modal>
        <Modal
          open={modal.type === "success"}
          title={modal.title || "Informasi"}
          variant="success"
          onConfirm={() => modal.hide()}
          onCancel={() => modal.hide()}
          confirmText="Tutup"
        >
          <span className="text-black dark:text-white">{modal.description}</span>
        </Modal>
        <Modal
          open={modal.type === "failed"}
          title={modal.title || "Error"}
          variant="error"
          onConfirm={() => modal.hide()}
          onCancel={() => modal.hide()}
          confirmText="Tutup"
        >
          <div className="flex items-center gap-3">
            <span className="text-black dark:text-white">{modal.description}</span>
          </div>
        </Modal>
      </div>
      {!shouldHideLayout && !navigatonBar.hidden && (
        <>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </>
      )}

      <main
        className={`relative flex-1 overflow-hidden
    ${sidebarOpen && !shouldHideLayout && !navigatonBar.hidden ? "sm:ml-64" : "sm:ml-0"}
    ${(!shouldHideLayout && !navigatonBar) ? "pt-16" : ""}
    bg-gray-50 dark:bg-neutral-950 transition-margin duration-500`}
      >
        <AnimatePresence mode="wait" {...({} as any)} // TypeScript safe
        >
          <Suspense fallback={<div className="flex justify-center items-center h-full"><Spinner size={48} /></div>}>
            <Routes location={location} key={location.pathname}>
              {pages.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <motion.div
                      className={`absolute inset-0 ${(!shouldHideLayout && !navigatonBar.hidden) ? "top-16" : ""}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      {...({} as any)} // TypeScript safe
                    >
                      <Component />
                    </motion.div>
                  }
                />
              ))}

              {adminPages.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <motion.div
                      className={`absolute inset-0 ${(!shouldHideLayout && !navigatonBar.hidden) ? "top-16" : ""}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      {...({} as any)} // TypeScript safe
                    >
                      <Component />
                    </motion.div>
                  }
                />
              ))}

              {featuresPages.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <motion.div
                      className={`absolute inset-0 ${(!shouldHideLayout && !navigatonBar.hidden) ? "top-16" : ""}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      {...({} as any)} // TypeScript safe
                    >
                      <Component />
                    </motion.div>
                  }
                />
              ))}

              <Route
                path="*"
                element={
                  <motion.div
                    className={`absolute inset-0 ${(!shouldHideLayout && !navigatonBar.hidden) ? "top-16" : ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    {...({} as any)} // TypeScript safe
                  >
                    <NotFound />
                  </motion.div>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>


      {useLoginModal().modal ? <LoginModal /> : <></>}

      <div
        className={`${sidebarOpen && !shouldHideLayout && !navigatonBar.hidden ? "sm:ml-64" : "sm:ml-0"
          } transition-[margin] duration-500 bg-gray-50 dark:bg-neutral-950`}
      >
        {!shouldHideLayout && <Footer />}

      </div>
    </div>
  );
}
