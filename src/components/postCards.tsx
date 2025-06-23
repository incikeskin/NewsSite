import React from 'react';
import { Button } from 'primereact/button';
import { setToastMessage } from '@/src/redux/toastMessage-store';
import { reduxStore } from '@/src/redux';
import sabah from '@/public/assets/png/sabahgazetesilogo.png';
import hurriyet from '@/public/assets/png/hürriyet logo.png';
import cumhuriyet from '@/public/assets/png/cumhuriyet-logo-icon-512-512.jpg';
import karar from '@/public/assets/png/kararlogo.png';
import haberturk from '@/public/assets/png/habertürklogopng.png';
import placeholder from '@/public/assets/png/Image-Placeholder-Dark.png';
import Image from 'next/image';

interface Props {
  key?: string;
  url: string;
  description: string;
  image: string;
  name: string;
  source: string;
}

const PostCards = (Props: Props) => {
  const share = () => {
    navigator.share({
      text: Props.name,
      title: Props.source,
      url: Props.url,
    });
  };

  const profilePicSelect = () => {
    switch (Props.source.toLowerCase()) {
      case 'cumhuriyet': return cumhuriyet;
      case 'karar': return karar;
      case 'hürriyet': return hurriyet;
      case 'habertürk': return haberturk;
      case 'sabah': return sabah;
      default: return placeholder;
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(Props.url);
    reduxStore.dispatch(setToastMessage({ show: true, severity: 'success', summary: 'Başarılı', detail: 'url kopyalandı' }));
  };

  return (
    <div
      className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-4 mb-5 shadow-md hover:shadow-lg transition w-full min-h-[300px] flex flex-col"
    >
      <div className="flex flex-col md:flex-row items-center mb-3 justify-between w-full flex-grow">
        <div className="md:w-1/2 p-3 flex flex-col justify-center min-h-[220px]">
          <div className="flex items-center mb-4">
            <Image
              className="bg-black rounded-full"
              src={profilePicSelect()}
              alt={Props.source}
              width={75}
              height={75}
            />
            <div className="ml-4 text-black font-medium">{Props.source}</div>
          </div>
          <h3 className="text-xl font-semibold text-black">{Props.name}</h3>
          <p className="mt-4 text-black font-medium line-clamp-4 overflow-hidden">{Props.description}</p>
        </div>
        <div className="md:w-1/2 flex justify-center p-3 min-h-[220px]">
          {Props.image ? (
            <img
              src={Props.image}
              alt={Props.name}
              className="rounded-lg object-cover w-full max-h-64"
              style={{ maxHeight: '256px' }} // h-64 = 16 * 16 px = 256px
            />
          ) : (
            <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg" />
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-auto pt-3 border-t border-gray-200">
        <Button icon="pi pi-clone" rounded severity="success" aria-label="Copy URL" onClick={handleCopyUrl} />
        <Button icon="pi pi-info" rounded severity="success" aria-label="Open Link" onClick={() => window.open(Props.url, '_blank')} />
        <Button icon="pi pi-share-alt" rounded severity="success" aria-label="Share" onClick={share} />
      </div>
    </div>
  );
};

export default PostCards;


