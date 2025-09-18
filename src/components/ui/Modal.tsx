import React, { useEffect, useState } from "react";
import { Button } from "./Button";

type ModalVariant =
  | "info"
  | "confirm"
  | "success"
  | "error"
  | "danger"
  | "warning"
  | "loading"
  | "default";

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
  className?: string;
  icon?: string;
}

const variantStyles = {
  info: { icon: "info-square" },
  confirm: { icon: "question-square" },
  success: { icon: "check-square" },
  error: { icon: "x-square" },
  danger: { icon: "exclamation-triangle" },
  warning: { icon: "exclamation-diamond" },
  loading: { icon: "arrow-clockwise" },
  default: { icon: "info-circle" },
};

const headerGradient = {
  info: "bg-gradient-to-r from-blue-500 to-blue-700",
  confirm: "bg-gradient-to-r from-blue-400 to-blue-600",
  success: "bg-gradient-to-r from-green-500 to-green-700",
  error: "bg-gradient-to-r from-red-500 to-red-700",
  danger: "bg-gradient-to-r from-red-500 to-red-700",
  warning: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  loading: "bg-gray-500",
  default: "bg-neutral-800",
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
  className = "w-lg",
  icon,
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

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isAnimatingIn) {
      timeout = setTimeout(() => setIsAnimatingIn(false), 100);
    }
    return () => clearTimeout(timeout);
  }, [isAnimatingIn]);

  const isLoading = variant === "loading";
  const iconToShow = icon ?? variantStyles[variant].icon;

  const handleConfirm = () => onConfirm?.();
  const handleCancel = () => onCancel?.();

  if (!showBackdrop && !isAnimatingOut) return null;

  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center transition-opacity duration-300 ${
        isAnimatingOut ? "bg-transparent" : "bg-black/50"
      }`}
      role="dialog"
      aria-modal="true"
      onClick={handleCancel}
    >
      <div
        className={`bg-white dark:bg-neutral-900 rounded-lg shadow-lg flex flex-col m-3 p-0 transition-all duration-300 ${
          isAnimatingIn
            ? "opacity-0 scale-95"
            : isAnimatingOut
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100"
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 rounded-t-lg text-white font-bold text-lg ${
            headerGradient[variant] || headerGradient.default
          }`}
        >
          <div className="flex items-center gap-2">
            {iconToShow && <i className={`bi-${iconToShow} text-xl`} />}
            <span>{title}</span>
          </div>
          {!isLoading && (
            <button
              onClick={handleCancel}
              className="text-white hover:text-gray-200 transition-colors rounded-full p-1 cursor-pointer"
            >
              <i className="bi-x-lg text-lg" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex-grow text-gray-800 dark:text-gray-200">
          {children ?? <p>{content ?? (isLoading ? "Loading..." : "")}</p>}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-neutral-700">
            {(variant === "confirm" || variant === "danger" || variant === "warning") && (
              <Button variant="outline-gray" size="sm" onClick={handleCancel}>
                {cancelText}
              </Button>
            )}
            <Button
              variant={variant === "danger" ? "red" : "blue"}
              size="sm"
              onClick={handleConfirm}
            >
              {variant === "danger" ? dangerText : confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
