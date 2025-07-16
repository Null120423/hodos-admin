import React from "react";

import { useLanguage } from "../contexts/LanguageContext";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          language === "vi"
            ? " text-white shadow-md bg-blue-500"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setLanguage("vi")}
      >
        VI
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          language === "en"
            ? " text-white shadow-md bg-blue-500"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
