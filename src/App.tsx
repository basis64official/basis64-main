import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const validPaths = pages.map((p) => p.path);
  const validAdminPaths = adminPages.map((p) => p.path);
  const shouldHideLayout = !(validPaths.includes(location.pathname) || validAdminPaths.includes(location.pathname));
  const modal = useModal();
  const navigatonBar = useNavigationBar();
  const secure = useSecure();

  useEffect(() => {
    // cek session
    const checkSession = async () => {
      const status = await CookieManager.check();
      if (!status) {
        return <Navigate to="/internal-server-error" replace />;
      }
      if (location.pathname.includes('admin')) {
        try {
          secure.setKey(AES.generateKey(), AES.generateIv());
          const ciphertext = await RSA.encrypt(
            CookieManager.getCookie('public_key_pem') || '',
            JSON.stringify({
              key: secure.key,
              iv: secure.iv
            })
          )
          await apiFetch('/admin/set-key', {
            method: 'POST',
            headers: { 'X-Session-ID': CookieManager.getCookie('session_id') || '' },
            body: JSON.stringify({
              ciphertext
            })
          })
        } catch { }
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
        className={`flex-1 ${sidebarOpen && !shouldHideLayout && !navigatonBar.hidden ? "sm:ml-64" : "sm:ml-0"
          } ${!shouldHideLayout ? "pt-16" : ""} bg-gray-50 dark:bg-neutral-950 transition-all duration-500`}
      >
        <Routes>
          {pages.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {adminPages.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <div
        className={`${sidebarOpen && !shouldHideLayout && !navigatonBar.hidden ? "sm:ml-64" : "sm:ml-0"
          } transition-all duration-500 bg-gray-50 dark:bg-neutral-950`}
      >
        {!shouldHideLayout && <Footer />}

      </div>
      {useLoginModal().modal ? <LoginModal /> : <></>}
    </div>
  );
}
