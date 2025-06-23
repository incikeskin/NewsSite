'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
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
    await reduxStore.dispatch(getNewsAction(pageNumber))
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
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPageNumber(prev => prev + 1);
        hasFetchedInitialPage.current = false;
      }
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="grid card px-1 py-1 opacity-90">
        <div className="col-12 flex justify-content-center align-items-center text-center text-4xl font-medium">{t('header')}</div>
      </div>

      <div  className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3">
        {news?.map((e:any, index:any) => (
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
    </div>
  );
};

export default HomePage;
