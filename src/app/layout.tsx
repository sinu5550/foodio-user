import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foodio - Restaurant Ordering System",
  description: "Where Great Food Meets Great Taste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-brand-manrope text-brand-green bg-white">
        {children}
      </body>
    </html>
  );
}
