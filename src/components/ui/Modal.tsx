import React, { useEffect, useState } from "react";
import { Button } from "./Button";

type ModalVariant = "info" | "confirm" | "success" | "error" | "danger" | "loading" | "default";

interface ModalProps {
  open: boolean;
  title?: string;
  content?: string;
  variant?: ModalVariant;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  dangerText?: string;
  className?: string; // Ukuran modal
  icon?: string; // Nama ikon dari Bootstrap Icons
}

const variantStyles = {
  info: {
    bg: "bg-blue-600 hover:bg-blue-700",
    icon: "info-square",
  },
  confirm: {
    bg: "bg-blue-600 hover:bg-blue-700",
    icon: "question-square",
  },
  success: {
    bg: "bg-green-600 hover:bg-green-700",
    icon: "check-square",
  },
  error: {
    bg: "bg-red-600 hover:bg-red-700",
    icon: "x-square",
  },
  danger: {
    bg: "bg-red-600 hover:bg-red-700",
    icon: "exclamation-triangle",
  },
  loading: {
    bg: "bg-gray-500 cursor-not-allowed",
    icon: "arrow-clockwise",
  },
  default: {
    bg: "bg-blue-600 hover:bg-blue-700",
    icon: null,
  },
};

export const Modal: React.FC<ModalProps> = ({
  open,
  title = "Modal title",
  content,
  variant = "default",
  children,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
  dangerText = "Delete",
  className = "w-lg", // "sm", "md", "lg"
  icon
}) => {
  const [showBackdrop, setShowBackdrop] = useState(open);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (open) {
      setShowBackdrop(true);
      setIsAnimatingOut(false);
      setIsAnimatingIn(true);
    } else if (showBackdrop) {
      setIsAnimatingOut(true);
      setIsAnimatingIn(false);
      setTimeout(() => {
        setShowBackdrop(false);
        setIsAnimatingOut(false);
      }, 300);
    }
  }, [open]);

  // Selesaikan animasi in
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isAnimatingIn) {
      timeout = setTimeout(() => {
        setIsAnimatingIn(false);
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [isAnimatingIn]);

  const isLoading = variant === "loading";
  const variantStyle = variantStyles[variant] || variantStyles["default"];
  const iconToShow = icon !== undefined ? icon : variantStyle.icon;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    // Parent harus set open=false setelah onConfirm jika ingin menutup modal
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    // Parent harus set open=false setelah onCancel jika ingin menutup modal
  };

  if (!showBackdrop && !isAnimatingOut) return null;

  return (
    <div
      className={`fixed inset-0 z-80 flex items-center justify-center transition-opacity duration-300 ${
        isAnimatingOut ? "bg-transparent" : "bg-black/50"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-label"
      tabIndex={-1}
      onClick={handleCancel}
    >
      <div
        className={`bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-sm shadow-lg ${className || 'w-lg'} m-3 p-0 flex flex-col
          transition-all duration-300
          ${
            isAnimatingIn
              ? "opacity-0 scale-95"
              : isAnimatingOut
              ? "opacity-0 scale-95"
              : "opacity-100 scale-100"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
          <h3
            id="modal-label"
            className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
          >
            <i className={`bi-${iconToShow} text-2xl me-2`}></i>
            {title}</h3> 
          {!isLoading && (
            <button
              type="button"
              className="size-8 transition-all inline-flex justify-center items-center gap-x-2 rounded-sm border border-gray-200 bg-white text-gray-600 hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:border-neutral-400 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-400 cursor-pointer"
              aria-label="Close"
              onClick={handleCancel}
            >
              <span className="sr-only">Close</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          )}
        </div>

        <div className="p-4 flex-grow">
          {children ?? (
            content ? (
              <p className="mt-1 text-gray-800 dark:text-neutral-400">{content}</p>
            ) : (
              <p className="mt-1 text-gray-800 dark:text-neutral-400">
                {variant === "loading"
                  ? "Loading..."
                  : "This is a wider card with supporting text below as a natural lead-in to additional content."}
              </p>
            )
          )}
        </div>

        {/* Footer actions sesuai varian */}
        {variant === "confirm" && !isLoading && (
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
            <Button
              type="button"
              variant="outline-gray"
              size="sm"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant="blue"
              size="sm"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        )}
        {variant === "danger" && !isLoading && (
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
            <Button
              type="button"
              variant="outline-gray"
              size="sm"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant="red"
              size="sm"
              onClick={handleConfirm}
            >
              {dangerText}
            </Button>
          </div>
        )}
        {variant === "success" && !isLoading && (
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
            <Button
              type="button"
              variant="outline-gray"
              size="sm"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        )}
        {variant === "error" && !isLoading && (
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
            <Button
              type="button"
              variant="outline-gray"
              size="sm"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        )}
        {variant === "info" && !isLoading && (
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
            <Button
              type="button"
              variant="blue"
              size="sm"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        )}
        {variant === "default" && !isLoading && (
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
            <Button
              type="button"
              variant="blue"
              size="sm"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        )}
        {isLoading && (
          <></>
        )}
      </div>
    </div>
  );
};