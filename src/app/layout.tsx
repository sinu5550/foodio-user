import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

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
    <html lang="en">
      <body
        className="antialiased font-brand-manrope text-brand-green bg-white"
        suppressHydrationWarning
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
