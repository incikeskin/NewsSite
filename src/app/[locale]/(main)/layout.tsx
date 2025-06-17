import Layout from '@/src/app/[locale]/layout/layout';


interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <Layout>{children}</Layout>
;
  
}
