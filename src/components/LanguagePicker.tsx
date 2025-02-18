"use client";

import { Select } from "@/components/ui/select";
import { languages } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/translations";

export function LanguagePicker() {
	const { language, setLanguage } = useLanguage();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (isValidLanguage(e.target.value)) {
			setLanguage(e.target.value);
		}
	};

	return (
		<Select
			value={language}
			onChange={handleChange}
			className='w-[100px]'
			options={languages}
		/>
	);
}

function isValidLanguage(value: string): value is Language {
	return Object.keys(languages).includes(value);
}
