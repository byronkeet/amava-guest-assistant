import { LanguagePicker } from "../LanguagePicker";
import Link from "next/link";

export function Header() {
	return (
		<header className='w-full p-4'>
			<div className='flex justify-between items-center'>
				<Link
					href='/'
					className='text-2xl font-serif hover:opacity-80'
				>
					TULUDI
				</Link>
				<LanguagePicker />
			</div>
		</header>
	);
}
