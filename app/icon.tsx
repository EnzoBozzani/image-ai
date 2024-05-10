import { ImageResponse } from 'next/og';

import { BsCardImage } from 'react-icons/bs';

export const runtime = 'edge';

export const size = {
	width: 32,
	height: 32,
};
export const contentType = 'image/svg';

export default function Icon() {
	return new ImageResponse(<BsCardImage className='h-8 w-8' />, {
		...size,
	});
}
