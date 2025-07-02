'use client';
import React, { useState, createContext, useEffect } from 'react';

export const LayoutContext = createContext({} as any);

export const LayoutProvider = ({ children }: any) => {
  const [layoutConfig, setLayoutConfig]: any = useState({
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light', // light veya dark
    theme: 'lara-light-indigo',
    scale: 14,
  });

  const [layoutState, setLayoutState]: any = useState({
    staticMenuDesktopInactive: true,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    sidebarVisible: true,
  });

  // Tema değiştirildiğinde tailwind dark class ve theme-css linkini güncelle
  useEffect(() => {
    // tailwind dark mod class
    if (layoutConfig.colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Tema CSS linkini güncelle
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement | null;
    if (themeLink) {
      themeLink.href = layoutConfig.colorScheme === 'dark' ? '/themes/lara-dark-indigo/theme.css' : '/themes/lara-light-indigo/theme.css';
    }
  }, [layoutConfig.colorScheme]);

  const onMenuToggle = () => {
    if (isOverlay()) {
      setLayoutState((prevLayoutState: any) => ({
        ...prevLayoutState,
        overlayMenuActive: !prevLayoutState.overlayMenuActive,
      }));
    }
    if (isDesktop()) {
      setLayoutState((prevLayoutState: any) => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive,
      }));
    } else {
      setLayoutState((prevLayoutState: any) => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
      }));
    }
  };

  const toggleSidebar = () => {
    setLayoutState((prevLayoutState: any) => ({
      ...prevLayoutState,
      sidebarVisible: !prevLayoutState.sidebarVisible,
    }));
  };

  const toggleColorScheme = () => {
    setLayoutConfig((prevLayoutConfig: any) => {
      const newColorScheme = prevLayoutConfig.colorScheme === 'light' ? 'dark' : 'light';
      return {
        ...prevLayoutConfig,
        colorScheme: newColorScheme,
        theme: newColorScheme === 'light' ? 'lara-light-indigo' : 'lara-dark-indigo',
      };
    });
  };

  const isOverlay = () => layoutConfig.menuMode === 'overlay';
  const isDesktop = () => window.innerWidth > 991;

  const value: any = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    toggleSidebar,
    toggleColorScheme,
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
