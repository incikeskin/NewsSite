'use client';

import React, { useEffect, useState } from 'react';
import { reduxStore, useAppSelector } from '@/src/redux';
import { getPharmacyAction } from '@/src/redux/pharmacy-store/thunks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

const cityDistrictsMap: Record<string, { name: string; code: string }[]> = {
  Ankara: [
    { name: 'Çankaya', code: 'Çankaya' },
    { name: 'Keçiören', code: 'Keçiören' },
    { name: 'Mamak', code: 'Mamak' },
  ],
  İstanbul: [
    { name: 'Kadıköy', code: 'Kadıköy' },
    { name: 'Beşiktaş', code: 'Beşiktaş' },
    { name: 'Şişli', code: 'Şişli' },
  ],
};

const cities = [
  { name: 'Ankara', code: 'Ankara' },
  { name: 'İstanbul', code: 'İstanbul' },
];

export default function PharmacyPage() {
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(cityDistrictsMap[cities[0].code][0]);
  const pharmacies = useAppSelector((state) => state.pharmacyReducer.pharmacy);

  // İl değiştiğinde ilçeleri güncelle ve seçimi ilk ilçeye ayarla
  useEffect(() => {
    const districts = cityDistrictsMap[selectedCity.code] || [];
    setSelectedDistrict(districts[0] || { name: '', code: '' });
  }, [selectedCity]);

  // İlçe değiştiğinde API çağrısı yap
  useEffect(() => {
    if (!selectedCity.code || !selectedDistrict.code) return;

    const fetchPharmacies = async () => {
      setLoading(true);
      await reduxStore.dispatch(
        getPharmacyAction({ il: selectedCity.code, ilce: selectedDistrict.code })
      );
      setLoading(false);
    };

    fetchPharmacies();
  }, [selectedDistrict, selectedCity]);

  return (
    <div className="px-6 max-w-6xl mb-1 mx-auto">
      <h1 className="text-3xl lg:text-6xl font-semibold text-surface-950
      text-center max-w-xl mt-0 mx-auto leading-tight">Nöbetçi Eczaneler</h1>
      <p className="text-lg text-surface-500 max-w-lg text-center mx-auto">İl ve İlçe Seçin!</p>


      <div className="flex justify-center gap-4 mb-6">
        <Dropdown
          value={selectedCity}
          options={cities}
          onChange={(e) => setSelectedCity(e.value)}
          optionLabel="name"
          placeholder="İl seçiniz"
          className="w-48"
          filter
          filterBy="name"
          showClear={false}
        />
        <Dropdown
          value={selectedDistrict}
          options={cityDistrictsMap[selectedCity.code]}
          onChange={(e) => setSelectedDistrict(e.value)}
          optionLabel="name"
          placeholder="İlçe seçiniz"
          className="w-48"
          filter
          filterBy="name"
          showClear={false}
          disabled={!selectedCity}
        />
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Yükleniyor...</p>
      ) : pharmacies?.length > 0 ? (
        <DataTable
          value={pharmacies}
          responsiveLayout="scroll"
          stripedRows
          paginator
          rows={10}
          className="rounded-2xl overflow-hidden shadow-md"
        >
          <Column field="name" header="Eczane Adı" sortable />
          <Column field="address" header="Adres" sortable />
          <Column field="phone" header="Telefon" sortable />
          <Column field="district" header="İlçe" sortable />
          <Column field="city" header="İl" sortable />
        </DataTable>
      ) : (
        <p className="text-center text-red-600 text-lg">Nöbetçi eczane bulunamadı.</p>
      )}
    </div>
  );
}


