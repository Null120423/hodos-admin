import { useEffect, useState } from "react";

import Layout from "./components/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { Route, getCurrentRoute } from "./utils/router";

function TermAndSecurity() {
  const [currentRoute, setCurrentRoute] = useState<Route>("terms");

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getCurrentRoute());
    };

    // Set initial route
    setCurrentRoute(getCurrentRoute());

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case "terms":
        return <TermsOfService />;
      case "privacy":
        return <PrivacyPolicy />;
      default:
        return <TermsOfService />;
    }
  };

  return (
    <LanguageProvider>
      <Layout>
        <div className="transition-all duration-300 ease-in-out">
          {renderCurrentPage()}
        </div>
      </Layout>
    </LanguageProvider>
  );
}

export default TermAndSecurity;
