'use client';

import { generateTranslation } from '@/lib/ai';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

const HomePage = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [fileContent, setFileContent] = useState<string | null>(null);
	const [translation, setTranslation] = useState<string | null>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = async (ev: ChangeEvent<HTMLInputElement>) => {
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

		try {
			const res = await generateTranslation(ev.target.files[0]);
			console.log(res);
			setTranslation(res);
		} catch (error) {
			console.error(error);
			toast.error('Erro ao traduzir o arquivo!');
		}
	};

	return (
		<main className='w-full text-black flex items-center'>
			<section className='flex justify-center items-center flex-col gap-y-12 h-screen w-[70%]'>
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
					className='text-3xl px-8 py-4 bg-blue-700 rounded-xl text-white font-semibold'
					onClick={handleClick}
				>
					Selecionar imagem
				</button>
			</section>
			<section className='flex items-center justify-center w-[38%]'>
				<div className='w-[90%] border rounded-xl bg-rose-200 p-8'>
					{translation ? (
						<p>{translation}</p>
					) : (
						<Image
							src='undraw.svg'
							alt='Upload Draw'
							className='w-full'
							width={300}
							height={300}
						/>
					)}
				</div>
			</section>
		</main>
	);
};

export default HomePage;
