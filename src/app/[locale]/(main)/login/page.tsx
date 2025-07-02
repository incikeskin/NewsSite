'use client';
import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef<Toast>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Giriş başarılı!',
        life: 3000,
      });
      setEmail('');
      setPassword('');
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
    <div className="flex flex-col items-center px-4 lg:px-20 mb-16">
      <Toast ref={toast} position="bottom-center" />
      <h2 className="text-3xl font-extrabold text-center text-red-700 mb-2">Giriş Yap</h2>
      <p className="text-sm text-center text-white mb-10 max-w-2xl">Lütfen giriş bilgilerinizi girin.</p>

      <Card className="w-full max-w-2xl rounded-2xl">
        <form className="space-y-6" onSubmit={handleLogin}>
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

          <Button label="Giriş Yap" type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700" />
        </form>
      </Card>
    </div>
  );
}
