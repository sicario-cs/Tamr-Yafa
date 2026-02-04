import React, { useState } from 'react';
import { MapPin, Phone, Send } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';


const SHOP_WHATSAPP_NUMBER = '970597622752';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const buildWhatsAppContactMessage = () => {
    const lines = [
      '💬 *New Contact Message - Tamr Yafa*',
      '',
      '👤 *Customer:*',
      `Name: ${formData.name}`,
      formData.phone ? `Phone: ${formData.phone}` : null,
      '',
      '📝 *Subject:*',
      formData.subject,
      '',
      '✉️ *Message:*',
      formData.message,
    ];
    return lines.filter(Boolean).join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = buildWhatsAppContactMessage();
    const whatsappUrl = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header />

      {/* Header */}
      <div className="bg-[#5A2D0C] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-[#F3E9E1] text-5xl mb-4">Contact</h1>
          <p className="text-[#F3E9E1]/80 text-lg max-w-2xl mx-auto">
            Questions about an order, gift boxes, or delivery? Send us a message and we’ll reply as soon as possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-14 h-14 bg-[#B8860B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-[#B8860B]" />
            </div>
            <h3 className="font-heading text-[#5A2D0C] mb-2">Location</h3>
            <p className="text-[#7A4B2A]/70 text-sm">
              West Bank<br />
              Ramallah, Al Bireh
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-14 h-14 bg-[#7FB069]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-[#7FB069]" />
            </div>
            <h3 className="font-heading text-[#5A2D0C] mb-2">Phone</h3>
            <p className="text-[#7A4B2A]/70 text-sm">
              (+970) ##########
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="font-heading text-[#5A2D0C] text-3xl mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#7FB069] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-[#5A2D0C] text-2xl mb-2">Message Sent!</h3>
                <p className="text-[#7A4B2A]">Thank you. We’ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#5A2D0C] text-sm mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[#5A2D0C] text-sm mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+970"
                    className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[#5A2D0C] text-sm mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#5A2D0C] text-sm mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* Quick Notes */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8">
              <h3 className="font-heading text-[#5A2D0C] text-2xl mb-3">Order help</h3>
              <p className="text-[#7A4B2A]/70">
                For faster support, include your phone number and the items you want (and any gift wrapping notes).
              </p>
            </div>

            <div className="bg-linear-to-r from-[#5A2D0C] to-[#7A4B2A] rounded-lg p-8 text-center">
              <h3 className="font-heading text-[#F3E9E1] text-2xl mb-2">Instagram</h3>
              <p className="text-[#F3E9E1]/80 mb-4">@tamr.yafa.online</p>
              <a
                href="https://www.instagram.com/tamr.yafa.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#B8860B] hover:bg-[#B8860B]/90 text-white rounded-lg transition-colors font-medium"
              >
                Visit Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
