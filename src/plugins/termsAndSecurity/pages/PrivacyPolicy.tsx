import {
  Calendar,
  Database,
  Eye,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";
import React from "react";

import { useLanguage } from "../contexts/LanguageContext";

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("privacy.title")}
            </h1>
            <p className="text-lg text-gray-600">{t("privacy.subtitle")}</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 text-green-800">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">
              {t("common.effective_date")}: {t("contact.effective_date")}
            </span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{t("privacy.intro")}</p>
      </div>

      {/* Privacy Content */}
      <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
        {/* Section 1 */}
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t("privacy.section1.title")}
            </h2>
          </div>
          <p className="text-gray-700 mb-3">{t("privacy.section1.content")}</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t("privacy.section1.item1")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t("privacy.section1.item2")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t("privacy.section1.item3")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t("privacy.section1.item4")}</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t("privacy.section2.title")}
            </h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-orange-600 mt-1">▶</span>
              <span>{t("privacy.section2.item1")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-orange-600 mt-1">▶</span>
              <span>{t("privacy.section2.item2")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-orange-600 mt-1">▶</span>
              <span>{t("privacy.section2.item3")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-orange-600 mt-1">▶</span>
              <span>{t("privacy.section2.item4")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-orange-600 mt-1">▶</span>
              <span>{t("privacy.section2.item5")}</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t("privacy.section3.title")}
            </h2>
          </div>
          <p className="text-gray-700 mb-3">{t("privacy.section3.content")}</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span>{t("privacy.section3.item1")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span>{t("privacy.section3.item2")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span>{t("privacy.section3.item3")}</span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t("privacy.section4.title")}
            </h2>
          </div>
          <p className="text-gray-700 mb-3">{t("privacy.section4.content")}</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">🔒</span>
              <span>{t("privacy.section4.item1")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">🔒</span>
              <span>{t("privacy.section4.item2")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">🔒</span>
              <span>{t("privacy.section4.item3")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">🔒</span>
              <span>{t("privacy.section4.item4")}</span>
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t("privacy.section5.title")}
            </h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">👁</span>
              <span>{t("privacy.section5.item1")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">✏</span>
              <span>{t("privacy.section5.item2")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">🗑</span>
              <span>{t("privacy.section5.item3")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">🔕</span>
              <span>{t("privacy.section5.item4")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">📋</span>
              <span>{t("privacy.section5.item5")}</span>
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t("privacy.section6.title")}
          </h2>
          <p className="text-gray-700 mb-3">{t("privacy.section6.content")}</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">🍪</span>
              <span>{t("privacy.section6.item1")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">🍪</span>
              <span>{t("privacy.section6.item2")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">🍪</span>
              <span>{t("privacy.section6.item3")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">🍪</span>
              <span>{t("privacy.section6.item4")}</span>
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t("privacy.section7.title")}
          </h2>
          <p className="text-gray-700 mb-3">{t("privacy.section7.content")}</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-gray-600 mt-1">🏢</span>
              <span>{t("privacy.section7.item1")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-600 mt-1">⏰</span>
              <span>{t("privacy.section7.item2")}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-600 mt-1">⚖</span>
              <span>{t("privacy.section7.item3")}</span>
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t("privacy.section8.title")}
          </h2>
          <p className="text-gray-700">{t("privacy.section8.content")}</p>
        </section>

        {/* Section 9 - Contact */}
        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {t("privacy.section9.title")}
          </h2>
          <p className="text-gray-700 mb-4">{t("privacy.section9.content")}</p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">
                {t("common.email")}: {t("contact.email")}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">
                {t("common.phone")}: {t("contact.phone")}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">
                {t("common.address")}: {t("contact.address")}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
