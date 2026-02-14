import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image 
        src="/assets/fastfood.svg" 
        alt="Foodio Logo" 
        width={32} 
        height={32} 
        className="w-8 h-8"
      />
      <span className="text-2xl tracking-[-0.05em] font-brand-cormorant text-brand-green">Foodio.</span>
    </Link>
  );
}
