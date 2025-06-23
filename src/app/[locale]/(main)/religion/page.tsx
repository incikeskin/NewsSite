'use client';

import React, { useEffect, useState } from 'react';
import { reduxStore, useAppSelector } from '@/src/redux';
import { getReligionAction } from '@/src/redux/religion-store/thunks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

const cities = [
  { name: 'İstanbul', code: 'istanbul' },
  { name: 'Ankara', code: 'ankara' },
];

export default function ReligionPage() {
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const prayers = useAppSelector((state) => state.religionReducer.religion);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await reduxStore.dispatch(getReligionAction({ city: selectedCity.code }));
      setLoading(false);
    };

    fetchData();
  }, [selectedCity]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{selectedCity.name} Namaz Vakitleri</h1>

      <div className="mb-6 flex justify-center">
        <Dropdown
          value={selectedCity}
          options={cities}
          onChange={(e) => setSelectedCity(e.value)}
          optionLabel="name"
          placeholder="Şehir seçiniz"
          className="w-48"
          filter
          filterBy="name"
          showClear={false}
        />
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Yükleniyor...</p>
      ) : prayers?.length > 0 ? (
        <DataTable value={prayers} responsiveLayout="scroll" stripedRows paginator rows={6}>
          <Column field="vakit" header="Vakit" sortable></Column>
          <Column field="saat" header="Saat" sortable></Column>
        </DataTable>
      ) : (
        <p className="text-center text-red-600 text-lg">Veri bulunamadı.</p>
      )}
    </div>
  );
}


