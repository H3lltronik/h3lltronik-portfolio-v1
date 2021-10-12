import { motion } from "framer-motion";
import React, { ChangeEvent, FC } from "react";
import { useController } from "react-hook-form";
import { errorFieldVariants } from "./anim";

type InputProps = {
    className?: string;
    iconClassName?: string;
    inputClassName?: string;
    containerClassName?: string;
    label?: string;
    name: string;
    rules?: any;
    value?: any;
    placeholder?: string;
    control?: any;
    icon: React.ReactNode;
    onKeyDown?: (event: React.KeyboardEvent) => any
    onChange?: (event: ChangeEvent<HTMLInputElement>) => any
}
export const Input:FC<InputProps> = (props) => {
    const controller = useController({
        name: props.name,
        control: props.control,
        rules: props.rules,
        defaultValue: props.value,
    });

    function getErrorMessage(errorType: string) {
        switch(errorType) {
            case 'required': {
                return "This field is required";
            }
            case 'pattern': {
                return "Enter a valid " + props.name;
            }
        }
    }

    return (
        <div className={`${props.className} relative`}>
            <div className="font-normal text-body-1 sm:text-headline-2">{props.label}</div>
            <div className={`flex bg-primary z-10 ${props.containerClassName}`}>
                <div className={`w-[24px] h-[24px] my-1 ml-3 mr-5 ${props.iconClassName}`}>
                    {props.icon}
                </div>
                <input
                    onKeyDown={e => {
                        if (props.onKeyDown) props.onKeyDown(e);
                    }}
                    onChange={(e) => {
                        if(props.onChange) props.onChange(e);
                        controller.field.onChange(e);
                    }}
                    type="text" placeholder={props.placeholder}
                    defaultValue={props.value}
                    className={`${props.inputClassName} bg-transparent w-full mr-2 tracking-wide outline-none text-body-3 sm:text-body-2`}
                />
            </div>
            {/* <span>aber {controller.fieldState.error && controller.fieldState.error.type}</span> */}
            {controller.fieldState.error && (
                <motion.span variants={errorFieldVariants} initial="hidden" animate="show"
                className="absolute top-full left-0 text-xs text-red-500 mt-1 z-[-1]">
                    {getErrorMessage(controller.fieldState.error.type)}
                </motion.span>
            )}
        </div>
    );
};
