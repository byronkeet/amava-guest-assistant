"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { Button } from "./ui/button";

interface ChatInputProps {
	onSendMessage?: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() && onSendMessage) {
			onSendMessage(message);
			setMessage("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-xl mx-auto'
		>
			<div className='relative flex items-center'>
				<input
					type='text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Ask a question...'
					className='w-full p-4 pr-24 rounded-full border border-gray-300 focus:outline-none focus:border-[#B5854B]'
				/>
				<div className='absolute right-2 flex gap-2'>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						className='rounded-full'
					>
						<Mic className='h-6 w-6 text-[#B5854B]' />
					</Button>
					<Button
						type='submit'
						size='icon'
						className='rounded-full bg-[#B5854B] hover:bg-[#9a6f3f]'
					>
						<Send className='h-6 w-6' />
					</Button>
				</div>
			</div>
		</form>
	);
}
