"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/ChatInput";
import { getSessionId, saveMessages, loadMessages } from "@/lib/session";

export default function ChatPage() {
	const [messages, setMessages] = useState<
		Array<{ text: string; isBot: boolean; id: string }>
	>([]);
	const [loading, setLoading] = useState(false);
	const [processingMessage, setProcessingMessage] = useState<string | null>(
		null
	);
	const [initialized, setInitialized] = useState(false);
	const sessionIdRef = useRef(getSessionId());

	const handleMessage = useCallback(
		async (message: string, isUserMessage = true) => {
			if (processingMessage === message) return;

			const messageId = `${Date.now()}-${Math.random()}`;

			if (!isUserMessage) {
				setMessages((prev) => [
					...prev,
					{ text: message, isBot: true, id: messageId },
				]);
				return;
			}

			setMessages((prev) => [
				...prev,
				{ text: message, isBot: false, id: messageId },
			]);

			setLoading(true);
			setProcessingMessage(message);

			try {
				const response = await fetch("/api/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						message,
						sessionId: sessionIdRef.current,
					}),
				});

				if (!response.ok) throw new Error("Failed to get response");

				const data = await response.json();
				setMessages((prev) => [
					...prev,
					{
						text: data.response,
						isBot: true,
						id: `${messageId}-response`,
					},
				]);
			} catch (error) {
				console.error("Error:", error);
				setMessages((prev) => [
					...prev,
					{
						text: "Sorry, I'm having trouble responding right now.",
						isBot: true,
						id: `${messageId}-error`,
					},
				]);
			} finally {
				setLoading(false);
				setProcessingMessage(null);
			}
		},
		[processingMessage]
	);

	useEffect(() => {
		if (!initialized) {
			const savedMessages = loadMessages();
			if (savedMessages.length > 0) {
				setMessages(savedMessages);
			}

			const initialMessage = sessionStorage.getItem("initialMessage");
			if (initialMessage) {
				handleMessage(initialMessage, true);
				sessionStorage.removeItem("initialMessage");
			}
			setInitialized(true);
		}
	}, [initialized, handleMessage]);

	useEffect(() => {
		saveMessages(messages);
	}, [messages]);

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1 p-4'>
				<div className='max-w-xl mx-auto space-y-4'>
					{messages.map((message) => (
						<div
							key={message.id}
							className={`p-4 rounded-lg ${
								message.isBot
									? "bg-white border border-gray-200"
									: "bg-[#B5854B] text-white"
							}`}
						>
							{message.text}
						</div>
					))}
					{loading && (
						<div className='text-center text-gray-500'>
							Loading...
						</div>
					)}
				</div>
				<div className='mt-4'>
					<ChatInput onSendMessage={handleMessage} />
				</div>
			</main>
		</div>
	);
}
