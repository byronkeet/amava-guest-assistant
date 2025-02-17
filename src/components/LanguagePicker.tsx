"use client";

import { Select } from "@/components/ui/select";

const languages = [
	{ value: "english", label: "English" },
	{ value: "french", label: "French" },
	{ value: "german", label: "German" },
];

export function LanguagePicker() {
	return (
		<Select
			defaultValue='english'
			className='w-[100px]'
			options={languages}
		/>
	);
}
