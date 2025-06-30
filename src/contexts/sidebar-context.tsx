import { createContext, useContext, useEffect, useState } from "react";

type SidebarContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
  setExpanded: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const isExpanded = localStorage.getItem("expanded");
    setExpanded(!(isExpanded === "false"));
  }, []);

  useEffect(() => {
    localStorage.setItem("expanded", expanded?.toString() || "true");
  }, [expanded]);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
