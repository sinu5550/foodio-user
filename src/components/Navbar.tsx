"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, User, LogOut } from "lucide-react";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Food Menu", href: "/menu" },
  { name: "My Orders", href: "/orders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Checking if user is logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      setUserName(userData.name || "User");
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="absolute top-0 w-full z-50 flex items-center justify-between py-6 px-10 max-w-7xl left-1/2 -translate-x-1/2 bg-transparent">
      <Logo />

      <div className="flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 transition-all text-sm font-medium font-brand-manrope ${
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

      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-green text-white hover:bg-brand-green/90 transition-colors focus:outline-none cursor-pointer">
              <User size={22} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border border-brand-green/10 shadow-lg"
          >
            <DropdownMenuLabel className="text-brand-green font-brand-manrope">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-brand-green/10" />
            <DropdownMenuItem asChild>
              <Link
                href="/orders"
                className="flex items-center gap-2 cursor-pointer text-brand-green font-brand-manrope hover:bg-brand-cream"
              >
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-brand-green/10" />
            <DropdownMenuItem
              onClick={handleSignOut}
              variant="destructive"
              className="flex items-center gap-2 cursor-pointer text-[#D64045]! font-brand-manrope hover:bg-brand-cream!"
            >
              <LogOut size={16} />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/auth/signin"
          className="flex items-center gap-2 bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-medium font-brand-manrope hover:bg-brand-green/90 transition-colors"
        >
          Sign in
          <ArrowRight size={16} />
        </Link>
      )}
    </nav>
  );
}
