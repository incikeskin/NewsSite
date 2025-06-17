'use client';
import React from 'react';

interface Props {
  key: string;
  title: string;
  year: string;
  poster: string;
  type: string;
}
const FilmCards = (Props: Props) => {
  return (
    <div
      className="col-12 p-3 mb-5 "
      style={{
        backgroundColor: 'rgba(250, 250, 250, 0.8)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
      }}
    >
      <div className="flex flex-column align-items-center mb-3 justify-between md:flex-row md:px-12">
        <div className="flex col-12 md:col-6 flex-column">
          <div className="flex-1 text-xl text-black p-3 font-semibold">Film İsmi: {Props.title}</div>
          <div className="flex-1 text-lg text-black p-3 font-semibold">Vizyon Tarihi: {Props.year}</div>
          <div className="flex-1 text-lg text-black p-3 font-semibold">Tür: {Props.type}</div>
        </div>
        {Props.poster ? (
          <div className="col-10 md:col-4 flex justify-end">
            <img src={Props.poster} alt="" className="p-1 card object-fill col-12 h-96 md:h-max" />
          </div>
        ) : (
          <div className="col-7 h-96"></div>
        )}
      </div>
    </div>
  );
};

export default FilmCards;
