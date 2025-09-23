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
  | "outline-gray"
  | "green"
  | "transparent-green"
  | "outline-green"
  | "indigo"
  | "transparent-indigo"
  | "outline-indigo"
  | "purple"
  | "transparent-purple"
  | "outline-purple"
  | "pink"
  | "transparent-pink"
  | "outline-pink"
  // social brands
  | "facebook"
  | "twitter"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "whatsapp"
  | "discord"
  | "youtube"
  | "twitch"
  | "telegram"
  | "transparent-telegram"
  | "outline-telegram";

const variantStyles: Record<ButtonVariant, string> = {
  red: "bg-gradient-to-r from-red-700 to-red-500 text-white group hover:from-red-500 hover:to-red-700 focus:ring-red-400 transition-colors duration-300",
  orange: "bg-gradient-to-r from-orange-600 to-orange-400 text-white group hover:from-orange-400 hover:to-orange-600 focus:ring-orange-400 transition-colors duration-300",
  yellow: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-white group hover:from-yellow-400 hover:to-yellow-600 focus:ring-yellow-400 transition-colors duration-300",
  blue: "bg-gradient-to-r from-blue-700 to-blue-500 text-white group hover:from-blue-500 hover:to-blue-700 focus:ring-blue-400 transition-colors duration-300",
  gray: "bg-gradient-to-r from-gray-800 to-gray-600 text-white group hover:from-gray-600 hover:to-gray-800 focus:ring-gray-400 transition-colors duration-300",

  green: "bg-gradient-to-r from-green-700 to-green-500 text-white group hover:from-green-500 hover:to-green-700 focus:ring-green-400 transition-colors duration-300",
  indigo: "bg-gradient-to-r from-indigo-700 to-indigo-500 text-white group hover:from-indigo-500 hover:to-indigo-700 focus:ring-indigo-400 transition-colors duration-300",
  purple: "bg-gradient-to-r from-purple-700 to-purple-500 text-white group hover:from-purple-500 hover:to-purple-700 focus:ring-purple-400 transition-colors duration-300",
  pink: "bg-gradient-to-r from-pink-600 to-pink-400 text-white group hover:from-pink-400 hover:to-pink-600 focus:ring-pink-300 transition-colors duration-300",

  "transparent-red": "bg-red-600/10 text-red-600 hover:bg-red-600/20 focus:ring-red-300 transition-colors duration-300",
  "transparent-orange": "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 focus:ring-orange-300 transition-colors duration-300",
  "transparent-yellow": "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 focus:ring-yellow-300 transition-colors duration-300",
  "transparent-blue": "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 focus:ring-blue-300 transition-colors duration-300",
  "transparent-gray": "bg-gray-700/10 text-gray-700 hover:bg-gray-700/20 focus:ring-gray-300 transition-colors duration-300",
  "transparent-green": "bg-green-600/10 text-green-600 hover:bg-green-600/20 focus:ring-green-300 transition-colors duration-300",
  "transparent-indigo": "bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 focus:ring-indigo-300 transition-colors duration-300",
  "transparent-purple": "bg-purple-600/10 text-purple-600 hover:bg-purple-600/20 focus:ring-purple-300 transition-colors duration-300",
  "transparent-pink": "bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 focus:ring-pink-300 transition-colors duration-300",
  // telegram transparent
  "transparent-telegram": "bg-cyan-600/10 text-cyan-600 hover:bg-cyan-600/20 focus:ring-cyan-300 transition-colors duration-300",

  "outline-red": "border border-red-600 text-red-600 hover:bg-red-600/10 focus:ring-red-300 transition-colors duration-300",
  "outline-orange": "border border-orange-500 text-orange-600 hover:bg-orange-500/10 focus:ring-orange-300 transition-colors duration-300",
  "outline-yellow": "border border-yellow-500 text-yellow-600 hover:bg-yellow-500/10 focus:ring-yellow-300 transition-colors duration-300",
  "outline-blue": "border border-blue-600 text-blue-600 hover:bg-blue-600/10 focus:ring-blue-300 transition-colors duration-300",
  "outline-gray": "border border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-600/10 focus:ring-gray-300 transition-colors duration-300",
  "outline-green": "border border-green-600 text-green-600 hover:bg-green-600/10 focus:ring-green-300 transition-colors duration-300",
  "outline-indigo": "border border-indigo-600 text-indigo-600 hover:bg-indigo-600/10 focus:ring-indigo-300 transition-colors duration-300",
  "outline-purple": "border border-purple-600 text-purple-600 hover:bg-purple-600/10 focus:ring-purple-300 transition-colors duration-300",
  "outline-pink": "border border-pink-500 text-pink-600 hover:bg-pink-500/10 focus:ring-pink-300 transition-colors duration-300",
  // telegram outline
  "outline-telegram": "border border-cyan-600 text-cyan-600 hover:bg-cyan-600/10 focus:ring-cyan-300 transition-colors duration-300",

  // --- social brand variants ---
  facebook: "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 focus:ring-blue-400 transition-colors duration-300",
  twitter: "bg-gradient-to-r from-sky-500 to-sky-400 text-white hover:from-sky-400 hover:to-sky-500 focus:ring-sky-300 transition-colors duration-300",
  instagram: "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white hover:from-orange-400 hover:via-purple-500 hover:to-pink-500 focus:ring-pink-400 transition-colors duration-300",
  tiktok: "bg-gradient-to-r from-pink-500 to-cyan-500 text-white hover:from-cyan-500 hover:to-pink-500 focus:ring-cyan-400 transition-colors duration-300",
  linkedin: "bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:from-blue-500 hover:to-blue-700 focus:ring-blue-400 transition-colors duration-300",
  whatsapp: "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-600 focus:ring-green-400 transition-colors duration-300",
  discord: "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-600 focus:ring-indigo-400 transition-colors duration-300",
  youtube: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-600 focus:ring-red-400 transition-colors duration-300",
  twitch: "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 focus:ring-purple-400 transition-colors duration-300",
  // telegram solid (brand-ish cyan)
  telegram: "bg-gradient-to-r from-cyan-600 to-sky-500 text-white hover:from-sky-500 hover:to-cyan-600 focus:ring-cyan-300 transition-colors duration-300",
};


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
      to: string;
    } & Omit<React.ComponentProps<typeof Link>, "to">);


const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

// components/ui/Button.tsx
const baseStyles =
  "cursor-pointer inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:scale-[1.005] active:scale-99";


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
