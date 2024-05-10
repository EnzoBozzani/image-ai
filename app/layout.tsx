import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { AlertDialog } from '@/components/AlertDialog';

import './globals.css';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'ImageAI',
	description: 'Adicione acessibilidade em suas imagens! Crie descrições para deficientes visuais!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			suppressHydrationWarning
			lang='en'
		>
			<body className={cn(montserrat.className, 'white-bg')}>
				{children}
				<Toaster />
				<AlertDialog />
			</body>
		</html>
	);
}
