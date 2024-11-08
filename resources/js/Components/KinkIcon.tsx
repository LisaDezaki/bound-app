import { PropsWithChildren } from 'react';
import { KinkRating } from '@/types';

export default function KinkIcon ({
	className = '',
	rating,
	size,
	currentColor,
}: PropsWithChildren<{
	className?: string,
	rating: KinkRating,
	size: number,
	currentColor?: boolean
}>) {
    return (
		<svg className={`flex-shrink-0 ${className}`} width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">

			{ rating === -1 && <>
				<path stroke={currentColor ? "currentColor" : "#FF5858"} strokeWidth="16.6667" strokeLinecap="round" strokeLinejoin="round" d="M99.9994 183.334C146.023 183.334 183.333 146.024 183.333 100C183.333 53.9766 146.023 16.667 99.9994 16.667C53.9756 16.667 16.666 53.9766 16.666 100C16.666 146.024 53.9756 183.334 99.9994 183.334Z" />
				<path stroke={currentColor ? "currentColor" : "#FF5858"} strokeWidth="16.6667" strokeLinecap="round" strokeLinejoin="round" d="M40.8359 40.8369L159.169 159.17" />
			</>}

			{ rating === 0 && <>
				<path stroke={currentColor ? "currentColor" : "#BDBDBD"} strokeWidth="16.75" strokeLinecap="round" strokeLinejoin="round" d="M99.9994 183.334C146.023 183.334 183.333 146.024 183.333 100C183.333 53.9766 146.023 16.667 99.9994 16.667C53.9756 16.667 16.666 53.9766 16.666 100C16.666 146.024 53.9756 183.334 99.9994 183.334Z" />
			</>}

			{ rating === 1 && <>
				<path stroke={currentColor ? "currentColor" : "#56BEF2"} strokeWidth="16.9167" strokeLinecap="round" strokeLinejoin="round" d="M100.001 183.333C146.025 183.333 183.335 146.023 183.335 99.9994C183.335 53.9756 146.025 16.666 100.001 16.666C53.9776 16.666 16.668 53.9756 16.668 99.9994C16.668 146.023 53.9776 183.333 100.001 183.333Z" />
				<path stroke={currentColor ? "currentColor" : "#56BEF2"} strokeWidth="16.9167" strokeLinecap="round" strokeLinejoin="round" d="M75.748 74.9969C77.7072 69.4275 81.5743 64.7312 86.6643 61.7397C91.7544 58.7483 97.7388 57.6548 103.558 58.6529C109.377 59.651 114.655 62.6763 118.457 67.193C122.259 71.7097 124.34 77.4263 124.331 83.3303C124.331 99.9969 99.3314 108.33 99.3314 108.33" />
				<path stroke={currentColor ? "currentColor" : "#56BEF2"} strokeWidth="16.9167" strokeLinecap="round" strokeLinejoin="round" d="M100 141.666H100.084" />
			</>}

			{ rating === 2 && <>
				<path stroke={currentColor ? "currentColor" : "#4AD770"} strokeWidth="16.6667" strokeLinecap="round" strokeLinejoin="round" d="M181.672 83.3376C185.478 102.015 182.766 121.433 173.988 138.353C165.21 155.272 150.897 168.671 133.435 176.315C115.974 183.959 96.4193 185.386 78.0332 180.357C59.6472 175.329 43.5407 164.149 32.3997 148.683C21.2588 133.216 15.7568 114.398 16.8113 95.3659C17.8658 76.3338 25.4131 58.2384 38.1945 44.0974C50.9759 29.9564 68.2189 20.6246 87.048 17.6581C105.877 14.6916 125.154 18.2698 141.664 27.796" />
				<path stroke={currentColor ? "currentColor" : "#4AD770"} strokeWidth="16.6667" strokeLinecap="round" strokeLinejoin="round" d="M75 91.6663L100 116.666L183.333 33.333" />
			</>}

			{ rating === 3 && <>
				<path fill={currentColor ? "currentColor" : "#FF4F8F"} stroke={currentColor ? "currentColor" : "#FF4F8F"} strokeWidth="16.6667" strokeLinecap="round" strokeLinejoin="round" d="M158.333 116.667C170.749 104.5 183.333 89.9167 183.333 70.8333C183.333 58.6776 178.504 47.0197 169.908 38.4243C161.313 29.8289 149.655 25 137.499 25C122.833 25 112.499 29.1667 99.9994 41.6667C87.4994 29.1667 77.166 25 62.4994 25C50.3436 25 38.6857 29.8289 30.0903 38.4243C21.4949 47.0197 16.666 58.6776 16.666 70.8333C16.666 90 29.166 104.583 41.666 116.667L99.9994 175L158.333 116.667Z" />
			</>}

		</svg>
	);
}