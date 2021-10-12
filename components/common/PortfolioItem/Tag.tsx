import React, { FC } from "react";

type TagProps = {
    className?: string;
    tag: { id: string | number; name: string };
};

export const Tag: FC<TagProps> = (props) => {
    return (
        <div
            className={`bg-secondary text-primary rounded-2xl h-[28px] px-3 font-secondary relative 
                border border-primary flex-center ${props.className} cursor-pointer select-none
                hover:bg-primary group hover:border-secondary transition duration-500 `}>
            <div className="text-xs tracking-wide group-hover:text-secondary">
                <strong className="uppercase">{props.tag.name}</strong>
            </div>

            <div
                className="w-[3px] h-[3px] absolute bottom-[2px] left-1/2 bg-primary group-hover:bg-secondary 
                    transform -translate-x-1/2 rounded-2xl"></div>
        </div>
    );
};
