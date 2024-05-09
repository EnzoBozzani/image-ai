import { generateTranslation } from '@/lib/ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();

	const { fileContent } = body;

	try {
		const response = await generateTranslation(fileContent);

		return NextResponse.json(
			{
				translation: response,
			},
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				error: err,
			},
			{ status: 500 }
		);
	}
}
