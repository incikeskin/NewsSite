'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import PostCards from '@/src/components/postCards';
import { useDispatch } from 'react-redux';
import { newsSelector, reduxStore, useAppSelector } from '@/src/redux';
import { useTranslations } from 'next-intl';
import { getNewsAction } from '@/src/redux';


const HomePage = () => {
  const t = useTranslations('Home');
  const dispatch = useDispatch();
  const news: any = useAppSelector(newsSelector)?.news;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const hasFetchedInitialPage = useRef(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!hasFetchedInitialPage.current) {
      fetchNewsData(pageNumber);
      hasFetchedInitialPage.current = true;
    }
  }, [pageNumber]);

  const fetchNewsData = async (page: number) => {
    await reduxStore.dispatch(getNewsAction(page));
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (document.documentElement.scrollTop > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }

    debounceTimeout.current = setTimeout(() => {
      // Arama yaparken sonsuz scroll çalışmasın
      if (!searchTerm && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPageNumber((prev) => prev + 1);
        hasFetchedInitialPage.current = false;
      }
    }, 1000);
  };
  const items = ['Namaz Vakitleri', 'Haberler', 'Döviz', 'Hava Durumu', 'Altın', 'Nöbetçi Eczaneler'];
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchTerm]);

  // Arama filtresi
  const filteredNews = news?.filter((item: any) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="scroll-smooth">
      {showButton && (
        <Button
          icon="pi pi-angle-double-up"
          aria-label="Scroll to Top"
          className="fixed bottom-8 right-8 z-10"
          onClick={handleScrollTop}
          severity="success"
        />
      )}
      <div className="group relative overflow-hidden mx-auto px-4 max-w-screen-md mb-4"
           style={{
             WebkitMaskImage:
               'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
             maskImage:
               'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
           }}>
        <div className="flex animate-loop-scroll whitespace-nowrap">
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="w-44 flex items-center justify-center px-4 text-base sm:text-lg font-semibold text-lg"
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-3xl lg:text-6xl font-semibold text-surface-950
      text-center max-w-xl mt-0 mx-auto leading-tight">{t('header')}</h1>
      <p className="text-lg text-surface-500 max-w-lg text-center mx-auto">Tarafsız Haberin Doğru Adresi</p>

      {/* Arama Kutusu */}
      <div className="flex justify-center mb-1">
        <span className="p-input-icon-left">
          <div className="flex justify-center mt-2 mb-4">
            <div className="relative w-80">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <i className="pi pi-search" />
              </span>
              <InputText
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Haber ara..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:border-blue-400 transition-all duration-300"
              />

  </div>
</div>

        </span>
      </div>

      {/* Haberler */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3">
        {filteredNews?.map((e: any, index: any) => (
          <div key={`${e.key}-${pageNumber}-${index}`} className="w-full">
            <PostCards
              url={e.url}
              description={e.description}
              image={e.image}
              name={e.name}
              source={e.source}
            />
          </div>
        ))}
      </div>

      {/* Yükleniyor göstergesi (isteğe bağlı) */}
      {filteredNews?.length === 0 && searchTerm && (
        <p className="text-center text-gray-500 mt-10">Aradığınız kriterlere uygun haber bulunamadı.</p>
      )}
    </div>
  );
};

export default HomePage;

