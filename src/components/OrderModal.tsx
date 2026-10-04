import React, { useState } from 'react';
import { VinylRelease } from '../data/releases';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  release: VinylRelease;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, release }) => {
  const [quantity, setQuantity] = useState(1);
  const [shippingRegion, setShippingRegion] = useState('EUROPE (EU)');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const unitPrice = 32; // €32 EUR
  const total = unitPrice * quantity;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0C0E]/70 backdrop-blur-[8px]">
      <div 
        className="w-full max-w-lg bg-[#FFFFFF] border border-[rgba(10,12,14,0.18)] p-6 sm:p-8 space-y-6 text-[#0A0C0E] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(10,12,14,0.1)]">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#E8913C] font-semibold">
              {release.code}
            </span>
            <h3 className="font-display font-bold text-lg text-[#0A0C0E] mt-0.5">
              {release.artist} — {release.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-[#4A525A] hover:text-[#0A0C0E] px-2 py-1 border border-[rgba(10,12,14,0.15)]"
          >
            [CLOSE]
          </button>
        </div>

        {!isOrdered ? (
          <form onSubmit={handleConfirm} className="space-y-5 text-xs font-sans">
            <div className="flex gap-4 items-center">
              <img
                src={release.image}
                alt={release.title}
                className="w-20 h-20 object-cover border border-[rgba(10,12,14,0.15)] grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 text-[#4A525A] text-[11px]">
                <p className="text-[#0A0C0E] font-semibold">{release.format}</p>
                <p>{release.speed} · {release.duration}</p>
                <p className="font-mono text-[#E8913C] font-semibold">{release.edition}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                  Copies
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#FFFFFF] border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                >
                  <option value={1}>1 copy (€32)</option>
                  <option value={2}>2 copies (€64)</option>
                  <option value={3}>3 copies (Max limit)</option>
                </select>
              </div>

              <div>
                <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                  Dispatch Territory
                </label>
                <select
                  value={shippingRegion}
                  onChange={(e) => setShippingRegion(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                >
                  <option value="GERMANY">GERMANY (Tracked)</option>
                  <option value="EUROPE (EU)">EUROPE (DHL Express)</option>
                  <option value="UK & IRELAND">UNITED KINGDOM (Royal Mail)</option>
                  <option value="JAPAN & ASIA">JAPAN / ASIA</option>
                  <option value="NORTH AMERICA">NORTH AMERICA</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-[#F5F6F8] border border-[rgba(10,12,14,0.1)] space-y-1 text-[11px] font-mono text-[#4A525A]">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span className="text-[#0A0C0E] font-semibold">€{total}.00 EUR</span>
              </div>
              <div className="flex justify-between">
                <span>PACKAGING:</span>
                <span>Custom heavy mailer included</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[rgba(10,12,14,0.1)] text-[#0A0C0E] font-bold">
                <span>TOTAL:</span>
                <span className="text-[#E8913C]">€{total}.00 EUR</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10.5px] text-[#78828A] font-mono">
                DISPATCH TIME: 24-48 HOURS
              </span>
              <button
                type="submit"
                className="rounded-full border border-[#0A0C0E] px-6 py-2.5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-colors"
              >
                Confirm Dispatch
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-3 font-sans">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#E8913C]">
              [DISPATCH CONFIRMED]
            </p>
            <h4 className="font-display font-bold text-xl text-[#0A0C0E]">
              {release.code} Reserved for Pressing
            </h4>
            <p className="text-xs text-[#4A525A] max-w-xs mx-auto">
              Your copy of {release.artist} — {release.title} has been recorded in the lathe schedule.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
