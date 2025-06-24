'use client';

import React, { useEffect, useState } from 'react';
import { reduxStore, useAppSelector } from '@/src/redux';
import { getMoviesAction } from '@/src/redux/movies-store/thunks';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ScrollPanel } from 'primereact/scrollpanel';

export default function MoviesPage() {
  const [loading, setLoading] = useState(true);
  const movies = useAppSelector((state) => state.moviesReducer.movies); // reducer adı dikkat!
  console.log('Redux movies:', movies);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const result = await reduxStore.dispatch(getMoviesAction());
      console.log('API response:', result);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🎥 Vizyondaki Filmler</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ProgressSpinner />
        </div>
      ) : movies?.length > 0 ? (
        <ScrollPanel style={{ height: '75vh' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie: any, i: number) => (
              <Card
                key={i}
                title={movie.name}
                subTitle={movie.type}
                className="shadow-lg border border-gray-200 rounded-lg"
              >
                <img
                  src={movie.image.replace('.../', 'https://www.sinemalar.com/')}
                  alt={movie.name}
                  className="w-full h-64 object-cover rounded mb-3"
                />
                <p className="text-sm text-gray-700">
                  {movie.summary?.slice(0, 200)}...
                </p>
                <p className="text-xs text-gray-500 mt-2">Yönetmen: {movie.director}</p>
              </Card>
            ))}
          </div>
        </ScrollPanel>
      ) : (
        <p className="text-center text-red-600 text-lg">Film bulunamadı.</p>
      )}
    </div>
  );
}

