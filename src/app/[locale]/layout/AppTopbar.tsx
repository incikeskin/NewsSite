import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { useRouter } from 'next/navigation';

const AppTopbar = forwardRef<any>((props, ref) => {
  const { layoutState, onMenuToggle } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar opacity-90 ">
      <Link href="/">
        <img src={`/assets/png/logo.png`} width="70px" height={'45px'} alt="logo" />
      </Link>
      <Link href="/">
        <div className="text-black">Habercim</div>
      </Link>
      <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
        <i className="pi pi-bars" />
      </button>
      <div
        ref={topbarmenuRef}
        className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}
      ></div>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
