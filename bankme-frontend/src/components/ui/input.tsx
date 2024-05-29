import * as React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    register?: UseFormRegisterReturn<string>;
    errors?: FieldErrors;
    icon?: LucideIcon | (() => JSX.Element);
    iconSize?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            id,
            label,
            register,
            errors,
            icon: Icon,
            iconSize,
            name,
            ...props
        },
        ref,
    ) => {
        return (
            <div className="flex flex-col gap-2 w-full">
                {(label || Icon) && (
                    <label
                        className="flex items-center gap-2 text-black dark:text-white"
                        htmlFor={register?.name ?? name}
                    >
                        <>
                            {Icon && <Icon size={iconSize ?? 20} />} {label}
                        </>
                    </label>
                )}

                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className,
                    )}
                    ref={ref}
                    {...props}
                    {...register}
                />

                {id && errors && errors[id] && (
                    <span className="text-xs text-red-400">
                        {errors[id]?.message?.toString() ?? 'Error'}
                    </span>
                )}
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };
