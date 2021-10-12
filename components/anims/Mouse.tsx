import { motion, Variants } from "framer-motion";
import React, { FC } from "react";

type MouseProps = {
    className?: string;
};

export const Mouse: FC<MouseProps> = (props) => {
    const mouseAnim: Variants = {
        start: {
            path: "M21 13v8",
            strokeWidth: 2,
        },
        end: {
            strokeWidth: 5,
            path: "M21 25v8",
            transition: {
                type: 'spring',
                delay: 1,
                repeatType: "loop",
                repeat: 100,
            }
        },
    };

    return (
        <div className={`${props.className}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 40 64"
                className="overflow-visible">
                <rect
                    className="w-full h-full"
                    x=".5"
                    y=".5"
                    stroke="#fff"
                    rx="19.5"
                />
                <motion.path
                    variants={mouseAnim}
                    initial="start"
                    animate="end"
                    className=""
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M21 16v8"
                />
            </svg>
        </div>
    );
};
