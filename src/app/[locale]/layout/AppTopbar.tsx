'use client';

import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Link from 'next/link';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

interface TopbarRef {
  menubutton: HTMLButtonElement | null;
}

const AppTopbar = forwardRef<TopbarRef>((props, ref) => {
  const { onMenuToggle, toggleColorScheme, layoutConfig } = useContext(LayoutContext);
  const menubuttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
  }));

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Sol: Logo */}
          <Link href="/" className="flex items-center gap-2">
              <img
                  src="/assets/png/haber-logo.png"
                  alt="Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all"
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-gray-800 dark:text-white uppercase">
    HABERCİNİZ
  </span>
          </Link>

        {/* Orta: Menü */}


        {/* Sağ: Arama + Avatar + Tema Butonu */}
        <div className="flex items-center gap-3">


          {/* Tema Değiştir */}
          <Button
            icon={layoutConfig.colorScheme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}
            className="p-button-rounded p-button-text"
            onClick={toggleColorScheme}
            severity="secondary"
            tooltip="Tema Değiştir"
          />

          {/* Avatar */}
          <Avatar
            image="https://ui-avatars.com/api/?name=Haber&background=0D8ABC&color=fff"
            shape="circle"
            className="cursor-pointer"
            size="large"
          />

          {/* Menü Butonu */}<button
          ref={menubuttonRef}
          onClick={onMenuToggle}
          className="ml-2 text-gray-600 dark:text-gray-300 hover:text-black focus:outline-none"
          aria-label="Menü Aç"
        >
          <i className="pi pi-bars text-xl" />
        </button>
        </div>
      </div>
    </header>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;


