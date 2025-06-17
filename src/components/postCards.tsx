'use client';
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
  key: string;
  url: string;
  description: string;
  image: string;
  name: string;
  source: string;
}

const PostCards = (Props: Props) => {
  const share = () => {
    navigator
      .share({
        text: Props.name,
        title: Props.source,
        url: Props.url,
      })
      .then();
  };
  const profilePicSelect = () => {
    const name: string = Props.source.toLowerCase();
    switch (name) {
      case 'cumhuriyet':
        return cumhuriyet;

      case 'karar':
        return karar;

      case 'hürriyet':
        return hurriyet;

      case 'habertürk':
        return haberturk;

      case 'sabah':
        return sabah;

      default:
        return placeholder;
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(Props.url).then();
    reduxStore.dispatch(setToastMessage({ show: true, severity: 'success', summary: 'Başarılı', detail: 'url kopyalandı' }));
  };

  return (
    <div
      className="col-12 p-3 mb-5 "
      style={{
        backgroundColor: 'rgba(250, 250, 250, 0.8)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
      }}
    >
      <div className="flex flex-column align-items-center mb-3 justify-between md:flex-row">
        <div className="flex col-12 md:col-6 flex-column">
          <div className="flex flex-row mr-5 mb-5 p-3 items-center">
            <Image className="bg-black" src={profilePicSelect()} alt={Props.source} style={{ width: 75, height: 75, borderRadius: '50%' }} />
            <div className="ml-4 text-black font-medium">{Props.source}</div>
          </div>
          <div className="flex-1 text-xl text-black p-3 font-semibold">{Props.name}</div>
        </div>
        {Props.image ? (
          <div className="col-12 h-42 max-h-42 md:col-6 flex justify-end">
            <img src={Props.image} alt="" className="p-1 card object-fill col-12 h-52 sm:h-96" />
          </div>
        ) : (
          <div className="col-7 h-96"></div>
        )}
      </div>
      <div className="col-12 text-black p-3 mb-5 font-medium">{Props.description}</div>
      <div className="flex justify-end">
        <Button icon="pi pi-clone" rounded severity="success" aria-label="Bookmark" className="m-3" onClick={handleCopyUrl} />
        <Button
          icon="pi pi-info"
          rounded
          severity="success"
          aria-label="Bookmark"
          className="m-3 mr-4"
          onClick={() => {
            window.open(Props.url, '_blank');
          }}
        />
        <Button icon="pi pi-share-alt" rounded severity="success" aria-label="Bookmark" className="m-3 mr-4" onClick={share} />
      </div>
    </div>
  );
};

export default PostCards;
