import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "sonner";

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
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "white",
              color: "#1A3C34",
              border: "1px solid rgba(26, 60, 52, 0.1)",
              borderRadius: "16px",
            },
            className: "font-brand-manrope",
          }}
        />
      </body>
    </html>
  );
}
