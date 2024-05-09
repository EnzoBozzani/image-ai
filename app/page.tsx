'use client';

import { Viewer } from '@/components/Viewer';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { toast } from 'sonner';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const HomePage = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const [fileContent, setFileContent] = useState<string | null>(null);

	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
		if (!ev.target.files) return;
		const file = ev.target.files[0];

		if (file.type !== 'application/pdf') {
			toast.error('O arquivo selecionado não é um PDF!');
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
	};

	useEffect(() => {
		scrollToBottom();
	}, [fileContent]);

	return (
		<main className='w-full text-black'>
			<section className='flex justify-center items-center flex-col gap-y-12 h-screen w-full'>
				<div>
					<h1 className='text-6xl text-center bg-gradient-to-r from-indigo-700 via-blue-500 to-rose-400 inline-block text-transparent bg-clip-text font-bold '>
						Bem vindo ao PDF Translator!
					</h1>
					<p className='text-center text-neutral-600'>
						Traduza seus PDFs utilizando todo o poder da inteligência artificial!
					</p>
				</div>
				<input
					type='file'
					className='hidden'
					ref={inputRef}
					onChange={handleFileChange}
				/>
				<button
					className='text-xl px-4 py-2 bg-sky-300 rounded-xl text-white hover:bg-sky-400'
					onClick={handleClick}
				>
					Selecionar arquivo
				</button>
			</section>
			<section className='w-full h-screen flex'>
				<div className='w-[50%] flex items-center justify-center'>
					{fileContent ? <Viewer fileContent={fileContent} /> : <p>Selecione um arquivo!</p>}
				</div>
				<div className='flex items-center justify-center w-[50%]'>
					<div className='w-[90%] border rounded-xl bg-neutral-200 p-4'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit maiores doloribus dolor deleniti
						odio praesentium cupiditate quisquam officiis in doloremque. Quidem, cum iusto maxime, officia
						inventore labore officiis repellat fuga maiores recusandae aperiam, sed qui minus obcaecati
						voluptatum! Tenetur, voluptatibus in. Dolorem eius temporibus labore sapiente earum quod
						voluptatem commodi?
					</div>
				</div>
				<div ref={bottomRef} />
			</section>
		</main>
	);
};

export default HomePage;
