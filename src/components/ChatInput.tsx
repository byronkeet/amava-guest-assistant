"use client";

import { useState } from "react";
import { Mic, Send, Square } from "lucide-react";
import { Button } from "./ui/button";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

interface ChatInputProps {
	onSendMessage?: (message: string, isUserMessage?: boolean) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
	const [message, setMessage] = useState("");
	const { isRecording, isSupported, startRecording, stopRecording } =
		useAudioRecorder();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() && onSendMessage && !isProcessing) {
			onSendMessage(message, true);
			setMessage("");
		}
	};

	const handleMicClick = async () => {
		if (!isSupported) {
			alert(
				"Voice recording is not supported in your browser. Please try using a modern browser like Chrome, Firefox, or Safari."
			);
			return;
		}

		if (isRecording) {
			const audioData = await stopRecording();
			if (audioData && onSendMessage && !isProcessing) {
				setIsProcessing(true);
				try {
					// First, get the transcription
					const response = await fetch("/api/chat", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							uploads: [
								{
									data: audioData,
									type: "audio",
									name: "audio.webm",
									mime: "audio/webm;codecs=opus",
								},
							],
						}),
					});

					const data = await response.json();

					if (!response.ok) {
						throw new Error(data.error || "Failed to send audio");
					}

					if (data.transcription) {
						// Show the transcribed text as user message and get response
						onSendMessage(data.transcription, true);

						// Don't make a second API call - the chat page will handle it
						// Remove this section that was causing double submissions
						/*
						const textResponse = await fetch("/api/chat", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								message: data.transcription,
							}),
						});

						if (!textResponse.ok) {
							throw new Error("Failed to get response");
						}

						const textData = await textResponse.json();
						if (textData.response) {
							onSendMessage(textData.response, false);
						}
						*/
					}
				} catch (error) {
					console.error("Error sending audio:", error);
					alert(
						error instanceof Error
							? error.message
							: "Failed to send voice message. Please try again."
					);
				} finally {
					setIsProcessing(false);
				}
			}
		} else {
			await startRecording();
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
					disabled={isProcessing}
					className='w-full p-4 pr-24 rounded-full border border-gray-300 focus:outline-none focus:border-[#B5854B] disabled:opacity-50'
				/>
				<div className='absolute right-2 flex gap-2'>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						className='rounded-full'
						onClick={handleMicClick}
						disabled={isProcessing}
					>
						{isRecording ? (
							<Square className='h-6 w-6 text-red-500' />
						) : (
							<Mic
								className={`h-6 w-6 ${
									isRecording
										? "text-red-500"
										: "text-[#B5854B]"
								}`}
							/>
						)}
					</Button>
					<Button
						type='submit'
						size='icon'
						className='rounded-full bg-[#B5854B] hover:bg-[#9a6f3f] disabled:opacity-50'
						disabled={isProcessing}
					>
						<Send className='h-6 w-6' />
					</Button>
				</div>
			</div>
		</form>
	);
}
