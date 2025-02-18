"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
	options?: { value: string; label: string }[];
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, children, options, ...props }, ref) => {
		return (
			<select
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				ref={ref}
				{...props}
			>
				{options?.map((option) => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
				{children}
			</select>
		);
	}
);
Select.displayName = "Select";

export { Select };

export const SelectTrigger = Select;
export const SelectContent = ({ children }: { children: React.ReactNode }) => (
	<>{children}</>
);
export const SelectItem = ({
	value,
	children,
}: {
	value: string;
	children: React.ReactNode;
}) => <option value={value}>{children}</option>;
export const SelectValue = ({ placeholder }: { placeholder?: string }) => (
	<>{placeholder}</>
);
