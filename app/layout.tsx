import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { Montserrat } from 'next/font/google';
import { Viewer } from '@/components/Viewer';

export const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'PDF Translator',
	description: 'Traduza seus PDFs com o poder da IA!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn(montserrat.className, 'white-bg')}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
