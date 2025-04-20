
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarContext {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContext | undefined>(undefined);

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  // Start closed on desktop, open on mobile
  const [isOpen, setOpenState] = React.useState(false);
  
  const setOpen = React.useCallback((open: boolean) => {
    setOpenState(open);
    
    // When opening the sidebar on mobile, prevent body scrolling
    if (isMobile) {
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }, [isMobile]);

  // Close sidebar when screen size changes
  React.useEffect(() => {
    setOpenState(false);
  }, [isMobile]);

  return (
    <SidebarContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContext {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
