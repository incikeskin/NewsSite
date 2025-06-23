'use client';

import React, { useEffect, useState } from 'react';
import { reduxStore, useAppSelector } from '@/src/redux';
import { getWeatherAction } from '@/src/redux/weather-store/thunks';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';

export default function WeatherPage() {
  const [loading, setLoading] = useState(true);
  const weather = useAppSelector((state) => state.weatherReducer.weather);

  const cities = [
    { name: 'Ankara', code: 'ankara' },
    { name: 'İstanbul', code: 'istanbul' },
  ];
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      await reduxStore.dispatch(getWeatherAction({ city: selectedCity.code }));
      setLoading(false);
    };
    fetchWeather();
  }, [selectedCity]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {selectedCity.name} Hava Durumu
      </h1>

      <div className="flex justify-center mb-6">
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Şehir Seç"
          className="w-64"
        />
      </div>

      {loading && <p className="text-center">Yükleniyor...</p>}

      {!loading && weather?.length > 0 ? (
        <div  className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {weather.map((item: any, index: number) => (
            <Card
              key={index}
              title={item.date}
              className="p-4 border rounded-xl bg-white shadow-md transition-all transform hover:scale-105 hover:shadow-xl hover:bg-blue-50"
            >
              <div className="flex flex-col gap-2">
                <Tag value={item.description} severity="info" className="w-fit" />
                <p><strong>Sıcaklık:</strong> {item.degree} °C</p>
                <p><strong>Nem:</strong> {item.humidity} %</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center">Veri bulunamadı.</p>
      )}
    </div>
  );
}



