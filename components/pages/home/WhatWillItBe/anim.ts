import { Variants } from "framer-motion";

const smoothCurve = [0.6, 0.01, -0.05, 0.95];

export const textBlock: Variants = {
    hidden: {
        y: 200,
        transition: {
            ease: smoothCurve,
            duration: 1,
        },
    },
    show: {
        y: 0,
        transition: {
            delay: 0.4,
            ease: smoothCurve,
            duration: 1.3,
        },
    },
};