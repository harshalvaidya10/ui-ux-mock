// HTML shell which wraps every pages of your app

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"
import Provider from "@/app/provider";
const appFont = DM_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "UI UX Mock App",
  description: "Generate high quality UI UX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={appFont.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
    
  );
}
