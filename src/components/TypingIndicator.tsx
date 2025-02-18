export function TypingIndicator() {
	return (
		<div className='flex space-x-2 p-3 bg-white border border-gray-200 rounded-2xl w-16'>
			<div className='w-2 h-2 bg-gray-300 rounded-full animate-[bounce_1.4s_infinite_.2s]' />
			<div className='w-2 h-2 bg-gray-300 rounded-full animate-[bounce_1.4s_infinite_.4s]' />
			<div className='w-2 h-2 bg-gray-300 rounded-full animate-[bounce_1.4s_infinite_.6s]' />
		</div>
	);
}
