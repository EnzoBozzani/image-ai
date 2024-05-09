import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function generateTranslation(fileContent: string) {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

	const prompt = 'Traduza o texto do documento para português';

	const imagePart = {
		inlineData: {
			data: fileContent,
			mimeType: 'application/pdf',
		},
	};

	const result = await model.generateContent([prompt, imagePart]);
	const response = await result.response;
	const text = response.text();

	return text;
}
