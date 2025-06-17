'use client';
import React, { useEffect, useState, useRef } from 'react';

import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import PostCards from '@/src/components/postCards';
import { fetchRssNews } from '@/src/redux/rssNews-store';
import { reduxStore } from '@/src/redux';
import { setToastMessage } from '@/src/redux/toastMessage-store';

interface NewsItem {
  key: string;
  url: string;
  description: string;
  image: string;
  name: string;
  source: string;
}

const CumhuriyetPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const newsContainerRef = useRef<HTMLDivElement>(null);
  const hasFetchedInitialPage = useRef(false); //useeffectten 1 tane fecthlemesi için
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!hasFetchedInitialPage.current) {
      fetchNewsData().then();
      hasFetchedInitialPage.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup function
  }, []);
  const handleScroll = () => {
    if (document.documentElement.scrollTop > 1300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling behavior
    });
  };

  const fetchNewsData = async () => {
    setLoading(true);
    try {
      const resultAction = await reduxStore.dispatch(fetchRssNews('https://webrazzi.com/feed'));
      console.log('Fetched news data:', resultAction.payload); // Debugging log
      if (fetchRssNews.fulfilled.match(resultAction)) {
        const newsData = resultAction.payload;
        if (newsData && Array.isArray(newsData.result)) {
          setNews(newsData.result);
          reduxStore.dispatch(setToastMessage({ show: true, severity: 'success', summary: 'Başarılı', detail: 'Haberler çekildi' }));
        } else {
          console.error('Unexpected news data structure:', newsData);
        }
      } else {
        console.error('Failed to fetch news:', resultAction.error);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scroll-smooth">
      {showButton && ( // Conditionally render the scroll button
        <Button
          icon="pi pi-angle-double-up"
          aria-label="Scroll to Top"
          className="fixed bottom-8 right-8 z-10"
          onClick={handleScrollTop}
          severity="success"
        />
      )}
      <div className="grid card px-4 py-1 opacity-90">
        <div className="col-12 flex justify-content-center align-items-center text-center">Gündelik Haberler</div>
      </div>

      <div ref={newsContainerRef} className="grid bg-transparent p-3" style={{ overflowY: 'auto' }}>
        {news.map((e, index) => (
          <PostCards
            key={`${e.key}-${index}`} // key-sayfa sayısı-index
            url={e.url}
            description={e.description}
            image={e.image}
            name={e.name}
            source={e.source}
          />
        ))}
      </div>
      <div className="col-12 flex justify-center align-center">
        {loading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" className="mb-5" />}
      </div>
    </div>
  );
};

export default CumhuriyetPage;
