"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: {
    id: string;
    name: string;
    price: number;
  };
  onConfirm: (quantity: number) => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  menuItem,
  onConfirm,
}: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border-brand-green/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-green font-brand-manrope">
            Are you sure want to buy?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <p className="text-md text-brand-green/60 font-brand-manrope mb-4">
              Items
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-brand-green font-brand-manrope">
                {menuItem.name}
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-[12px] border-[2.5px] border-brand-green flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus strokeWidth={2.5} size={16} />
                </button>
                <div className="w-20 h-10 border-3 border-[#F5F2EA] rounded-[12px] flex items-center justify-center text-2xl font-medium text-brand-green font-brand-manrope/90">
                  {quantity}
                </div>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-[12px] border-[2.5px] border-brand-green flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-colors"
                >
                  <Plus strokeWidth={2.5} size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-full border-2 border-brand-green text-brand-green font-medium font-brand-manrope hover:bg-brand-green/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 rounded-full bg-brand-green text-white font-medium font-brand-manrope hover:bg-brand-green/90 transition-colors"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
