"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  locale: string;
}

export default function ContactFormClient({ locale }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 text-sm space-y-4">
        <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
        <p className="text-slate-700">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">
                {tForm("name")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block mb-1">
                {tForm("phone")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">{tForm("email")}</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label className="block mb-1">
              {tForm("message")}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              className="w-full border rounded-lg px-3 py-2 text-xs"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark"
          >
            {tForm("submit")}
          </button>

          {submitted && (
            <p className="text-emerald-600 mt-2">{tForm("success")}</p>
          )}
        </form>
      </div>

      <aside className="space-y-4 text-xs text-slate-700">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold mb-1">{t("officeTitle")}</h2>
          <p>{t("officeAddress")}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 space-y-2">
          <div>
            <div className="font-semibold mb-1">{t("phoneLabel")}</div>
            <p>+60 12-345 6789</p>
          </div>

          <div>
            <div className="font-semibold mb-1">{t("whatsappTitle")}</div>
            <p className="mb-2">{t("whatsappDesc")}</p>
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-50"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </section>
  );
}
