'use client';
import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { reduxStore, setToastMessage, toastMessageSelector, useAppSelector } from '@/src/redux';

export default function ToastMessage() {
  const toastMessage = useAppSelector(toastMessageSelector)?.toastMessage;
  const toast: any = useRef(null);

  useEffect(() => {
    if (toastMessage.show) {
      toast.current.show({
        severity: toastMessage.severity,
        summary: toastMessage.summary,
        detail: toastMessage.detail,
        life: 3000,
      });
      reduxStore.dispatch(setToastMessage({ show: false, severity: 'success', summary: 'Başarılı', detail: '' }));
    }
  }, [toastMessage]);

  return <Toast ref={toast} />;
}
