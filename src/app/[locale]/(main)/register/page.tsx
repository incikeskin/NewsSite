'use client';

import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/src/firebase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: 'Şifreler eşleşmiyor!',
        life: 3000,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firebase profiline ad ve soyadı ekle
      await updateProfile(user, {
        displayName: `${ad} ${soyad}`,
      });

      // Firestore'a kullanıcıyı kaydet
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        ad,
        soyad,
        email: user.email,
        createdAt: new Date(),
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Kayıt başarılı!',
        life: 3000,
      });

      // Alanları temizle
      setAd('');
      setSoyad('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');

      // Hesabım sayfasına yönlendir
      router.push('/account');
    } catch (error: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: error.message,
        life: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen lg:px-20">
      <Toast ref={toast} position="bottom-center" />
      <h2 className="text-3xl font-extrabold text-center text-red-700 mt-0 mb-2">Kayıt Ol</h2>
      <p className="text-sm text-center text-white mb-10 max-w-2xl">
        Üye olarak haberleri takip edebilir, size özel içeriklerden yararlanabilirsiniz.
      </p>

      <Card className="w-full max-w-2xl rounded-2xl">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ad" className="block text-sm font-medium text-gray-700">
                Ad
              </label>
              <InputText
                id="ad"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                className="w-full p-3 mt-1"
                placeholder="Adınızı girin"
                required
              />
            </div>

            <div>
              <label htmlFor="soyad" className="block text-sm font-medium text-gray-700">
                Soyad
              </label>
              <InputText
                id="soyad"
                value={soyad}
                onChange={(e) => setSoyad(e.target.value)}
                className="w-full p-3 mt-1"
                placeholder="Soyadınızı girin"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1"
              placeholder="ornek@mail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              className="w-full mt-1"
              placeholder="Şifrenizi girin"
              required
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
              Şifre Tekrar
            </label>
            <Password
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              feedback={false}
              className="w-full mt-1"
              placeholder="Şifrenizi tekrar girin"
              required
            />
          </div>

          <Button label="Kayıt Ol" type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700" />
        </form>
      </Card>
    </div>
  );
}
