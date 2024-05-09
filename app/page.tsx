'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { BsCardImage } from 'react-icons/bs';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { FiClipboard } from 'react-icons/fi';

import { Skeleton } from '@/components/ui/skeleton';
import { generateDescription } from '@/lib/ai';
import { FileDropzone } from '@/components/FileDropzone';

const HomePage = () => {
	const [description, setDescription] = useState<{ [key: number]: string } | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileSend = async (files: File[]) => {
		setIsLoading(true);

		if (files.length === 0) {
			toast.error('Você deve enviar pelo menos uma imagem!');
			setIsLoading(false);
			return;
		}

		if (files.length > 10) {
			toast.error('Você só pode enviar até 10 imagens por vez!');
			setIsLoading(false);
			return;
		}

		for (let i = 0; i < files.length; i++) {
			if (files[i].type !== 'image/png' && files[i].type !== 'image/jpeg') {
				toast.error('Apenas imagens PNG e JPEG são aceitas!');
				return;
			}
		}

		const res = await generateDescription(files);

		if (!res.ok) {
			toast.error('Ocorreu um erro ao tentar gerar a descrição das imagens!');
			setIsLoading(false);
			return;
		}

		setDescription(res.text as string);

		setIsLoading(false);
	};

	return (
		<main className='mx-auto max-w-screen-xl text-black p-6'>
			<header className='flex items-center justify-between w-[95%] mx-auto'>
				<div className='flex items-center gap-x-2'>
					<BsCardImage className='h-12 w-12 text-indigo-700' />
					<p className='text-3xl bg-gradient-to-r from-blue-500 to-rose-400 inline-block text-transparent bg-clip-text font-bold '>
						ImageAI
					</p>
				</div>
				<div className='flex items-center gap-x-6'>
					<Link
						href={'https://github.com/EnzoBozzani/image-ai'}
						target='_blank'
					>
						<FaGithub className='w-12 h-12 hover:text-rose-400 transition-colors' />
					</Link>
					<Link
						href={'https://www.linkedin.com/in/enzo-bozzani-812a7322a/'}
						target='_blank'
					>
						<FaLinkedin className='w-12 h-12 hover:text-rose-400 transition-colors' />
					</Link>
				</div>
			</header>
			<section className='flex justify-center items-center flex-col gap-y-8 mt-12 mb-8 w-full'>
				<div className='flex flex-col justify-center items-center gap-y-2'>
					<h1 className='text-3xl sm:text-6xl text-center bg-gradient-to-r from-indigo-700 via-blue-500 to-rose-400 inline-block text-transparent bg-clip-text font-bold '>
						Bem vindo ao ImageAI!
					</h1>
					<p className='text-sm sm:text-base text-center text-neutral-600 w-[90%] sm:w-[62%]'>
						Receba a descrição de imagens para acessibilidade de maneira extremamente detalhada utilizando
						todo o poder do Gemini, a inteligência artificial do Google!
					</p>
				</div>
				<FileDropzone
					handleFileSend={handleFileSend}
					isLoading={isLoading}
				/>
				<p className='text-sm sm:text-base text-center text-neutral-600 w-[90%] sm:w-[62%]'>
					Chega de imagens sem acessibilidade para deficientes visuais... Com o ImageAI, você gera descrições
					detalhadas de imagens em segundos!
				</p>
			</section>
			<section className='mx-auto flex items-center justify-center w-[95%]'>
				<div className='w-[100%] border rounded-xl text-xl bg-neutral-100 p-4'>
					{isLoading ? (
						<div className='w-full space-y-2'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-1/2' />
						</div>
					) : description ? (
						Object.values(description).map((text) => <p className='text-justify'>{text}</p>)
					) : (
						<p className='font-semibold'>Selecione imagens para obter a descrição</p>
					)}
				</div>
			</section>
		</main>
	);
};

export default HomePage;
