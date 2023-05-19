import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export interface PrimaryButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { outlined?: boolean }

export const PrimaryButton = ({ outlined, className, ...props }: PrimaryButtonProps) => (
    <button  className={`${outlined && 'border border-primary dark:border-secondary '} hover:border-primary hover:dark:border-secondary  hover:bg-primary hover:dark:bg-secondary rounded-xl transition-all ${className && className}`} {...props}>
    </button>
)
