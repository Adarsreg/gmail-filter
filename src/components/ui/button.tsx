import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, FC } from 'react';

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        ghost: 'bg-transparent text-blue-600 hover:text-blue-700 focus:ring-blue-500',
        delete: 'bg-red-200 text-white hover:bg-red-800 focus:ring-red-600',
        custom: 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-600 ',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-12 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ className, children, variant, isLoading, size, ...props }) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} disabled={isLoading} {...props}>
      
      {children}
    </button>
  );
};

export default Button;
