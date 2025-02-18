"use client";

import { Button } from "./ui/button";

interface SuggestedPromptsProps {
	prompts: string[];
	onSelectPrompt?: (prompt: string) => void;
}

export function SuggestedPrompts({
	prompts,
	onSelectPrompt,
}: SuggestedPromptsProps) {
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
