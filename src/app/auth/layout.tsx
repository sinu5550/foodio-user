"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRegister = pathname === "/auth/register";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full pointer-events-none pt-10">
        <div className="max-w-7xl mx-auto px-10">
          <Logo className="pointer-events-auto" />
        </div>
      </header>

      <main className="grow flex flex-col mx-auto  justify-center p-6">
        <div className="w-[448px] bg-[#FBFAF8] rounded-[12px] p-6 border border-[#E6E2D8] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/assets/fastfood.svg"
                alt="Foodio Logo"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="text-2xl tracking-[-0.05em] font-brand-cormorant text-brand-green">
                Foodio.
              </span>
            </div>
            <p className="text-sm text-brand-green/50 font-brand-manrope">
              Premium flavors, delivered.
            </p>
          </div>

          {/* Toggle Pill */}
          <div className="bg-[#F3F1ED] p-1 rounded-full flex items-center mb-4 font-brand-manrope w-full">
            <Link
              href="/auth/signin"
              className={`flex-1 py-1 text-center rounded-full text-sm font-medium transition-all ${
                !isRegister
                  ? "bg-white text-brand-green shadow-sm"
                  : "text-brand-green/40 hover:text-brand-green"
              }`}
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className={`flex-1 py-1 text-center rounded-full text-sm font-medium transition-all ${
                isRegister
                  ? "bg-white text-brand-green shadow-sm"
                  : "text-brand-green/40 hover:text-brand-green"
              }`}
            >
              Register
            </Link>
          </div>

          <div className="w-full max-w-[398px]">{children}</div>
        </div>
        <div className="text-sm text-brand-green/40 font-brand-manrope flex items-center gap-2 mt-2 mb-10 ">
          <div className="w-4 h-4 rounded-full border border-brand-green/40 flex items-center justify-center text-[10px]">
            i
          </div>
          For accessing Admin Panel press Ctrl +A from your keyboard.
        </div>
      </main>

      <Footer />
    </div>
  );
}
