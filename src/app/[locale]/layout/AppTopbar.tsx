'use client';

import Link from 'next/link';
import React, { forwardRef, useContext, useRef, useImperativeHandle } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { usePathname } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';

interface TopbarRef {
  menubutton: HTMLButtonElement | null;
}

const AppTopbar = forwardRef<TopbarRef>((props, ref) => {
  const { onMenuToggle, toggleColorScheme, layoutConfig } = useContext(LayoutContext);
  const menubuttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
  }));

  const categories = [
    { label: 'Hakkımızda', url: '/about' },
    { label: 'İletisim', url: '/contact' },

  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Üst Satır: Arama - Logo - Menü */}
        <div className="flex items-center justify-between w-full">
          {/* Arama - Sol */}
          <div className="relative w-1/3">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="pi pi-search"></i>
            </span>
            <InputText
              placeholder="Ara..."
              className="pl-10 pr-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Logo - Ortada */}
          <div className="w-1/3 flex flex-col items-center justify-center relative">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://img.icons8.com/?size=100&id=FeQbTvGTsiN5&format=png&color=000000"
                alt="Haberler"
                className="h-8 w-auto"
              />
              <span className="text-xl font-extrabold text-gray-800 tracking-wide uppercase font-poppins">
                HABERCİNİZ
              </span>
            </Link>

            {/* Alt çizgi */}
            <div className="w-10 h-[2px] bg-gray-400 mt-1 mb-1 rounded"></div>

            {/* Alt linkler */}
            <nav className="flex gap-6 text-sm font-medium text-gray-700">
              <Link
                href="/about"
                className="flex items-center gap-2 transition-all duration-200 hover:text-blue-600 hover:scale-105"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=11808&format=png&color=000000"
                  alt="Hakkımızda"
                  className="w-4 h-4"
                />
                Hakkımızda
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 transition-all duration-200 hover:text-blue-600 hover:scale-105"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=21132&format=png&color=000000"
                  alt="İletişim"
                  className="w-4 h-4"
                />
                İletişim
              </Link>
            </nav>


          </div>

          {/* Menü Butonu - Sağ */}
          <div className="flex justify-end w-1/3">
            <button
              ref={menubuttonRef}
              onClick={onMenuToggle}
              className="text-gray-600 hover:text-black focus:outline-none"
              aria-label="Sidebar Menü Toggle"
            >
              <i className="pi pi-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;


