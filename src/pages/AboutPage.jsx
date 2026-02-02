import React from 'react';
import { Leaf, Users, Award, Heart } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import homePageImage from '../assets/HomePageImage.png';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header />

      {/* Hero */}
      <div className="relative h-[480px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={homePageImage}
            alt="Tamr Yafa chocolates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#5A2D0C]/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-heading text-[#F3E9E1] text-5xl md:text-6xl mb-4">
            Our Story
          </h1>
          <p className="text-[#F3E9E1]/90 text-lg md:text-xl max-w-2xl">
            Tamr Yafa is a small-batch chocolate kitchen inspired by local flavors and crafted with care.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Story */}
          <div className="bg-white rounded-lg p-8 md:p-12 mb-12">
            <h2 className="font-heading text-[#5A2D0C] text-4xl mb-6">
              Crafted with Love, Rooted in Tradition
            </h2>
            <div className="space-y-4 text-[#7A4B2A]">
              <p>
                Tamr Yafa started with a simple idea: make chocolate that feels personal—beautiful, generous,
                and unforgettable. We blend premium chocolate with flavors we grew up with, like dates and
                pistachio, then finish each piece by hand.
              </p>
              <p>
                We focus on quality ingredients, careful tempering, and small-batch production so every box
                tastes fresh and looks like a gift.
              </p>
              <p>
                From our kitchen in the Ramallah area, we prepare chocolates for everyday moments and special
                occasions—because the best gifts are the ones made with intention.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-[#7FB069]/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-[#7FB069]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">Fresh Ingredients</h3>
              <p className="text-[#7A4B2A]/70">
                We choose ingredients that taste clean and rich—so every bite feels premium.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#B8860B]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">Quality First</h3>
              <p className="text-[#7A4B2A]/70">
                Small batches, careful tempering, and consistent finishing—every time.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-[#7A4B2A]/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#7A4B2A]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">Made for Sharing</h3>
              <p className="text-[#7A4B2A]/70">
                Our boxes are designed to be opened together—at home, at work, and at celebrations.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-[#5A2D0C]/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#5A2D0C]" />
              </div>
              <h3 className="font-heading text-[#5A2D0C] text-xl mb-2">Handcrafted</h3>
              <p className="text-[#7A4B2A]/70">
                Every piece is finished by hand—because details are what make it special.
              </p>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg p-8 md:p-12 max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-[#5A2D0C] text-4xl mb-8 text-center">
            Our Process
          </h2>
          <div className="space-y-8">
            {[
              {
                title: 'Select',
                text: 'We choose premium chocolate and complementary ingredients for balanced flavor.',
              },
              {
                title: 'Craft',
                text: 'We temper, mold, fill, and finish each batch with careful timing and technique.',
              },
              {
                title: 'Decorate',
                text: 'Every piece is decorated to look as good as it tastes—gift-ready by default.',
              },
              {
                title: 'Pack',
                text: 'We pack in sturdy, elegant boxes to arrive safely and beautifully.',
              },
            ].map((step, idx) => (
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
          <h2 className="font-heading text-[#F3E9E1] text-4xl mb-4">Tamr Yafa</h2>
          <p className="text-[#F3E9E1]/90">
            Handmade chocolates and gift boxes inspired by local taste—crafted to share.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
