import { Providers } from '../providers';
import { Inter } from 'next/font/google';
import '@/src/app/globals.css';
import { LayoutProvider } from '@/src/app/[locale]/layout/context/layoutcontext';
import '@/styles/layout/layout.scss';
import ToastMessage from '@/src/components/toastMessage/toastMessage';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Haberler',
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages();

  return (
    <Providers>
      <html lang={locale} suppressHydrationWarning>
        <head>
          <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              const style = document.createElement('style')
              style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
              style.setAttribute('type', 'text/css')
              document.querySelector('head').prepend(style)
            `,
            }}
          />
        </head>
        <body className={inter.className}>
          <ToastMessage />
          <LayoutProvider>
            <NextIntlClientProvider locale={locale} messages={JSON.parse(JSON.stringify(messages)) as unknown as AbstractIntlMessages}>
              {children}
            </NextIntlClientProvider>
          </LayoutProvider>
        </body>
      </html>
    </Providers>
  );
}
