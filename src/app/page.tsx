"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatInput } from "@/components/ChatInput";
import { SuggestedPrompts } from "@/components/SuggestedPrompts";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

export default function Home() {
	const router = useRouter();
	const { language } = useLanguage();
	const t = useTranslations(language);

	const handleMessage = (message: string) => {
		sessionStorage.setItem("initialMessage", message);
		router.push("/chat");
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1 flex flex-col items-center justify-center p-4'>
				<h1 className='text-3xl font-bold mb-8 text-center'>
					{t.welcome}
				</h1>
				<ChatInput
					onSendMessage={handleMessage}
					placeholder={t.askQuestion}
				/>
				<SuggestedPrompts
					prompts={[t.downloadPack, t.wifiPassword, t.roomProblem]}
					onSelectPrompt={handleMessage}
				/>
			</main>
			<Footer />
		</div>
	);
}
