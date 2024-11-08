import { ImgHTMLAttributes, PropsWithChildren } from 'react';

// export default function KinkButton({
// 	kink,
// 	userHasKink,
// 	className = '',
// 	...props
// }: PropsWithChildren<{
// 	kink: Kink,
// 	userHasKink: boolean,
// 	className?: string
// }>) {


export default function DangerButton({
    className = '',
    children,
	color = '#ffffff',
	src = '',
	alt = '',
    ...props
}: PropsWithChildren<{
	className?: string,
	color?: string,
	src?: File | string,
	alt?: string
}>) {
    return (
		<div className={[
			"relative rounded-full border border-gray-200",
			"flex items-center justify-center",
			"overflow-clip",
			className
		].join(' ')}>

			<div className="absolute inset-0" style={{ backgroundColor: `${color}`, opacity: `0.2` }}>

			</div>

			{ src && typeof src == 'string'
				? <img
					{...props}
					src={src}
					className="relative h-full w-full"
				/>

				: <span className="text-7xl font-black text-gray-200">
					{alt.substring(0,2).toUpperCase()}
				</span>
			}
		</div>
    );
}