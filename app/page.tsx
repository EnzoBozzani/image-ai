'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { toast } from 'sonner';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const HomePage = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [fileContent, setFileContent] = useState<string | null>(null);
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);

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

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	return (
		<main className='w-full min-h-screen text-black p-6 flex justify-center items-center flex-col gap-y-12'>
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
			{fileContent && (
				<Document
					file={'data:application/pdf;base64,' + fileContent}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page pageNumber={pageNumber} />
				</Document>
			)}
		</main>
	);
};

export default HomePage;
