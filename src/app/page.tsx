"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatInput } from "@/components/ChatInput";
import { SuggestedPrompts } from "@/components/SuggestedPrompts";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const handleMessage = (message: string) => {
		sessionStorage.setItem("initialMessage", message);
		router.push("/chat");
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1 flex flex-col items-center justify-center p-4'>
				<h1 className='text-3xl font-bold mb-8 text-center'>
					Welcome to your
					<br />
					AI Assistant
				</h1>
				<ChatInput onSendMessage={handleMessage} />
				<SuggestedPrompts onSelectPrompt={handleMessage} />
			</main>
			<Footer />
		</div>
	);
}
