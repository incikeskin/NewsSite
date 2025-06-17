import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const locales = ['tr', 'de', 'en'];

const customMiddleware = createMiddleware({
  locales,
  defaultLocale: 'tr',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static assets from redirection
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.startsWith('/assets/')) {
    return NextResponse.next();
  }

  const localeMatch = pathname.match(/^\/([a-zA-Z-]{2,5})(\/|$)/);
  const locale = localeMatch?.[1];

  if (locale && !locales.includes(locale)) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = '/';
    return NextResponse.redirect(newUrl);
  }

  return customMiddleware(request);
}

export const config = {
  matcher: ['/', '/:locale(tr|de|en)?/:path*'],
};
