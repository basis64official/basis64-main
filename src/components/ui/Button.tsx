// components/ui/Button.tsx
import React from "react";
import { Link } from "react-router-dom";

type ButtonVariant =
  | "red"
  | "transparent-red"
  | "outline-red"
  | "orange"
  | "transparent-orange"
  | "outline-orange"
  | "yellow"
  | "transparent-yellow"
  | "outline-yellow"
  | "blue"
  | "transparent-blue"
  | "outline-blue"
  | "gray"
  | "transparent-gray"
  | "outline-gray";

type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps =
  | (BaseButtonProps &
      React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
  | (BaseButtonProps &
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string })
  | (BaseButtonProps & {
      as: "link";
      href: string;
    } & Omit<React.ComponentProps<typeof Link>, "to">);


const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

// components/ui/Button.tsx
const baseStyles =
  "cursor-pointer inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:scale-102 active:scale-95";

const variantStyles: Record<ButtonVariant, string> = {
  red: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400",
  "transparent-red":
    "bg-red-600/10 text-red-600 hover:bg-red-600/20 focus:ring-red-300",
  "outline-red":
    "border border-red-600 text-red-600 hover:bg-red-600/10 focus:ring-red-300",

  orange:
    "bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 focus:ring-orange-400",
  "transparent-orange":
    "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 focus:ring-orange-300",
  "outline-orange":
    "border border-orange-500 text-orange-600 hover:bg-orange-500/10 focus:ring-orange-300",

  yellow:
    "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-400",
  "transparent-yellow":
    "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 focus:ring-yellow-300",
  "outline-yellow":
    "border border-yellow-500 text-yellow-600 hover:bg-yellow-500/10 focus:ring-yellow-300",

  blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-400",
  "transparent-blue":
    "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 focus:ring-blue-300",
  "outline-blue":
    "border border-blue-600 text-blue-600 hover:bg-blue-600/10 focus:ring-blue-300",

  gray: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-400",
  "transparent-gray":
    "bg-gray-700/10 text-gray-700 hover:bg-gray-700/20 focus:ring-gray-300",
  "outline-gray":
    "border border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-600/10 focus:ring-gray-300",
};


export const Button: React.FC<ButtonProps> = ({
  as = "button",
  variant = "red",
  size = "md",
  loading,
  icon,
  iconRight,
  children,
  className = "",
  ...rest
}) => {
  const { href } = rest as { href?: string };
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const spinner = (
    <svg
      className="animate-spin h-5 w-5 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );

  if (as === "a") {
    const { href } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        className={combinedClassName}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {!iconRight && (loading ? spinner : icon)}
        {children}
        {iconRight && !loading && icon}
      </a>
    );
  }

  if (as === "link") {
    const linkProps = rest as Omit<React.ComponentProps<typeof Link>, "to">;
    return (
      <Link to={href || ""} className={combinedClassName} {...linkProps}>
        {!iconRight && (loading ? spinner : icon)}
        {children}
        {iconRight && !loading && icon}
      </Link>
    );
  }

  const { disabled, type, onClick, ...buttonProps } =
    rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      {...buttonProps}
    >
      {!iconRight && (loading ? spinner : icon)}
      {children}
      {iconRight && !loading && icon}
    </button>
  );
};
