import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNavStore } from "../../state/useNavStore";
import { Button } from "./Button";

interface FeatureCardProps {
  to?: string;        // internal route
  href?: string;      // external link
  imageSrc: string;
  title: string;
  description: string;
  category?: string;
  isPremium?: boolean;
  isLogin?: boolean;
  isUserLogin?: boolean;
  onRequireLogin?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  to,
  href,
  imageSrc,
  title,
  description,
  category,
  isPremium = false,
  isLogin = false,
  isUserLogin,
  onRequireLogin
}) => {
  const navigate = useNavigate();
  const setFromHome = useNavStore((s) => s.setFromHome);

  const handleAction = () => {
    if (isLogin && !isUserLogin) {
      onRequireLogin?.();
      return;
    }
    setFromHome(true);
    if (to) navigate(to);
    if (href) window.open(href, "_blank");
  };

  const content = (
    <>
      <img
        className="object-cover w-full h-48 rounded-t-md"
        src={imageSrc}
        alt={title}
      />
      <div className="p-5 flex flex-col flex-1">
        <h4 className="mb-2 text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h4>
        <p className="mb-3 text-sm sm:text-sm font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
      <Button variant="blue" className="mx-4 mb-4">Coba sekarang!</Button>
    </>
  );

  if (href) {
    // External link
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white border border-gray-300 h-full shadow-sm
                   dark:bg-neutral-800 dark:border-neutral-700 rounded-md flex flex-col
                   transition transform duration-300 hover:scale-102 hover:shadow-2xl
                   hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        {content}
      </a>
    );
  }

  if (to) {
    // Internal link
    return (
      <Link
        to={to}
        className="bg-white border border-gray-300 h-full shadow-sm
                   dark:bg-neutral-800 dark:border-neutral-700 rounded-md flex flex-col
                   transition transform duration-300 hover:scale-102 hover:shadow-2xl
                   hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        {content}
      </Link>
    );
  }

  // Action only
  return (
    <button
      type="button"
      onClick={handleAction}
      className="bg-white border border-gray-300 h-full shadow-sm
                 dark:bg-neutral-800 dark:border-neutral-700 rounded-md flex flex-col
                 transition transform duration-300 hover:scale-102 hover:shadow-2xl
                 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {content}
    </button>
  );
};
