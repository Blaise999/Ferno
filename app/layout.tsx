import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ferno Limited — Trade global markets',
  description: 'Crypto, foreign exchange and global equities under one elegant account.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink text-pearl">{children}</body>
    </html>
  );
}
