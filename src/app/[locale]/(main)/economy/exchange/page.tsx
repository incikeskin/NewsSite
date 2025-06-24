'use client';

import React, { useState } from 'react';
import { reduxStore, useAppSelector } from '@/src/redux';
import { getExchangeAction } from '@/src/redux/exchange-store/thunks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const currencies = [
  { name: 'USD', code: 'USD' },
  { name: 'EUR', code: 'EUR' },
  { name: 'TRY', code: 'TRY' },
  { name: 'GBP', code: 'GBP' },
];

export default function ExchangePage() {
  const [base, setBase] = useState(currencies[0]);
  const [to, setTo] = useState(currencies[1]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const exchangeRates = useAppSelector((state) => state.exchangeReducer.exchange);

  const fetchRates = async () => {
    setLoading(true);
    await reduxStore.dispatch(
      getExchangeAction({
        base: base.code,
        to: to.code,
        int: amount ? Number(amount) : undefined,
      })
    );
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Döviz Çevirici</h1>

      <div className="flex justify-center gap-4 mb-6">
        <Dropdown
          value={base}
          options={currencies}
          onChange={(e) => setBase(e.value)}
          optionLabel="name"
          placeholder="Base currency"
          className="w-36"
        />
        <Dropdown
          value={to}
          options={currencies}
          onChange={(e) => setTo(e.value)}
          optionLabel="name"
          placeholder="To currency"
          className="w-36"
        />
        <InputText
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Miktar (opsiyonel)"
          className="w-36"
        />
        <Button label="Çevir" onClick={fetchRates} loading={loading} />
      </div>

      {exchangeRates?.length > 0 ? (
        <DataTable value={exchangeRates} stripedRows responsiveLayout="scroll">
          <Column field="code" header="Döviz" />
          <Column field="name" header="İsim" />
          <Column field="rate" header="Kur Oranı" />
          <Column field="calculatedstr" header="Çevrilen Tutar" />
        </DataTable>
      ) : (
        !loading && <p className="text-center text-gray-600">Henüz veri yok.</p>
      )}
    </div>
  );
}


