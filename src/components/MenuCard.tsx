"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";
import OrderModal from "./OrderModal";
import { toast } from "sonner";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function MenuCard({
  id,
  name,
  description,
  price,
  image,
}: MenuCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderConfirm = async (quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        toast.error("Please login to place an order");
        window.location.href = "/auth/signin";
        return;
      }

      const user = JSON.parse(userStr);
      const totalAmount = price * quantity;

      const orderData = {
        customerName: user.name,
        customerAddress: user.address || "TBD",
        totalAmount: totalAmount,
        items: [
          {
            menuItemId: id,
            quantity: quantity,
            price: price,
          },
        ],
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order created:", data);

      toast.success(
        <span>
          <strong>{name}</strong> Ordered Successfully!
        </span>,
      );

      setTimeout(() => {
        window.location.href = "/orders";
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <div className="relative pt-12 group font-manrope">
        <div className="bg-brand-cream rounded-[32px] p-8 flex flex-col h-full relative">
          <div className="mt-30">
            <h3 className="text-[19px] font-bold text-brand-green  mb-2 leading-tight">
              {name}
            </h3>
            <p className="text-sm text-brand-green/60 font-brand-manrope leading-relaxed mb-6 line-clamp-2">
              {description}
            </p>
            <div className="text-[24px] font-bold text-brand-green font-brand-manrope">
              ${price.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="absolute -top-2 -left-10 w-[200px] h-[200px] drop-shadow-[8px_8px_8px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110 z-20 pointer-events-none">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute -bottom-5 right-0 bg-brand-green text-white pl-8 pr-6 py-4 rounded-tl-[28px] rounded-br-[28px] rounded-bl-[28px] flex items-center gap-2 group/btn hover:bg-brand-green/95 transition-all z-20 shadow-[-8px_-8px_20px_rgba(0,0,0,0.05)]"
        >
          <span className="text-sm font-semibold font-brand-manrope">
            Order Now
          </span>
          <Plus
            size={18}
            className="transition-transform group-hover/btn:rotate-90"
          />
        </button>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuItem={{ id, name, price }}
        onConfirm={handleOrderConfirm}
      />
    </>
  );
}
