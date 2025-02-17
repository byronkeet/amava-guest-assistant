import { LanguagePicker } from "../LanguagePicker";

export function Header() {
	return (
		<header className='w-full p-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-serif'>TULUDI</h1>
				<LanguagePicker />
			</div>
		</header>
	);
}
