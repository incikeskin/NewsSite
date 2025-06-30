"use client";

import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useRef<Toast>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.current?.show({
      severity: "success",
      summary: "Başarılı",
      detail: "Mesajınız başarıyla iletilmiştir!",
      life: 3000,
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 lg:px-20 ">
      <Toast ref={toast} />
      <h2 className="text-3xl font-extrabold text-center text-red-700 mb-2">
        Bize Ulaşın
      </h2>
      <p className="text-sm text-center text-white mb-10 max-w-2xl">
        Sorularınız, önerileriniz veya geri bildirimleriniz için aşağıdaki formu doldurabilirsiniz.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mb-5">
        {/* Form Alanı */}
        <Card className="flex-1 rounded-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Adınız Soyadınız
              </label>
              <InputText
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-1"
                placeholder="Adınız ve soyadınız"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta Adresiniz
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1"
                placeholder="ornek@mail.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Bize İletmek İstedikleriniz
              </label>
              <InputTextarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 mt-1 resize-none"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            <div>
              <Button
                label="Gönder"
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              />
            </div>
          </form>
        </Card>

        {/* İletişim Bilgileri Alanı */}
        <Card className="flex-1 rounded-2xl">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">İletişim Bilgileri</h3>
            <p><strong>Adres:</strong><br /> İstanbul, Türkiye</p>
            <p><strong>Telefon:</strong><br /> +90 555 123 45 67</p>
            <p><strong>E-posta:</strong><br /> info@example.com</p>

            <Divider />

            <h4 className="text-lg font-medium text-gray-700">Sosyal Medya</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:underline pi pi-instagram mr-2"> Instagram</a></li>
              <li><a href="#" className="text-blue-600 hover:underline pi pi-linkedin"> LinkedIn</a></li>
              <li><a href="#" className="text-blue-600 hover:underline pi pi-twitter"> Twitter</a></li>
              <li><a href="#" className="text-blue-600 hover:underline pi pi-facebook"> Facebook</a></li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
