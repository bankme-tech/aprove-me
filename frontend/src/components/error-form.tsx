import { cn } from '@/lib/utils';
import { AlertCircleIcon } from 'lucide-react';

type ErrorFormProps = {
  className?: string;
  message: string;
};

export const ErrorForm = ({ className, message }: ErrorFormProps) => {
  return (
    <p
      className={cn(
        'flex items-center rounded-md bg-red-400 p-2 px-4 text-sm text-red-800',
        className
      )}
    >
      <AlertCircleIcon className="mr-2 size-3" />
      {message}
    </p>
  );
};
