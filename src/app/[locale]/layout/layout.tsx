'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEventListener, useUnmountEffect } from 'primereact/hooks';
import { classNames } from 'primereact/utils';
import React, { Suspense, useContext, useEffect, useRef } from 'react';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import { LayoutContext } from './context/layoutcontext';



const Layout = ({ children }: any) => {
  const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
  const topbarRef = useRef<any>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Menü dışına tıklamayı dinleme
  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
    type: 'click',
    listener: (event) => {
      const isOutsideClicked = !(
        sidebarRef.current?.isSameNode(event.target as Node) ||
        sidebarRef.current?.contains(event.target as Node) ||
        topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.menubutton?.contains(event.target as Node)
      );

      if (isOutsideClicked) {
        hideMenu();
      }
    },
  });

  // Profil menüsü dışına tıklamayı dinleme
  const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
    type: 'click',
    listener: (event) => {
      const isOutsideClicked = !(
        topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.contains(event.target as Node)
      );

      if (isOutsideClicked) {
        hideProfileMenu();
      }
    },
  });

  // Yönlendirme değişince menüyü gizle
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    hideMenu();
    hideProfileMenu();
  }, [pathname, searchParams]);

  const hideMenu = () => {
    setLayoutState((prevLayoutState: any) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    unbindMenuOutsideClickListener();
    unblockBodyScroll();
  };

  const hideProfileMenu = () => {
    setLayoutState((prevLayoutState: any) => ({
      ...prevLayoutState,
      profileSidebarVisible: false,
    }));
    unbindProfileMenuOutsideClickListener();
  };

  const blockBodyScroll = () => {
    document.body.classList.add('overflow-hidden');
  };

  const unblockBodyScroll = () => {
    document.body.classList.remove('overflow-hidden');
  };

  useEffect(() => {
    if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
      bindMenuOutsideClickListener();
    }
    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll();
    } else {
      unblockBodyScroll();
    }
  }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

  useEffect(() => {
    if (layoutState.profileSidebarVisible) {
      bindProfileMenuOutsideClickListener();
    }
  }, [layoutState.profileSidebarVisible]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
    unbindProfileMenuOutsideClickListener();
  });

  const containerClass = classNames(
    'layout-wrapper min-h-screen flex flex-col',
    {
      'layout-overlay': layoutConfig.menuMode === 'overlay',
      'layout-static': layoutConfig.menuMode === 'static',
      'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
      'layout-overlay-active': layoutState.overlayMenuActive,
      'layout-mobile-active': layoutState.staticMenuMobileActive,
      'p-input-filled': layoutConfig.inputStyle === 'filled',
      'p-ripple-disabled': !layoutConfig.ripple,
    }
  );

  return (
    <Suspense>
      <>
        <div
          className={containerClass}
          style={{
            backgroundColor: '#E8E9EB',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        >
          <AppTopbar ref={topbarRef} />
          <div
            ref={sidebarRef}
            className="layout-sidebar opacity-90 z-30 min-h-screen flex flex-col !important"
             style={{ width: '14rem' }}
          >
            <AppSidebar />
          </div>
          <div className="layout-main-container flex-grow relative z-10">
            <main className="layout-main p-0">{children}</main>
          </div>
          <div className="layout-mask fixed inset-0 bg-black bg-opacity-30 hidden md:block"></div>
        </div>
      </>
    </Suspense>
  );
};

export default Layout;

