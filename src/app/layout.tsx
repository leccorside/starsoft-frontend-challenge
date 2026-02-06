import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Providers from '@/providers/Providers';
import { Cart } from '@/components/Cart';
import '@/styles/globals.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Starsoft NFT Marketplace | Colecione os melhores NFTs',
  description:
    'Descubra e colecione NFTs exclusivos no marketplace da Starsoft. Itens raros, armas lendárias e muito mais para sua coleção digital.',
  keywords: ['NFT', 'Marketplace', 'Crypto', 'Starsoft', 'Colecionáveis'],
  openGraph: {
    title: 'Starsoft NFT Marketplace',
    description: 'Descubra e colecione NFTs exclusivos no marketplace da Starsoft.',
    type: 'website',
    locale: 'pt_BR',
    // url: 'https://seusite.com', // Adicionar URL real
    siteName: 'Starsoft NFT Marketplace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starsoft NFT Marketplace',
    description: 'Descubra e colecione NFTs exclusivos.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#191A20" />
      </head>
      <body className={poppins.variable}>
        <Providers>
          {children}
          <Cart />
        </Providers>
      </body>
    </html>
  );
}
