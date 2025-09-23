import React from "react";
import { useNavigate } from "react-router-dom";
import { useNavStore } from "../../state/useNavStore";
import { Button } from "./Button";

interface FeatureCardProps {
  to?: string;
  href?: string;
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

  const handleClick = (e: React.MouseEvent) => {
    if (isLogin && !isUserLogin) {
      e.preventDefault();
      onRequireLogin?.();
      return;
    }
    setFromHome(true);
    if (to) navigate(to);
    if (href) window.open(href, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleClick(e as any)}
      className="cursor-pointer bg-white border border-gray-300 h-full shadow-sm
                 dark:bg-neutral-800 dark:border-neutral-700 rounded-md flex flex-col
                 transition transform duration-300 hover:scale-102 hover:shadow-2xl
                 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      <img
        className="object-cover w-full h-48 rounded-t-md"
        src={imageSrc}
        alt={title}
      />
      <div className="p-5 flex flex-col flex-1 justify-between">
        <h4 className="mb-2 text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h4>
        <p className="mb-3 text-sm sm:text-base font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {category && (
            <span className="bg-blue-100 text-blue-800 border border-blue-400 text-sm rounded px-2 py-0.5 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-600 font-medium">
              {category}
            </span>
          )}
          {isPremium && (
            <span className="bg-red-100 text-red-800 text-sm rounded px-2 py-0.5 dark:bg-red-900 dark:text-red-300 border border-red-400 dark:border-red-600 font-medium">
              Premium
            </span>
          )}
          {((isLogin || isPremium) && !isUserLogin) && (
            <span className="bg-yellow-100 text-yellow-800 text-sm rounded px-2 py-0.5 dark:bg-yellow-900 dark:text-yellow-400 border border-yellow-400 dark:border-yellow-600 font-medium flex items-center gap-1">
              <i className="bi bi-exclamation-triangle"></i> Harus login
            </span>
          )}
        </div>
      </div>
      <Button variant="blue" className="mx-4 mb-4">Coba sekarang!</Button>
    </div>
  );
};
