'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
import { BsCardImage } from 'react-icons/bs';

import { generateTranslation } from '@/lib/ai';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const HomePage = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [fileContent, setFileContent] = useState<string | null>(null);
	const [translation, setTranslation] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = async (ev: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		if (!ev.target.files) return;
		const file = ev.target.files[0];

		if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
			toast.error('O arquivo selecionado precisa ser PNG ou JPEG!');
			return;
		}

		const reader = new FileReader();

		reader.onload = (e) => {
			const arrayBuffer = e.target?.result;
			const base64 = btoa(
				new Uint8Array(arrayBuffer as ArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
			);
			setFileContent(base64);
		};

		reader.readAsArrayBuffer(file);

		const res = await generateTranslation(ev.target.files[0]);

		setTranslation(res);

		setIsLoading(false);
	};

	return (
		<main className='mx-auto max-w-screen-xl text-black p-6'>
			<header className='flex items-center justify-between'>
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
			<section className='flex justify-center items-center flex-col gap-y-8 mt-12 mb-24 w-full'>
				<div className='flex flex-col justify-center items-center gap-y-2'>
					<h1 className='text-6xl text-center bg-gradient-to-r from-indigo-700 via-blue-500 to-rose-400 inline-block text-transparent bg-clip-text font-bold '>
						Bem vindo ao ImageAI!
					</h1>
					<p className='text-center text-neutral-600 w-[62%]'>
						Receba a descrição de imagens para acessibilidade de maneira extremamente detalhada utilizando
						todo o poder do Gemini, a inteligência artificial do Google!
					</p>
				</div>
				<input
					type='file'
					className='hidden'
					ref={inputRef}
					onChange={handleFileChange}
				/>
				<button
					className='text-3xl px-8 py-4 bg-blue-700 hover:bg-blue-800 rounded-xl text-white font-semibold'
					onClick={handleClick}
				>
					Selecionar imagem
				</button>
				<p className='text-center text-neutral-600 w-[62%]'>
					Chega de imagens sem descrição de acessibilidade para deficientes visuais... Com o ImageAI, você
					gera descrições detalhadas de imagens em segundos!
				</p>
			</section>
			<section className='mx-auto flex items-center justify-center w-[80%]'>
				<div className='w-[100%] border rounded-xl text-xl bg-neutral-100 p-8 flex items-center justify-center h-[250px]'>
					{isLoading ? (
						<>Carregando...</>
					) : translation ? (
						<p>{translation}</p>
					) : (
						<p className='font-semibold'>Selecione imagens para obter a descrição</p>
					)}
				</div>
			</section>
		</main>
	);
};

export default HomePage;
