import { ArrowRightIcon } from '@phosphor-icons/react';
import type React from 'react';

type ButtonPrimerProps = {
    mainColor?: string;
    accentColor?: string;
    showIcon?: boolean;
    icon?: React.ReactNode;
    extraClasses?: string;
    onClick?: () => void;
    text: string;
    type?: 'button' | 'submit' | 'reset';
};

export default function ButtonPrimer(props: ButtonPrimerProps) {
    const {
        mainColor,
        accentColor,
        icon,
        text,
        extraClasses,
        showIcon = true,
        onClick,
        type = 'button',
    } = props;
    return (
        <button
            className={`${mainColor || 'bg-surface-bright'} ${accentColor || 'text-white'} ${extraClasses || ''} font-label-bold text-2xl rounded-sm chip-shadow active:scale-97 chip-hover transition-all duration-150 flex items-center gap-2 group`}
            onClick={onClick}
            type={type}
        >
            {text}
            {showIcon && (
                <span className="group-hover:translate-x-1 transition-transform">
                    {icon || <ArrowRightIcon size={20} weight="bold" />}
                </span>
            )}
        </button>
    );
}
