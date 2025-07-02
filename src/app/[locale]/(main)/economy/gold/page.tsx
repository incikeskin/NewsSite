'use client';

import React, { useEffect, useState } from 'react';
import { reduxStore, useAppSelector } from '@/src/redux';
import { getGoldAction } from '@/src/redux/gold-store/thunks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function GoldPage() {
  const [loading, setLoading] = useState(false);
  const goldData = useAppSelector((state) => state.goldReducer.gold);

  const fetchGoldData = async () => {
    setLoading(true);
    await reduxStore.dispatch(getGoldAction());
    setLoading(false);
  };

  useEffect(() => {
    fetchGoldData();
  }, []);

  return (
    <div className="p-2 max-w-4xl mx-auto mb-10 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-center text-red-700 mb-2">Altın Fiyatları</h2>
      <p className="text-sm text-center text-white mb-10 max-w-2xl">Güncel altın fiyatlarına buradan ulaşabilirsiniz.</p>

      <div className="flex justify-center mb-4">
        <Button label="Yenile" onClick={fetchGoldData} loading={loading} />
      </div>

      {goldData?.length > 0 ? (
        <DataTable
          value={goldData}
          stripedRows
          responsiveLayout="scroll"
          className=" max-w-7xl rounded-lg shadow-lg border border-gray-300 overflow-hidden w-full"
        >
          <Column field="name" header="Altın Türü" />
          <Column header="Alış (TL)" body={(rowData) => (rowData.buying !== undefined && rowData.buying !== '-' ? rowData.buying : 'Yok')} />
          <Column header="Satış (TL)" body={(rowData) => (rowData.selling !== undefined && rowData.selling !== '-' ? rowData.selling : 'Yok')} />
        </DataTable>
      ) : (
        !loading && <p className="text-center text-gray-600">Henüz veri yok.</p>
      )}
    </div>
  );
}
