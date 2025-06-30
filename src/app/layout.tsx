import "~/styles/globals.css";

import { Work_Sans, Space_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";

export const metadata = {
  title: "Nft marketPlace",
  description: "Marketplace for NFT",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: "400",
  style: "normal",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${workSans.variable} ${spaceMono.variable}`}>
      <body>
        <TRPCReactProvider>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
          <Toaster/>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
