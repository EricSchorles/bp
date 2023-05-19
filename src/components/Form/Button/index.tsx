"use client";

interface ButtonProps {
    label: string;
    action?: () => void;
}

export const Button = ({ label, action }: ButtonProps) => {
    return (
        <button className="border border-primary hover:bg-primary:bg-opacity-90 text-primary font-bold py-2 px-4 rounded"
            onClick={action}
        >
            {label}
        </button>
    );
};
