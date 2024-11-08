import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

export default forwardRef(function FileInput(
    {
        type = 'file',
        className = '',
        isFocused = false,
		onChange = () => {},
		placeholder = '',
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

	const [preview, setPreview] = useState<string | undefined>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event);
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };


    return (
		<label className={`
			h-40 w-40 p-1.5 ${preview ? "bg-white" : "bg-transparent"}
			border rounded-md border-gray-300 shadow-sm
			focus:border-indigo-700 focus:ring-indigo-700 cursor-pointer ${className}
		`}>
			{ (preview || placeholder) && (
				<div className="relative flex justify-start items-center h-full w-full overflow-clip rounded">
					<img
						className="absolute inset-0 h-full w-full object-cover"
						src={preview || placeholder}
						alt="Avatar preview"
					/>
				</div>
			)}
			
			<input
				{...props}
				type={type}
				className="hidden"
				ref={localRef}
				onChange={handleFileChange}
				accept="image/png, image/jpeg"
			/>
		</label>
    );
});
