import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engin'in AMK",
  description: "Engin'e söv, rahatla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <link href="/dist/styles.css" rel="stylesheet"></link>
    </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
