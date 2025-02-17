"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ChatInput } from "@/components/ChatInput";

export default function ChatPage() {
	const [messages, setMessages] = useState<
		Array<{ text: string; isBot: boolean }>
	>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const initialMessage = sessionStorage.getItem("initialMessage");
		if (initialMessage) {
			handleMessage(initialMessage);
			sessionStorage.removeItem("initialMessage");
		}
	}, []);

	const handleMessage = async (message: string) => {
		setLoading(true);
		setMessages((prev) => [...prev, { text: message, isBot: false }]);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const data = await response.json();
			console.log("Response data:", data);

			setMessages((prev) => [
				...prev,
				{ text: data.response, isBot: true },
			]);
		} catch (error) {
			console.error("Error:", error);
			setMessages((prev) => [
				...prev,
				{
					text: "Sorry, I'm having trouble responding right now.",
					isBot: true,
				},
			]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1 p-4'>
				<div className='max-w-xl mx-auto space-y-4'>
					{messages.map((message, index) => (
						<div
							key={index}
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
