import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    Icon: React.ElementType;
    error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    Icon,
    disabled,
    error,
    ...rest
}) => (
    <div className="space-y-1">
        <label htmlFor={id}
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
            {label}
        </label>
        <div className="relative">
            <Icon className="absolute left-3 top-[18] -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
                id={id}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                className="pl-10 focus:border-blue-500 dark:focus:border-blue-500"
                {...rest}
            />

            <p className={`text-sm mt-0.5 ${error ? "text-red-500 visible" : "invisible"}`}            >
                {error || " "}
            </p>
        </div>
    </div>
);
