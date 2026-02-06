import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/providers/Providers";
import { Cart } from "@/components/Cart";
import "@/styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starsoft NFT Marketplace",
  description: "Marketplace de NFTs exclusivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable}>
        <Providers>
          {children}
          <Cart />
        </Providers>
      </body>
    </html>
  );
}
