import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'ImageAI',
	description: 'Acessibilidade já! Crie descrições de imagens!',
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
