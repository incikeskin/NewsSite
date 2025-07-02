'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Link from 'next/link';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';
import { auth } from '@/src/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface TopbarRef {
  menubutton: HTMLButtonElement | null;
}

const AppTopbar = React.forwardRef<TopbarRef>((props, ref) => {
  const { onMenuToggle, toggleColorScheme, layoutConfig } = useContext(LayoutContext);
  const menubuttonRef = useRef<HTMLButtonElement>(null);
  const menu = useRef<Menu>(null);
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName || '';
  const initials = displayName
    ? displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '...';

  const items = [
    {
      label: 'Hesabım',
      icon: 'pi pi-user',
      command: () => router.push('/account'),
    },
    {
      label: 'Çıkış Yap',
      icon: 'pi pi-sign-out',
      command: async () => {
        await signOut(auth);
        router.push('/login');
      },
    },
  ];

  React.useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
  }));

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Sol: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/assets/png/haber-logo.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all" />
          <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-red-700 dark:text-white uppercase">HABERCİNİZ</span>
        </Link>

        {/* Sağ: Tema Butonu + Avatar + Menü */}
        <div className="flex items-center gap-3">
          {/* Tema Değiştir Butonu */}
          <Button
            icon={layoutConfig.colorScheme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}
            className="p-button-rounded p-button-text dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
            onClick={toggleColorScheme}
            severity="secondary"
            tooltip="Tema Değiştir"
          />

          {/* Avatar */}
          <Avatar
            label={initials}
            shape="circle"
            size="large"
            className="cursor-pointer bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
            onClick={(e) => menu.current?.toggle(e)}
          />

          {/* Dropdown Menü */}
          <Menu model={items} popup ref={menu} />

          {/* Menü Butonu */}
          <button
            ref={menubuttonRef}
            onClick={onMenuToggle}
            className="ml-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
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
