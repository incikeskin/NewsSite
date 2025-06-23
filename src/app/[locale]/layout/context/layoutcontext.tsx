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
    sidebarVisible: true, // Yeni: sidebar görünürlüğü
  });

  // Menü aç/kapa fonksiyonu (mevcut)
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

  // Sidebar görünürlüğü toggle
  const toggleSidebar = () => {
    setLayoutState((prevLayoutState: any) => ({
      ...prevLayoutState,
      sidebarVisible: !prevLayoutState.sidebarVisible,
    }));
  };

  // Tema değiştirici (light <-> dark)
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

  // Helper fonksiyonlar (mevcut)
  const isOverlay = () => layoutConfig.menuMode === 'overlay';
  const isDesktop = () => window.innerWidth > 991;

  const value: any = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    toggleSidebar,         // Yeni eklenen fonksiyon
    toggleColorScheme,     // Yeni eklenen fonksiyon
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

