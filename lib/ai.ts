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

export async function generateTranslation(fileContent: File) {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

	const prompt = 'Descreva a imagem detalhadamente, dizendo cores do ambiente e de tudo!';

	const imagePart = await Promise.all([fileContent].map(fileToGenerativePart));

	const result = await model.generateContent([prompt, ...imagePart]);
	const response = await result.response;
	const text = response.text();

	return text;
}
