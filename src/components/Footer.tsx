import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-green/10 bg-white py-6">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-[-0.05em] font-brand-cormorant">Foodio.</span>
          <span className="text-sm text-brand-green/60 font-brand-manrope mt-1">
            © 2025 Foodio Inc.
          </span>
        </div>

        <div className="flex items-center gap-8 text-sm text-brand-green/60 font-brand-manrope">
          <Link href="/privacy" className="hover:text-brand-green transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-brand-green transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-brand-green transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
