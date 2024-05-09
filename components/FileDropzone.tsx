import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/utils';
import { ChangeEvent, useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

interface FileDropzoneProps {
	isLoading: boolean;
	handleFileSend: (files: File[]) => void;
}

export const FileDropzone = ({ isLoading, handleFileSend }: FileDropzoneProps) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
	});

	const [files, setFiles] = useState<File[]>([]);

	const acceptedFileItems = files.map((file, i) => (
		<li
			key={file.name}
			className='flex items-center'
		>
			<span className='font-semibold'>
				{i + 1}. {file.name} - {file.size} bytes
			</span>
			<span
				className='ms-2'
				onClick={() => {
					setFiles((prev) => prev.filter((f) => f.name !== file.name));
				}}
			>
				<XIcon className='w-8 h-8 text-red-500 cursor-pointer' />
			</span>
		</li>
	));

	useEffect(() => {
		setFiles(acceptedFiles);
	}, [acceptedFiles]);

	return (
		<>
			<section className='bg-white border rounded-xl w-[95%] p-4 text-sm sm:text-base'>
				<div
					{...getRootProps({ className: 'dropzone' })}
					className='bg-neutral-100 border-4 border-dashed p-8 cursor-pointer hover:border-blue-500'
				>
					<input {...getInputProps()} />
					<p className='text-center'>(Somente imagens *.jpeg e *.png serão aceitas!)</p>
					<p className='text-center'>Clique aqui para adicionar arquivos!</p>
				</div>
				<aside className='p-4'>
					<h4 className='font-semibold'>Imagens:</h4>
					<ul>{acceptedFileItems}</ul>
				</aside>
			</section>
			<button
				className={cn(
					'text-xl sm:text-3xl px-6 py-3 sm:px-8 sm:py-4 bg-blue-700 rounded-xl text-white font-semibold',
					isLoading || 'hover:bg-blue-800'
				)}
				onClick={() => {
					handleFileSend(files);
					setFiles([]);
				}}
				disabled={isLoading}
			>
				{isLoading ? 'Carregando...' : 'Enviar Imagens'}
			</button>
		</>
	);
};
