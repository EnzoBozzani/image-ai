'use client';

import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export const Viewer = ({ fileContent }: { fileContent: string }) => {
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	return (
		<div className='flex items-center gap-x-4'>
			<button onClick={() => setPageNumber((current) => (current === 1 ? 1 : current - 1))}>
				<FaChevronLeft className='w-10 h-10' />
			</button>
			<Document
				file={'data:application/pdf;base64,' + fileContent}
				onLoadSuccess={onDocumentLoadSuccess}
				className={'h-[400px] w-auto'}
			>
				<Page
					className={'h-[300px]'}
					pageNumber={pageNumber}
				/>
			</Document>
			<button onClick={() => setPageNumber((current) => (current === numPages ? numPages : current + 1))}>
				<FaChevronRight className='w-10 h-10' />
			</button>
		</div>
	);
};
