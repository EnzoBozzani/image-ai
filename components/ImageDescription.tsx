'use client';

import { FiClipboard } from 'react-icons/fi';
import { toast } from 'sonner';

export const ImageDescription = ({ description, i }: { description: string; i: number }) => {
	return (
		<div className='w-full border rounded-xl text-xl bg-neutral-100 p-4 space-y-4'>
			<div className='w-full flex items-center justify-between'>
				<h3 className='text-2xl font-bold'>Imagem {i + 1}:</h3>
				<FiClipboard
					onClick={() => {
						navigator.clipboard.writeText(description);
						toast.success('Descrição copiada para a área de transferência!');
					}}
					className='h-8 w-8 text-neutral-500 hover:text-blue-500 cursor-pointer'
				/>
			</div>
			<p className='text-justify'>{description}</p>
		</div>
	);
};
