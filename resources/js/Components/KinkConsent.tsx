import { PropsWithChildren } from 'react';

export default function KinkIcon ({
	rating,
	text
}: PropsWithChildren<{
	rating: -1|0|1|2|3,
	text: string
}>) {

	const buildText = () => {
		let string = "";
		
		switch (rating) {
			case 0: string += "no interest in ";
			case 1: string += "curious about ";
			case 2: string += "likes ";
			case 3: string += "loves ";
		}

		string += text;

		if (rating == -1) {
			string += " is a hard limit"
		}

		string += "."

		return String(string).charAt(0).toUpperCase() + String(string).slice(1);
	}


    return (
		<p className="text-gray-500">
			{ buildText() }
		</p>
	);
}