import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { useTranslations } from 'next-intl';

const AppMenu = () => {
  const t = useTranslations('SideBar');
  const model: any[] = [
    {
      label: t('headerLabel'),
      items: [
        {
          label: t('news'),
          items: [
            {
              label: 'Cumhuriyet',
              to: '/news/cumhuriyet',
            },
            {
              label: 'Habertürk',
              to: '/news/cumhuriyet',
            },
            {
              label: 'Karar',
              to: '/news/cumhuriyet',
            },
            {
              label: 'Sabah',
              to: '/news/cumhuriyet',
            },
          ],
        },
        {
          label: t('pharmacy'),
          to: '/pharmacy',
        },
        { label: t('religion'), to: '/religion' },
        { label: t('weather'), to: '/weather' },
        {
          label: t('economy'),
          items: [
            { label: t('gold'), to: '/economy/gold' },
            { label: t('exchange'), to: '/economy/exchange' },
          ],
        },
        { label: t('contactUs'), to: '/contactUs' },
        { label: t('login'), to: '/login' },
        { label: t('register'), to: '/register' },
        { label: t('account'), to: '/account' },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
