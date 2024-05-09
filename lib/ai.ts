'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);

async function fileToGenerativePart(file: File) {
	const base64EncodedDataPromise = new Promise((resolve) => {
		const reader = new FileReader();
		//@ts-ignore
		reader.onloadend = () => resolve(reader.result.split(',')[1]);
		reader.readAsDataURL(file);
	});
	return {
		inlineData: { data: (await base64EncodedDataPromise) as string, mimeType: file.type },
	};
}

export async function generateTranslation(files: FileList) {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

	const prompt =
		'Descreva as imagens detalhadamente, a descrição será usada como acessibilidade para deficientes visuais. O formato de saída deve ser: Imagem 1: ... \n\nImagem 2: ... e por aí vaí';

	const imagePart = await Promise.all([files].map(fileToGenerativePart));

	try {
		const result = await model.generateContent([prompt, ...imagePart]);
		const response = await result.response;
		const text = response.text();

		return { ok: true, text };
	} catch (error) {
		console.log(error);
		return { ok: false };
	}
}
