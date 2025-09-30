import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/img/logo.webp";
import useLoginModal from "../../state/useLoginModal";
import { Button } from "../ui";
import GoogleLogin from "../ui/GoogleLogin";
import useAuth from "../../state/useAuth";

export function LoginModal() {
  const loginModal = useLoginModal();
  const auth = useAuth();
  const [isDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`}
      onClick={() => loginModal.hide()}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-sm shadow-2xl max-w-md w-full mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <img src={Logo} alt="BASIS-64 Logo" className="w-16 h-16" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Login ke BASIS-64
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Masuk untuk menggunakan semua fitur BASIS-64
          </p>
        </div>

        {/* Google Login */}
        {!auth.user && (
          <div className="mb-4">
            <GoogleLogin isDarkMode={isDarkMode} />
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-center">
          <Button
            variant="outline-gray"
            size="sm"
            className="w-1/2"
            onClick={() => loginModal.hide()}
          >
            Tutup
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
          <p>
            Dengan melanjutkan, Anda menyetujui{" "}
            <Link
              to="/privacy-policy/"
              className="underline hover:text-sky-600"
              onClick={() => loginModal.hide()}
            >
              Terms of Use
            </Link>{" "}
            dan telah membaca{" "}
            <Link
              to="/privacy-policy/"
              className="underline hover:text-sky-600"
              onClick={() => loginModal.hide()}
            >
              Privacy & Cookie Statement
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
