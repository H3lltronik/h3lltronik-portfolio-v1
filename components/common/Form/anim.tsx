import { Variants } from "framer-motion";

const smoothCurve = [0.6, 0.01, -0.05, 0.95];

export const errorFieldVariants: Variants = {
    hidden: {
        y: -15,
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
    show: {
        y: 0,
        transition: {
            ease: smoothCurve,
            duration: 0.5,
            staggerChildren: 0.5
        },
    },
};