const smoothCurve = [0.6, 0.01, -0.05, 0.95];

export const previewVariants = {
    hidden: {
        height: 0,
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
    show: {
        height: '100%',
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
};

export const projectTitleVariants = {
    hidden: {
        height: 0,
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
    show: {
        height: '100%',
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
};

export const projectIdVariants = {
    hidden: {
        width: 0,
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
    show: {
        width: '100%',
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
};

export const projectDescVariants = {
    hidden: {
        width: 0,
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
    show: {
        width: '100%',
        transition: {
            ease: smoothCurve,
            duration: 0.5,
        },
    },
};