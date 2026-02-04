import React from 'react';
import { Leaf, Users, Award, Heart } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import chocolateTamrImage from '../assets/ProductsImage/chocolateTamr.jpeg';
import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();

  const processSteps = [
    {
      title: t('about.processSteps.selectTitle'),
      text: t('about.processSteps.selectBody'),
    },
    {
      title: t('about.processSteps.craftTitle'),
      text: t('about.processSteps.craftBody'),
    },
    {
      title: t('about.processSteps.decorateTitle'),
      text: t('about.processSteps.decorateBody'),
    },
    {
      title: t('about.processSteps.packTitle'),
      text: t('about.processSteps.packBody'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header />

      {/* Hero */}
      <div className="relative h-[480px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={chocolateTamrImage}
            alt="Tamr Yafa chocolates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#5A2D0C]/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-heading text-[#F3E9E1] text-5xl md:text-6xl mb-4">
            {t('about.heroTitle')}
          </h1>
          <p className="text-[#F3E9E1]/90 text-lg md:text-xl max-w-2xl">
            {t('about.heroBody')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Story */}
          <div className="bg-white rounded-lg p-8 md:p-12 mb-12">
            <h2 className="font-heading text-[#5A2D0C] text-4xl mb-6">
              {t('about.craftedTitle')}
            </h2>
            <div className="space-y-4 text-[#7A4B2A]">
              <p>{t('about.craftedBody1')}</p>
              <p>{t('about.craftedBody2')}</p>
              <p>{t('about.craftedBody3')}</p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-[#7FB069]/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-[#7FB069]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">
                {t('about.values.freshTitle')}
              </h3>
              <p className="text-[#7A4B2A]/70">
                {t('about.values.freshBody')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#B8860B]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">
                {t('about.values.qualityTitle')}
              </h3>
              <p className="text-[#7A4B2A]/70">
                {t('about.values.qualityBody')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="W-12 h-12 bg-[#7A4B2A]/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#7A4B2A]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">
                {t('about.values.sharingTitle')}
              </h3>
              <p className="text-[#7A4B2A]/70">
                {t('about.values.sharingBody')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-[#5A2D0C]/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#5A2D0C]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">
                {t('about.values.handcraftedTitle')}
              </h3>
              <p className="text-[#7A4B2A]/70">
                {t('about.values.handcraftedBody')}
              </p>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg p-8 md:p-12 max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-[#5A2D0C] text-4xl mb-8 text-center">
            {t('about.processTitle')}
          </h2>
          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <div key={step.title} className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-[#B8860B] text-white rounded-full flex items-center justify-center">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">{step.title}</h3>
                  <p className="text-[#7A4B2A]/70">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-linear-to-r from-[#5A2D0C] to-[#7A4B2A] rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-[#F3E9E1] text-4xl mb-4">
            {t('about.footerTitle')}
          </h2>
          <p className="text-[#F3E9E1]/90">
            {t('about.footerBody')}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
