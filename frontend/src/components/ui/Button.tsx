import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(79,140,255,0.3)]",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "border border-white/20 hover:bg-white/10 text-white",
    ghost: "hover:bg-white/10 text-white/80 hover:text-white"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
