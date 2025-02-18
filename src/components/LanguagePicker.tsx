"use client";

import { Select } from "@/components/ui/select";
import { languages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/translations";

export function LanguagePicker() {
	const { language, setLanguage } = useLanguage();

	return (
		<Select
			value={language}
			onChange={(e) => setLanguage(e.target.value as Language)}
			className='w-[100px]'
			options={languages}
		/>
	);
}
