import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';
import '@/styles/globals.css';
import { cn } from '@/utils/style';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Providers>
          <div
            className={cn(
              'flex h-screen w-screen text-sm lg:text-base',
              inter.className,
            )}
          >
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <div className="flex flex-1 flex-col overflow-y-auto">
                <main className="flex flex-1 flex-col">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
