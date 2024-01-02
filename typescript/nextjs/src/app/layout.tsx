import Header from '@/components/navigation/header';
import { AppNotifications } from '@/components/ui/toast/toast';
import { cn } from '@/lib/utils';
import '@/styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Neurelo JS|TS SDK Example',
  description: 'Nextjs app built with Neurelo & PostgreSql using Typescript SDK',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full">
      <body className={cn(inter.className, 'flex flex-col h-full')}>
        {/* Header Component */}
        <Header />

        {/* Notification */}
        <AppNotifications />

        {/* Main Content */}
        <main className="flex-1 h-full">{children}</main>
      </body>
    </html>
  );
}
