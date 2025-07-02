'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/src/firebase';
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

interface FirestoreUserData {
  ad: string;
  soyad: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<FirestoreUserData | null>(null);
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const toastRef = useRef<Toast>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/register');
      } else {
        setUser(firebaseUser);

        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data() as FirestoreUserData;
          setUserData(data);
          setAd(data.ad || '');
          setSoyad(data.soyad || '');
        }

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    toastRef.current?.show({
      severity: 'success',
      summary: 'Çıkış Yapıldı',
      detail: 'Başarıyla çıkış yaptınız.',
      life: 3000,
    });
    router.push('/login');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), { ad, soyad });
      await updateProfile(user, { displayName: `${ad} ${soyad}` });

      toastRef.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Bilgiler güncellendi!',
        life: 3000,
      });

      setUserData((prev) => (prev ? { ...prev, ad, soyad } : { ad, soyad, createdAt: { seconds: 0, nanoseconds: 0 } }));
    } catch (error: any) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: error.message,
        life: 5000,
      });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    if (newPassword !== confirmPassword) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: 'Şifreler eşleşmiyor!',
        life: 3000,
      });
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toastRef.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Şifre güncellendi.',
        life: 3000,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: error.message,
        life: 5000,
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !user.email) return;

    const confirmDelete = window.confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.');
    if (!confirmDelete) return;

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);

      toastRef.current?.show({
        severity: 'success',
        summary: 'Silindi',
        detail: 'Hesabınız silindi.',
        life: 3000,
      });

      router.push('/register');
    } catch (error: any) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: error.message,
        life: 5000,
      });
    }
  };

  const formatDate = (timestamp: FirestoreUserData['createdAt']) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <p className="text-center mt-10 text-white">Yükleniyor...</p>;
  }

  return (
    <div className="flex flex-col items-center mb-10 px-2">
      <Toast ref={toastRef} position="bottom-center" />
      <h2 className="text-3xl font-extrabold text-center text-red-700 mb-2">Hesabım</h2>
      <p className="text-sm text-center text-white mb-10 max-w-2xl">
        Hesap bilgilerinizi görüntüleyebilir, güncelleyebilir ve hesabınızı kapatabilirsiniz.
      </p>

      {/* Üç kart yan yana */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6 mb-8">
        {/* 1. Hoşgeldiniz Kartı */}
        <Card className="flex-1 rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold text-gray-800">Hoş geldiniz,</p>
          <p className="text-2xl text-indigo-700 font-bold">
            {userData?.ad} {userData?.soyad}
          </p>
          <p className="text-gray-600">{user?.email}</p>
          {userData?.createdAt && <p className="text-sm text-gray-500">Kayıt Tarihi: {formatDate(userData.createdAt)}</p>}
        </Card>

        {/* 2. Bilgileri Güncelle */}
        <Card className="flex-1 rounded-2xl p-6">
          <form onSubmit={handleUpdate} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b border-gray-300 pb-2 mb-4">Bilgileri Güncelle</h3>
            <InputText id="ad" value={ad} onChange={(e) => setAd(e.target.value)} placeholder="Ad" className="w-full p-2" required />
            <InputText id="soyad" value={soyad} onChange={(e) => setSoyad(e.target.value)} placeholder="Soyad" className="w-full p-2" required />
            <Button
              label="Kaydet"
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            />
          </form>
        </Card>

        {/* 3. Şifreyi Güncelle */}
        <Card className="flex-1 rounded-2xl p-6">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b border-gray-300 pb-2 mb-4">Şifreyi Güncelle</h3>

            <InputText
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2"
              placeholder="Mevcut Şifre"
              required
            />
            <InputText
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2"
              placeholder="Yeni Şifre"
              required
            />
            <InputText
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2"
              placeholder="Yeni Şifre (Tekrar)"
              required
            />

            <Button
              label="Şifreyi Güncelle"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            />
          </form>
        </Card>
      </div>

      {/* Altta butonlar */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-4 justify-center px-6 lg:px-0">
        <Button
          label="Hesabımı Sil"
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={handleDeleteAccount}
        />
        <Button
          label="Çıkış Yap"
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
