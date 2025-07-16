import { Mail, MapPin, Phone } from "lucide-react";
import React, { ReactNode } from "react";

import { useLanguage } from "../contexts/LanguageContext";

import LanguageToggle from "./LanguageToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LanguageToggle />
            <div className="flex space-x-8">
              <button
                className={`px-3 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium ${
                  window.location.hash === "#terms"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 border-solid"
                    : ""
                }`}
                style={
                  window.location.hash === "#terms"
                    ? {
                        borderBottomWidth: "2px",
                        borderBottomStyle: "solid",
                        borderBottomColor: "#2563eb",
                      }
                    : {}
                }
                onClick={() => (window.location.hash = "#terms")}
              >
                {t("nav.terms")}
              </button>
              <button
                className={`px-3 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium ${
                  window.location.hash === "#privacy"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 border-solid"
                    : ""
                }`}
                style={
                  window.location.hash === "#privacy"
                    ? {
                        borderBottomWidth: "2px",
                        borderBottomStyle: "solid",
                        borderBottomColor: "#2563eb",
                      }
                    : {}
                }
                onClick={() => (window.location.hash = "#privacy")}
              >
                {t("nav.privacy")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-blue-400" />
              <div>
                <h3 className="font-bold">Saigon Tourism</h3>
                <p className="text-sm text-gray-400">
                  Your Ho Chi Minh City Travel Companion
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-2 text-center md:text-right">
              <h4 className="font-semibold text-blue-400">
                {t("common.contact_info")}
              </h4>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>{t("contact.email")}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>{t("contact.phone")}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{t("contact.address")}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-400">
            <p>&copy; 2024 Saigon Tourism. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
