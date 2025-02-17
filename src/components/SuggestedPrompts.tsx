"use client";

import { Button } from "./ui/button";

const prompts = [
	"Download the welcome pack",
	"What is the wifi password",
	"What to do in case of a problem in your room",
];

interface SuggestedPromptsProps {
	onSelectPrompt?: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
	return (
		<div className='flex gap-4 overflow-x-auto py-4 px-2 w-full max-w-xl mx-auto'>
			{prompts.map((prompt) => (
				<Button
					key={prompt}
					variant='secondary'
					className='whitespace-nowrap bg-[#B5854B] text-white hover:bg-[#9a6f3f]'
					onClick={() => onSelectPrompt?.(prompt)}
				>
					{prompt}
				</Button>
			))}
		</div>
	);
}
