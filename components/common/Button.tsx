import React, { FC } from 'react';

type ButtonProps = {
    className?: string;
    childClassName?: string;
    onClick?: () => any;
    disabled?: boolean;
};
export const Button: FC<ButtonProps> = (props) => {

    const handleClick = () => {
        if (!props.disabled && props.onClick)
            props.onClick()
    }

    return (
        <button disabled={props.disabled} onClick={handleClick} 
        className={`w-[200px] h-[40px] rounded-3xl bg-secondary text-primary font-bold text-headline-3 font-secondary border transition 
        duration-300 tracking-wide ${props.className} ${props.disabled? 'opacity-40':'hover:bg-primary group hover:border-secondary'}`}>
            <div className={`duration-300 ${props.childClassName} ${props.disabled? '':'group-hover:text-secondary'}`}>
                {props.children}
            </div>
        </button>
    )
}
