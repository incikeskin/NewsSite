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
    <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-6xl font-semibold text-surface-950 text-center max-w-xl mt-0 mx-auto leading-tight">
          {selectedCity.name} Hava Durumu
        </h1>
        <p className="text-lg text-surface-500 max-w-lg text-center mx-auto mb-3">
          Aramak İstediğiniz İli Seçin!
        </p>

        <div className="flex justify-center mb-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {weather.map((item: any, index: number) => (
              <Card
                key={index}
                title={item.date}
                className="p-3 border rounded-xl bg-white shadow-md transition-all transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 h-full"
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
    </div>
  );
}

