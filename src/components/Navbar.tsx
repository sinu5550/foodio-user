"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Food Menu", href: "/menu" },
  { name: "My Orders", href: "/orders" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between py-6 px-10 max-w-7xl left-1/2 -translate-x-1/2 bg-transparent">
      <div className="flex items-center  gap-2">
        <Image 
          src="/assets/fastfood.svg" 
          alt="Foodio Logo" 
          width={32} 
          height={32} 
          className="w-8 h-8"
        />
        <span className="text-2xl  tracking-[-0.05em] font-brand-cormorant">Foodio.</span>
      </div>

      <div className="flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 transition-all text-sm font-medium ${
                isActive
                  ? "border border-brand-green border-opacity-30 rounded-full bg-brand-cream"
                  : "text-brand-green/70 hover:text-brand-green"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <button className="flex items-center gap-2 bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-green/90 transition-colors">
        Sign in
        <ArrowRight size={16} />
      </button>
    </nav>
  );
}
