'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

export const AlertDialog = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<Dialog
			open={isOpen}
			defaultOpen
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Olá, bem vindo ao ImageAI!</DialogTitle>
					<DialogDescription>
						O ImageAI é construído com base no Gemini, modelo de IA do Google. Portanto, como qualquer
						modelo de inteligência artificial, pode apresentar falhas e dados incorretos. Por isso, sempre
						verifique as informações e certifique-se de não enviar nenhum conteúdo sensível e/ou agressivo!
					</DialogDescription>
				</DialogHeader>
				<button
					onClick={() => setIsOpen(false)}
					className='mx-auto font-bold text-white w-min mt-3 text-lg border rounded-xl px-6 py-2 hover:bg-blue-600 bg-blue-700'
				>
					Entendi!
				</button>
			</DialogContent>
		</Dialog>
	);
};
