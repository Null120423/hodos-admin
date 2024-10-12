import { createContext, useContext, useEffect, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const isExpanded = localStorage.getItem('expanded');
    setExpanded(!(isExpanded === 'false'));
  }, []);

  useEffect(() => {
    localStorage.setItem('expanded', expanded);
  }, [expanded]);

  return <SidebarContext.Provider value={{ expanded, setExpanded }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => useContext(SidebarContext);
