import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Hero from '../components/Hero';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LaptopStore - Find Your Perfect Laptop',
  description: 'Discover a wide range of laptops for every need. From powerful gaming machines to sleek ultrabooks, we have got you covered.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Hero />
        {children}
      </body>
    </html>
  );
}