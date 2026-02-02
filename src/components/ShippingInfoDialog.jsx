import React from 'react';
import { X } from 'lucide-react';

export function ShippingInfoDialog({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative max-w-md w-full mx-4 bg-[#F3E9E1] border border-[#7A4B2A]/20 rounded-xl shadow-xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Close shipping information"
                >
                    <X className="h-4 w-4 text-[#5A2D0C]" />
                </button>

                <div className="p-6 pt-8 text-center">
                    <h2 className="font-heading text-[#5A2D0C] text-2xl mb-3">
                        Shipping Information
                    </h2>
                    <p className="text-[#7A4B2A] mb-4">
                        We currently deliver across the West Bank. Shipping typically takes between
                        <span className="font-semibold"> 1 and 3 working days</span>, depending on your exact location.
                    </p>
                    <p className="text-[#7A4B2A] mb-6">
                        After you place your order, our delivery partner will contact you directly to confirm the
                        address and arrange the most convenient delivery time.
                    </p>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white font-medium transition-colors"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}

