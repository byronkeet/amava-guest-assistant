"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/ChatInput";
import { getSessionId, saveMessages, loadMessages } from "@/lib/session";
import DOMPurify from "dompurify";

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
		<div className='min-h-screen flex flex-col bg-white'>
			<div className='sticky top-0 z-10 bg-white border-b'>
				<Header />
			</div>
			<main className='flex-1 overflow-y-auto py-4'>
				<div className='max-w-xl mx-auto space-y-4 px-4'>
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${
								message.isBot ? "justify-start" : "justify-end"
							}`}
						>
							<div
								className={`p-3 rounded-2xl max-w-[80%] break-words ${
									message.isBot
										? "bg-white border border-gray-200 [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800"
										: "bg-[#B5854B] text-white [&_a]:text-white [&_a]:underline [&_a]:hover:text-gray-200"
								}`}
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(message.text),
								}}
							/>
						</div>
					))}
					{loading && (
						<div className='text-center text-gray-500'>
							<div className='inline-block bg-white px-3 py-2 rounded-2xl'>
								Loading...
							</div>
						</div>
					)}
				</div>
			</main>
			<div className='sticky bottom-0 bg-white p-4'>
				<ChatInput onSendMessage={handleMessage} />
			</div>
		</div>
	);
}
