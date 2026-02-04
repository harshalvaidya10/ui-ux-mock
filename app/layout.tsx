// HTML shell which wraps every pages of your app

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const appFont = DM_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "UI UX <Mock></Mock> App",
  description: "Generate high quality UI UX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={appFont.className}>
        {children}
      </body>
    </html>
  );
}
