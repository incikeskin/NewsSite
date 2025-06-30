import Layout from '@/src/app/[locale]/layout/layout';
import PrimeReact from 'primereact/api';


interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  PrimeReact.autoZIndex = true;
  PrimeReact.zIndex = {
    modal: 1100,
    overlay: 1200, // Toast'un görünür olmasını sağlamak için bu değeri artırın
    menu: 1000,
    tooltip: 1100
  };
  return <Layout>{children}</Layout>
;

}
