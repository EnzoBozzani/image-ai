import { ImageResponse } from 'next/og';

import { BsCardImage } from 'react-icons/bs';

export const runtime = 'edge';

export const size = {
	width: 32,
	height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(<BsCardImage className='w-full h-full' />, {
		...size,
	});
}
