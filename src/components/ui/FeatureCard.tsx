import React from "react";
import { useNavigate } from "react-router-dom";
import { useNavStore } from "../../state/useNavStore";

interface FeatureCardProps {
  to?: string;           // internal route
  href?: string;         // external link
  imageSrc: string;
  title: string;
  description: string;
  category?: string;
  isPremium?: boolean;
  isLogin?: boolean;
  isUserLogin?: boolean;
  onRequireLogin?: () => void; // 🔑 callback buat buka modal login
}

/*const categoryColors: Record<string, string> = {
  NLP: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Tools: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};*/

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
      e.preventDefault(); // stop link jalan
      onRequireLogin?.(); // panggil modal login
      return;
    }

    console.log("handle click");

    // kalau udah login, baru lanjut navigate
    setFromHome(true);
    if (to) navigate(to);
    if (href) window.open(href, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white border border-gray-300 h-full shadow-xs dark:bg-neutral-800 dark:border-neutral-700 rounded flex flex-col"
    >
      <img
        className="object-cover w-full h-48"
        src={imageSrc}
        alt={title}
      />
      <div className="p-5 flex flex-col flex-1 justify-between">
        <h4 className="mb-2 text-2md font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h4>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {category && (
            <span
              className={`bg-blue-100 text-blue-800 border-blue-400 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-600 text-md rounded-xs font-medium px-2.5 py-0.5 border`}
            >
              {category}
            </span>
          )}
          {isPremium && (
            <span className="bg-red-100 text-red-800 text-md rounded-xs font-medium px-2.5 py-0.5 dark:bg-red-900 dark:text-red-300 border border-red-400 dark:border-red-600">
              Premium
            </span>
          )}
          {((isLogin || isPremium) && !isUserLogin) && (
            <span className="bg-yellow-100 text-yellow-800 text-md rounded-xs font-medium px-2.5 py-0.5 dark:bg-yellow-900 dark:text-yellow-400 border border-yellow-400 dark:border-yellow-600">
              <i className="bi bi-exclamation-triangle"></i> Harus login
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
