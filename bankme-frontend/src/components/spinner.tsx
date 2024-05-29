import { RefAttributes, SVGProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('text-muted-foreground animate-spin', {
    variants: {
        size: {
            default: 'h-4 w-4',
            sm: 'h-2 w-2',
            lg: 'h-6 w-6',
            icon: 'h-10 w-10',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface SpinnerProps
    extends ComponentAttributes,
        VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size, className, ...props }: SpinnerProps) => {
    return (
        <Loader
            {...props}
            className={cn(spinnerVariants({ size, className }))}
        />
    );
};
