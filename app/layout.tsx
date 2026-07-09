import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MedDetalis — Hospital & Medicine Directory for India',
  description: 'Find real hospitals across India, search medicines with FDA data, book appointments. Jamshedpur, Jharkhand focused.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
